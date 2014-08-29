// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('InsertOrderedList', (function() {

  /**
   * @param {!Node} node
   */
  function getChildTextNodes(node) {
    var result = [];
    for (var i = 0; i < node.childNodes.length; i++) {
      var childNode = node.childNodes[i];
      if (childNode.nodeType === Node.TEXT_NODE) {
        result.push(childNode);
      }
    }
    return result;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} container
   */
  function wrapByOrderedList(context, container) {
    var nodes = getChildTextNodes(container);
    var list = context.createElement('ol');
    var item = context.createElement('li');
    context.appendChild(list, item);
    nodes.forEach(function(node) {
      context.appendChild(item, node);
    });
    context.appendChild(container, list);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Not used.
   * @return {boolean}
   */
  function createInsertOrderedListCommand(context, userInterface, value) {
    /** @const */ var selection = editing.nodes.normalizeSelection(
        context, context.startingSelection);

    /** @const @type {!Node} */
    var node = selection.focusNode;

    // TODO(hajimehoshi): This selection setting is work in progress.
    wrapByOrderedList(context, node);
    context.setEndingSelection(new editing.ReadOnlySelection(
        selection.anchorNode, selection.anchorSelection,
        selection.focusNode, selection.focusSelection,
        selection.direction));

    return true;
  }

  return createInsertOrderedListCommand;
})());
