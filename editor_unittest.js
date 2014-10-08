// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// getDomSelection
//
testCaseWithSample('editor.getDomSelection.1',
  // editing/style/apply-style-atomic.html
  '<div contenteditable>|1<progress><a style>2</a></progress></div>',
  function(sample) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var range = sample.document.createRange();
    range.selectNodeContents(sample.document.querySelector('div'));
    sample.document.getSelection().removeAllRanges();
    sample.document.getSelection().addRange(range);
    // |range| start is DIV,0 and end is DIV,2
    // selection.anchor is "1",0 and focus is DIV,2
    var selection = editor.getDomSelection();
    expectEq('1', function() { return selection.anchorNode.nodeValue; });
    expectEq(0, function() { return selection.anchorOffset; });
    expectEq('DIV', function() { return selection.focusNode.nodeName; });
    expectEq(2, function() { return selection.focusOffset; });
    expectEq(editing.SelectionDirection.ANCHOR_IS_START,
             function() { return selection.direction; });
  });

//
// setDomSelection
//
testCaseWithSample('editor.setDomSelection.caret.1',
  '<p contenteditable>|0123</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(0, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(0, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.2',
  '<p contenteditable>0|123</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(1, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.3',
  '<p contenteditable>0123|</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(4, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.4',
  '<p contenteditable>| 0123</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq(' 0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(' 0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(1, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.caret.5',
  '<p contenteditable>0123 |</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123 ', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(4, function() { return domSelection.anchorOffset; });
    expectEq('0123 ', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.range.1',
  '<p contenteditable>^0123|</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq('0123', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(0, function() { return domSelection.anchorOffset; });
    expectEq('0123', function() { return domSelection.focusNode.nodeValue; });
    expectEq(4, function() { return domSelection.focusOffset; });
  });

testCaseWithSample('editor.setDomSelection.range.2',
  '<p contenteditable>0^12|3</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
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
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.setDomSelection(selection);
    var domSelection = editor.document.getSelection();
    expectEq(' 0123 ', function() { return domSelection.anchorNode.nodeValue; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(' 0123 ', function() { return domSelection.focusNode.nodeValue; });
    expectEq(5, function() { return domSelection.focusOffset; });
  });
