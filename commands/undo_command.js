// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('redo', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function redoCommand(context, userInterface, value) {
    return context.editor.redo(context);
  }

  return redoCommand;
})());

editing.defineCommand('undo', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Noe used.
   * @return {boolean}
   */
  function undoCommand(context, userInterface, value) {
    return context.editor.undo(context);
  }

  return undoCommand;
})());
