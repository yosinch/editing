// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('InsertOrderedList', (function() {

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
      return [].reduce.call(node.childNodes, function(nodes, node) {
        return nodes.concat(getChildListItemCandidates(node));
      }, []);
    }

    if (!nodes.length)
      return [];
    var listItemCandidates = [].filter.call(nodes, function(node) {
      for (var ancestor = node.parentNode; ancestor;
           ancestor = ancestor.parentNode) {
        if ([].indexOf.call(nodes, ancestor) !== -1)
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
      context.appendChild(newNode, node.firstChild);
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

    var list = context.createElement('ol');
    var listItem = context.createElement('li');

    context.appendChild(list, listItem);
    var firstNode = nodes[0];
    var parentNode = /** @type {!Node} */(firstNode.parentNode);
    console.assert(parentNode);
    context.replaceChild(parentNode, list, firstNode);

    nodes.forEach(function(node) {
      context.appendChild(listItem, node);
    });

    return list;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} originalNode
   * @param {!Array.<!Node>} effectiveNodes
   */
  function unlistify(context, originalNode, effectiveNodes) {
    // TODO(hajimehoshi): Split list into two lists
    var listItemNode = originalNode;
    while (listItemNode && !isListItem(listItemNode))
      listItemNode = listItemNode.parentNode;
    if (!listItemNode)
      return;

    // Unlistify the inner lists recursively. See w3c.58. Actual unlistifying
    // the child lists will be executed after unlistifying |listItemNode|.
    var childLists = [].filter.call(listItemNode.childNodes, function(node) {
      // TODO(hajimehoshi): Consider the case when |node| is <ul>.
      if (node.nodeName !== 'OL')
        return false;
      return effectiveNodes.indexOf(node) !== -1;
    });

    var listNode = listItemNode.parentNode;
    console.assert(listNode.nodeName === 'OL');

    // Separate |listNode| into |firstList| and |secondList|.
    var firstList = listNode;
    var secondList = context.createElement('ol');
    context.insertAfter(listNode.parentNode, secondList, firstList);
    
    // TOOD(hajimehoshi): Use nextSiblingsWhile in the future.
    var siblings = [];
    for (var node = listItemNode.nextSibling; node; node = node.nextSibling)
      siblings.push(node);
    siblings.forEach(function(node) {
      context.appendChild(secondList, node);
    });
    context.insertBefore(secondList.parentNode, listItemNode, secondList);

    // If the new list item is NOT in the outer list, get the content out of
    // the <li> and remove the <li>.
    //
    // NOTE: Even when the new list item's parent is a <li>, that is, the <li>
    // is in a <li>, it is treated as if it was in a list. See w3c.40.
    if (!isList(listItemNode.parentNode) &&
        !isListItem(listItemNode.parentNode)) {
      var isListItemLastChildText = false;
      if (listItemNode.hasChildNodes()) {
        var childNodes = listItemNode.childNodes;
        isListItemLastChildText =
          editing.nodes.isText(childNodes[childNodes.length - 1]);
      }
      while (listItemNode.hasChildNodes()) {
        context.insertBefore(secondList.parentNode, listItemNode.firstChild,
                             secondList);
      }
      if (isListItemLastChildText &&
          (secondList.parentNode.lastChild !== secondList ||
           secondList.hasChildNodes())) {
        var br = context.createElement('br');
        context.insertBefore(secondList.parentNode, br, secondList);
      }
      context.removeChild(listItemNode.parentNode, listItemNode);
      if (!firstList.childNodes.length && firstList.previousSibling &&
          editing.nodes.isText(firstList.previousSibling)) {
        var br = context.createElement('br');
        context.insertBefore(firstList.parentNode, br, firstList);
      }
    }

    if (!firstList.hasChildNodes())
      context.removeChild(firstList.parentNode, firstList);
    if (!secondList.hasChildNodes())
      context.removeChild(secondList.parentNode, secondList);

    childLists.forEach(function(listNode) {
      [].slice.call(listNode.childNodes, 0).forEach(function(listItem) {
        console.assert(isListItem(listItem));
        unlistify(context, listItem, effectiveNodes);
      });
    });
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
    listNodes.slice(1).forEach(function(listNode) {
      console.assert(listNode.nodeName === 'OL');
      console.assert([].every.call(listNode.childNodes, function(node) {
        return isListItem(node) || canContentOfDL(node);
      }));
      while (listNode.hasChildNodes())
        context.appendChild(firstList, listNode.firstChild);
      context.removeChild(listNode.parentNode, listNode);
    });

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
      if ([].every.call(childNodes, function(node) {
        return editing.nodes.isText(node) || isPhrasingElement(node);
      })) {
        effectiveNodes = [].map.call(childNodes, function(node) {
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

    // Extend as far as the closest list item if exists.
    var listItemAncestors =
      editing.nodes.ancestorsWhile(effectiveNodes[0], function(node) {
        return !isListItem(node);
      });
    var listItemCandidate = null;
    if (listItemAncestors.length) {
      listItemCandidate =
        listItemAncestors[listItemAncestors.length - 1].parentNode;
    } else {
      listItemCandidate = effectiveNodes[0].parentNode;
    }
    if (listItemCandidate && isListItem(listItemCandidate)) {
      effectiveNodes = listItemAncestors.reverse().concat(effectiveNodes);
      effectiveNodes.unshift(listItemCandidate);
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
        return true;
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

    var listItemCandidatesAfterListifying = [];
    listItemCandidateGroups.forEach(function(nodes) {
      if (!nodes.length)
        return;

      var node = nodes[0];
      if (editing.nodes.isElement(node)) {
        console.assert(nodes.length === 1);

        if (isBreakElement(node)) {
          context.removeChild(nodes[0].parentNode, node);
          return;
        }
        if (isList(node)) {
          listItemCandidatesAfterListifying.push(node);
          return;
        }
        if (isInList(node)) {
          unlistify(context, node, effectiveNodes);
          return;
        }
        if (nodes.length === 1 && canContentOfDL(nodes[0])) {
          var listItem = nodes[0];
          var list = context.createElement('ol');
          context.replaceChild(listItem.parentNode, list, listItem);
          context.appendChild(list, listItem);
          listItemCandidatesAfterListifying.push(list);
          return;
        }
      }

      var newNode = listify(context, nodes);
      console.assert(newNode);
      listItemCandidatesAfterListifying.push(newNode);
    });

    listItemCandidatesAfterListifying.forEach(function(node) {
      // Already merged with its siblings.
      if (!node.parentNode)
        return;

      if (node.nodeName !== 'OL')
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
    var lists = listItemCandidatesAfterListifying.filter(function(node) {
      return !!node.parentNode && node.nodeName === 'OL';
    });
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
        var stopped = [].every.call(nextSiblingNode.childNodes, function(node) {
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
      listParents.slice(1).forEach(function(node) {
        context.removeChild(node.parentNode, node);
      });
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
