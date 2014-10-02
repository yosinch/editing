// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// content editable
//
testCaseFor('selectAll.noEditale.1', {
  before: '<div>foo|</div>',
  after: '<div>^foo|</div>',
  undo: false
});

testCaseFor('selectAll.contentEditable.1', {
  before: '<div><p contenteditable>foo|</p></div>',
  after: '<div><p contenteditable>^foo|</p></div>',
  undo: false
});

// Node: Chrome doesn't allow set focus to P element in below example.
testCaseFor('selectAll.contentEditable.2', {
  after: '<div contenteditable>^foo<p contenteditable>bar</p>baz|</div>',
  before: '<div contentEditable>foo|<p contenteditable>bar</p>baz</div>',
  undo: false
});

//
// INPUT element
//
testCaseWithSample('selectAll.input.1',
  '<div>|foo<input value="bar">baz</div>',
  function(context) {
    var inputElement = context.document.querySelector('input');
    inputElement.focus();
    inputElement.setSelectionRange(1, 1);
    context.execCommand('selectAll');
    var selection = context.endingSelection;
    expectTrue(function() { return context.endingSelection.isCaret; });
    expectEq(inputElement.parentNode, function() { return selection.anchorNode; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq(0, function() { return inputElement.selectionStart; });
    expectEq(3, function() { return inputElement.selectionEnd; });
  });

//
// SELECT element
// Sample: http://jsfiddle.net/1q1h8v5v/
//
testCaseWithSample('selectAll.select.multiple',
  '|<select multiple><option>1</option><option>2</option><option>3</option></select>',
  function(context) {
    var selectElement = context.document.querySelector('select');
    selectElement.focus();
    context.execCommand('selectAll');
    expectTrue(function() { return context.endingSelection.isEmpty; });
    expectTrue(function() { return selectElement.options[0].selected; });
    expectTrue(function() { return selectElement.options[1].selected; });
    expectTrue(function() { return selectElement.options[2].selected; });
  });

testCaseFor('selectAll.select.single', {
  after: '<div>^foo<select><option>1</option><option selected>2</option><option>3</option></select>bar|</div>',
  before: '<div>foo|<select><option>1</option><option selected>2</option><option>3</option></select>bar</div>',
  undo: false
});

//
// TEXTAREA element
//
testCaseWithSample('selectAll.textArea.1',
  '<div>|foo<textarea>bar</textarea>baz</div>',
  function(context) {
    var textAreaElement = context.document.querySelector('textarea');
    textAreaElement.focus();
    textAreaElement.setSelectionRange(1, 1);
    context.execCommand('selectAll');
    var selection = context.endingSelection;
    expectTrue(function() { return context.endingSelection.isCaret; });
    expectEq(textAreaElement.parentNode, function() { return selection.anchorNode; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq(0, function() { return textAreaElement.selectionStart; });
    expectEq(3, function() { return textAreaElement.selectionEnd; });
  });
