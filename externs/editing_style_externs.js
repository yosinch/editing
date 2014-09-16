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
 * @typedef {{name: string, value: string}}
 */
editing.Property;

/**
 * @param {editing.EditingContext} context
 * @param {!function(!editing.EditingContext, !editing.Property, !Element)}
 *    callback
 */
editing.EditingStyle.prototype.createElements = function(context, callback) {};

/**
 * @type {boolean}
 */
editing.EditingStyle.prototype.hasStyle;

/**
 * @type {!Array.<!editing.Property>}
 */
editing.EditingStyle.prototype.properties;
