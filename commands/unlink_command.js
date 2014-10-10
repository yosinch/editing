// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('Unlink', (function() {
  'use strict';

  /** @const */ var isAnchorElement =
      editing.LinkCommandContextBase.isAnchorElement;
  /** @const */ var isElement = editing.dom.isElement;
  /** @const */ var isPhrasing = editing.dom.isPhrasing;
  /** @const */ var lastOf = editing.lastOf;

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isEffectiveNode(node) {
    return !isAnchorElement(node);
  }

  /**
   * @constructor
   * @extends {editing.LinkCommandContextBase}
   * @final
   * @struct
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   */
  function UnlinkCommandContext(context, userInterface, commandValue) {
    editing.LinkCommandContextBase.call(this, context, userInterface,
                                        commandValue);
  }

  /**
   * @this {!UnlinkCommandContext}
   * @return {boolean}
   */
  function execute() {
    /** @const */ var commandContext = this;
    /** @const */ var context = this.context;
    /** @const */ var selection = context.normalizeSelection(
        context.startingSelection);
    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = context.setUpEffectiveNodes(selection,
                                                     isEffectiveNode);
    if (!effectiveNodes[0])
      effectiveNodes.shift();
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    // We'll remove nested anchor elements event if nested anchor elements
    // aren't valid HTML5.
    /** @const @type {!Array.<!Element>} */
    var anchorElements = [];

    // TODO(yosin) Once closure compiler support |continue| in |for-of|, we
    // should use |for-of| instead of |Array.prototype.every()|.
    effectiveNodes.forEach(function(currentNode) {
      var lastAnchorElement = lastOf(anchorElements);
      if (lastAnchorElement &&
          lastAnchorElement === currentNode.previousSibling) {
        selectionTracker.willUnwrapElement(lastAnchorElement, null);
        context.unwrapElement(lastAnchorElement, null);
        anchorElements.pop();
      }

      if (!currentNode.hasChildNodes()) {
        if (isAnchorElement(currentNode)) {
          selectionTracker.willRemoveNode(currentNode);
          var parentNode = /** @type {!Node} */(currentNode.parentNode);
          context.removeChild(parentNode, currentNode);
        }
        return;
      }

      if (!isAnchorElement(currentNode))
        return;

      var anchorElement = /** @type {!Element} */(currentNode);
      this.unwrapAnchorContents(anchorElement);
      commandContext.expandInlineStyle(anchorElement);
      anchorElements.push(anchorElement);
    }, this);

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

  UnlinkCommandContext.prototype = /** @type {!UnlinkCommandContext} */
    (Object.create(editing.LinkCommandContextBase.prototype, {
      execute: {value: execute}
  }));
  Object.freeze(UnlinkCommandContext.prototype);

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Not used.
   * @return {boolean}
   */
  function unlinkCommand(context, userInterface, value) {
    var commandContext = new UnlinkCommandContext(context, userInterface,
                                                  value);
    return commandContext.execute();
  }

  return unlinkCommand;
})());
