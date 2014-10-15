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
  function getHostingFrameElement(targetDocument) {
    var targetWindow = targetDocument.defaultView;
    if (!targetWindow)
      return null;
    return targetWindow.frameElement;
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
  function isTextFormControl(element) {
    if (element.tagName === 'TEXTAREA')
      return true;
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
   * @param {!Selection} selection
   * @param {Node} container
   */
  function selectAllOnContainer(selection, container) {
    if (!container)
      return;
    if (container.nodeType !== Node.ELEMENT_NODE) {
      selectAllOnDocument(selection, container.ownerDocument);
      return;
    }
    var element = /** @type {!Element} */(container);
    if (element.isContentEditable) {
      var rootEditable = highestEditableRoot(element);
      selectAllOnElement(selection, rootEditable, rootEditable);
      return;
    }
    selectAllOnDocument(selection, container.ownerDocument);
  }

  /**
   * @param {!Selection} selection
   * @param {Document} contextDocument
   */
  function selectAllOnDocument(selection, contextDocument) {
    if (!contextDocument)
      return;
    var documentElement = contextDocument.documentElement;
    if (!documentElement)
      return;
    selectAllOnElement(selection, documentElement, contextDocument.body);
  }

  /**
   * @param {!Selection} selection
   * @param {!Element} element
   * @param {Element} selectStartTarget
   */
  function selectAllOnElement(selection, element, selectStartTarget) {
    if (selectStartTarget && !dispatchSelectStartEvent(selectStartTarget))
      return;
    selection.selectAllChildren(element.shadowRoot || element);
    selectFrameElementInParentIfFullySelected(selection, element.ownerDocument);
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
   * @param {!Selection} selection
   * @param {Document} contextDocument
   * For ease of deleting frame, we set selection to cover a frame element on
   * parent window.
   */
  function selectFrameElementInParentIfFullySelected(selection,
                                                     contextDocument) {
    if (!contextDocument)
      return;
    if (!isFullySelected(selection))
      return;
    var frameElement = getHostingFrameElement(contextDocument);
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

    var selection = contextDocument.getSelection();
    if (!selection)
      return;

    if (!selection.rangeCount) {
      selectAllOnDocument(selection, contextDocument);
      return;
    }

    var range = selection.getRangeAt(0);
    var startContainer = range.startContainer;
    if (startContainer.nodeType === Node.TEXT_NODE ||
        startContainer.nodeType === Node.COMMENT_NODE) {
      selectAllOnContainer(selection, startContainer.parentNode);
      return;
    }

    if (range.collapsed) {
      var targetNode = startContainer.childNodes[range.startOffset];
      if (!targetNode || targetNode.nodeType !== Node.ELEMENT_NODE) {
        selectAllOnContainer(selection, startContainer);
        return;
      }

      var targetElement = /** @type {!Element} */(targetNode);

      // Note: When C++ selection has positions in shadow DOM tree, JavaScript
      // selection points to shadow host.
      // TODO(yosin) Once Blink support to select crossing shadow DOM tree
      // boundary, we should update this code.
      if (targetElement.shadowRoot) {
        selectAllOnElement(selection, targetElement, targetElement);
        return;
      }

      if (!targetElement.isContentEditable &&
          isTextFormControl(targetElement)) {
        selectAllOnTextField(targetElement);
        return;
      }
    }

    selectAllOnContainer(selection, startContainer);
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
