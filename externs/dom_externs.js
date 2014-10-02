// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/** @type {!Object} */
editing.dom;

/**
 * @constructor
 * @implements $jscomp.Iterable.<!Element>
 * @final
 * TODO(yosin) We should use |!HTMLCollection| once we fix JS externs
 * in closure compiler.
 * @param {(?HTMLCollection|?HTMLOptionsCollection)} collection
 */
editing.dom.HTMLIterable = function(collection) {
  /** @return {!$jscomp.Iterator.<!Element>} */
  this.$$iterator;
};

/**
 * @param {!Node} node
 * @return {!$jscomp.Iterable.<!Node>}
 */
editing.dom.ancestorsOrSelf = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.canContainRangeEndPoint = function(node) {};

/**
 * @param {!editing.ImmutableSelection} selection
 * @return {!Array.<!Node>}
 */
editing.dom.computeSelectedNodes = function(selection) {};

/**
 * @param {!Node} node
 * @param {Node} other
 * @return {boolean}
 */
editing.dom.isDescendantOf = function(node, other) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isEditable = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isElement = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isInteractive = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isPhrasing = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isText = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isVisibleNode = function(node) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.dom.isWhitespaceNode = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.dom.lastWithIn = function(node) {};

/**
 * @param {!Node} node
 * @return {number}
 */
editing.dom.maxOffset = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.dom.nextNodeSkippingChildren = function(node) {};

/**
 * @param {!Node} node
 * @return {number}
 */
editing.dom.nodeIndex = function(node) {};

/**
 * @param {Node} node
 * @return {Node}
 */
editing.dom.previousNode = function(node) {};
