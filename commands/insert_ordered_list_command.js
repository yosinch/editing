// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('InsertOrderedList', (function() {
  'use strict';

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isBreakElement(node) {
    return node.nodeType === Node.ELEMENT_NODE &&
      (node.nodeName === 'BR' || node.nodeName === 'WBR');
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isPhrasingElement(node) {
    return node.nodeType === Node.ELEMENT_NODE &&
      editing.nodes.isPhrasing(node);
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isListMergeableContainer(node) {
    // TODO(hajimehoshi): Add div, main, and so on.
    var name = node.nodeName;
    return name === 'P' || name === 'BLOCKQUOTE';
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isTableCell(node) {
    var name = node.nodeName;
    return name === 'TR' || name === 'TD' || name === 'TH' ||
      name === 'COLGROUP' || name === 'TBODY' || name === 'THEAD';
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isContainer(node) {
    return isTableCell(node) || isListMergeableContainer(node);
  }

  /**
   * @param {!NodeList|!Array.<!Node>} nodes
   * @return {!Array.<!Node>}
   */
  function getListItemCandidates(nodes) {

    function getChildListItemCandidates(node) {
      if (!isContainer(node))
        return [node];
      return Array.prototype.reduce.call(
        node.childNodes, function(nodes, node) {
          return nodes.concat(getChildListItemCandidates(node));
        }, []);
    }

    if (!nodes.length)
      return [];
    var listItemCandidates = Array.prototype.filter.call(nodes, function(node) {
      for (var ancestor = node.parentNode; ancestor;
           ancestor = ancestor.parentNode) {
        if (Array.prototype.indexOf.call(nodes, ancestor) !== -1)
          return false;
      }
      return true;
    })
    return listItemCandidates.reduce(function(nodes, node) {
      return nodes.concat(getChildListItemCandidates(node));
    }, []);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} node
   * @param {string} name
   * @return {!Node}
   */
  function replaceNodeName(context, node, name) {
    console.assert(node.parentNode);
    var newNode = context.createElement(name);
    while (node.hasChildNodes())
      context.appendChild(newNode, /** @type {!Node} */(node.firstChild));
    // TODO(hajimehoshi): Copy attributes
    var parent = /** @type {!Node} */(node.parentNode);
    context.replaceChild(parent, newNode, node);
    return newNode;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isList(node) {
    var name = node.nodeName;
    return editing.nodes.isElement(node) && (name === 'OL' || name === 'UL');
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isListItem(node) {
    return node.nodeName === 'LI';
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   *
   * Returns true if |node| can be treated as a list item even if |node| is not
   * a <li>. See w3c.24 and w3c.25.
   */
  function canContentOfDL(node) {
    var name = node.nodeName;
    return name === 'DD' || name === 'DT';
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isInList(node) {
    for (var currentNode = node.parentNode; currentNode;
         currentNode = currentNode.parentNode) {
      if (isList(currentNode))
        return true;
    }
    return false;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} nodes
   * @return {Node} list
   */
  function listify(context, nodes) {
    if (!nodes.length)
      return null;

    var list = context.createElement('OL');
    var listItem = context.createElement('LI');

    context.appendChild(list, listItem);
    var firstNode = nodes[0];
    var parentNode = /** @type {!Node} */(firstNode.parentNode);
    console.assert(parentNode);
    context.replaceChild(parentNode, list, firstNode);

    for (var node of nodes)
      context.appendChild(listItem, node);

    return list;
  }

  /**
   * @param {!Node} node
   * @param {function(!Node):boolean} predicate
   * @return {Node}
   */
  function firstSelfOrAncestor(node, predicate) {
    if (predicate(node))
      return node;
    var ancestors = editing.nodes.ancestorsWhile(node, function(node) {
      return !predicate(node)
    });
    if (!ancestors.length)
      return node.parentNode;
    return ancestors[ancestors.length - 1].parentNode;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} listItemNode
   * @return {{first: !Element, second: !Element}}
   */
  function splitList(context, listItemNode) {
    console.assert(isListItem(listItemNode));
    var listNode = listItemNode.parentNode;
    console.assert(listNode && isList(listNode));

    // Separate |listNode| into |firstList| and |secondList|.
    var firstList = /** @type {!Element} */(listNode);
    var secondList = context.createElement(listNode.nodeName);
    context.insertAfter(listNode.parentNode, secondList, firstList);
    
    // TOOD(hajimehoshi): Use nextSiblingsWhile in the future.
    var siblings = [];
    for (var node = listItemNode.nextSibling; node; node = node.nextSibling)
      siblings.push(node);
    for (var node of siblings)
      context.appendChild(secondList, node);
    context.insertBefore(secondList.parentNode, listItemNode, secondList);

    return {
      first: firstList,
      second: secondList,
    };
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} originalNode
   * @param {!Array.<!Node>} effectiveNodes
   */
  function unlistify(context, originalNode, effectiveNodes) {
    var listItemNode = /** @type {!Element} */(
      firstSelfOrAncestor(originalNode, function(node) {
        return isListItem(node);
      }));
    if (!listItemNode)
      return;

    // Unlistify the inner lists recursively. See w3c.58. Actual unlistifying
    // the child lists will be executed after unlistifying |listItemNode|.
    var childLists = Array.prototype.filter.call(
      listItemNode.childNodes, function(node) {
        // TODO(hajimehoshi): Consider the case when |node| is <ul>.
        if (node.nodeName !== 'OL')
          return false;
        return effectiveNodes.indexOf(node) !== -1;
      });

    var lists = splitList(context, listItemNode);
    var firstList = lists.first;
    var secondList = lists.second;

    // If the new list item is NOT in the outer list, get the content out of
    // the <li> and remove the <li>.
    //
    // NOTE: Even when the new list item's parent is a <li>, that is, the <li>
    // is in a <li>, it is treated as if it was in a list. See w3c.40.
    if ((!listItemNode.parentNode || !isList(listItemNode.parentNode)) &&
        (!listItemNode.parentNode || !isListItem(listItemNode.parentNode))) {
      var isListItemLastChildText = false;
      if (listItemNode.hasChildNodes()) {
        var childNodes = listItemNode.childNodes;
        isListItemLastChildText =
          editing.nodes.isText(childNodes[childNodes.length - 1]);
      }
      while (listItemNode.hasChildNodes()) {
        context.insertBefore(secondList.parentNode,
                             /** @type {!Node} */(listItemNode.firstChild),
                             secondList);
      }
      if (isListItemLastChildText &&
          (secondList.parentNode.lastChild !== secondList ||
           secondList.hasChildNodes())) {
        var br = context.createElement('BR');
        context.insertBefore(secondList.parentNode, br, secondList);
      }
      context.removeChild(listItemNode.parentNode, listItemNode);
      if (!firstList.childNodes.length && firstList.previousSibling &&
          editing.nodes.isText(firstList.previousSibling)) {
        var br = context.createElement('BR');
        context.insertBefore(firstList.parentNode, br, firstList);
      }
    }

    if (!firstList.hasChildNodes())
      context.removeChild(firstList.parentNode, firstList);
    if (!secondList.hasChildNodes())
      context.removeChild(secondList.parentNode, secondList);

    // Unlistify recursively.
    for (var listNode of childLists) {
      for (var listItem of Array.prototype.slice.call(listNode.childNodes)) {
        console.assert(isListItem(listItem));
        unlistify(context, listItem, effectiveNodes);
      }
    }
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} listNodes
   * @return {Node}
   */
  function mergeLists(context, listNodes) {
    if (!listNodes.length)
      return null;
    if (listNodes.length === 1)
      return listNodes[0];

    var firstList = listNodes[0];
    var parent = firstList.parentNode;
    for (var listNode of listNodes.slice(1)) {
      console.assert(listNode.nodeName === 'OL');
      console.assert(Array.prototype.every.call(
        listNode.childNodes, function(node) {
          return isListItem(node) || canContentOfDL(node);
        }));
      while (listNode.hasChildNodes()) {
        context.appendChild(firstList,
                            /** @type {!Node} */(listNode.firstChild));
      }
      context.removeChild(listNode.parentNode, listNode);
    }

    return firstList;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   */
  function wrapByOrderedList(context, selection) {
    var effectiveNodes = context.setUpEffectiveNodes(selection, function(node) {
      return editing.nodes.isText(node) || isPhrasingElement(node);
    });

    // The outermost node is a container node or null. Remove this.
    if (effectiveNodes.length)
      effectiveNodes.shift();

    // If the selection is a caret, select nodes around the caret.
    if (!effectiveNodes.length) {
      var childNodes = selection.startContainer.childNodes;
      if (Array.prototype.every.call(childNodes, function(node) {
        return editing.nodes.isText(node) || isPhrasingElement(node);
      })) {
        effectiveNodes = Array.prototype.map.call(childNodes, function(node) {
          return node;
        });
      } else {
        return;
      }
    }

    // Extend the heading text nodes.
    for (var sibling = effectiveNodes[0].previousSibling;
         sibling && editing.nodes.isText(sibling);
         sibling = sibling.previousSibling) {
      effectiveNodes.unshift(sibling);
    }

    // Extend the tailing text nodes.
    for (var sibling = effectiveNodes[effectiveNodes.length - 1].nextSibling;
         sibling && editing.nodes.isText(sibling);
         sibling = sibling.nextSibling) {
      effectiveNodes.push(sibling);
    }

    // Devide the top nodes into groups: the successive text nodes should be in
    // the same group. Otherwise, the node is in a single group.
    var listItemCandidates = getListItemCandidates(effectiveNodes);
    var listItemCandidateGroups = [];
    listItemCandidates.forEach(function(node) {
      if (!listItemCandidateGroups.length) {
        listItemCandidateGroups.push([node]);
        return;
      }
      var lastGroup =
        listItemCandidateGroups[listItemCandidateGroups.length - 1];
      if (editing.nodes.isText(node)) {
        var lastNode = lastGroup[lastGroup.length - 1];
        if (editing.nodes.isText(lastNode) &&
            lastNode === node.previousSibling) {
          lastGroup.push(node);
          return;
        }
      }
      listItemCandidateGroups.push([node]);
    });

    var listsToBeReplaced = [];
    listItemCandidateGroups.forEach(function(nodes) {
      if (!nodes.length)
        return;

      var node = nodes[0];
      if (!isList(node))
        return;

      var list = node;
      if (list.nodeName !== 'UL')
        return;

      // In some special cases, the list is not replaced. See w3c.90, w3c.90.1,
      // w3c.90.2, w3c.92.
      var next = list;
      while (!next.nextSibling)
        next = next.parentNode;
      next = next.nextSibling;
      if (isInList(list.parentNode) && effectiveNodes.indexOf(next) === -1)
        return;

      listsToBeReplaced.push(list);
    });

    var mergableListCandidates = [];
    listItemCandidateGroups.forEach(function(nodes) {
      if (!nodes.length)
        return;

      if (editing.nodes.isText(nodes[0])) {
        console.assert(Array.prototype.every.call(nodes, function(node) {
          return editing.nodes.isText(node);
        }));
      }

      if (isBreakElement(nodes[0])) {
        context.removeChild(nodes[0].parentNode, nodes[0]);
        return;
      }

      if (isList(nodes[0])) {
        var list = nodes[0];
        if (listsToBeReplaced.indexOf(list) === -1) {
          // If |list| is in another list but it is not replaced with another
          // type of list for some reasons, the selected items will be
          // extracted. See w3c.90, w3c.96.
          if (list.parentNode && isInList(list.parentNode)) {
            context.splitTree(list.parentNode, list);
            for (var listItem of effectiveNodes.filter(function(node) {
              return Array.prototype.indexOf.call(list.childNodes, node) !== -1;
            })) {
              var insertBefore = list.parentNode;
              context.insertBefore(insertBefore.parentNode, listItem,
                                   insertBefore);
            }
            // See w3c.96.
            var followingNodes = [];
            for (var node = list.nextSibling; node;
                 node = node.nextSibling) {
              followingNodes.push(node);
            }
            for (var node of followingNodes.reverse()) {
              var outerList = list.parentNode.parentNode;
              context.insertAfter(outerList.parentNode, node, outerList);
            }

            if (!list.hasChildNodes()) {
              var listItem = list.parentNode;
              context.removeChild(list.parentNode, list);
              if (!listItem.hasChildNodes())
                context.removeChild(listItem.parentNode, listItem);
            }
          }
          return;
        }
        list = replaceNodeName(context, list, 'OL')
        console.assert(list);
        mergableListCandidates.push(list);
        return;
      }

      if (isInList(nodes[0])) {
        var listItemNode = /** @type {!Element} */(
          firstSelfOrAncestor(nodes[0], function(node) {
            return isListItem(node);
          }));
        console.assert(listItemNode);
        var listNode = listItemNode.parentNode;
        if (listNode.nodeName === 'OL') {
          unlistify(context, nodes[0], effectiveNodes);
          return;
        }

        console.assert(listNode.nodeName === 'UL');

        var lists = splitList(context, listItemNode);
        var newList = context.createElement('OL');
        context.appendChild(newList, listItemNode);
        context.insertBefore(lists.second.parentNode, newList, lists.second);
        for (var list of [lists.first, lists.second]) {
          if (!list.hasChildNodes())
            context.removeChild(list.parentNode, list);
        }
        mergableListCandidates.push(newList);

        if (isListItem(nodes[0]))
          return;

        // Split the list item and extract outside the selection. See w3c.76.
        if (nodes[0].previousSibling &&
            effectiveNodes.indexOf(nodes[0].previousSibling) === -1) {
          context.splitTree(listItemNode, nodes[0]);
          var newListItem = listItemNode;
          while (newListItem.hasChildNodes()) {
            context.insertBefore(newList.parentNode,
                                 /** @type {!Node} */(newListItem.firstChild),
                                 newList);
          }
          context.removeChild(newList, newListItem);
        }
        if (nodes[nodes.length - 1].nextSibling &&
            effectiveNodes.indexOf(nodes[nodes.length - 1].nextSibling) ===
            -1) {
          context.splitTree(listItemNode,
                            nodes[nodes.length - 1].nextSibling);
          var newListItem = listItemNode.nextSibling;
          var insertAfter = newList;
          var br = null;
          while (newListItem.hasChildNodes()) {
            var node = newListItem.firstChild;
            context.insertAfter(newList.parentNode,
                                /** @type {!Node} */(newListItem.firstChild),
                                insertAfter);
            insertAfter = node;
            // Insert <br> after the text node. See w3c.76.
            if (node && editing.nodes.isText(node) && !newListItem.firstChild) {
              br = context.createElement('BR');
              context.insertAfter(newList.parentNode, br, insertAfter);
              insertAfter = br;
            }
          }
          // <br> is not needed when it is at the end. See w3c.93.
          if (br && br.parentNode.lastChild === br)
            context.removeChild(br.parentNode, br);
          context.removeChild(newList, newListItem);
        }
        return;
      }

      // See w3c.18.
      if (nodes.length === 1 && canContentOfDL(nodes[0])) {
        var listItem = nodes[0];
        var list = context.createElement('OL');
        context.replaceChild(listItem.parentNode, list, listItem);
        context.appendChild(list, listItem);
        mergableListCandidates.push(list);
        return;
      }

      var newNode = listify(context, nodes);
      console.assert(newNode);
      if (newNode.nodeName === 'OL')
        mergableListCandidates.push(newNode);
    });

    mergableListCandidates.forEach(function(node) {
      console.assert(node.nodeName === 'OL');

      // Already merged with its siblings.
      if (!node.parentNode)
        return;

      var listsToBeMerged = [node];

      // Append the followers.
      for (var previousSiblingNode = node.previousSibling;
           previousSiblingNode && previousSiblingNode.nodeName === 'OL';
           previousSiblingNode = previousSiblingNode.previousSibling) {
        listsToBeMerged.unshift(previousSiblingNode);
      }

      // Append the followings.
      for (var nextSiblingNode = node.nextSibling;
           nextSiblingNode && nextSiblingNode.nodeName === 'OL';
           nextSiblingNode = nextSiblingNode.nextSibling) {
        listsToBeMerged.push(nextSiblingNode);
      }

      var newList = mergeLists(context, listsToBeMerged);
      console.assert(newList);

      // Remove <br> just after the new list.
      if (newList.nextSibling && isBreakElement(newList.nextSibling)) {
        var breakElement = newList.nextSibling;
        context.removeChild(breakElement.parentNode, breakElement);
      }

      // In definition list, the new list can be a sibling to other items.
      var parent = /** @type {!Node} */(newList.parentElement);
      if (canContentOfDL(parent)) {
        var definitionListItem = newList.parentElement;
        var parentNode = /** @type {!Node} */(definitionListItem.parentNode);
        console.assert(parentNode);
        context.replaceChild(parentNode, newList, definitionListItem);
      }
    });

    // Merge lists beyond <p> and so on.
    var lists = mergableListCandidates.filter(function(node) {
      return !!node.parentNode;
    });
    // TODO(hajimehoshi): Remove the variable |list| and use method chain.
    lists.forEach(function(node) {
      // Already merged with other lists.
      if (!node.parentNode)
        return;

      if (!isListMergeableContainer(node.parentNode))
        return;

      var listsToBeMerged = [node];

      for (var nextSiblingNode = node.parentNode.nextSibling;
           nextSiblingNode;
           nextSiblingNode = nextSiblingNode.nextSibling) {
        // TODO(hajimehoshi): Not enough in case of nesting <blockquote>.
        var stopped = Array.prototype.every.call(
          nextSiblingNode.childNodes, function(node) {
            if (lists.indexOf(node) === -1)
              return false;
            listsToBeMerged.push(node);
          });
        if (stopped)
          break;
      }

      var listParents = listsToBeMerged.map(function(node) {
        return node.parentNode;
      });
      mergeLists(context, listsToBeMerged);
      for (var list of listParents.slice(1))
        context.removeChild(list.parentNode, list);
    });
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Not used.
   * @return {boolean}
   */
  function createInsertOrderedListCommand(context, userInterface, value) {
    /** @const */ var selection = context.normalizeSelection(
        context.startingSelection);

    wrapByOrderedList(context, selection);

    // TODO(hajimehoshi): Fix this selection range
    context.setEndingSelection(new editing.ReadOnlySelection(
        context.document.body.firstChild, 0,
        context.document.body.firstChild, 0,
        editing.SelectionDirection.ANCHOR_IS_START));

    return true;
  }

  return createInsertOrderedListCommand;
})());
