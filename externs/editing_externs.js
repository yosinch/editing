// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var editing;

/**
 * @typedef {function(!editing.EditingContext, boolean=, string=) : boolean}
 */
var CommandFunction;

/**
 * @typedef {{
 *    function: !CommandFunction,
 *    undoable: boolean
 * }}
 */
var CommandDefinition;

/**
 * @param {string} name
 * @param {(!CommandDefinition|!CommandFunction)} thing
 */
editing.defineCommand = function(name, thing) {};

/**
 * @param {!Node} node
 * @return {boolean}
 */
editing.isContentEditable = function(node) {};

/**
 * @param {string} name
 * @return [boolean}
 */
editing.lookupCommand = function(name) {};

/** @enum {string} */
editing.SelectionDirection = {
  ANCHOR_IS_START: 'ANCHOR_IS_START',
  FOCUS_IS_START: 'FOCUS_IS_START'
};

/** @type {!Object} */
editing.contentModel;

/**
 * @param {string} tagName
 * @return {boolean}
 */
editing.contentModel.canContainRangeEndPointSet = function(tagName) {};

/**
 * @param {string} tagName
 * @return {boolean}
 */
editing.contentModel.isInteractive = function(tagName) {};

/**
 * @param {string} tagName
 * @return {boolean}
 */
editing.contentModel.isPhrasing = function(tagName) {};
