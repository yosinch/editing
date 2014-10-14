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
  /** @const */ var swapParentAndChild =
      editing.LinkCommandContextBase.swapParentAndChild;

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isEffectiveNode(node) {
    return !isAnchorElement(node);
  }

  /**
   * @this {!editing.EditingContext}
   * @param {!Element} element
   * @param {!Node} refNode
   * @return {!Element}
   */
  function splitTreeForUnlink(element, refNode) {
    if (!isAnchorElement(element))
      return this.splitTree(element, refNode);
    for (;;) {
      var child = /** @type {!Node} */(element.firstChild);
      if (!isElement(child) || !isPhrasing(child) || child === refNode)
        break;
      if (child.nextSibling)
        this.splitNode(element, child.nextSibling);
      swapParentAndChild(this, element);
    }
    return this.splitTree(element, refNode);
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
    /** @private @const @type {!Array.<!Element>} */
    this.anchorElements_ = [];
    /** @private @type {editing.SelectionTracker} */
    this.selectionTracker_ = null;
    Object.seal(this);
  }

  /**
   * @param {!UnlinkCommandContext} commandContext
   * @param {!Array.<!Node>} effectiveNodes
   */
  function processEndNode(commandContext, effectiveNodes) {
    while (commandContext.anchorElements_.length) {
      var endNode = lastOf(effectiveNodes);
      var anchorElement = commandContext.anchorElements_.pop();
      if (endNode.parentNode === anchorElement)
        unwrapElement(commandContext, anchorElement, endNode.nextSibling);
      else
        unwrapElement(commandContext, anchorElement, null);
    }
    commandContext.selectionTracker_.finishWithStartAsAnchor();
  }

  /**
   * @param {!UnlinkCommandContext} commandContext
   * @param {!Node} currentNode
   */
  function processNode(commandContext, currentNode) {
    var lastAnchor = lastOf(commandContext.anchorElements_);
    if (lastAnchor && lastAnchor === currentNode.previousSibling) {
      unwrapElement(commandContext, lastAnchor, null);
      commandContext.anchorElements_.pop();
    }

    if (!currentNode.hasChildNodes()) {
      if (isAnchorElement(currentNode)) {
        commandContext.selectionTracker_.willRemoveNode(currentNode);
        var parentNode = /** @type {!Node} */(currentNode.parentNode);
        commandContext.context.removeChild(parentNode, currentNode);
      }
      return;
    }

    if (!isAnchorElement(currentNode))
      return;

    var anchorElement = /** @type {!Element} */(currentNode);
    commandContext.unwrapAnchorContents(anchorElement);
    commandContext.expandInlineStyle(anchorElement);
    commandContext.anchorElements_.push(anchorElement);
  }

  /**
   * @param {!UnlinkCommandContext} commandContext
   * @return {!Array.<!Node>}
   */
  function setUpEffectiveNodes(commandContext) {
    /** @const */ var context = commandContext.context;
    if (context.startingSelection.isCaret)
      return [];

    var selection = context.normalizeSelection(context.startingSelection);
    commandContext.selectionTracker_ = new editing.SelectionTracker(context,
                                                                    selection);
    var effectiveNodes = context.setUpEffectiveNodesWithSplitter(
        selection, isEffectiveNode, splitTreeForUnlink);
    if (!effectiveNodes[0])
      effectiveNodes.shift();
    return effectiveNodes;
  }

  /**
   * @param {!UnlinkCommandContext} commandContext
   * @param {!Element} element
   * @param {Node} stopChild
   */
  function unwrapElement(commandContext, element, stopChild) {
    commandContext.selectionTracker_.willUnwrapElement(element, stopChild);
    commandContext.context.unwrapElement(element, stopChild);
  }

  /**
   * @this {!UnlinkCommandContext}
   * @return {boolean}
   */
  function execute() {
    var effectiveNodes = setUpEffectiveNodes(this);
    if (!effectiveNodes.length) {
      this.context.setEndingSelection(this.context.startingSelection);
      return false;
    }

    for (var currentNode of effectiveNodes)
      processNode(this, currentNode);

    processEndNode(this, effectiveNodes);
    return true;
  }

  UnlinkCommandContext.prototype = /** @type {!UnlinkCommandContext} */
    (Object.create(editing.LinkCommandContextBase.prototype, {
      constructor: {value: UnlinkCommandContext},
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
