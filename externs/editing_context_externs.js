// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @final
 * @param {!editing.Editor} editor
 * @param {string} name A name for this context for error message.
 * @param {!editing.ImmutableSelection} selection
 */
editing.EditingContext = function(editor, name, selection) {}

/** @type {!Document} */
editing.EditingContext.prototype.document;

/** @type {!editing.Editor} */
editing.EditingContext.prototype.editor;

/** @type {string} */
editing.EditingContext.prototype.name;

/**
 * @this {!editing.EditingContext}
 * @param {!Node} parentNode
 * @param {!Node} newChild
 */
editing.EditingContext.prototype.appendChild = function(parentNode,
                                                        newChild) {};

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

/** @type {!editing.ImmutableSelection} */
editing.EditingContext.prototype.endingSelection;

/**
 * @this {!editing.EditingContext}
 * @param {!Node} node
 * @return {boolean}
 */
editing.EditingContext.prototype.inDocument = function(node) {};

/**
 * @this {!editing.EditingContext}
 * @param {Node} parentNode
 * @param {!Node} newChild
 * @param {Node} refChild
 */
editing.EditingContext.prototype.insertAfter = function(
    parentNode, newChild, refChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {Node} parentNode
 * @param {!Node} newChild
 * @param {?Node} refChild
 */
editing.EditingContext.prototype.insertBefore = function(
    parentNode, newChild, refChild) {};

/** @type {!Array.<!editing.Operation>} */
editing.EditingContext.prototype.operations;

/**
 * @this {!editing.EditingContext}
 * @param {!Element} newElement
 * @param {!Element} oldElement
 */
editing.EditingContext.prototype.moveAllChildren = function(newElement,
                                                            oldElement) {};

/**
 * @this {!editing.EditingContext}
 * @param {!editing.ImmutableSelection} selection
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
 * @param {Node} parentNode
 * @param {!Node} oldChild
 */
editing.EditingContext.prototype.removeChild = function(parentNode,
                                                        oldChild) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Element} element
 * @param {string} propertyName
 */
editing.EditingContext.prototype.removeStyle = function(element,
                                                        propertyName) {};

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
editing.EditingContext.prototype.setAttribute = function(element, name,
                                                         newValue) {};

/**
 * @this {!editing.EditingContext}
 * @param {!editing.ImmutableSelection} selection
 */
editing.EditingContext.prototype.setEndingSelection = function(selection) {};

/**
 * @this {!editing.EditingContext}
 */
editing.EditingContext.prototype.setEndingSelectionAsEmpty = function() {};

/**
 * @this {!editing.EditingContext}
 * @param {!Element} element
 * @param {string} propertyName
 * @param {string} propertyValue
 */
editing.EditingContext.prototype.setStyle = function(element, propertyName,
                                                     propertyValue) {};

/**
 * @this {!editing.EditingContext} context
 * @param {!editing.ImmutableSelection} selection
 * @param {!function(!Node):boolean} predicate
 * @return {!Array.<!Node>}
 */
editing.EditingContext.prototype.setUpEffectiveNodes = function(selection,
                                                                predicate) {};

/**
 * @this {!editing.EditingContext} context
 * @param {!editing.ImmutableSelection} selection
 * @param {!function(!Node):boolean} predicate
 * @param {!function(!Element, !Node): !Element} splitter
 * @return {!Array.<!Node>}
 */
editing.EditingContext.prototype.setUpEffectiveNodesWithSplitter =
    function(selection, predicate, splitter) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Element} element
 * @param {!Node} child
 * @return {!Element}
 */
editing.EditingContext.prototype.splitNode = function(element, child) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Element} element
 * @param {!Node} child
 * @return {!Element}
 */
editing.EditingContext.prototype.splitNodeLeft = function(element, child) {};

/**
 * @this {!editing.EditingContext}
 * @param {!Text} node
 * @param {number} offset
 * @return {!Text}
 */
editing.EditingContext.prototype.splitText = function(node, offset) {};

/**
  * @this {!editing.EditingContext}
  * @param {!Element} element
  * @param {!Node} refNode
  * @return {!Element}
 */
editing.EditingContext.prototype.splitTree = function(element, refNode) {};

/**
   * @this {!editing.EditingContext}
   * @param {!Element} element
   * @param {!Node} refNode
   * @return {!Element}
   */
editing.EditingContext.prototype.splitTreeLeft = function(element, refNode) {};

/** @type {!editing.ImmutableSelection} */
editing.EditingContext.prototype.startingSelection;

/**
 * @this {!editing.EditingContext}
 * @param {!Element} parent
 * @param {Node} stopChild
 */
editing.EditingContext.prototype.unwrapElement = function(parent, stopChild) {};
