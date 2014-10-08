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
 * @struct
 * @param {!Document} document
 */
editing.Editor = function(document) {}

/**
 * @param {string} commandName
 * @param {!UndoableCommandFunction} commandFunction
 * @return {!CommandFunction}
 */
editing.Editor.createCommandFunction = function(commandName, commandFunction) {};

/**
 * @param {!Document} document
 * @return {!editing.Editor}
 */
editing.Editor.getOrCreate = function(document) {};

/**
 * @param {string} name
 * @param {!editing.ImmutableSelection} selection
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

/** @return {!editing.ImmutableSelection} */
editing.Editor.prototype.getDomSelection = function() {};

/**
 * @return {boolean}
 */
editing.Editor.prototype.redo = function() {};

/** @type {!editing.ImmutableSelection} */
editing.Editor.prototype.selection;

/**
 * @param {!editing.ImmutableSelection} selection
 */
editing.Editor.prototype.setDomSelection = function(selection) {};

/**
 * @return {boolean}
 */
editing.Editor.prototype.undo = function() {};
