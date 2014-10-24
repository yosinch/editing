// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('InsertOrderedList', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ImmutableSelection} selection
   * @return {!Array.<!Node>}
   */
  function getEffectiveNodes(context, selection) {
    /**
     * @param {!Array.<!Node>} nodes
     * @return {!Array.<!Node>}
     *
     * TODO(hajimehoshi): Check if |effectiveNodes| should be extended to
     * include phrasing elements.
     */
    function takeWhileText(nodes) {
      return editing.dom2.takeWhile(nodes, function(node) {
        return editing.dom.isText(node)
      });
    }

    var effectiveNodes = context.setUpEffectiveNodes(selection, function(node) {
      return editing.dom.isText(node) || editing.dom2.isPhrasingElement(node);
    });

    // The outermost node is a container node or null. Remove that.
    if (effectiveNodes.length)
      effectiveNodes.shift();

    // If the selection is a caret, select nodes around the caret.
    if (!effectiveNodes.length) {
      var childNodes = selection.startContainer.childNodes;
      if (Array.prototype.some.call(childNodes, function(node) {
        return !editing.dom.isText(node) &&
          !editing.dom2.isPhrasingElement(node);
      })) {
        return [];
      }
      effectiveNodes = Array.prototype.slice.call(childNodes, 0);
    }

    // Extend the heading text nodes.
    if (editing.dom.isText(effectiveNodes[0])) {
      effectiveNodes =
        takeWhileText(editing.dom.previousSiblings(effectiveNodes[0])).
        reverse().concat(effectiveNodes);
    }

    // Extend the tailing text nodes.
    var lastEffectiveNode = effectiveNodes[effectiveNodes.length - 1];
    if (editing.dom.isText(lastEffectiveNode)) {
      effectiveNodes = effectiveNodes.concat(
        takeWhileText(editing.dom.nextSiblings(lastEffectiveNode)));
    }

    lastEffectiveNode = effectiveNodes[effectiveNodes.length - 1];
    // If |lastEffectiveNodes|'s parent doesn't include all children in
    // |effectiveNodes|, eliminate |lastEffectiveNode|'s ancestors. See w3c.107.
    if (lastEffectiveNode.nextSibling) {
      effectiveNodes = effectiveNodes.filter(function(node) {
        return !editing.dom.isDescendantOf(lastEffectiveNode, node);
      });
    }

    return effectiveNodes;
  }

  /**
   * @param {!NodeList|!Array.<!Node>} nodes
   * @return {!Array.<!Node>}
   */
  function getListItemCandidates(nodes) {
    /**
     * @param {!Node} node
     * @return {!Array.<!Node>}
     */
    function getChildListItemCandidates(node) {
      if (editing.dom.isText(node) ||
          (node.nodeName === 'OL' || node.nodeName === 'UL') ||
          editing.dom2.isHTMLTableElement(node) ||
          editing.dom2.canContentOfDL(node)) {
        return [node];
      }
      
      return Array.prototype.reduce.call(
        node.childNodes, function(nodes, node) {
          return nodes.concat(getChildListItemCandidates(node));
        }, []);
    }

    return Array.prototype.filter.call(nodes, function(node) {
      for (var ancestor of editing.dom.ancestors(node)) {
        if (Array.prototype.indexOf.call(nodes, ancestor) !== -1)
          return false;
      }
      return true;
    }).reduce(function(nodes, node) {
      return nodes.concat(getChildListItemCandidates(node));
    }, []);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} nodes
   * @return {Element} list
   *
   * Creates a new list and makes |nodes| a list item belonging to the list.
   */
  function listify(context, nodes) {
    if (!nodes.length)
      return null;

    var list = context.createElement('OL');
    var listItem = context.createElement('LI');

    context.appendChild(list, listItem);
    var firstNode = nodes[0];
    var parentNode = /** @type {!Element} */(firstNode.parentNode);
    console.assert(parentNode);
    context.replaceChild(parentNode, list, firstNode);

    for (var node of nodes)
      context.appendChild(listItem, node);

    return list;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} originalNode
   * @param {!Array.<!Node>} effectiveNodes
   */
  function unlistify(context, originalNode, effectiveNodes) {
    var listItemNode = /** @type {!Element} */(
      editing.dom2.firstSelfOrAncestor(originalNode, function(node) {
        return editing.dom2.isListItem(node);
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

    var lists = editing.dom2.splitList(context, listItemNode);
    var firstList = lists.first;
    var secondList = lists.second;

    // If the new list item is NOT in the outer list, get the content out of
    // the <li> and remove the <li>.
    //
    // NOTE: Even when the new list item's parent is a <li>, that is, the <li>
    // is in a <li>, it is treated as if it was in a list. See w3c.40.
    if (!listItemNode.parentNode ||
        (listItemNode.parentNode.nodeName !== 'OL' &&
         listItemNode.parentNode.nodeName !== 'UL') &&
        !editing.dom2.isListItem(listItemNode.parentNode)) {
      var isListItemLastChildText = false;
      if (listItemNode.hasChildNodes()) {
        var childNodes = listItemNode.childNodes;
        isListItemLastChildText =
          editing.dom.isText(childNodes[childNodes.length - 1]);
      }
      editing.dom2.insertChildNodesBefore(
        context, /** @type {!Node} */(secondList.parentNode),
        listItemNode, secondList);
      if (isListItemLastChildText &&
          (secondList.parentNode.lastChild !== secondList ||
           secondList.hasChildNodes())) {
        var br = context.createElement('BR');
        context.insertBefore(secondList.parentNode, br, secondList);
      }
      context.removeChild(listItemNode.parentNode, listItemNode);
      if (!firstList.childNodes.length && firstList.previousSibling &&
          editing.dom.isText(firstList.previousSibling)) {
        var br = context.createElement('BR');
        context.insertBefore(firstList.parentNode, br, firstList);
      }
    }

    editing.dom2.removeIfEmpty(context, firstList);
    editing.dom2.removeIfEmpty(context, secondList);

    // Unlistify recursively.
    for (var listNode of childLists) {
      for (var listItem of Array.prototype.slice.call(listNode.childNodes)) {
        console.assert(editing.dom2.isListItem(listItem));
        unlistify(context, listItem, effectiveNodes);
      }
    }
  }

  /**
   * @param {!Element} list
   * @return {!Array.<!Element>}
   */
  function getListsToBeMerged(list) {
    /**
     * @param {!Node} node
     * @return {Node}
     */
    function getPreviousNode(node) {
      if (!node.previousSibling)
        return node.parentNode;
      for (var child = node.previousSibling; child; child = child.lastChild) {
        if (child.nodeName === 'OL')
          return child;
        if (editing.dom.isText(child))
          return child;
        if (editing.dom2.isHTMLTableElement(child) ||
            editing.dom2.isHTMLTableCellElement(child)) {
          return null;
        }
        if (child.nodeName === 'UL')
          return null;
        if (!child.lastChild)
          return child;
      }
      return null;
    }

    /**
     * @param {!Node} node
     * @return {Node}
     */
    function getNextNode(node) {
      if (node !== list && node.firstChild)
        return node.firstChild;
      if (node.nextSibling)
        return node.nextSibling;
      for (var parent of editing.dom.ancestors(node)) {
        if (editing.dom2.isHTMLTableElement(parent) ||
            editing.dom2.isHTMLTableCellElement(parent)) {
          return null;
        }
        if (parent.nodeName === 'UL')
          return null;
        if (parent.nextSibling)
          return parent.nextSibling
      }
      return null;
    }

    /**
     * @param {!Element} list
     * @param {function(!Node):Node} getNextNode
     * @return {Element}
     */
    function getNearestList(list, getNextNode) {
      var runner = list;
      while (runner = getNextNode(runner)) {
        if (runner.nodeName === 'OL')
          return /** @type {!Element} */(runner);
        if (editing.dom.isText(runner)) {
          // TODO(hajimehoshi): Check the cases when (1) xml:space='preserve' is
          // used or (2) CSS white-space is pre.
          if (editing.dom.isWhitespaceNode(runner))
            continue;
          break;
        }
      }
      return null;
    }

    // TODO(hajimehoshi): Use isVisibilityAdjecent like htmlediting.cpp
    var nodes = [getNearestList(list, getPreviousNode),
                 list,
                 getNearestList(list, getNextNode)];
    return nodes.filter(function(node) { return !!node; });
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} list
   * @param {!Array.<!Node>} effectiveNodes
   * @return Node
   */
  function processList(context, list, effectiveNodes) {
    /**
     * @param {!Element} list
     * @return {boolean}
     *
     * Returns true if |list| should be replaced with another type of a list.
     */
    function isListToBeReplaced(list) {
      if (list.nodeName === 'OL')
        return false;

      // In some special cases, the list is not replaced. See w3c.90,
      // w3c.90.1, w3c.90.2, w3c.92, w3c.96.
      if (editing.dom2.isInList(list.parentNode)) {
        var next = editing.dom.nextNodeSkippingChildren(list);
        if (!next)
          return true;
        if (effectiveNodes.indexOf(next) !== -1)
          return true;
        // |next| can be a newly generated list by listifying (w3c.92).
        if ((next.nodeName === 'OL' || next.nodeName === 'UL') &&
            Array.prototype.some.call(next.childNodes, function(listItem) {
              return effectiveNodes.indexOf(listItem) !== -1;
            })) {
          return true;
        }
        return false;
      }

      return true;
    }

    // Replace |list| with another type of a list.
    if (isListToBeReplaced(list))
      return editing.dom2.replaceNodeName(context, list, 'OL');

    if (!list.parentNode || !editing.dom2.isInList(list.parentNode))
      return null;
    
    // If |list| is in another list, the selected items will be
    // extracted. See w3c.90, w3c.96.
    context.splitTree(/** @type {!Element} */(list.parentNode), list);
    for (var listItem of effectiveNodes.filter(function(node) {
      return Array.prototype.indexOf.call(list.childNodes, node) !== -1;
    })) {
      context.insertBefore(list.parentNode.parentNode, listItem,
                           list.parentNode);
    }
    // See w3c.96.
    for (var node of editing.dom.nextSiblings(list).reverse()) {
      var outerList = list.parentNode.parentNode;
      context.insertAfter(outerList.parentNode, node, outerList);
    }

    if (!list.hasChildNodes()) {
      var listItem = list.parentNode;
      context.removeChild(list.parentNode, list);
      editing.dom2.removeIfEmpty(context, /** @type {!Element} */(listItem));
    }

    return null;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} nodes
   * @param {!Array.<!Node>} effectiveNodes
   * @return Node
   */
  function processNodesInList(context, nodes, effectiveNodes) {
    // TODO: Refactoring
    var originalNode = nodes[0];
    var listItemNode = /** @type {!Element} */(
      editing.dom2.firstSelfOrAncestor(originalNode, function(node) {
        return editing.dom2.isListItem(node);
      }));
    var listNode = listItemNode.parentNode;
    if (listNode.nodeName === 'OL') {
      unlistify(context, originalNode, effectiveNodes);
      return null;
    }
    console.assert(listNode.nodeName === 'UL');

    var newList = context.createElement('OL');

    var lists = editing.dom2.splitList(context, listItemNode);
    context.appendChild(newList, listItemNode);
    context.insertBefore(lists.second.parentNode, newList, lists.second);
    editing.dom2.removeIfEmpty(context, lists.first);
    editing.dom2.removeIfEmpty(context, lists.second);

    // Copy the ID to the second list if the first list has gone. See
    // w3c.122.
    if (lists.first.id && !lists.first.parentNode && lists.second.parentNode)
      lists.second.id = lists.first.id;

    // Copy the styles. See w3c.118.
    if (listNode.hasAttribute('style')) {
      var firstItemChanged = !lists.first.parentNode;
      var span = context.createElement('SPAN');
      context.setAttribute(span, 'style', listNode.getAttribute('style'));
      if (firstItemChanged) {
        // If the first item is changed to the list, <span> is applied for
        // the list items. See w3c.123, w3c.124, w3c.125.
        context.insertBefore(originalNode.parentNode, span, originalNode);
        for (var node of nodes)
          context.appendChild(span, node);
      } else {
        context.insertBefore(newList.parentNode, span, newList);
        context.appendChild(span, newList);
      }

      // A <span> for 'text-indent' is specially created. See w3c.120,
      // w3c.120.1, w3c.121.
      if (!firstItemChanged && listNode.style.textIndent) {
        span = context.createElement('SPAN');
        context.setAttribute(span, 'style',
                             'text-indent: ' + listNode.style.textIndent);
        context.insertBefore(originalNode.parentNode, span, originalNode);
        for (var node of nodes)
          context.appendChild(span, node);
      }
    }

    if (editing.dom2.isListItem(originalNode))
      return newList;

    // Split the list item and extract outside the selection. See w3c.76.
    if (originalNode.previousSibling &&
        effectiveNodes.indexOf(originalNode.previousSibling) === -1) {
      context.splitTree(listItemNode, originalNode);
      var newListItem = listItemNode;
      editing.dom2.insertChildNodesBefore(
        context, /** @type {!Element} */(newList.parentNode), newListItem,
        newList);
      context.removeChild(newList, newListItem);
    }

    var lastNode = nodes[nodes.length - 1];
    if (!lastNode.nextSibling ||
        effectiveNodes.indexOf(lastNode.nextSibling) !== -1) {
      return newList;
    }

    context.splitTree(listItemNode, lastNode.nextSibling);
    var newListItem = listItemNode.nextSibling;
    var insertAfter = newList;
    var br = null;
    var child = null;
    while (child = newListItem.firstChild) {
      context.insertAfter(newList.parentNode, child, insertAfter);
      insertAfter = child;
      // Insert <br> after the text node. See w3c.76.
      if (editing.dom.isText(child)) {
        br = context.createElement('BR');
        context.insertAfter(newList.parentNode, br, insertAfter);
        insertAfter = br;
      }
    }
    // <br> is not needed when it is at the end. See w3c.93.
    if (br && br.parentNode.lastChild === br)
      context.removeChild(br.parentNode, br);
    context.removeChild(newList, newListItem);
    return newList;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Element>} lists
   * @param {!Array.<!Element>} newLists
   * @return {void}
   */
  function mergeLists(context, lists, newLists) {
    /**
     * @param {!editing.EditingContext} context
     * @param {!Array.<!Element>} listNodes
     * @param {number} mainListIndex
     * @return {Element}
     */
    function doMergeLists(context, listNodes, mainListIndex) {
      console.assert(0 <= mainListIndex);
      console.assert(mainListIndex < listNodes.length);

      if (!listNodes.length)
        return null;
      if (listNodes.length === 1)
        return listNodes[0];

      var mainList = listNodes[mainListIndex];
      var mainListFirstChild = mainList.firstChild;
      var parent = mainList.parentNode;
      listNodes.forEach(function(listNode, index) {
        if (index === mainListIndex)
          return;

        console.assert(listNode.nodeName === 'OL');
        // A list item can be <dt> or <dd>. See w3c.24, w3c.25.
        console.assert(Array.prototype.every.call(
          listNode.childNodes, function(node) {
            return editing.dom2.isListItem(node) ||
              editing.dom2.canContentOfDL(node);
          }));

        if (index < mainListIndex) {
          editing.dom2.insertChildNodesBefore(context, mainList, listNode,
                                              mainListFirstChild);
        } else {
          editing.dom2.insertChildNodesBefore(context, mainList, listNode,
                                              null);
        }
        context.removeChild(listNode.parentNode, listNode);
      });

      return mainList;
    }

    // TODO(hajimehoshi): Replace for-of after google/closure-compiler#643 is
    // fixed.
    lists.forEach(function(node) {
      console.assert(node.nodeName === 'OL');

      // Already merged with its siblings.
      if (!node.parentNode)
        return;

      var listsToBeMerged = getListsToBeMerged(node);

      // Determine the main list. The main list should be the first list which
      // exists before listifying.
      var mainListIndex =
        editing.dom2.firstIndex(listsToBeMerged, function(node) {
          return newLists.indexOf(node) === -1;
        });
      if (mainListIndex === -1)
        mainListIndex = 0;

      var originalListParents = listsToBeMerged.map(function(node) {
        return node.parentNode;
      });

      var newList = doMergeLists(context, listsToBeMerged, mainListIndex);
      console.assert(newList);

      // If a parent of a list is empty, remove this.
      for (var listParent of originalListParents.filter(function(listParent) {
        return !listParent.hasChildNodes() && listParent.parentNode &&
          newList.parentNode !== listParent;
      })) {
        var ancestors = editing.dom.ancestorsWhile(
          listParent, function(node) {
            return node.childNodes.length === 1;
          });
        context.removeChild(listParent.parentNode, listParent);
        for (var ancestor of ancestors) {
          if (ancestor.parentNode)
            context.removeChild(ancestor.parentNode, ancestor);
        }
      }

      // Remove <br> just after the new list.
      if (newList.nextSibling &&
          editing.dom2.isHTMLBRElement(newList.nextSibling)) {
        var breakElement = newList.nextSibling;
        context.removeChild(breakElement.parentNode, breakElement);
      }

      // In definition list, the new list can be child in the definition list
      // directly. See w3c.18.
      var parent = /** @type {!Element} */(newList.parentElement);
      if (editing.dom2.canContentOfDL(parent)) {
        var definitionListItem = newList.parentElement;
        var parentNode = /** @type {!Element} */(definitionListItem.parentNode);
        console.assert(parentNode);
        context.replaceChild(parentNode, newList, definitionListItem);
      }
    });
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ImmutableSelection} selection
   */
  function execInsertListCommand(context, selection) {
    var effectiveNodes = getEffectiveNodes(context, selection);

    var listItemCandidates = getListItemCandidates(effectiveNodes);
    var listItemCandidateGroups =
      new editing.dom2.NodeGroups(listItemCandidates);
    
    var newLists = [];
    var mergeableListCandidates = [];

    // TODO(hajimehoshi): Replace for-of after google/closure-compiler#643 is
    // fixed.
    var groups = [];
    for (var group of listItemCandidateGroups)
      groups.push(group);
    groups.forEach(function(nodes) {
      if (editing.dom2.isHTMLBRElement(nodes[0]))
        return;

      if (nodes[0].nodeName === 'OL' || nodes[0].nodeName === 'UL') {
        var list = processList(context, /** @type {!Element} */(nodes[0]),
                               effectiveNodes);
        if (list)
          mergeableListCandidates.push(list);
        return;
      }

      // TODO(hajimehoshi): What if an ancestor is not contenteditable?
      if (editing.dom2.isInList(nodes[0])) {
        var list = processNodesInList(context, nodes, effectiveNodes);
        if (list)
          mergeableListCandidates.push(list);
        return;
      }

      // TODO(hajimehoshi): Read C++
      // <dt>, <dd> can be content of a list according to Chrome behavior. See
      // w3c.18, w3c.24.
      if (nodes.length === 1 && editing.dom2.canContentOfDL(nodes[0])) {
        var listItem = nodes[0];
        var list = context.createElement('OL');
        context.replaceChild(/** @type {!Element} */(listItem.parentNode),
          list, listItem);
        context.appendChild(list, listItem);
        mergeableListCandidates.push(list);
        return;
      }

      // Listify |nodes|.
      var newNode = listify(context, nodes);
      console.assert(newNode);
      console.assert(newNode.nodeName === 'OL');
      mergeableListCandidates.push(newNode);
      newLists.push(newNode);

      // See w3c.107.
      if (newNode.nextSibling && newNode.nextSibling.nodeName === 'BR') {
        var br = newNode.nextSibling;
        context.removeChild(br.parentNode, br);
      }
    });

    mergeLists(context, mergeableListCandidates, newLists);
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
    /** @const */ var selectionTracker = new editing.SelectionTracker(
        context, selection);

    execInsertListCommand(context, selection);

    selectionTracker.finishWithStartAsAnchor();

    return true;
  }

  return createInsertOrderedListCommand;
})());
