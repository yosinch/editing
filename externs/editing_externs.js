// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var editing;

/**
 * @typedef {function(!Document, boolean, string) : boolean}
 */
var CommandFunction;

/**
 * @typedef {function(!editing.EditingContext, boolean, string) : boolean}
 */
var UndoableCommandFunction;

/**
 * @param {string} name
 * @param {!UndoableCommandFunction} commandFunction
 */
editing.defineCommand = function(name, commandFunction) {};

/**
 * @template T
 * @param {!Array.<T>} array
 * @return {T}
 */
editing.lastOf = function(array) {};

/**
 * @param {string} name
 * @return {CommandFunction}
 */
editing.lookupCommand = function(name) {};

/**
 * @param {string} name
 * @param {!CommandFunction} commandFunction
 */
editing.registerCommand = function(name, commandFunction) {};

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
