// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('Unlink', (function() {
  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   * @return {!Array.<!Node>}
   */
  function setUpEffectiveNodes(context, selection) {
    if (!selection.isRange)
      return [];
    var selectedNodes = editing.nodes.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [];

    // Add enclosing A element into effective nodes.
    var needSplit = false;
    var startNode = selectedNodes[0];
    var runner = startNode;
    while (runner && runner.nodeName != 'A') {
      needSplit = needSplit || runner.previousSibling;
      runner = runner.parentNode;
    }
    if (!runner)
      return selectedNodes;
    if (!editing.nodes.isEditable(runner))
      return [];
    if (needSplit)
      runner = context.splitTree(runner, startNode);
    var effectiveNodes = [];
    while (runner != startNode) {
      effectiveNodes.push(runner);
      runner = editing.nodes.nextNode(runner);
    }
    selectedNodes.forEach(function(node) {
      effectiveNodes.push(node);
    });
    return effectiveNodes;
  }

  function lastOf(array) {
    return array.length ? array[array.length - 1] : null;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Not used.
   * @return {boolean}
   */
  function unlinkCommand(context, userInterface, value) {
    /** @const */ var selection = editing.nodes.normalizeSelection(
        context, context.startingSelection);
    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = setUpEffectiveNodes(context, selection);
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    // We'll remove nested anchor elements event if nested anchor elements
    // aren't valid HTML5.
    var anchorElements = [];
    effectiveNodes.forEach(function(currentNode) {
      var lastAnchorElement = lastOf(anchorElements);
      if (lastAnchorElement &&
          lastAnchorElement === currentNode.previousSibling) {
        selectionTracker.willUnwrapElement(lastAnchorElement, null);
        context.unwrapElement(lastAnchorElement, null);
        anchorElements.pop();
      }

      if (!currentNode.hasChildNodes()) {
        if (currentNode.nodeName == 'A') {
          selectionTracker.willRemoveNode(currentNode);
          var parentNode = /** @type {!Node} */(currentNode.parentNode);
          context.removeChild(parentNode, currentNode);
        }
        return;
      }

      if (currentNode.nodeName == 'A')
        anchorElements.push(currentNode);
    });

    while (anchorElements.length) {
      var endNode = lastOf(effectiveNodes);
      var anchorElement = anchorElements.pop();
      var stopChild = endNode.parentNode == anchorElement ?
          endNode.nextSibling : null;
      selectionTracker.willUnwrapElement(anchorElement, stopChild);
      context.unwrapElement(anchorElement, stopChild);
    }

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  return unlinkCommand;
})());
