// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @extends {editing.UndoUnit}
 * @final
 * @struct
 * @param {!Document} document
 * @param {string} name A name for this context for error message.
 * @param {!editing.ImmutableSelection} selection
 */
editing.EditingContext = function(document, name, selection) {}

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
 * @param {!Node} node
 */
editing.EditingContext.prototype.removeNodePreservingChildren =
    function(node) {};

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

/** @type {boolean} */
editing.EditingContext.prototype.shouldUseCSS;

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

/**
 * @this {!editing.EditingContext}
 * @param {!Element} parent
 * @param {Node} stopChild
 */
editing.EditingContext.prototype.unwrapElement = function(parent, stopChild) {};
