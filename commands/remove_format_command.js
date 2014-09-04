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
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} effectiveNodes
   */
  function adjustSelectionEnd(context, effectiveNodes) {
    var endNode = lastOf(effectiveNodes);
    console.assert(!endNode.hasChildNodes(), 'endNode', endNode,
                   'must not have child nodes.');
    var lastNode = endNode;
    for (var runner = endNode.parentNode; runner; runner = runner.parentNode) {
      if (!editing.nodes.isEditable(runner))
        break;
      if (!editing.nodes.isElement(runner))
        continue;
      var element = /** @type {!Element} */(runner);
      var child = lastNode;
      lastNode = element;
      var nextSibling = child.nextSibling;
      if (!nextSibling)
        continue;
      if (editing.nodes.isPhrasing(element)) {
        if (!isStyleElement(element))
          continue;
        context.splitNode(element, nextSibling);
        continue;
      }
      introduceStyleSpanIfNeeded(context, element, nextSibling);
    }
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Array.<!Node>} selectedNodes
   * @return {!Array.<!Node>}
   */
  function adjustSlectionStart(context, selectedNodes) {
    var styleElement = null;
    var startNode = selectedNodes[0];
    var effectiveNodes = selectedNodes;
    var lastNode = null;
    for (var runner = startNode; runner; runner = runner.parentNode) {
      if (!editing.nodes.isEditable(runner))
        break;
      var child = lastNode;
      lastNode = runner;
      if (!editing.nodes.isElement(runner))
        continue;
      var element = /** @type {!Element} */(runner);
      if (editing.nodes.isPhrasing(element)) {
        if (isStyleElement(element))
          styleElement = element;
        continue;
      }

      if (!child || element.firstChild === child)
        continue;

      // Since, |startNode| is middle non-phrasing node, we wrap nodes before
      // |startNode| within SPAN with STYLE attribute.
      // See "removeFormat.nested_div_style"
      if (introduceStyleSpanIfNeeded(context, element, child))
        styleElement = element;
    }

    if (!styleElement || styleElement === startNode)
      return effectiveNodes;

    if (startNode.previousSibling && editing.nodes.isPhrasing(styleElement))
      styleElement = context.splitTree(styleElement, startNode);

    for (var runner = startNode; runner; runner = runner.parentNode) {
      // TODO(yosin) We should check |Array.prototype.unshift()| whether slow
      // or not.
      effectiveNodes.unshift(runner);
      if (runner == styleElement)
        break;
    }
    return effectiveNodes;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   * @return {!Array.<!Node>}
   */
  function prepareForRemoveFormat(context, selection) {
    console.assert(selection.isRange);
    var selectedNodes = editing.nodes.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [];
    var startNode = selectedNodes[0];
    var endNode = lastOf(selectedNodes);
    var effectiveNodes = adjustSlectionStart(context, selectedNodes);
    adjustSelectionEnd(context, effectiveNodes);
    return effectiveNodes;
  }

  function lastOf(array) {
    return array.length ? array[array.length - 1] : null;
  }

  function isStyleElement(node) {
    if (!editing.nodes.isElement(node))
      return false;
    var element = /** @type {!Element} */(node);
    if (element.hasAttribute('class'))
      return false;
    if (TAG_NAMES_TO_REMOVE.has(element.nodeName))
      return true;
    if (!editing.nodes.isPhrasing(element))
      return false;
    return element.hasAttribute('style');
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   * @param {!Node} lastNode
   * @return {boolean}
   */
  function introduceStyleSpanIfNeeded(context, element, lastNode) {
    console.assert(element === lastNode.parentNode,
                   'Last node', lastNode, 'must be a child of', element);
    var style = element.getAttribute('style');
    if (!style)
      return false;
    var styleSpan = context.createElement('span');
    styleSpan.setAttribute('style', style);
    var child = element.firstChild;
    while (child !== lastNode) {
      var next = child.nextSibling;
      context.appendChild(styleSpan, child);
      child = next;
    }
    context.insertBefore(element, styleSpan, lastNode);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function removeFormatCommand(context, userInterface, value) {
    if (!context.startingSelection.isRange) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    /** @const */ var selection = editing.nodes.normalizeSelection(
        context, context.startingSelection);
    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = prepareForRemoveFormat(context, selection);
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    /** @type {!Array.<!Element>} */ var styleElements = [];
    effectiveNodes.forEach(function(currentNode) {
      var styleElement = lastOf(styleElements);
      if (styleElement && styleElement == currentNode.previousSibling) {
        selectionTracker.willUnwrapElement(styleElement, null);
        context.unwrapElement(styleElement, null);
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

      console.assert(editing.nodes.isElement(currentNode),
                     'Effective nodes contains invalid node', currentNode);
      var element = /** @type {!Element} */(currentNode);

      if (!editing.nodes.isPhrasing(element)) {
        if (element.hasAttribute('style'))
          context.removeAttribute(element, 'style');
        return;
      }

      if (element.nodeName === 'SPAN' &&
          element.hasAttribute('style')) {
        context.removeAttribute(element, 'style');
        if (!element.attributes.length)
          styleElements.push(element);
        return;
      }

      if (!isStyleElement(element))
        return;
      styleElements.push(element);
    });

    var lastNode = lastOf(effectiveNodes);
    while (styleElements.length) {
      var styleElement = styleElements.pop();
      var stopChild = lastNode.parent == styleElement ? lastNode.nextSibling :
                                                        null;
      selectionTracker.willUnwrapElement(styleElement, stopChild);
      context.unwrapElement(styleElement, stopChild);
    }

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  return removeFormatCommand;
})());
