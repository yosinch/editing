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

  /**
   * @param {!Node} startNode
   * @return {Element}
   */
  function computeHighestStyleElement(startNode) {
    var styleElement = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.dom.isEditable(runner))
        break;
      if (!editing.dom.isElement(runner))
        continue;
      var element = /** @type {!Element} */(runner);
      if (isStyleElement(element))
        styleElement = element;
    }
    return styleElement;
  }

  function isStyleElement(node) {
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
    /** @private @type {!Array.<!Element>} */
    this.styleElements_ = [];
    Object.seal(this);
  }

  // Forward declaration for closure compiler
  RemoveFormatCommandContext.prototype = {
    /**
     * @this {!RemoveFormatCommandContext}
     * @param {!Array.<!Node>} effectiveNodes
     */
    finish: function(effectiveNodes) {},

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
    var effectiveNodes = this.prepare();
    if (!effectiveNodes.length) {
      this.context.setEndingSelection(this.context.startingSelection);
      return false;
    }

    for (var currentNode of effectiveNodes)
      this.processNode(currentNode);

    this.finish(effectiveNodes);
    return true;
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @param {!Array.<!Node>} effectiveNodes
   */
  function finish(effectiveNodes) {
    while (this.styleElements_.length) {
      var endNode = lastOf(effectiveNodes);
      var styleElement = this.styleElements_.pop();
      var stopChild = endNode.parentNode === styleElement ?
          endNode.nextSibling : null;
      this.removeStyle(styleElement, stopChild);
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
    var styleElement = computeHighestStyleElement(startNode);
    var effectiveNodes = selectedNodes.slice();
    if (styleElement && styleElement !== startNode) {
      for (var runner = startNode.parentNode; runner !== styleElement;
           runner = runner.parentNode) {
        effectiveNodes.unshift(runner);
      }
      effectiveNodes.unshift(styleElement);
    }

    effectiveNodes = effectiveNodes.map(function(currentNode) {
      return wrapWithStyleSpanIfNeeded(context, currentNode);
    });

    if (!styleElement || styleElement === startNode)
      return effectiveNodes;

    /** @type {boolean} */
    var needSplit = false;
    /** @type {Element} */
    var splitable = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.dom.isPhrasing(startNode))
        break;
      if (isStyleElement(runner))
        splitable = /** @type {!Element} */(runner);
      if (runner === styleElement)
        break;
      needSplit = Boolean(needSplit || runner.previousSibling);
    }

    if (!needSplit || !splitable)
      return effectiveNodes;

    context.splitTreeLeft(splitable, startNode);
    return effectiveNodes;
  }

  /**
   * @this {!RemoveFormatCommandContext}
   * @param {!Node} currentNode
   */
  function processNode(currentNode) {
    var styleElement = lastOf(this.styleElements_);
    if (styleElement && styleElement === currentNode.previousSibling) {
      this.removeStyle(styleElement, null);
      this.styleElements_.pop();
    }

    if (!currentNode.hasChildNodes()) {
      if (isStyleElement(currentNode)) {
        this.selectionTracker_.willRemoveNode(currentNode);
        var parentNode = /** @type {!Node} */(currentNode.parentNode);
        this.context.removeChild(parentNode, currentNode);
      }
      return;
    }

    if (!isStyleElement(currentNode))
      return;
    this.styleElements_.push(currentNode);
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
