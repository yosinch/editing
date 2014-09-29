// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/** @type {!Object} */
var testing;

/** @type {!Set.<string>} */
testing.END_TAG_OMISSIBLE;

/**
 * @constructor
 * @final
 * @param {string} htmlSource
 */
testing.Sample = function(htmlSource) {}

/** @type {!Document} */
testing.Sample.prototype.document;

/** @type {!function()} */
testing.Sample.prototype.finish;

/** @type {!editing.ReadOnlySelection} */
testing.Sample.prototype.startingSelection;

/** @type {string} */
testing.browserId;

/**
 * @param {Node} node
 * @param {!Object=} opt_options
 */
testing.serializeNode = function(node, opt_options) {};

/** @type {!Object} */
testing.TEST_EXPECTATIONS;
