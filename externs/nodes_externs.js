// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/** @type {!Object} */
editing.nodes;

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.canContainRangeEndPoint = function(node) {};

/**
 * @param {!editing.ReadOnlySelection} selection
 * @return {!Array.<!Node>}
 */
editing.nodes.computeSelectedNodes = function(selection) {};

/**
 * @param {!Node} node
 * @param {Node} other
 * @return {boolean}
 */
editing.nodes.isDescendantOf = function(node, other) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isEditable = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isElement = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isInteractive = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isPhrasing = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isText = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isVisibleNode = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.nodes.isWhitespaceNode = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.nodes.lastWithIn = function(node) {};

/**
 * @param {!Node} node
 * @return {number}
 */
editing.nodes.maxOffset = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.nodes.nextNodeSkippingChildren = function(node) {};

/**
 * @param {!Node} node
 * @return {number}
 */
editing.nodes.nodeIndex = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.nodes.previousNode = function(node) {};
