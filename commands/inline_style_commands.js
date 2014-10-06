// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(function() {
  'use strict';

  // TODO(hajimehoshi): Temporal definition: we need to implement this later
  /**
   * @param {Object} obj
   * @return {!CommandFunction}
   */
  function makeInlineStyleCommand(obj) {
    /**
     * @param {!editing.EditingContext} context
     * @param {boolean=} opt_userInterace
     * @param {string=} opt_value
     * @return {boolean}
     */
    function dummy(context, opt_userInterace, opt_value) {
      return false;
    }
    return dummy;
  }

  editing.defineCommand('backColor', makeInlineStyleCommand({
    cssProperty: 'background-color',
  }));

  editing.defineCommand('bold', makeInlineStyleCommand({
    cssProperty: 'font-weight',
    tagName: 'b'
  }));

  editing.defineCommand('fontColor', makeInlineStyleCommand({
    cssProperty: 'color',
  }));

  editing.defineCommand('fontFamily', makeInlineStyleCommand({
    cssProperty: 'font-family',
  }));

  editing.defineCommand('fontItalic', makeInlineStyleCommand({
    cssProperty: 'font-style',
  }));

  editing.defineCommand('fontSize', makeInlineStyleCommand({
    cssProperty: 'font-size',
  }));

  editing.defineCommand('italic', makeInlineStyleCommand({
    cssProperty: 'font-weight',
    tagName: 'i'
  }));

  editing.defineCommand('strikethrough', makeInlineStyleCommand({
    cssProperty: 'line-through',
    tagName: 's'
  }));

  editing.defineCommand('subscript', makeInlineStyleCommand({
    tagName: 'sub'
  }));

  editing.defineCommand('superscript', makeInlineStyleCommand({
    tagName: 'sup',
  }));

  editing.defineCommand('underline', makeInlineStyleCommand({
    tagName: 'u'
  }));
})();
