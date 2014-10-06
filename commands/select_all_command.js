// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('selectAll', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   * @return {boolean}
   */
  function dispatchSelectStartEvent(context, element) {
    var event = new Event('selectstart', {bubbles: true, cancelable: true});
    return element.dispatchEvent(event);
  }

  /**
   * @param {Element} element
   * @return {Element}
   */
  function findHighestContentEditableOrBody(element) {
    if (!element)
      return null;
    /** @type {?Element} */
    var result = null;
    for (var node of editing.dom.ancestorsOrSelf(element)) {
      if (node.isContentEditable)
        result = node;
      if (node.tagName === 'BODY') {
        // TODO(yosin) Once closure compiler #643 fixed, we change |return|
        // to |break|.
        return result || node;
      }
    }
    return result;
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
    return !domSelection.anchorOffset &&
           domSelection.focusOffset === domSelection.anchorNode.childNodes.length;
  }

  /**
   * @param {!editing.EditingContext} context
   * For ease of deleting frame, we set selection to cover a frame element on
   * parent window.
   */
  function selectFrameElementInParentIfFullySelected(context) {
    var selection = context.document.getSelection();
    if (!isFullySelected(selection))
      return;
    var frameElement = findHostingFrameElement(context.document);
    if (!frameElement)
      return;
    var ownerElement = frameElement.parentNode;
    if (!ownerElement || !ownerElement.isContentEditable)
      return;
    var frameElementNodeIndex = editing.dom.nodeIndex(frameElement);
    var parentSelection = ownerElement.ownerDocument.getSelection();
    parentSelection.collapse(ownerElement, frameElementNodeIndex);
    parentSelection.extend(ownerElement, frameElementNodeIndex + 1);
    ownerElement.focus();
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} startContainer
   * @param {number} startOffset
   * @param {!Element} endContainer
   * @param {number} endOffset
   */
  function setEndingSelection(context, startContainer, startOffset,
                              endContainer, endOffset) {
    var domSelection = context.document.getSelection();
    domSelection.collapse(startContainer, startOffset);
    domSelection.extend(endContainer, endOffset);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {Element} activeElement
   * @return {boolean}
   */
  function trySelectAllOnContentEditable(context, activeElement) {
    var contentEditable = findHighestContentEditableOrBody(activeElement);
    if (!contentEditable)
      return false;
    if (!dispatchSelectStartEvent(context, contentEditable))
      return true;
    setEndingSelection(context, contentEditable, 0, contentEditable,
                       contentEditable.childNodes.length);
    selectFrameElementInParentIfFullySelected(context);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {Element} activeElement
   * @return {boolean}
   */
  function trySelectAllOnInputElement(context, activeElement) {
    if (!activeElement || activeElement.tagName !== 'INPUT')
      return false;
    /** @type {!HTMLInputElement} */
    var inputElement = /** @type {!HTMLInputElement} */(activeElement);
    if (inputElement.type !== 'text')
      return false;
    if (!dispatchSelectStartEvent(context, inputElement))
      return true;
    inputElement.setSelectionRange(0, inputElement.value.length);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {Element} activeElement
   * @return {boolean}
   * Note: We don't dispatch "selectstart" event for SELECT element to follow
   * C++ implementation.
   */
  function trySelectAllOnSelectElement(context, activeElement) {
    if (!activeElement || activeElement.tagName !== 'SELECT')
      return false;
    /** @type {!HTMLSelectElement} */
    var selectElement = /** @type {!HTMLSelectElement} */(activeElement);
    if (!selectElement.multiple)
      return false;
    for (var element of new editing.dom.HTMLIterable(selectElement.options)) {
      var optionElement = /** @type {!HTMLOptionElement} */(element);
      optionElement.selected = true;
    }
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {Element} activeElement
   * @return {boolean}
   */
  function trySelectAllOnTextAreaElement(context, activeElement) {
    if (!activeElement || activeElement.tagName !== 'TEXTAREA')
      return false;
    /** @type {!HTMLTextAreaElement} */
    var textAreaElement = /** @type {!HTMLTextAreaElement} */(activeElement);
    if (!dispatchSelectStartEvent(context, textAreaElement))
      return true;
    textAreaElement.setSelectionRange(0, textAreaElement.value.length);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function selectAllCommand(context, userInterface, value) {
    var activeElement = context.document.activeElement;
    if (trySelectAllOnInputElement(context, activeElement))
      return true;
    if (trySelectAllOnSelectElement(context, activeElement))
      return true;
    if (trySelectAllOnTextAreaElement(context, activeElement))
      return true;
    if (trySelectAllOnContentEditable(context, activeElement))
      return true;
    var bodyElement = context.document.body;
    if (!bodyElement) {
      return true;
    }
    if (!dispatchSelectStartEvent(context, bodyElement))
      return true;
    setEndingSelection(context, bodyElement, 0, bodyElement,
                       bodyElement.childNodes.length);
    selectFrameElementInParentIfFullySelected(context);
    return true;
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return {
    function: selectAllCommand,
    undoable: false
  };
})());
