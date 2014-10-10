// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @struct
 * @param {!editing.EditingContext} context
 * @param {boolean} userInterface
 * @param {string} commandValue
 */
editing.CommandContext = function(context, userInterface, commandValue) {};

/** @type {string} */ 
editing.CommandContext.prototype.commandValue;

/** @type {!editing.EditingContext} */
editing.CommandContext.prototype.context;

/** @type {boolean} */
editing.CommandContext.prototype.userInterface;

/** @return {boolean} */
editing.CommandContext.prototype.execute = function() {};

/** @param {!Element} element */
editing.CommandContext.prototype.expandInlineStyle = function(element) {};

