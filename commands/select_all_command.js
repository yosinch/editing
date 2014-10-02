// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('selectAll', (function() {
  'use strict';

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
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  function setEndingSelectionAt(context, element) {
    var container = element.parentNode;
    if (!container) {
      context.setEndingSelectionAsEmpty();
      return;
    }
    var nodeIndex = editing.dom.nodeIndex(element);
    context.setEndingSelection(new editing.ImmutableSelection(
        container, nodeIndex, container, nodeIndex,
        editing.SelectionDirection.ANCHOR_IS_START));
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
    context.setEndingSelection(new editing.ImmutableSelection(
        contentEditable, 0, contentEditable, contentEditable.childNodes.length,
        editing.SelectionDirection.ANCHOR_IS_START));
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
    inputElement.setSelectionRange(0, inputElement.value.length);
    setEndingSelectionAt(context, inputElement);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {Element} activeElement
   * @return {boolean}
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
    context.setEndingSelectionAsEmpty();
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
    textAreaElement.setSelectionRange(0, textAreaElement.value.length);
    setEndingSelectionAt(context, textAreaElement);
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
      context.setEndingSelectionAsEmpty();
      return true;
    }
    context.setEndingSelection(new editing.ImmutableSelection(
        bodyElement, 0, bodyElement, bodyElement.childNodes.length,
        editing.SelectionDirection.ANCHOR_IS_START));
    return true;
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return selectAllCommand;
})());
