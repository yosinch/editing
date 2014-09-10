// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @final
 * @param {!editing.Editor} editor
 * @param {string} name A name for this context for error message.
 * @param {!editing.ReadOnlySelection} selection
 */
editing.EditingContext = function(editor, name, selection) {}

/** @type {!Document} */
editing.EditingContext.prototype.document;

/** @type {!editing.Editor} */
editing.EditingContext.prototype.editor;

/**
 * @this {!editing.EditingContext}
 * @param {!Node} parentNode
 * @param {!Node} newChild
 */
editing.EditingContext.prototype.appendChild = function(parentNode, newChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {string} tagName
 * @return {!Element}
 */
editing.EditingContext.prototype.createElement = function(tagName) {};

/**
 * @this {!editing.EditingContext}
 * @param {string} text
 * @return {!Text}
 */
editing.EditingContext.prototype.createTextNode = function(text) {};

/** @type {!editing.ReadOnlySelection} */
editing.EditingContext.prototype.endingSelection;

/**
 * @this {!editing.EditingContext}
 * @param {!Node} node
 * @return {boolean}
 */
editing.EditingContext.prototype.inDocument = function(node) {};

/**
 * @this {!editing.EditingContext}
 * @param {?Node} parentNode
 * @param {!Node} newChild
 * @param {?Node} refChild
 */
editing.EditingContext.prototype.insertAfter = function(
    parentNode, newChild, refChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {?Node} parentNode
 * @param {!Node} newChild
 * @param {?Node} refChild
 */
editing.EditingContext.prototype.insertBefore = function(
    parentNode, newChild, refChild) {};

/** @type {!Array.<!editing.Operation>} */
editing.EditingContext.prototype.operations;

/**
 * @this {!editing.EditingContext}
 * @param {!editing.ReadOnlySelection} selection
 */
editing.EditingContext.prototype.normalizeSelection = function(selection) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Element} element
 * @param {string} name
 */
editing.EditingContext.prototype.removeAttribute = function(element, name) {};

/**
 * @this {!editing.EditingContext}
 * @param {?Node} parentNode
 * @param {!Node} oldChild
 */
editing.EditingContext.prototype.removeChild = function(parentNode, oldChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Node} parentNode
 * @param {!Node} newChild
 * @param {!Node} oldChild
 */
editing.EditingContext.prototype.replaceChild = function(
    parentNode, newChild, oldChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Node} element
 * @param {string} name
 * @param {string} newValue
 */
editing.EditingContext.prototype.setAttribute = function(element, name, newValue) {};

/**
 * @this {!editing.EditingContext}
 * @param {!editing.ReadOnlySelection} selection
 */
editing.EditingContext.prototype.setEndingSelection = function(selection) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Node} parent
 * @param {!Node} child
 * @return {!Node}
 */
editing.EditingContext.prototype.splitNode = function(parent, child) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Text} node
 * @param {number} offset
 * @return {!Text}
 */
editing.EditingContext.prototype.splitText = function(node, offset) {};

/**
  * @this {!editing.EditingContext}
  * @param {!Node} refNode
  * @return {!Node}
 */
editing.EditingContext.prototype.splitTree = function(treeNode, refNode) {};

/**
   * @this {!editing.EditingContext}
   * @param {!Node} treeNode
   * @param {!Node} refNode
   * @return {!Node}
   */
editing.EditingContext.prototype.splitTreeLeft = function(treeNode, refNode) {};

/** @type {!editing.ReadOnlySelection} */
editing.EditingContext.prototype.startingSelection;

/**
 * @this {!editing.EditingContext}
 * @param {!Element} parent
 * @param {?Node} stopChild
 */
editing.EditingContext.prototype.unwrapElement = function(parent, stopChild) {};
