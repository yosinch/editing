// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.registerCommand('redo', (function() {
  'use strict';

  /**
   * @param {!Document} contextDocument
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function redoCommand(contextDocument, userInterface, value) {
    var editor = editing.Editor.getOrCreate(contextDocument);
    return editor.redo();
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return redoCommand;
})());

editing.registerCommand('undo', (function() {
  'use strict';

  /**
   * @param {!Document} contextDocument
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function undoCommand(contextDocument, userInterface, value) {
    var editor = editing.Editor.getOrCreate(contextDocument);
    return editor.undo();
  }

  // Note: For ease of debugging, we would like to see function name in stack
  // trace, we use named function rather than anonymous function.
  return undoCommand;
})());
