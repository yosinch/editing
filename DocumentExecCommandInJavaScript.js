// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

installClass('Document', function(documentPrototype) {
  'use strict';

  <include src="editing.js">
  <include src="content_model.js">
  <include src="editing_context.js">
  <include src="editing_style.js">
  <include src="editor.js">
  <include src="nodes.js">
  <include src="operations.js">
  <include src="read_only_selection.js">
  <include src="selection_tracker.js">
  <include src="commands/create_link_command.js">
  <include src="commands/undo_command.js">

  /**
   * @this {!Document} document
   * @param {string} commandName
   * @param {boolean} userInterface
   * @param {string} commandValue
   * @return {boolean}
   */
  function execCommandInJavaScript(commandName, userInterface, commandValue) {
    var editor = editing.Editor.getOrCreate(this);
    return editor.execCommand(commandName, userInterface, commandValue);
  }

  Object.defineProperties(documentPrototype, {
    execCommandInJavaScript: {value: execCommandInJavaScript},
  });
});
