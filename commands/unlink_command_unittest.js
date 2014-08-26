// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// IE11 doesn't work well if focus before anchor.

testCaseFor('unlink', 'nothing', {
  before: '<p contenteditable>|abcd</p>',
  after:'<p contenteditable>|abcd</p>'
});

//
// Caret
//
testCaseFor('unlink', 'caret.child', {
  before: '<p contenteditable><a href="foo">b|ar</a></p>',
  after:'<p contenteditable>b|ar</p>'
});

testCaseFor('unlink', 'caret.lastchild', {
  before: '<p contenteditable><a href="foo">bar|</a></p>',
  after:'<p contenteditable>bar|</p>'
});

testCaseFor('unlink', 'caret.descendant', {
  before: '<p contenteditable><a href="foo"><b>b|ar</b></a></p>',
  after:'<p contenteditable><b>b|ar</b></p>'
});

// Remove A element if it has "href" attribute only.
// FF: <p contenteditable>^bar|</p>
// IE: <p contenteditable>|<a href="foo">bar</a></p> Doesn't remove A
testCaseFor('unlink', 'anchor.hrefonly', {
  before: '<p contenteditable>^<a href="foo">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>'
});

// IE removes A element even if it doesn't have "HREF".
testCaseFor('unlink', 'anchor.nohref', {
  before: '<p contenteditable>^<a>bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>'
});

testCaseFor('unlink', 'anchor.nohref.other', {
  before: '<p contenteditable>^<a class="red">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>'
});

//
// Unlink with href
//
testCaseFor('unlink', 'anchor.href.class', {
  before: '<p contenteditable>^<a class="class1" href="url1">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>',
  firefox: '<p contenteditable><span class="class1">bar</span>^</p>',
  ie: '<p contenteditable>^<a class="class1" href="url1">bar</a></p>'
});

testCaseFor('unlink', 'anchor.href.id', {
  before: '<p contenteditable>^<a href="url1" id="id1">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>',
  ie: '<p contenteditable>^<a href="url1" id="id1">bar</a></p>'
});

testCaseFor('unlink', 'anchor.href.Name', {
  before: '<p contenteditable>^<a href="url1" name="id1">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>',
});

testCaseFor('unlink', 'anchor.href.style', {
  before: '<p contenteditable>^<a href="url1" style="font-weight: bold">bar</a>|</p>',
  after:'<p contenteditable>^bar|</p>',
  firefox: '<p contenteditable><a href="url1" style="font-weight: bold;">bar</a></p>',
});

//
// Unlink from whole anchor text
//
testCaseFor('unlink', 'contents.text.whole.anchor.focus', {
  before: '<p contenteditable><a href="foo">^bar|</a></p>',
  after:'<p contenteditable>^bar|</p>'
});

testCaseFor('unlink', 'contents.text.whole.focus.anchor', {
  before: '<p contenteditable><a href="foo">|bar^</a></p>',
  after:'<p contenteditable>|bar^</p>'
});

//
// Unlink from partial anchor text
//
testCaseFor('unlink', 'contents.text.partial.anchor.focus', {
  before: '<p contenteditable><a href="foo">ab^cd|ef</a></p>',
  after:'<p contenteditable>ab^cd|ef</p>'
});

testCaseFor('unlink', 'contents.text.partial.focus.anchor', {
  before: '<p contenteditable><a href="foo">ab|cd^ef</a></p>',
  after:'<p contenteditable>ab|cd^ef</p>'
});

//
// Unlink from partial anchor content
//
testCaseFor('unlink', 'contents.partial.anchor.focus', {
  before: '<p contenteditable><a href="foo"><b>ab^cd|ef</b></a></p>',
  after:'<p contenteditable><b>ab^cd|ef</b></p>'
});

testCaseFor('unlink', 'contents.nodes.partial.anchor.focus', {
  before: '<p contenteditable><a href="foo"><b>ab^c</b>d|e</a></p>',
  after:'<p contenteditable><b>ab^c</b>d|e</p>'
});

testCaseFor('unlink', 'contents.nodes.partial.focus.anchor', {
  before: '<p contenteditable><a href="foo"><b>ab|c</b>d^e</a></p>',
  after:'<p contenteditable><b>ab|c</b>d^e</p>'
});

//
// Unlink multiple anchor elements
//
testCaseFor('unlink', 'multiple.whole.anchor.focus', {
  before: '<p contenteditable>^<a href="foo">bar</a><a href="foo2">bar2</a>|</p>',
  after:'<p contenteditable>^barbar2|</p>',
});

testCaseFor('unlink', 'multiple.whole.focus.anchor', {
  before: '<p contenteditable>|<a href="foo">bar</a><a href="foo2">bar2</a>^</p>',
  after:'<p contenteditable>|barbar2^</p>',
});

testCaseFor('unlink', 'multiple.partial.anchor.focus', {
  before: '<p contenteditable><a href="foo">a^bc</a>d<a href="foo2">e|f</a></p>',
  after:'<p contenteditable>a^bcde|f</p>',
});

testCaseFor('unlink', 'multiple.partial.focus.anchor', {
  before: '<p contenteditable><a href="foo">a|bc</a>d<a href="foo2">e^f</a></p>',
  after:'<p contenteditable>a|bcde^f</p>',
  firefox: '<p contenteditable>abcd<a href="foo2">ef</a></p>'
});

//
// Nested anchor elements
//
testCaseFor('unlink', 'multiple.Nested', {
  // TODO(yosi) Since the parser automatically insert "</a>" to avoid nested
  // A elements, we should make nested A elements by script.
  x_before: '<p contenteditable>^<a href="foo">abc<a>def</a></a>|</p>',
  before: '<p contenteditable>^<a href="foo">abc</a><a>def</a>|</p>',
  after:'<p contenteditable>^abcdef|</p>',
});
