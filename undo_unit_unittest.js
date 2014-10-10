// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// removeAttribute
//
testCaseWithSample('undoUnit.removeAttribute.1',
    '<p contenteditable>|<a id="foo">bar</a></p>',
    function(sample, selectionIn) {
      var editor = editing.Editor.getOrCreate(sample.document);
      var context = editor.createContext('noname', selectionIn);
      var element = context.document.querySelector('a');
      context.removeAttribute(element, 'id');
      expectFalse(function () { return element.hasAttribute('id') });
    });

testCaseWithSample('undoUnit.removeAttribute.2',
    '<p contenteditable>|<a id="foo">bar</a></p>',
    function(sample, selectionIn) {
      var editor = editing.Editor.getOrCreate(sample.document);
      var context = editor.createContext('noname', selectionIn);
      var element = context.document.querySelector('a');
      // No exception for non-existing removing attribute.
      context.removeAttribute(element, 'notexist');
    });
