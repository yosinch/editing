// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Sample: http://jsfiddle.net/9nf4fue9/1/
editing.defineCommand('removeFormat', (function() {
  'use strict';

  // TODO(yosin) We should move |TAG_NAMES_TO_REMOVE| to "content_model.js".
  /** @const */
  var TAG_NAMES_TO_REMOVE = new Set([
        'ACRONYM', 'B', 'BDO', 'BIG', 'CITE', 'CODE',
        'DFN', 'EM', 'FONT', 'I', 'INS', 'KBD', 'NOBR', 'Q', 'S',
        'SAMP', 'SMALL', 'STRIKE', 'STRONG', 'SUB', 'SUP', 'TT', 'U',
        'VAR']);

  var isSpanWithoutAttributesOrUnstyledStyleSpan =
      editing.CommandContext.isSpanWithoutAttributesOrUnstyledStyleSpan;

  /**
   * @param {!Node} startNode
   * @return {Element}
   */
  function findHighestStyledElement(startNode) {
    var styledElement = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.dom.isEditable(runner))
        break;
      if (!editing.dom.isElement(runner))
        continue;
      var element = /** @type {!Element} */(runner);
      if (isStyledElement(element))
        styledElement = element;
    }
    return styledElement;
  }

  function isStyledElement(node) {
    if (!editing.dom.isElement(node))
      return false;
    var element = /** @type {!Element} */(node);
    if (TAG_NAMES_TO_REMOVE.has(element.nodeName))
      return true;
    return element.hasAttribute('style');
  }

  function lastOf(array) {
    return array.length ? array[array.length - 1] : null;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} node
   * @return {!Node}
   */
  function wrapWithStyleSpanIfNeeded(context, node) {
    if (!editing.dom.isElement(node))
      return node;
    var element = /** @type {!Element} */(node);
    if (editing.dom.isPhrasing(element))
      return element;
    var style = element.getAttribute('style');
    if (!style)
      return element;
    var styleSpan = context.createElement('span');
    styleSpan.setAttribute('style', style);
    var child = element.firstChild;
    while (child) {
      var next = child.nextSibling;
      context.appendChild(styleSpan, child);
      child = next;
    }
    context.appendChild(element, styleSpan);
    context.removeAttribute(element, 'style');
    return styleSpan;
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
  function RemoveFormatCommandContext(context, userInterface, commandValue) {
    editing.LinkCommandContextBase.call(this, context, userInterface,
                                        commandValue);
    /** @private @type {editing.SelectionTracker} */
    this.selectionTracker_ = null;
    /** @private @type {boolean} */
    this.shouldExpandInlineStyleAtEnd_ = false;
    /** @private @type {!Array.<!Element>} */
    this.styledElements_ = [];
    Object.seal(this);
  }

  // Forward declaration for closure compiler
  RemoveFormatCommandContext.prototype = {
    /**
     * @this {!RemoveFormatCommandContext}
     * @param {!Array.<!Node>} targetNodes
     */
    finish: function(targetNodes) {},

    /**
     * @this {!RemoveFormatCommandContext}
     * @return {!Array.<!Node>}
     */
    prepare: function() {},

    /**
     * @this {!RemoveFormatCommandContext}
     * @param {!Node} currentNode
     */
    processNode: function(currentNode) {},

    /**
     * @this {!RemoveFormatCommandContext}
     */
    removeStyle: function(element, stopChild) {}
  }

  /**
   * @this {!RemoveFormatCommandContext}
   */
  function removeStyle(element, stopChild) {
    if (TAG_NAMES_TO_REMOVE.has(element.tagName)) {
      this.selectionTracker_.willUnwrapElement(element, stopChild);
      this.context.unwrapElement(element, stopChild);
      return;
    }
    if (!stopChild) {
      this.context.removeAttribute(element, 'style');
      if (element.tagName !== 'SPAN' || element.attributes.length)
        return;
    }
    this.selectionTracker_.willUnwrapElement(element, stopChild);
    this.context.unwrapElement(element, stopChild);
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @return {boolean}
   */
  function execute() {
    var targetNodes = this.prepare();
    if (!targetNodes.length) {
      this.context.setEndingSelection(this.context.startingSelection);
      return false;
    }

    for (var currentNode of targetNodes)
      this.processNode(currentNode);

    this.finish(targetNodes);
    return true;
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @param {!Array.<!Node>} targetNodes
   */
  function finish(targetNodes) {
    while (this.styledElements_.length) {
      var endNode = lastOf(targetNodes);
      var styledElement = this.styledElements_.pop();
      var stopChild = endNode.parentNode === styledElement ?
          endNode.nextSibling : null;
      this.removeStyle(styledElement, stopChild);
      if (this.shouldExpandInlineStyleAtEnd_ && stopChild) {
        // See removeFormat.w3c.17 for not expand inline style case, adn
        // removeFormat.w3c.143 for expand inline case.
        this.expandInlineStyle(styledElement);
      }
    }

    this.selectionTracker_.finishWithStartAsAnchor();
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @return {!Array.<!Node>}
   */
  function prepare() {
    /** @const */
    var context = this.context;
    /** @const */
    var selection = context.normalizeSelection(context.startingSelection);
    this.selectionTracker_ = new editing.SelectionTracker(
        context, selection);
    /** @type {!Array.<!Node>} */
    var selectedNodes = editing.dom.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [];

    var startNode = selectedNodes[0];
    // For removeFormat.w3c.88, remove useless SPAN if start text node is
    // split.
    if (editing.dom.isText(startNode) && startNode.previousSibling) {
      if (isSpanWithoutAttributesOrUnstyledStyleSpan(startNode.parentNode)) {
        context.removeNodePreservingChildren(
            /** @type {!Node} */(startNode.parentNode));
      }
    }
    var styledElement = findHighestStyledElement(startNode);
    // For compatibility, we don't expand inline style at end of node.
    // See removeFormat.w3c.17
    this.shouldExpandInlineStyleAtEnd_ =
        styledElement !== null && !editing.dom.isPhrasing(styledElement);
    var targetNodes = selectedNodes.slice();
    if (styledElement && styledElement !== startNode) {
      for (var runner = startNode.parentNode; runner !== styledElement;
           runner = runner.parentNode) {
        targetNodes.unshift(runner);
      }
      targetNodes.unshift(styledElement);
    }

    targetNodes = targetNodes.map(function(currentNode) {
      return wrapWithStyleSpanIfNeeded(context, currentNode);
    });

    if (!styledElement || styledElement === startNode)
      return targetNodes;

    /** @type {boolean} */
    var needSplit = false;
    /** @type {Element} */
    var splitable = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.dom.isPhrasing(startNode))
        break;
      if (isStyledElement(runner))
        splitable = /** @type {!Element} */(runner);
      if (runner === styledElement)
        break;
      needSplit = Boolean(needSplit || runner.previousSibling);
    }

    if (!needSplit || !splitable)
      return targetNodes;

    context.splitTreeLeft(splitable, startNode);
    return targetNodes;
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @param {!Node} currentNode
   */
  function processNode(currentNode) {
    var styledElement = lastOf(this.styledElements_);
    if (styledElement && styledElement === currentNode.previousSibling) {
      this.removeStyle(styledElement, null);
      this.styledElements_.pop();
    }

    if (!currentNode.hasChildNodes()) {
      if (isStyledElement(currentNode)) {
        this.selectionTracker_.willRemoveNode(currentNode);
        var parentNode = /** @type {!Node} */(currentNode.parentNode);
        this.context.removeChild(parentNode, currentNode);
      }
      return;
    }

    if (!isStyledElement(currentNode))
      return;
    this.styledElements_.push(currentNode);
  }

  RemoveFormatCommandContext.prototype =
    /** @type {!RemoveFormatCommandContext} */
    (Object.create(editing.LinkCommandContextBase.prototype, {
      constructor: {value: RemoveFormatCommandContext},
      finish: {value: finish},
      execute: {value: execute},
      prepare: {value: prepare},
      processNode: {value: processNode},
      removeStyle: {value: removeStyle}
  }));
  Object.freeze(RemoveFormatCommandContext.prototype);

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function removeFormatCommand(context, userInterface, value) {
    var commandContext = new RemoveFormatCommandContext(context, userInterface,
                                                        value);
    return commandContext.execute();
  }

  return removeFormatCommand;
})());
