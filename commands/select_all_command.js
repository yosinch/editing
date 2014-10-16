// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.registerCommand('selectAll', (function() {
  'use strict';

  // Note: To avoid referencing |window.document|, we should not use
  // |document| as parameter name or local variable name.

  /**
   * @param {(!Element|!Document)} eventTarget
   * @return {boolean} Returns false if |Event.prototype.preventDefaults()|
   *    called.
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
   * @param {(!Document|!ShadowRoot)} treeScope
   * @return {!Document|!ShadowRoot}
   */
  function getSelectedTreeScope(treeScope) {
    for (;;) {
      var selection = treeScope.getSelection();
      if (!selection)
        return treeScope;
      if (!selection.anchorNode) {
        if (!treeScope.olderShadowRoot)
          return treeScope;
        treeScope = treeScope.olderShadowRoot;
        continue;
      }
      if (!isCollapsed(selection))
        return treeScope;
      var selectedNode = getStartNode(selection);
      if (!selectedNode || selectedNode.nodeType !== Node.ELEMENT_NODE ||
          !selectedNode.shadowRoot) {
        return treeScope;
      }
      treeScope = selectedNode.shadowRoot;
    }
  }

  /**
   * @param {!Selection} selection
   * @return {Node}
   * TODO(yosin) Once http://crbug.com/380690 fixed, we should use
   * |select.getRangeAt(0)|.
   */
  function getStartContainer(selection) {
    if (isAnchorStart(selection))
      return selection.anchorNode;
    return selection.focusNode;
  }

  /**
   * @param {!Selection} selection
   * @return {Node}
   * TODO(yosin) Once http://crbug.com/380690 fixed, we should use
   * |select.getRangeAt(0)|.
   */
  function getStartNode(selection) {
    if (!selection.anchorNode)
      return null;
    if (isAnchorStart(selection))
      return selection.anchorNode.childNodes[selection.anchorOffset];
    return selection.focusNode.childNodes[selection.focusOffset];
  }

  /**
   * @param {!Selection} selection
   * @return {(HTMLInputElement|HTMLTextAreaElement)}
   */
  function getTextFormControl(selection) {
    if (!isCollapsed(selection))
      return null;
    var startNode = getStartNode(selection);
    if (!startNode)
      return null;
    if (startNode.nodeName === 'TEXTAREA')
      return /** @type {!HTMLTextAreaElement} */(startNode);
    if (startNode.nodeName !== 'INPUT')
      return null;
    var inputElement = /** @type {!HTMLInputElement} */(startNode);
    return isTextFormControl(inputElement) ? inputElement : null;
  }

  /**
   * @param {!Document|!ShadowRoot} treeScope
   * @param {!Selection} selection
   * @return {Node}
   */
  function highestEditableRoot(treeScope, selection) {
    if (!selection.rangeCount)
      return null;
    var root = null;
    for (var runner = getStartContainer(selection);
         runner; runner = runner.parentNode) {
      if (runner.nodeType === Node.ELEMENT_NODE &&
          runner.isContentEditable) {
        root = /** @type {!Element} */(runner);
      }
    }
    return root;
  }

  /**
   * @param {!Selection} selection
   * @return {boolean}
   * TODO(yosin) Once http://crbug.com/380690 fixed, we should use
   * |select.getRangeAt(0)|.
   */
  function isAnchorStart(selection) {
    if (!selection.rangeCount)
      return false;
    var anchorRange = selection.anchorNode.ownerDocument.createRange();
    anchorRange.setStart(selection.anchorNode, selection.anchorOffset);
    var focusRange = selection.focusNode.ownerDocument.createRange();
    focusRange.setStart(selection.focusNode, selection.focusOffset);
    return anchorRange.compareBoundaryPoints(Range.START_TO_START,
                                             focusRange) >= 0;
  }

  /**
   * @param {Selection} selection
   * @return {boolean}
   * TODO(yosin) Once http://crbug.com/380690 fixed, we should use
   * |select.getRangeAt(0).collapsed|.
   */
  function isCollapsed(selection) {
    return Boolean(selection.anchorNode) &&
           selection.anchorNode === selection.focusNode &&
           selection.anchorOffset === selection.focusOffset;
  }

  /**
   * @param {Selection} selection
   * @return {boolean}
   */
  function isFullySelected(selection) {
    if (!selection || !selection.anchorNode || !selection.focusNode)
      return false;
    if (selection.anchorNode.tagName !== 'BODY' ||
        selection.focusNode.tagName !== 'BODY') {
      return false;
    }
    var maxOffset = selection.anchorNode.childNodes.length;
    return !selection.anchorOffset && selection.focusOffset === maxOffset;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isShadowRoot(node) {
    if (node.nodeType === Node.DOCUMENT_NODE)
      return false;
    return node instanceof node.ownerDocument.defaultView.ShadowRoot;
  }

  /** @const @type {!Set.<string>} */
  var kTextFieldTypes = new Set([
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
    return kTextFieldTypes.has(inputElement.type);
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
   * @return {Node}
   *
   * See VisibleSelection::nonBoundaryShadowTreeRootNode and
   * Node::nonBoundaryShadowTreeRootNode
   */
  function nonBoundaryShadowTreeRootNode(selection) {
    if (!selection.rangeCount)
      return null;
    var root = getStartContainer(selection);
    console.assert(!root || !isShadowRoot(root));
    while (root) {
      var parent = root.parentNode;
      if (parent && isShadowRoot(parent))
        return root;
      root = parent;
    }
    return null;
  }

  /**
   * @param {Document} contextDocument
   * @param {!Selection} selection
   * For ease of deleting frame, we set selection to cover a frame element on
   * parent window.
   */
  function selectFrameElementInParentIfFullySelected(contextDocument,
                                                     selection) {
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
   * @param {!Selection} selection
   * @return {boolean} Returns true if selection in text form control.
   */
  function trySelectAllOnTextFormControl(selection) {
    // To make closure compiler happy to call |select()| method.
    var textFormControl = getTextFormControl(selection);
    if (!textFormControl || textFormControl.isContentEditable)
      return false;
    if (!dispatchSelectStartEvent(textFormControl))
      return true;
    textFormControl.select();
    // TODO(yosin) Once http://crbug.com/421751 fixed, we don't need to
    // dispatch "select" event here.
    var event = new Event('select', {bubbles: true});
    textFormControl.dispatchEvent(event);
    return true;
  }

  /**
   * @param {!Document} contextDocument
   */
  function selectAll(contextDocument) {
    if (trySelectAllOnSelectElement(contextDocument))
      return;

    var treeScope = getSelectedTreeScope(contextDocument);
    var selection = treeScope.getSelection();
    if (!selection)
      return;

    if (trySelectAllOnTextFormControl(selection))
      return;

    /** @type {Node} */
    var root = highestEditableRoot(treeScope, selection);
    /** @const @type {Node} */
    var shadowTree = nonBoundaryShadowTreeRootNode(selection);
    /** @type {Node} */
    var selectStartTarget = null;

    if (root) {
      selectStartTarget = shadowTree ? shadowTree.parentNode.host : root;
    } else if (shadowTree) {
      root = shadowTree;
      selectStartTarget = shadowTree.parentNode.host;
    } else {
      root = contextDocument.documentElement;
      selectStartTarget = contextDocument.body;
    }

    if (!root)
      return;

    if (!dispatchSelectStartEvent(selectStartTarget))
      return;

    selection.selectAllChildren(root);
    selectFrameElementInParentIfFullySelected(contextDocument, selection);
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
