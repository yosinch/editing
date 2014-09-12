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
    var topNodes = [].filter.call(nodes, function(node) {
      for (var ancestor = node.parentNode; ancestor;
           ancestor = ancestor.parentNode) {
        if ([].indexOf.call(nodes, ancestor) !== -1)
          return false;
      }
      return true;
    })
    topNodes = [].reduce.call(topNodes, function(nodes, node) {
      return nodes.concat(getChildListItemCandidates(node));
    }, []);
    return topNodes;
  }

  /**
   * @param {!NodeList|!Array.<!Node>} nodes
   * @return {!Array.<!Array.<!Node>>}
   */
  function splitNodes(nodes, predicate) {
    var result = [];
    [].forEach.call(nodes, function(node) {
      if (!result.length || predicate(node))
        result.push([])
      result[result.length - 1].push(node);
    })
    return result;
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
    [].forEach.call(node.childNodes, function(childNode) {
      context.appendChild(newNode, childNode);
    });
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
    return editing.nodes.isElement(node) &&
      (node.nodeName === 'OL' || node.nodeName === 'UL');
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
   * @param {!Node} node
   */
  function unlistify(context, node) {
    var listItemNode = node;
    while (listItemNode && listItemNode.nodeName !== 'LI')
      listItemNode = listItemNode.parentNode;
    if (!listItemNode)
      return;

    console.assert(listItemNode.parentNode.nodeName === 'OL');
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
      [].forEach.call(listNode.childNodes, function(listItemNode) {
        console.assert(listItemNode.nodeName === 'LI' ||
                       listItemNode.nodeName === 'DD' ||
                       listItemNode.nodeName === 'DT');
        context.appendChild(firstList, listItemNode);
      });
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
        [].forEach.call(childNodes, function(node) {
          effectiveNodes.push(node);
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

    // Extend as far as the closest list if exists.
    var currentNode = effectiveNodes[0];
    if (isInList(currentNode)) {
      for (;;) {
        effectiveNodes.unshift(currentNode);
        if (currentNode.nodeName === 'OL' || currentNode.nodeName === 'UL')
          break;
        currentNode = currentNode.parentNode;
      }
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
    var topNodeGroups = [];
    listItemCandidates.forEach(function(node) {
      if (!topNodeGroups.length) {
        topNodeGroups.push([node]);
        return true;
      }
      var lastGroup =
        topNodeGroups[topNodeGroups.length - 1];
      if (editing.nodes.isText(node)) {
        var lastNode = lastGroup[lastGroup.length - 1];
        if (editing.nodes.isText(lastNode) &&
            lastNode === node.previousSibling) {
          lastGroup.push(node);
          return true;
        }
      }
      topNodeGroups.push([node]);
    });

    var listItemCandidatesAfterListifying = [];
    topNodeGroups.forEach(function(nodes) {
      if (!nodes.length)
        return;

      var node = nodes[0];
      if (editing.nodes.isElement(node)) {
        console.assert(nodes.length === 1);

        if (isBreakElement(node)) {
          context.removeChild(nodes[0].parentNode, node);
          return true;
        }
        if (isList(node)) {
          listItemCandidatesAfterListifying.push(node);
          return true;
        }

        // w3c.24, w3c.25: <dd> in a list is obviously illegal but Chrome offers
        // this result.
        if (nodes.length === 1 &&
            (nodes[0].nodeName === 'DD' || nodes[0].nodeName === 'DT')) {
          var dd = nodes[0];
          var list = context.createElement('ol');
          context.replaceChild(dd.parentNode, list, dd);
          context.appendChild(list, dd);
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
        return true;

      if (node.nodeName !== 'OL')
        return true;

      var listsToBeMerged = [node];

      // Append the followers.
      var previousSiblingNode = node.previousSibling;
      while (previousSiblingNode && previousSiblingNode.nodeName === 'OL') {
        listsToBeMerged.unshift(previousSiblingNode);
        previousSiblingNode = previousSiblingNode.previousSibling;
      }

      // Append the followings.
      var nextSiblingNode = node.nextSibling;
      while (nextSiblingNode && nextSiblingNode.nodeName === 'OL') {
        listsToBeMerged.push(nextSiblingNode);
        nextSiblingNode = nextSiblingNode.nextSibling;
      }

      var newList = mergeLists(context, listsToBeMerged);
      console.assert(newList);

      // Remove <br> just after the new list.
      if (newList.nextSibling && isBreakElement(newList.nextSibling)) {
        var breakElement = newList.nextSibling;
        context.removeChild(breakElement.parentNode, breakElement);
      }

      // In definition list, the new list can be a sibling to other items.
      if (newList.parentElement.nodeName === 'DD' ||
          newList.parentElement.nodeName === 'DT') {
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

      var nextSiblingNode = node.parentNode.nextSibling;
      while (nextSiblingNode) {
        var stopped = false;
        // TODO(hajimehoshi): Not enough in case of nesting <blockquote>.
        [].forEach.call(nextSiblingNode.childNodes, function(node) {
          if (lists.indexOf(node) === -1) {
            stopped = false;
            return false;
          }
          listsToBeMerged.push(node);
        });
        if (stopped)
          break;
        nextSiblingNode = nextSiblingNode.nextSibling;
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
        context.document.firstChild, 0,
        context.document.firstChild, 0,
        editing.SelectionDirection.ANCHOR_IS_START));

    return true;
  }

  return createInsertOrderedListCommand;
})());
