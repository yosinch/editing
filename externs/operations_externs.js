// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @param {string} operationName
 */
editing.Operation = function(operationName) {}

/** @type {!function()} */
editing.Operation.prototype.execute = function() {};

/** @type {string} */
editing.Operation.prototype.operationName;

/** @type {!function()} */
editing.Operation.prototype.redo = function() {};

/** @type {!function()} */
editing.Operation.prototype.undo = function() {};

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Node} parentNode
 * @param {!Node} newChild
 */
editing.AppendChild = function(parentNode, newChild) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Node} parentNode
 * @param {!Node} newChild
 * @param {Node} refChild
 */
editing.InsertBefore = function(parentNode, newChild, refChild) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Element} element
 * @param {string} attrName
 */
editing.RemoveAttribute = function(element, attrName) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Node} parentNode
 * @param {!Node} oldChild
 */
editing.RemoveChild = function(parentNode, oldChild) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Node} parentNode
 * @param {!Node} newChild
 * @param {!Node} oldChild
 */
editing.ReplaceChild = function(parentNode, newChild, oldChild) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Element} element
 * @param {string} attrName
 * @param {string} newValue
 */
editing.SetAttribute = function(element, attrName, newValue) {}

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Element} element
 */
editing.SetStyle = function(element) {}

/**
 * @param {string} propertyName
 * @param {string} newValue
 */
editing.SetStyle.prototype.setProperty = function(propertyName, newValue) {};

/**
 * @constructor
 * @extends {editing.Operation}
 * @final
 * @param {!Text} textNode
 * @param {!Text} newTextNode
 */
editing.SplitText = function(textNode, newTextNode) {}
