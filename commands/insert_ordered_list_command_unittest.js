// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('insertOrderedList.crbug.412680', {
  before: '<div contenteditable>^foo<hr>bar|</div>',
  after: '<div contenteditable><ol><li>foo</li></ol><hr><ol><li>bar</li></ol></div>',
  sampleId: 'crbug/412680',
});

testCaseFor('insertOrderedList.w3c.20.1', {
  before: '<div contenteditable><p>0^12</p><p>345</p><ol><li>67$8</li></ol><p>9ab</p><p>cde</p></div>',
  after: '<div contenteditable><p><ol><li>0^12</li><li>345</li></ol></p><ol><li>67$8</li></ol><p>9ab</p><p>cde</p></div>',
  sampleId: '20.1',
});

testCaseFor('insertOrderedList.w3c.20.2', {
  before: '<div contenteditable><p>012</p><p>3^45</p><ol><li>67$8</li></ol><p>9ab</p><p>cde</p></div>',
  after: '<div contenteditable><p>012</p><ol><li>3^45</li><li>67$8</li></ol><p>9ab</p><p>cde</p></div>',
  sampleId: '20.2',
});

testCaseFor('insertOrderedList.w3c.20.3', {
  before: '<div contenteditable><p>012</p><p>345</p><ol><li>6^78</li></ol><p>9a$b</p><p>cde</p></div>',
  after: '<div contenteditable><p>012</p><p>345</p>6^78<br><ol></ol><p><ol><li>9a$b</li></ol></p><p>cde</p></div>',
  sampleId: '20.3',
});

testCaseFor('insertOrderedList.w3c.20.4', {
  before: '<div contenteditable><p>012</p><p>345</p><ol><li>6^78</li></ol><p>9ab</p><p>cd$e</p></div>',
  after: '<div contenteditable><p>012</p><p>345</p><ol><li>6^78</li><li>9ab</li><li>cd$e</li></ol></div>',
  sampleId: '20.4',
});

testCaseFor('insertOrderedList.w3c.26.1', {
  before: '<div contenteditable><blockquote><blockquote>f^oo</blockquote></blockquote><blockquote><blockquote>bar<blockquote>ba|z</blockquote></blockquote></blockquote></div>',
  after: '<div contenteditable><blockquote><blockquote><ol><li>f^oo</li><li>bar</li><li>ba|z</li></ol></blockquote></blockquote></div>',
  sampleId: '26.1',
});

testCaseFor('insertOrderedList.w3c.58.1', {
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|<ol><li>baz</li></ol></li></ol></li></ol></div>',
  after: '<div contenteditable>^foo<br>bar|<ol><li>baz</li></ol></div>',
});

testCaseFor('insertOrderedList.w3c.58.2', {
  before: '<div contenteditable><ol><li>^foo<ol><li>bar<ol><li>baz|</li></ol></li></ol></li></ol></div>',
  after: '<div contenteditable>^foo<br>bar<br>baz|</div>',
});

testCaseFor('insertOrderedList.w3c.58.3', {
  before: '<div contenteditable><ol><li>foo<ol><li>^bar<ol><li>baz|</li></ol></li></ol></li></ol></div>',
  after: '<div contenteditable><ol><li>foo</li><li>^bar</li><li>baz</li></ol></div>',
});

testCaseFor('insertOrderedList.w3c.90.1', {
  before: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>|baz</li></ul></div>',
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol><ul><li>baz</li></ul></div>',
});

testCaseFor('insertOrderedList.w3c.90.2', {
  before: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul></div>',
  after: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol></div>',
});

// TODO(hajimehoshi): Add more tests for inline styles
testCaseFor('insertOrderedList.w3c.119.1', {
  before: '<div contenteditable><ul style="text-height:1em; text-indent:0.5em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  after: '<div contenteditable><ul style="text-height:1em; text-indent:0.5em"><li>foo</li></ul><span style="text-height:1em; text-indent:0.5em"><ol><li>^bar|</li></ol></span><ul style="text-height:1em; text-indent:0.5em"><li>baz</li></ul></div>',
  sampleId: '119.1'
});

testCaseFor('insertOrderedList.w3c.120.1', {
  before: '<div contenteditable><ul style="text-indent:1em"><li>^foo</li><li>bar</li><li>baz|</li></ul></div>',
  after: '<div contenteditable><span style="text-indent:1em"><span style="text-indent:1em"><ol><li>|foo</li></ol></span></span><span style="text-indent:1em"><span style="text-indent:1em"><ol><li>bar</li></ol></span></span><span style="text-indent:1em"><span style="text-indent:1em"><ol><li>baz</li></ol></span></span></div>',
  sampleId: '120.1'
});

testCaseFor('insertOrderedList.w3c.122.1', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: '122.1'
});
