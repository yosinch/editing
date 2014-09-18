// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Sample: http://jsfiddle.net/9nf4fue9/1/
editing.defineCommand('removeFormat', (function() {
  // TODO(yosin) We should move |TAG_NAMES_TO_REMOVE| to "content_model.js".
  /** @const */
  var TAG_NAMES_TO_REMOVE = editing.newSet([
        'ACRONYM', 'B', 'BDO', 'BIG', 'CITE', 'CODE',
        'DFN', 'EM', 'FONT', 'I', 'INS', 'KBD', 'NOBR', 'Q', 'S',
        'SAMP', 'SMALL', 'STRIKE', 'STRONG', 'SUB', 'SUP', 'TT', 'U',
        'VAR']);

  /**
   * @param {!Node} startNode
   * @return {?Element}
   */
  function computeHighestStyleElement(startNode) {
    var styleElement = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.nodes.isEditable(runner))
        break;
      if (!editing.nodes.isElement(runner))
        continue;
      var element = /** @type {!Element} */(runner);
      if (isStyleElement(element))
        styleElement = element;
    }
    return styleElement;
  }

  function isStyleElement(node) {
    if (!editing.nodes.isElement(node))
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
   * @param {!editing.ReadOnlySelection} selection
   * @return {!Array.<!Node>}
   */
  function prepareForStyleChange(context, selection) {
    var selectedNodes = editing.nodes.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [];

    var startNode = selectedNodes[0];
    var styleElement = computeHighestStyleElement(startNode);
    var effectiveNodes = selectedNodes.slice();
    if (styleElement && styleElement != startNode) {
      for (var runner = startNode.parentNode; runner != styleElement;
           runner = runner.parentNode) {
        effectiveNodes.unshift(runner);
      }
      effectiveNodes.unshift(styleElement);
    }

    effectiveNodes = effectiveNodes.map(function(currentNode) {
      return wrapWithStyleSpanIfNeeded(context, currentNode);
    });

    if (!styleElement || styleElement == startNode)
      return effectiveNodes;

    var needSplit = false;
    var splitable = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.nodes.isPhrasing(startNode))
        break;
      if (isStyleElement(runner))
        splitable = runner;
      if (runner === styleElement)
        break;
      needSplit = needSplit || !!runner.previousSibling;
    }

    if (!needSplit || !splitable)
      return effectiveNodes;

    context.splitTreeLeft(/** @type {!Element} */(splitable), startNode);
    return effectiveNodes;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} node
   * @return {!Node}
   */
  function wrapWithStyleSpanIfNeeded(context, node) {
    if (!editing.nodes.isElement(node))
      return node;
    var element = /** @type {!Element} */(node);
    if (editing.nodes.isPhrasing(element))
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
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function removeFormatCommand(context, userInterface, value) {
    /** @const */ var selection = context.normalizeSelection(
        context.startingSelection);
    /** @const */ var selectionTracker = new editing.SelectionTracker(
        context, selection);
    var effectiveNodes = prepareForStyleChange(context, selection);
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    function removeStyle(element, stopChild) {
      if (TAG_NAMES_TO_REMOVE.has(element.tagName)) {
        selectionTracker.willUnwrapElement(element, stopChild);
        context.unwrapElement(element, stopChild);
        return;
      }
      if (!stopChild) {
        context.removeAttribute(element, 'style');
        if (element.tagName != 'SPAN' || element.attributes.length)
          return;
      }
      selectionTracker.willUnwrapElement(element, stopChild);
      context.unwrapElement(element, stopChild);
    }

    /** @type {!Array.<!Element>} */ var styleElements = [];
    effectiveNodes.forEach(function(currentNode) {
      var styleElement = lastOf(styleElements);
      if (styleElement && styleElement == currentNode.previousSibling) {
        removeStyle(styleElement, null);
        styleElements.pop();
      }

      if (!currentNode.hasChildNodes()) {
        if (isStyleElement(currentNode)) {
          selectionTracker.willRemoveNode(currentNode);
          var parentNode = /** @type {!Node} */(currentNode.parentNode);
          context.removeChild(parentNode, currentNode);
        }
        return;
      }
      if (!isStyleElement(currentNode))
        return;
      styleElements.push(currentNode);
    });

    while (styleElements.length) {
      var endNode = lastOf(effectiveNodes);
      var styleElement = styleElements.pop();
      var stopChild = endNode.parentNode == styleElement ?
          endNode.nextSibling : null;
      removeStyle(styleElement, stopChild);
    }

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  return removeFormatCommand;
})());
