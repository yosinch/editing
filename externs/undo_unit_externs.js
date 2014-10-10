// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @struct
 * @param {!Document} document
 * @param {string} name A name for this context for error message.
 * @param {!editing.ImmutableSelection} selection
 */
editing.UndoUnit = function(document, name, selection) {}

/** @type {!Document} */
editing.UndoUnit.prototype.document;

/** @type {string} */
editing.UndoUnit.prototype.name;

/**
 * @this {!editing.UndoUnit}
 * @param {!Node} parentNode
 * @param {!Node} newChild
 */
editing.UndoUnit.prototype.appendChild = function(parentNode, newChild) {};

/** @type {!editing.ImmutableSelection} */
editing.UndoUnit.prototype.endingSelection;

/**
 * @this {!editing.UndoUnit}
 * @param {Node} parentNode
 * @param {!Node} newChild
 * @param {?Node} refChild
 */
editing.UndoUnit.prototype.insertBefore = function(
    parentNode, newChild, refChild) {};

/** @type {!Array.<!editing.Operation>} */
editing.UndoUnit.prototype.operations;

/**
 * @this {!editing.UndoUnit}
 * @param {!Element} element
 * @param {string} name
 */
editing.UndoUnit.prototype.removeAttribute = function(element, name) {};

/**
 * @this {!editing.UndoUnit}
 * @param {Node} parentNode
 * @param {!Node} oldChild
 */
editing.UndoUnit.prototype.removeChild = function(parentNode, oldChild) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!Element} element
 * @param {string} propertyName
 */
editing.UndoUnit.prototype.removeStyle = function(element, propertyName) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!Node} parentNode
 * @param {!Node} newChild
 * @param {!Node} oldChild
 */
editing.UndoUnit.prototype.replaceChild = function(
    parentNode, newChild, oldChild) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!Node} element
 * @param {string} name
 * @param {string} newValue
 */
editing.UndoUnit.prototype.setAttribute = function(element, name, newValue) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!editing.ImmutableSelection} selection
 */
editing.UndoUnit.prototype.setEndingSelection = function(selection) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!Element} element
 * @param {string} propertyName
 * @param {string} propertyValue
 */
editing.UndoUnit.prototype.setStyle = function(element, propertyName,
                                               propertyValue) {};

/**
 * @this {!editing.UndoUnit}
 * @param {!Text} node
 * @param {number} offset
 * @return {!Text}
 */
editing.UndoUnit.prototype.splitText = function(node, offset) {};

/** @type {!editing.ImmutableSelection} */
editing.UndoUnit.prototype.startingSelection;
