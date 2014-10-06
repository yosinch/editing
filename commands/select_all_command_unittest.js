// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// No content editable
//
testCaseFor('selectAll.noEditale.1', {
  before: '<div>foo|</div>',
  after: '<div>^foo|</div>',
  undo: false
});

testCaseWithSample('selectAll.noEditale.cancel',
  '<div>foo|</div>',
  function(context) {
    context.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var lastSelection = context.editor.getDomSelection();
    context.execCommand('selectAll');
    var domSelection = context.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
  });

//
// Content editable
//
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

testCaseWithSample('selectAll.contentEditable.cancel',
  '<div contentEditable>foo|</div>',
  function(context) {
    context.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var lastSelection = context.editor.getDomSelection();
    context.execCommand('selectAll');
    var domSelection = context.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
  });

//
// IFRAME element
//
testCaseWithSample('selectAll.frame.1',
  '|<div contenteditable><iframe></iframe></div>',
  function(context) {
    // Execute "selectAll" inside IFRAME element.
    var iframe = context.document.querySelector('iframe');
    var iframeDocument = iframe.contentDocument;
    iframeDocument.body.appendChild(iframeDocument.createTextNode('foo'));
    var iframeEditor = new editing.Editor(iframeDocument);
    var iframeContext = new editing.EditingContext(iframeEditor, 'selectAll',
        editing.ImmutableSelection.EMPTY_SELECTION);
    iframeContext.execCommand('selectAll');

    // We should select IFRAME element.
    var domSelection = context.document.getSelection();
    expectEq(context.document.body.firstChild,
             function() { return domSelection.anchorNode; });
    expectEq(0, function() { return domSelection.anchorOffset; })
    expectEq(context.document.body.firstChild,
             function() { return domSelection.focusNode; });
    expectEq(1, function() { return domSelection.focusOffset; })
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
    var domSelection = context.document.getSelection();
    expectTrue(function() { return domSelection.isCollapsed; });
    expectEq(inputElement.parentNode, function() { return domSelection.anchorNode; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(0, function() { return inputElement.selectionStart; });
    expectEq(3, function() { return inputElement.selectionEnd; });
  });

testCaseWithSample('selectAll.input.cancel',
  '<div>|foo<input value="bar">baz</div>',
  function(context) {
    var inputElement = context.document.querySelector('input');
    inputElement.focus();
    context.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var lastSelection = context.editor.getDomSelection();
    context.execCommand('selectAll');
    var domSelection = context.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
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
    var domSelection = context.document.getSelection();
    expectEq(1, function() { return domSelection.rangeCount; });
    expectTrue(function() { return selectElement.options[0].selected; });
    expectTrue(function() { return selectElement.options[1].selected; });
    expectTrue(function() { return selectElement.options[2].selected; });
  });

// SelectAll for SELECT element ins't cancelable.
testCaseWithSample('selectAll.select.multiple.cancel',
  '|<select multiple><option>1</option><option>2</option><option>3</option></select>',
  function(context) {
    var selectElement = context.document.querySelector('select');
    selectElement.focus();
    context.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var lastSelection = context.editor.getDomSelection();
    context.execCommand('selectAll');
    var domSelection = context.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
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
    var domSelection = context.document.getSelection();
    expectTrue(function() { return domSelection.isCollapsed; });
    expectEq(textAreaElement.parentNode,
             function() { return domSelection.anchorNode; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(0, function() { return textAreaElement.selectionStart; });
    expectEq(3, function() { return textAreaElement.selectionEnd; });
  });

testCaseWithSample('selectAll.textArea.cancel',
  '<div>|foo<textarea>bar</textarea>baz</div>',
  function(context) {
    var textAreaElement = context.document.querySelector('textarea');
    textAreaElement.focus();
    context.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var lastSelection = context.editor.getDomSelection();
    context.execCommand('selectAll');
    var domSelection = context.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
  });
