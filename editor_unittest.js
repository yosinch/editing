// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// setDomSelection
//
testCaseWithSample('editor.setDomSelection.caret.1',
  '<p contenteditable>|0123</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(0, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(0, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.2',
  '<p contenteditable>0|123</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(1, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.3',
  '<p contenteditable>0123|</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(4, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.4',
  '<p contenteditable>| 0123</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq(' 0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(' 0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(1, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.5',
  '<p contenteditable>0123 |</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123 ', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(4, function() { return domSelection.anchorOffset; });
    expectEq('0123 ', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.range.1',
  '<p contenteditable>^0123|</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(0, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.range.2',
  '<p contenteditable>0^12|3</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(3, function() { return domSelection.focusOffset; });
  });

// Chrome does canonicalization to move boundary points to skip leading and
// trailing spaces.
testCaseWithSample('editor.setDomSelection.range.3',
  '<p contenteditable>^ 0123 |</p>',
  function(context, selection) {
    var editor = context.editor;
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq(' 0123 ', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(' 0123 ', function() { return domSelection.focusNode.nodeValue; });
    expectEq(5, function() { return domSelection.focusOffset; });
  });
