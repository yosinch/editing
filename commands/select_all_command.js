// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.registerCommand('selectAll', (function() {
  'use strict';

  // Note: To avoid referencing |window.document|, we should not use
  // |document| as parameter name or local variable name.

  /**
   * @param {(!Element|!Document)} eventTarget
   * @return {boolean}
   */
  function dispatchSelectStartEvent(eventTarget) {
    var event = new Event('selectstart', {bubbles: true, cancelable: true});
    return eventTarget.dispatchEvent(event);
  }

  /**
   * @param {!Document} targetDocument
   * @return {Element}
   */
  function findHostingFrameElement(targetDocument) {
    var targetWindow = targetDocument.defaultView;
    if (!targetWindow)
      return null;
    return targetWindow.frameElement;
  }

  /**
   * @param {!Element} element
   * @return {Element}
   */
  function findShadowHost(element) {
    for (var runner = element; runner.nodeType === Node.ELEMENT_NODE;
         runner = /** @type {Element} */(runner.parentNode)) {
      if (runner.shadowRoot)
        return runner;
    }
    return null;
  }

  /**
   * @param {!Element} contentEditable
   * @return {!Element}
   */
  function highestEditableRoot(contentEditable) {
    /** @type {!Element} */
    var rootEditable = contentEditable;
    for (var runner = contentEditable;
         runner && runner.nodeType === Node.ELEMENT_NODE;
         runner = runner.parentNode) {
      if (runner.isContentEditable)
        rootEditable = /** @type {!Element} */(runner);
    }
    return rootEditable;
  }

  /**
   * @param {Selection} domSelection
   * @return {boolean}
   */
  function isFullySelected(domSelection) {
    if (!domSelection || !domSelection.anchorNode || !domSelection.focusNode)
      return false;
    if (domSelection.anchorNode.tagName !== 'BODY' ||
        domSelection.focusNode.tagName !== 'BODY') {
      return false;
    }
    var maxOffset = domSelection.anchorNode.childNodes.length;
    return !domSelection.anchorOffset && domSelection.focusOffset === maxOffset;
  }

  /** @const @type {!Set.<string>} */
  var textFieldTypes = new Set([
    'text', 'search', 'tel', 'url', 'email', 'password', 'number', 'datetime'
  ]);

  /**
   * @param {!Element} element
   * @return {boolean}
   */
  function isTextField(element) {
    if (element.tagName !== 'INPUT')
      return false;
    var inputElement = /** @type {!HTMLInputElement} */(element);
    return textFieldTypes.has(inputElement.type);
  }

  // TODO(yosin) We should move |nodeIndex()| to another file to share with
  // others.
  /**
   * @param {!Node} node
   * @return {number}
   */
  function nodeIndex(node) {
    var index = 0;
    var parentNode = node.parentNode;
    console.assert(parentNode, node);
    for (var child = parentNode.firstChild; child; child = child.nextSibling) {
      if (child === node)
        return index;
      ++index;
    }
    throw new Error('UNREACHABLE');
  }

  /**
   * @param {!Element} startContainer A container element of current selection.
   *     This element is in DOM tree even if C++ |FrameSeleciton| selects inside
   *     shadow DOM tree.
   */
  function selectAllOnContainer(startContainer) {
    var contextDocument = startContainer.ownerDocument;
    var selection = contextDocument.getSelection();
    if (!selection)
      return;
    var root = null;
    var selectStartTarget = null;
    var shadowHost = findShadowHost(startContainer);
    if (startContainer.nodeType === Node.ELEMENT_NODE &&
        startContainer.isContentEditable) {
      root = highestEditableRoot(/** @type {!Element} */(startContainer));
      selectStartTarget = shadowHost || root;
    } else if (shadowHost) {
      root = shadowHost;
      selectStartTarget = shadowHost;
    } else {
      root = contextDocument.documentElement;
      selectStartTarget = contextDocument.body;
    }
    if (!root)
      return;
    if (selectStartTarget && !dispatchSelectStartEvent(selectStartTarget))
      return;
    selection.selectAllChildren(root);
    selectFrameElementInParentIfFullySelected(contextDocument);
  }

  /**
   * @param {!Element} element |element| should be either INPUT or TEXTAREA
   *    element which have |select()| method.
   */
  function selectAllOnTextField(element) {
    if (!dispatchSelectStartEvent(element))
      return;
    // To make closure compiler happy to call |select()| method.
    var textFieldElement = /** @type {!HTMLInputElement} */(element);
    textFieldElement.select();
    // TODO(yosin) Once http://crbug.com/421751 fixed, we don't need to
    // dispatch "select" event here.
    var event = new Event('select', {bubbles: true});
    element.dispatchEvent(event);
  }

  /**
   * @param {!Document} contextDocument
   * For ease of deleting frame, we set selection to cover a frame element on
   * parent window.
   */
  function selectFrameElementInParentIfFullySelected(contextDocument) {
    var selection = contextDocument.getSelection();
    if (!isFullySelected(selection))
      return;
    var frameElement = findHostingFrameElement(contextDocument);
    if (!frameElement)
      return;
    var ownerElement = frameElement.parentNode;
    if (!ownerElement || !ownerElement.isContentEditable)
      return;
    var frameElementNodeIndex = nodeIndex(frameElement);
    var parentSelection = ownerElement.ownerDocument.getSelection();
    parentSelection.collapse(ownerElement, frameElementNodeIndex);
    parentSelection.extend(ownerElement, frameElementNodeIndex + 1);
    ownerElement.focus();
  }

  /**
   * @param {!Document} contextDocument
   * @return {boolean}
   * Note: We don't dispatch "selectstart" event for SELECT element to follow
   * historical reasons.
   */
  function trySelectAllOnSelectElement(contextDocument) {
    var activeElement = contextDocument.activeElement;
    if (!activeElement || activeElement.tagName !== 'SELECT')
      return false;
    /** @type {!HTMLSelectElement} */
    var selectElement = /** @type {!HTMLSelectElement} */(activeElement);
    if (!selectElement.multiple)
      return false;
    var options = selectElement.options;
    for (var index = 0; index < options.length; ++index)
      options[index].selected = true;
    return true;
  }

  /**
   * @param {!Document} contextDocument
   */
  function selectAll(contextDocument) {
    if (trySelectAllOnSelectElement(contextDocument))
      return;

    var domSelection = contextDocument.getSelection();
    if (!domSelection || !domSelection.rangeCount) {
      selectAllOnContainer(contextDocument.documentElement);
      return;
    }

    var range = domSelection.getRangeAt(0);
    var startContainer = range.startContainer;
    if (startContainer.nodeType === Node.DOCUMENT_NODE) {
      selectAllOnContainer(contextDocument.documentElement);
      return;
    }

    if (startContainer.nodeType !== Node.ELEMENT_NODE) {
      var parent = startContainer.parentNode;
      if (!parent)
        return;
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        selectAllOnContainer(contextDocument.documentElement);
        return;
      }
      selectAllOnContainer(/** @type {!Element} */(parent));
      return;
    }

    if (startContainer.isContentEditable) {
      selectAllOnContainer(/** @type {!Element} */(startContainer));
      return;
    }

    var targetNode = startContainer.childNodes[range.startOffset];
    if (!targetNode || targetNode.nodeType !== Node.ELEMENT_NODE) {
      selectAllOnContainer(/** @type {!Element}*/(startContainer));
      return;
    }

    var targetElement = /** @type {!Element} */(targetNode);
    if (isTextField(targetElement) || targetElement.tagName === 'TEXTAREA') {
      selectAllOnTextField(targetElement);
      return;
    }

    selectAllOnContainer(targetElement);
  }

  /**
   * @param {!Document} contextDocument
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function selectAllCommand(contextDocument, userInterface, value) {
    selectAll(contextDocument);
    return true;
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return selectAllCommand;
})());
