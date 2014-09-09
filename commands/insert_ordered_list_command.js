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
   * @param {!NodeList|!Array.<!Node>} nodes
   * @return {!Array.<!Node>}
   */
  function getSuccessiveSiblings(nodes) {
    if (!nodes.length)
      return [];
    var result = [];
    for (var node = nodes[0]; node; node = node.nextSibling) {
      if (![].some.call(nodes, function(currentNode) {
        return currentNode === node
      })) {
        break;
      }
      result.push(node);
    }
    return result;
  }

  /**
   * @param {!NodeList|!Array.<!Node>} nodes
   * @return {!Array.<!Array.<!Node>>}
   */
  function splitNodes(nodes, predicate) {
    var result = [];
    var siblings = [];
    [].forEach.call(nodes, function(node) {
      if (result.length === 0 || predicate(node))
        result.push([])
      result[result.length-1].push(node);
    })
    return result;
  }

  /**
   * @param {!editing.Context} context
   * @param {!Node} node
   * @param {string} name
   * @return {!Node}
   */
  function replaceNodeName(context, node, name) {
    var newNode = context.createElement(name);
    [].forEach.call(node.childNodes, function(childNode) {
      context.appendChild(newNode, childNode);
    });
    // TODO(hajimehoshi): Copy attributes
    context.replaceChild(node.parentNode, newNode, node);
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
    var currentNode = node.parentNode
    while (currentNode) {
      if (isList(currentNode))
        return true;
      currentNode = currentNode.parentNode;
    }
    return false;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   */
  function wrapByOrderedList(context, selection) {
    var effectiveNodes = editing.nodes.setUpEffectiveNodes(
      context, selection, function(node) {
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
    for (;;) {
      var previousSibling = effectiveNodes[0].previousSibling;
      if (!previousSibling)
        break;
      if (!editing.nodes.isText(previousSibling))
        break;
      effectiveNodes.unshift(previousSibling);
    }

    // Extend as far as the closest list if exists.
    if (isInList(effectiveNodes[0])) {
      var currentNode = effectiveNodes[0];
      for (;;) {
        effectiveNodes.unshift(currentNode);
        if (currentNode.nodeName === 'OL' || currentNode.nodeName === 'UL')
          break;
        currentNode = currentNode.parentNode;
      }
    }

    // Extend the tailing text nodes.
    for (;;) {
      var nextSibling = effectiveNodes[effectiveNodes.length - 1].nextSibling;
      if (!nextSibling)
        break;
      if (!editing.nodes.isText(nextSibling))
        break;
      effectiveNodes.push(nextSibling);
    }

    // Determine where the new list should be located if needed.
    // TODO(hajimehoshi): Better name
    var insertListAfter = null;
    var startElement = effectiveNodes[0];
    if (!isInList(startElement))
      insertListAfter = startElement.previousSibling;

    var successiveSiblings = getSuccessiveSiblings(effectiveNodes);
    var container = effectiveNodes[0].parentNode;

    // Construct the list.
    var existingLists = successiveSiblings.filter(function(node) {
      if (!editing.nodes.isElement(node))
        return false;
      return node.nodeName === 'OL' || node.nodeName === 'UL';
    });

    if (existingLists.length) {
      // TODO(hajimehoshi): Consider the case when two ore more lists exist.
      var list = existingLists[0];
      var originalList = list;
      var listIndex = editing.nodes.nodeIndex(list);

      if (successiveSiblings[0] === list && list.nodeName === 'OL') {
        // If the first item is the list, clear the list format.
        var br = context.createElement('br');
        context.insertBefore(list.parentNode, br, list);
        [].forEach.call(list.childNodes, function(listItemNode) {
          [].forEach.call(listItemNode.childNodes, function(node) {
            context.insertBefore(list.parentNode, node, list);
          });
          var br = context.createElement('br');
          context.insertBefore(list.parentNode, br, list);
          insertListAfter = br;
        });
        while (list.firstChild)
          context.removeChild(list, list.firstChild);
      } else if (list.nodeName === 'UL') {
        list = replaceNodeName(context, list, 'OL');
      }
      context.removeChild(container, list);

      var originalListFound = false;
      successiveSiblings.forEach(function(node, i) {
        if (node === originalList) {
          originalListFound = true;
          return true;
        }
        var listItem = context.createElement('li');
        context.appendChild(listItem, node);
        if (!originalListFound)
          context.insertBefore(list, listItem, list.childNodes[i]);
        else
          context.appendChild(list, listItem);
      });
    } else {
      var list = context.createElement('ol');
      if (selection.startOffset) {
        insertListAfter =
          selection.startContainer.childNodes[selection.startOffset - 1];
        while (insertListAfter !== null &&
               editing.nodes.isText(insertListAfter)) {
          insertListAfter = insertListAfter.previousSibling;
        }
      }

      var nodeGroups = splitNodes(successiveSiblings, function(node) {
        if (editing.nodes.isText(node))
          return false;
        return !isPhrasingElement(node) || isBreakElement(node);
      })

      nodeGroups.forEach(function(nodes) {
        var listItem = context.createElement('li');
        nodes.forEach(function(node) {
          if (isBreakElement(node)) {
            context.removeChild(node.parentNode, node);
            return true;
          }
          context.appendChild(listItem, node);
        });
        context.appendChild(list, listItem);
      });
    }

    // Insert the list.
    if (container.childNodes.length) {
      if (insertListAfter)
        context.insertAfter(container, list, insertListAfter);
      else
        context.insertBefore(container, list, container.firstChild);
    } else {
      context.appendChild(container, list);
    }

    // Remove <br> just after the new list.
    if (list.nextSibling && isBreakElement(list.nextSibling)) {
      var breakElement = list.nextSibling;
      context.removeChild(breakElement.parentNode, breakElement);
    }

    // In definition list, the new list can be a sibling to other items.
    if (list.parentElement.nodeName === 'DD' ||
        list.parentElement.nodeName === 'DT') {
      var definitionListItem = list.parentElement;
      context.replaceChild(
        definitionListItem.parentNode, list,definitionListItem);
    }
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
