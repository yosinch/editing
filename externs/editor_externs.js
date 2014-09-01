// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//////////////////////////////////////////////////////////////////////
//
// Editor
//

/**
 * @constructor
 * @final
 * @param {!Document} document
 */
editing.Editor = function(document) {}

/**
 * @param {!Document} document
 * @return {!editing.Editor}
 */
editing.Editor.getOrCreate = function(document) {};

/**
 * @param {string} name
 * @param {!editing.ReadOnlySelection} selection
 * @return {!editing.EditingContext}
 */
editing.Editor.prototype.createContext = function(name, selection) {};

/** @type {!Document} */
editing.Editor.prototype.document;

/**
 * @param {string} commandName
 * @param {boolean=} opt_userInterface
 * @param {string=} opt_value
 * @return {boolean}
 */
editing.Editor.prototype.execCommand = function(commandName, opt_userInterface,
                                        opt_value) {};

/** @return {!editing.ReadOnlySelection} */
editing.Editor.prototype.getDomSelection = function() {};

/**
 * @param {!editing.EditingContext} context
 */
editing.Editor.prototype.redo = function(context) {};

/** @type {!editing.ReadOnlySelection} */
editing.Editor.prototype.selection;

/**
 * @param {!editing.ReadOnlySelection} selection
 */
editing.Editor.prototype.setDomSelection = function(selection) {};

/**
 * @param {!editing.EditingContext} context
 */
editing.Editor.prototype.undo = function(context) {};
