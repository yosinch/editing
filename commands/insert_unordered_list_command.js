// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('InsertUnorderedList', (function() {
  'use strict';

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} value Not used.
   * @return {boolean}
   */
  function createInsertUnorderedListCommand(context, userInterface, value) {
    return true;
  }

  return createInsertUnorderedListCommand;
})());
