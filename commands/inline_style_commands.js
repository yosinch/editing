// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
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
