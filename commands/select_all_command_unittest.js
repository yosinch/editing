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
  function(sample) {
    sample.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var editor = editing.Editor.getOrCreate(sample.document);
    var lastSelection = editor.getSelectionFromDom();
    editor.execCommand('selectAll');
    var domSelection = editor.document.getSelection();
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
  before: '<div contenteditable>foo|<p contenteditable>bar</p>baz</div>',
  sampleId: 'editing/selection/mixed-editability-6.html',
  undo: false
});

// Note: We should BR should be selected too, but Chrome doesn't.
// http://jsfiddle.net/1q9jwehp/
testCaseFor('selectAll.contentEditable.3', {
  after: '<div contenteditable>^<input>|<br></div>',
  before: '<div contenteditable>|<input><br></div>',
  sampleId: 'editing/inserting/5994480-2.html',
  undo: false
});

testCaseWithSample('selectAll.contentEditable.cancel',
  '<div contenteditable>foo|</div>',
  function(sample) {
    sample.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var editor = editing.Editor.getOrCreate(sample.document);
    var lastSelection = editor.getSelectionFromDom();
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
  });

testCaseFor('selectAll.contentEditable.mixed', {
  after: '<div contenteditable>|foo<p contenteditable="false">bar<b contenteditable>baz</b></p></div>',
  before: '<div contenteditable>foo<p contenteditable="false">bar<b contenteditable>|baz</b></p></div>',
  undo: false
});

//
// IFRAME element
//
testCaseWithSample('selectAll.frame.1',
  '|<div contenteditable><iframe></iframe></div>',
  function(sample) {
    // Execute "selectAll" inside IFRAME element.
    var iframe = sample.document.querySelector('iframe');
    var iframeDocument = iframe.contentDocument;
    iframeDocument.body.appendChild(iframeDocument.createTextNode('foo'));
    var iframeEditor = new editing.Editor(iframeDocument);
    iframeEditor.execCommand('selectAll');

    // We should select IFRAME element.
    var domSelection = sample.document.getSelection();
    expectEq(sample.document.body.firstChild,
             function() { return domSelection.anchorNode; });
    expectEq(0, function() { return domSelection.anchorOffset; })
    expectEq(sample.document.body.firstChild,
             function() { return domSelection.focusNode; });
    expectEq(1, function() { return domSelection.focusOffset; })
  });

//
// INPUT element
//
testCaseWithSample('selectAll.input.1',
  '<div>|foo<input value="bar">baz</div>',
  function(sample) {
    var inputElement = sample.document.querySelector('input');
    inputElement.focus();
    //inputElement.setSelectionRange(1, 1);
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
    expectTrue(function() { return domSelection.isCollapsed; });
    expectEq(inputElement.parentNode, function() { return domSelection.anchorNode; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(0, function() { return inputElement.selectionStart; });
    expectEq(3, function() { return inputElement.selectionEnd; });
  });

testCaseFor('selectAll.input.2', {
  after: '<div>^foo<input value="bar">baz|</div>',
  before: '<div>foo|<input value="bar">b^az</div>',
  undo: false
});

testCaseWithSample('selectAll.input.cancel',
  '<div>|foo<input value="bar">baz</div>',
  function(sample) {
    var inputElement = sample.document.querySelector('input');
    inputElement.focus();
    sample.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var editor = editing.Editor.getOrCreate(sample.document);
    var lastSelection = editor.getSelectionFromDom();
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
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
  function(sample) {
    var selectElement = sample.document.querySelector('select');
    selectElement.focus();
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
    expectEq(1, function() { return domSelection.rangeCount; });
    expectTrue(function() { return selectElement.options[0].selected; });
    expectTrue(function() { return selectElement.options[1].selected; });
    expectTrue(function() { return selectElement.options[2].selected; });
  });

// SelectAll for SELECT element ins't cancelable.
testCaseWithSample('selectAll.select.multiple.cancel',
  '|<select multiple><option>1</option><option>2</option><option>3</option></select>',
  function(sample) {
    var selectElement = sample.document.querySelector('select');
    selectElement.focus();
    sample.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var editor = editing.Editor.getOrCreate(sample.document);
    var lastSelection = editor.getSelectionFromDom();
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
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
// Shadow
//
(function () {

  function installShadowTree(sample, host) {
    var document = host.ownerDocument;
    var shadowRoot = host.createShadowRoot();
    var shadowTree = sample.document.querySelector('template')
          .content.cloneNode(true);
    shadowRoot.appendChild(shadowTree);
  }

  // Select host content => select all => select all on document
  testCaseWithSample('selectAll.shadow.1',
    '<div>|before<p>host</p>after</div><template>BEFORE<b><content></b>AFTER</template>',
    function(sample) {
      var host = sample.document.querySelector('p');
      installShadowTree(sample, host);

      // Select
      var domSelection = sample.document.getSelection();
      domSelection.collapse(host, 0);

      // Run "selectAll"
      var editor = editing.Editor.getOrCreate(sample.document);
      editor.execCommand('selectAll');

      expectEq('before', function() { return domSelection.anchorNode.nodeValue; });
      expectEq(0, function() { return domSelection.anchorOffset; });
      expectEq('after', function() { return domSelection.focusNode.nodeValue; });
      expectEq(5, function() { return domSelection.focusOffset; });
    });

  // Select shadow tree => select all => select shadow host
  testCaseWithSample('selectAll.shadow.2',
    '<div>|before<p>host</p>after</div><template>BEFORE<b><content></b>AFTER</template>',
    function(sample) {
      var host = sample.document.querySelector('p');
      installShadowTree(sample, host);

      // Select node in shadow tree
      var domSelection = sample.document.getSelection();
      domSelection.collapse(host.shadowRoot.firstChild, 0);
      domSelection.extend(host.shadowRoot.firstChild, 2);

      // Run "selectAll"
      var editor = editing.Editor.getOrCreate(sample.document);
      editor.execCommand('selectAll');

      var div = sample.document.body.firstChild;
      expectEq(div, function() { return domSelection.anchorNode; });
      expectEq(1, function() { return domSelection.anchorOffset; });
      expectEq(div, function() { return domSelection.focusNode; });
      expectEq(1, function() { return domSelection.focusOffset; });
    });

  // Select host content in editable => select all => select all in editable
  testCaseWithSample('selectAll.shadow.editable.1',
    '<div>foo<div contenteditable>|before<p>host</p>after</div>bar</div>baz<template>BEFORE<b><content></b>AFTER</template>',
    function(sample) {
      var host = sample.document.querySelector('p');
      installShadowTree(sample, host);

      // Select
      var domSelection = sample.document.getSelection();
      domSelection.collapse(host, 0);

      // Run "selectAll"
      var editor = editing.Editor.getOrCreate(sample.document);
      editor.execCommand('selectAll');

      expectEq('before', function() { return domSelection.anchorNode.nodeValue; });
      expectEq(0, function() { return domSelection.anchorOffset; });
      expectEq('after', function() { return domSelection.focusNode.nodeValue; });
      expectEq(5, function() { return domSelection.focusOffset; });
    });

  // Select shadow tree in editable => select all => select host
  testCaseWithSample('selectAll.shadow.editable.2',
    '<div>foo<div contenteditable>|before<p>host</p>after</div>bar</div>baz<template>BEFORE<b><content></b>AFTER</template>',
    function(sample) {
      var host = sample.document.querySelector('p');
      installShadowTree(sample, host);

      // Select node in shadow tree
      var domSelection = sample.document.getSelection();
      var range = sample.document.createRange();
      range.setStart(host.shadowRoot.firstChild, 0);
      domSelection.removeAllRanges();
      domSelection.addRange(range);

      // Run "selectAll"
      var editor = editing.Editor.getOrCreate(sample.document);
      editor.execCommand('selectAll');

      var editable = sample.document.querySelector('div[contenteditable]');
      expectEq(editable, function() { return domSelection.anchorNode; });
      expectEq(1, function() { return domSelection.anchorOffset; });
      expectEq(editable, function() { return domSelection.focusNode; });
      expectEq(1, function() { return domSelection.focusOffset; });
    });
})();

//
// TEXTAREA element
//
testCaseWithSample('selectAll.textArea.1',
  '<div>|foo<textarea>bar</textarea>baz</div>',
  function(sample) {
    var textAreaElement = sample.document.querySelector('textarea');
    textAreaElement.focus();
    textAreaElement.setSelectionRange(1, 1);
    var editor = editing.Editor.getOrCreate(sample.document);
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
    expectTrue(function() { return domSelection.isCollapsed; });
    expectEq(textAreaElement.parentNode,
             function() { return domSelection.anchorNode; });
    expectEq(1, function() { return domSelection.anchorOffset; });
    expectEq(0, function() { return textAreaElement.selectionStart; });
    expectEq(3, function() { return textAreaElement.selectionEnd; });
  });

testCaseWithSample('selectAll.textArea.cancel',
  '<div>|foo<textarea>bar</textarea>baz</div>',
  function(sample) {
    var textAreaElement = sample.document.querySelector('textarea');
    textAreaElement.focus();
    sample.document.addEventListener('selectstart', function(event) {
      event.preventDefault();
    });
    var editor = editing.Editor.getOrCreate(sample.document);
    var lastSelection = editor.getSelectionFromDom();
    editor.execCommand('selectAll');
    var domSelection = sample.document.getSelection();
    expectEq(lastSelection.anchorNode,
             function() { return domSelection.anchorNode; });
    expectEq(lastSelection.anchorOffset,
             function() { return domSelection.anchorOffset; });
    expectEq(lastSelection.focusNode,
             function() { return domSelection.focusNode; });
    expectEq(lastSelection.focusOffset,
             function() { return domSelection.focusOffset; });
  });
