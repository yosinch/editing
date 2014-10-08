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

  /**
   * @param {!Element} element
   * @return {boolean}
   */
  function isTextField(element) {
    if (element.tagName !== 'INPUT')
      return false;
    var inputElement = /** @type {!HTMLInputElement} */(element);
    return inputElement.type === 'text';
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
    throw new Error('NOTREACEHD');
  }

  /**
   * @param {!Node} startContainer
   */
  function selectAllOnContainer(startContainer) {
    if (startContainer.nodeType === Node.ELEMENT_NODE &&
        startContainer.isContentEditable) {
      selectAllOnContentEditable(/** @type {!Element} */(startContainer));
      return;
    }
    selectAllOnDocument(startContainer.ownerDocument);
  }

  /**
   * @param {!Element} contentEditable
   */
  function selectAllOnContentEditable(contentEditable) {
    var contextDocument = contentEditable.ownerDocument;
    var selection = contextDocument.getSelection();
    if (!selection)
      return;
    /** @type {!Element} */
    var rootEditable = contentEditable;
    for (var runner = contentEditable;
         runner && runner.nodeType === Node.ELEMENT_NODE;
         runner = runner.parentNode) {
      if (runner.isContentEditable)
        rootEditable = /** @type {!Element} */(runner);
    }
    if (!dispatchSelectStartEvent(rootEditable))
      return;
    selection.selectAllChildren(rootEditable);
    selectFrameElementInParentIfFullySelected(contextDocument);
  }

  /**
   * TODO(yosin) Closure compiler wrong type annotation for Node.ownerDocument,
   * which says value of ownerDocument is nullable Document. Once, we fix this
   * issue, we should change type annotation for |selectAllOnDocument()|.
   * @param {?Document} contextDocument
   */
  function selectAllOnDocument(contextDocument) {
    if (!contextDocument)
      throw new Error('NOTREACHED');
    var selection = contextDocument.getSelection();
    if (!selection)
      return;
    var selectStartTarget = contextDocument.body;
    if (selectStartTarget &&
        !dispatchSelectStartEvent(selectStartTarget)) {
      return;
    }
    selection.selectAllChildren(contextDocument);
    if (selection.isCollapsed) {
      var target = contextDocument.documentElement || contextDocument.body;
      if (target)
        selection.selectAllChildren(target);
    }
    selectFrameElementInParentIfFullySelected(contextDocument);
  }

  /**
   * @param {!HTMLTextAreaElement} textAreaElement
   */
  function selectAllOnTextAreaElement(textAreaElement) {
    if (!dispatchSelectStartEvent(textAreaElement))
      return;
    textAreaElement.setSelectionRange(0, textAreaElement.value.length);
    return;
  }

  /**
   * @param {!HTMLInputElement} inputElement
   */
  function selectAllOnTextField(inputElement) {
    if (!dispatchSelectStartEvent(inputElement))
      return;
    inputElement.setSelectionRange(0, inputElement.value.length);
    return;
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
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function selectAllCommand(contextDocument, userInterface, value) {
    if (trySelectAllOnSelectElement(contextDocument))
      return true;

    var domSelection = contextDocument.getSelection();
    if (!domSelection || !domSelection.rangeCount) {
      selectAllOnDocument(contextDocument);
      return true;
    }

    var range = domSelection.getRangeAt(0);
    var startContainer = range.startContainer;
    if (startContainer.nodeType !== Node.DOCUMENT_NODE &&
        startContainer.nodeType !== Node.ELEMENT_NODE) {
      if (!startContainer.parentNode)
        return true;
      selectAllOnContainer(startContainer.parentNode);
      return true;
    }

    if (startContainer.isContentEditable) {
      selectAllOnContainer(startContainer);
      return true;
    }

    var targetNode = startContainer.childNodes[range.startOffset];
    if (!targetNode || targetNode.nodeType !== Node.ELEMENT_NODE) {
      selectAllOnContainer(startContainer);
      return true;
    }

    var targetElement = /** @type {!Element} */(targetNode);
    if (isTextField(targetElement)) {
      var inputElement = /** @type {!HTMLInputElement} */(targetElement);
      selectAllOnTextField(inputElement);
      return true;
    }

    if (targetElement.tagName === 'TEXTAREA') {
      var textAreaElement = /** @type {!HTMLTextAreaElement} */(targetElement);
      selectAllOnTextAreaElement(textAreaElement);
      return true;
    }

    selectAllOnContainer(targetElement);
    return true;
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return selectAllCommand;
})());
