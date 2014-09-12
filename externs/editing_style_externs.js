// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @final
 * @param {!Element} element
 */
editing.EditingStyle = function(element) {};

/**
 * @param {{name: string, value: string}} property
 * @return {string}
 */
editing.EditingStyle.computeTagName = function(property) {};

/**
 * @type {boolean}
 */
editing.EditingStyle.prototype.hasStyle;

/**
 * @type {!Array.<{name: string, value: string}>}
 */
editing.EditingStyle.prototype.properties;

/**
 * @type {!Array.<string>}
 */
editing.EditingStyle.prototype.tagNames;
