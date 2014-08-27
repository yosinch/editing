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
   * @param {!Array.<Node>} nodes
   */
  function wrapByOrderedList(context, nodes) {
    var list = context.createElement('ol');
    var item = context.createElement('li');
    context.appendChild(list, item);
    var text = "";
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      text += node.nodeValue;
    }

    /** @type {!Node} */
    var parent = node.parentNode;
    context.appendChild(item, context.createTextNode(text));
    context.appendChild(parent, list);
    for (var i = 0; i < nodes.length; i++) {
      /** @type {!Node} */
      var node = nodes[i];
      context.removeChild(parent, node);
    }
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
    var textNodes = getChildTextNodes(node);

    // FIXME
    var container = node.parentNode;
    wrapByOrderedList(context, textNodes);
    context.setEndingSelection(new editing.ReadOnlySelection(
        container, 0, container, 0, selection.direction));

    return true;
  }

  return createInsertOrderedListCommand;
})());
