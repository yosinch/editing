// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @typedef {{
 *  contentModel: !Object.<string, !editing.ContentModel>,
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

/**
 * @typedef {{
 *  categories: string,
 *  contextModel: (!Array.<string>|!Set.<string>),
 *  usableContexts: (!Array.<string>|!Set.<string>)
 * }}
 */
editing.ContentModel;

/** @enum {string} */
editing.CONTENT_CATEGORY = {
  EMBEDDED: 'EMBEDDED',
  FLOW: 'FLOW',
  HEADING: 'HEADING',
  INTERACTIVE: 'INTERACTIVE',
  PALPABLE: 'PALPABLE',
  PHRASING: 'PHRASING',
  SECTIONING_ROOT: 'SECTIONING_ROOT',
  TRANSPARENT: 'TRANSPARENT',
};

/** @enum {string} */
editing.SelectionDirection = {
  ANCHOR_IS_START: 'ANCHOR_IS_START',
  FOCUS_IS_START: 'FOCUS_IS_START'
};
