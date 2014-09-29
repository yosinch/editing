// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @typedef {{
 *  defineCommand: function(string, !function()),
 *  isContentEditable: function(!Node) : boolean,
 *  lookupCommand: function(string) : ?function()
 * }}
 */
var editing;

/**
 * @typedef {function(string, boolean=, string=) : boolean}
 */
var CommandFunction;

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
