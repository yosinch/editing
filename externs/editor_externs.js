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
editing.Editor = function(document) {};

/**
 * @param {string} commandName
 * @param {!UndoableCommandFunction} commandFunction
 * @return {!CommandFunction}
 */
editing.Editor.createCommandFunction = function(commandName,
                                                commandFunction) {};

/**
 * @param {!Document} document
 * @return {!editing.Editor}
 */
editing.Editor.getOrCreate = function(document) {};

editing.Editor.prototype = /** @struct */ {
  /** @type {!Document} */
  get document() {},

  /** @type {!editing.ImmutableSelection} */
  get selection() {},

  /**
   * @param {string} name
   * @param {!editing.ImmutableSelection} selection
   * @return {!editing.EditingContext}
   */
  createContext: function(name, selection) {},

  /**
   * @param {string} commandName
   * @param {boolean=} opt_userInterface
   * @param {string=} opt_value
   * @return {boolean}
   */
  execCommand: function(commandName, opt_userInterface, opt_value) {},

  /** @return {!editing.ImmutableSelection} */
  getSelectionFromDom: function() {},

  /**
   * @return {boolean}
   */
  redo: function() {},

  /**
   * @param {!editing.ImmutableSelection} selection
   */
  setDomSelection: function(selection) {},

  /**
   * @return {boolean}
   */
  undo: function() {}
};
