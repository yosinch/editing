// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('selectAll', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {(!Element|!Document)} eventTarget
   * @return {boolean}
   */
  function dispatchSelectStartEvent(context, eventTarget) {
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
   * @param {!editing.EditingContext} context
   * @param {!Node} startContainer
   */
  function selectAllOnContainer(context, startContainer) {
    if (startContainer.nodeType === Node.ELEMENT_NODE &&
        startContainer.isContentEditable) {
      selectAllOnContentEditable(context,
                                 /** @type {!Element} */(startContainer));
      return;
    }
    selectAllOnDocument(context);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} contentEditable
   */
  function selectAllOnContentEditable(context, contentEditable) {
    var selection = context.document.getSelection();
    if (!selection)
      return;
    /** @type {(!Element|!Document)} */
    var rootEditable = contentEditable;
    for (var runner = contentEditable;
         runner && runner.nodeType === Node.ELEMENT_NODE;
         runner = runner.parentNode) {
      if (runner.isContentEditable)
        rootEditable = /** @type {!Element} */(runner);
    }
    if (!dispatchSelectStartEvent(context, rootEditable))
      return;
    selection.selectAllChildren(rootEditable);
    selectFrameElementInParentIfFullySelected(context);
  }

  /**
   * @param {!editing.EditingContext} context
   */
  function selectAllOnDocument(context) {
    var selection = context.document.getSelection();
    if (!selection)
      return;
    var selectStartTarget = context.document.body;
    if (selectStartTarget &&
        !dispatchSelectStartEvent(context, selectStartTarget)) {
      return;
    }
    selection.selectAllChildren(document);
    if (selection.isCollapsed) {
      var target = context.document.documentElement || context.document.body;
      if (target)
        selection.selectAllChildren(target);
    }
    selectFrameElementInParentIfFullySelected(context);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!HTMLTextAreaElement} textAreaElement
   */
  function selectAllOnTextAreaElement(context, textAreaElement) {
    if (!dispatchSelectStartEvent(context, textAreaElement))
      return;
    textAreaElement.setSelectionRange(0, textAreaElement.value.length);
    return;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!HTMLInputElement} inputElement
   */
  function selectAllOnTextField(context, inputElement) {
    if (!dispatchSelectStartEvent(context, inputElement))
      return;
    inputElement.setSelectionRange(0, inputElement.value.length);
    return;
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
    var frameElementNodeIndex = nodeIndex(frameElement);
    var parentSelection = ownerElement.ownerDocument.getSelection();
    parentSelection.collapse(ownerElement, frameElementNodeIndex);
    parentSelection.extend(ownerElement, frameElementNodeIndex + 1);
    ownerElement.focus();
  }

  /**
   * @param {!editing.EditingContext} context
   * @return {boolean}
   * Note: We don't dispatch "selectstart" event for SELECT element to follow
   * C++ implementation.
   */
  function trySelectAllOnSelectElement(context) {
    var activeElement = context.document.activeElement;
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
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function selectAllCommand(context, userInterface, value) {
    if (trySelectAllOnSelectElement(context))
      return true;

    var domSelection = context.document.getSelection();
    if (!domSelection || !domSelection.rangeCount) {
      selectAllOnDocument(context);
      return true;
    }

    var range = domSelection.getRangeAt(0);
    var startContainer = range.startContainer;
    if (startContainer.nodeType !== Node.DOCUMENT_NODE &&
        startContainer.nodeType !== Node.ELEMENT_NODE) {
      if (!startContainer.parentNode)
        return true;
      selectAllOnContainer(context, startContainer.parentNode);
      return true;
    }

    if (startContainer.isContentEditable) {
      selectAllOnContainer(context, startContainer);
      return true;
    }

    var targetNode = startContainer.childNodes[range.startOffset];
    if (!targetNode || targetNode.nodeType !== Node.ELEMENT_NODE) {
      selectAllOnContainer(context, startContainer);
      return true;
    }

    var targetElement = /** @type {!Element} */(targetNode);
    if (isTextField(targetElement)) {
      selectAllOnTextField(context,
                           /** @type {!HTMLInputElement} */(targetElement));
      return true;
    }

    if (targetElement.tagName === 'TEXTAREA') {
      selectAllOnTextAreaElement(context,
          /** @type {!HTMLTextAreaElement} */(targetElement));
      return true;
    }

    selectAllOnContainer(context, targetElement);
    return true;
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return {
    function: selectAllCommand,
    undoable: false
  };
})());
