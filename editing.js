// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Instead of |var editing = {}| to make closure compiler happy.
window['editing']= {};

(function() {
  'use strict';

  /** @type {!Map.<string, !CommandFunction>} */
  var commandTable = new Map();

  /**
   * @param {string} commandName
   * @param {!UndoableCommandFunction} commandFunction
   */
  function defineCommand(commandName, commandFunction) {
    registerCommand(commandName,
        editing.Editor.createCommandFunction(commandName, commandFunction));
  }

  /**
   * @param {string} name
   * @return {?CommandFunction}
   */
  function lookupCommand(name) {
    return commandTable.get(name.toLowerCase()) || null;
  }

  /**
   * @param {string} name
   * @param {!CommandFunction} commandFunction
   */
  function registerCommand(name, commandFunction) {
    var canonicalName = name.toLowerCase();
    commandTable.set(canonicalName, commandFunction);
    // For historical reasons, backColor and hiliteColor behave identically.
    if (canonicalName === 'backcolor')
      registerCommand('hilitecolor', commandFunction);
  }

  editing = {
    defineCommand: defineCommand,
    lookupCommand: lookupCommand,
    registerCommand: registerCommand
  };
})();
