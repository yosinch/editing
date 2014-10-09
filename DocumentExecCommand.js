// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

installClass('Document', function(documentPrototype) {
  'use strict';

  <include src="editing.js">
  <include src="commands/select_all_command.js">

  /**
   * @this {!Document} document
   * @param {string} commandName
   * @param {boolean} userInterface
   * @param {string} commandValue
   * @return {boolean}
   */
  function execCommandInJavaScript(commandName, userInterface, commandValue) {
    var commandFunction = editing.lookupCommand(commandName);
    if (!commandFunction)
      throw new Error('No such command ' + commandName);
    return commandFunction(document, userInterface, commandValue);
  }

  // For ease of debugging, we use named function |execCommandInJavaScript| to
  // see it in stack trace.
  documentPrototype['execCommandInJavaScript'] = execCommandInJavaScript;
});
