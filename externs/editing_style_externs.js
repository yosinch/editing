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
 * @param {editing.EditingContext} context
 * @param {{name: string, value: string}} property
 * @return {?Element}
 */
editing.EditingStyle.createElement = function(context, property) {};

/**
 * @type {boolean}
 */
editing.EditingStyle.prototype.hasStyle;

/**
 * @type {!Array.<{name: string, value: string}>}
 */
editing.EditingStyle.prototype.properties;
