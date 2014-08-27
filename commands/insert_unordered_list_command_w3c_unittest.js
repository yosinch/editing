// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This test is generated from https://dvcs.w3.org/hg/editing/raw-file/tip/conformancetest/data.js
// in HTML Editing APIs specification of https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html

'use strict';

// 295 test cases
testCaseFor('insertUnorderedList', 'w3c.1', {
  after: '<div contenteditable><ul><li>foo|bar</li></ul></div>',
  before: '<div contenteditable>foo|bar</div>',
  sampleId: 1
});

testCaseFor('insertUnorderedList', 'w3c.2', {
  after: '<div contenteditable><ul><li>foo^bar|baz</li></ul></div>',
  before: '<div contenteditable>foo^bar|baz</div>',
  sampleId: 2
});

testCaseFor('insertUnorderedList', 'w3c.2r', {
  after: '<div contenteditable><ul><li>foo^bar|baz</li></ul></div>',
  before: '<div contenteditable>foo|bar^baz</div>',
  sampleId: '2r'
});

testCaseFor('insertUnorderedList', 'w3c.3', {
  after: '<div contenteditable>foo<br><ul><li>^bar|</li></ul></div>',
  before: '<div contenteditable>foo<br>^bar|</div>',
  sampleId: 3
});

testCaseFor('insertUnorderedList', 'w3c.3r', {
  after: '<div contenteditable>foo<br><ul><li>^bar|</li></ul></div>',
  before: '<div contenteditable>foo<br>|bar^</div>',
  sampleId: '3r'
});

testCaseFor('insertUnorderedList', 'w3c.4', {
  after: '<div contenteditable><ul><li>f^oo</li><li>b|ar</li></ul>baz</div>',
  before: '<div contenteditable>f^oo<br>b|ar<br>baz</div>',
  sampleId: 4
});

testCaseFor('insertUnorderedList', 'w3c.4r', {
  after: '<div contenteditable><ul><li>f^oo</li><li>b|ar</li></ul>baz</div>',
  before: '<div contenteditable>f|oo<br>b^ar<br>baz</div>',
  sampleId: '4r'
});

testCaseFor('insertUnorderedList', 'w3c.5', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul>bar</p></div>',
  before: '<div contenteditable><p>^foo|<br>bar</p></div>',
  sampleId: 5
});

testCaseFor('insertUnorderedList', 'w3c.5r', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul>bar</p></div>',
  before: '<div contenteditable><p>|foo^<br>bar</p></div>',
  sampleId: '5r'
});

testCaseFor('insertUnorderedList', 'w3c.6', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>^foo<ol><li>bar|</li></ol>baz</div>',
  sampleId: 6
});

testCaseFor('insertUnorderedList', 'w3c.6r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>|foo<ol><li>bar^</li></ol>baz</div>',
  sampleId: '6r'
});

testCaseFor('insertUnorderedList', 'w3c.7', {
  after: '<div contenteditable>foo<ul><li>^bar</li><li>baz|</li></ul></div>',
  before: '<div contenteditable>foo<ol><li>^bar</li></ol>baz|</div>',
  sampleId: 7
});

testCaseFor('insertUnorderedList', 'w3c.7r', {
  after: '<div contenteditable>foo<ul><li>^bar</li><li>baz|</li></ul></div>',
  before: '<div contenteditable>foo<ol><li>|bar</li></ol>baz^</div>',
  sampleId: '7r'
});

testCaseFor('insertUnorderedList', 'w3c.8', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>^foo<ul><li>bar|</li></ul>baz</div>',
  sampleId: 8
});

testCaseFor('insertUnorderedList', 'w3c.8r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>|foo<ul><li>bar^</li></ul>baz</div>',
  sampleId: '8r'
});

testCaseFor('insertUnorderedList', 'w3c.9', {
  after: '<div contenteditable>foo<br>^bar<br><ul><li>baz|</li></ul></div>',
  before: '<div contenteditable>foo<ul><li>^bar</li></ul>baz|</div>',
  sampleId: 9
});

testCaseFor('insertUnorderedList', 'w3c.9r', {
  after: '<div contenteditable>foo<br>^bar<br><ul><li>baz|</li></ul></div>',
  before: '<div contenteditable>foo<ul><li>|bar</li></ul>baz^</div>',
  sampleId: '9r'
});

testCaseFor('insertUnorderedList', 'w3c.10', {
  after: '<div contenteditable>foo<br>^bar<br><ul><li>baz|</li></ul>quz</div>',
  before: '<div contenteditable>foo<ul><li>^bar</li></ul><ol><li>baz|</li></ol>quz</div>',
  sampleId: 10
});

testCaseFor('insertUnorderedList', 'w3c.10r', {
  after: '<div contenteditable>foo<br>^bar<br><ul><li>baz|</li></ul>quz</div>',
  before: '<div contenteditable>foo<ul><li>|bar</li></ul><ol><li>baz^</li></ol>quz</div>',
  sampleId: '10r'
});

testCaseFor('insertUnorderedList', 'w3c.11', {
  after: '<div contenteditable>foo<ul><li>^bar</li><li>baz|</li></ul>quz</div>',
  before: '<div contenteditable>foo<ol><li>^bar</li></ol><ul><li>baz|</li></ul>quz</div>',
  sampleId: 11
});

testCaseFor('insertUnorderedList', 'w3c.11r', {
  after: '<div contenteditable>foo<ul><li>^bar</li><li>baz|</li></ul>quz</div>',
  before: '<div contenteditable>foo<ol><li>|bar</li></ol><ul><li>baz^</li></ul>quz</div>',
  sampleId: '11r'
});

testCaseFor('insertUnorderedList', 'w3c.12', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td><ul><li>^b|ar</li></ul></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b^a|r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: 12
});

testCaseFor('insertUnorderedList', 'w3c.12r', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td><ul><li>^b|ar</li></ul></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b|a^r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: '12r'
});

testCaseFor('insertUnorderedList', 'w3c.13', {
  after: '<div contenteditable><table><tbody><tr><td><ul><li>fo^o</li></ul></td><td><ul><li>b|ar</li></ul></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>fo^o</td><td>b|ar</td><td>baz</td></tr></tbody></table></div>',
  sampleId: 13
});

testCaseFor('insertUnorderedList', 'w3c.13r', {
  after: '<div contenteditable><table><tbody><tr><td><ul><li>fo^o</li></ul></td><td><ul><li>b|ar</li></ul></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>fo|o</td><td>b^ar</td><td>baz</td></tr></tbody></table></div>',
  sampleId: '13r'
});

testCaseFor('insertUnorderedList', 'w3c.14', {
  after: '<div contenteditable><ul><li>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</li></ul></div>',
  before: '<div contenteditable>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</div>',
  sampleId: 14
});

testCaseFor('insertUnorderedList', 'w3c.14r', {
  after: '<div contenteditable><ul><li>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</li></ul></div>',
  before: '<div contenteditable>|<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>^</div>',
  sampleId: '14r'
});

testCaseFor('insertUnorderedList', 'w3c.15', {
  after: '<div contenteditable><p>foo</p><p><ul><li>^bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>^bar|</p><p>baz</p></div>',
  sampleId: 15
});

testCaseFor('insertUnorderedList', 'w3c.15r', {
  after: '<div contenteditable><p>foo</p><p><ul><li>^bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>|bar^</p><p>baz</p></div>',
  sampleId: '15r'
});

testCaseFor('insertUnorderedList', 'w3c.16', {
  after: '<div contenteditable><p>foo</p><p><ul><li>^bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>^bar|</p><p>baz</p></div>',
  sampleId: 16
});

testCaseFor('insertUnorderedList', 'w3c.16r', {
  after: '<div contenteditable><p>foo</p><p><ul><li>^bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>|bar^</p><p>baz</p></div>',
  sampleId: '16r'
});

testCaseFor('insertUnorderedList', 'w3c.17', {
  after: '<div contenteditable><p>foo</p><blockquote><ul><li>^bar|</li></ul></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote>^bar|</blockquote><p>baz</p></div>',
  sampleId: 17
});

testCaseFor('insertUnorderedList', 'w3c.17r', {
  after: '<div contenteditable><p>foo</p><blockquote><ul><li>^bar|</li></ul></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote>|bar^</blockquote><p>baz</p></div>',
  sampleId: '17r'
});

testCaseFor('insertUnorderedList', 'w3c.18', {
  after: '<div contenteditable><dl><dt>foo</dt>^bar|<br><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>^bar|</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: 18
});

testCaseFor('insertUnorderedList', 'w3c.18r', {
  after: '<div contenteditable><dl><dt>foo</dt>^bar|<br><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>|bar^</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: '18r'
});

testCaseFor('insertUnorderedList', 'w3c.19', {
  after: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd>^baz|<br><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><dt>^baz|</dt><dd>quz</dd></dl></div>',
  sampleId: 19
});

testCaseFor('insertUnorderedList', 'w3c.19r', {
  after: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd>^baz|<br><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><dt>|baz^</dt><dd>quz</dd></dl></div>',
  sampleId: '19r'
});

testCaseFor('insertUnorderedList', 'w3c.20', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><p>bar|</p><p>baz</p></div>',
  sampleId: 20
});

testCaseFor('insertUnorderedList', 'w3c.20r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><p>bar^</p><p>baz</p></div>',
  sampleId: '20r'
});

testCaseFor('insertUnorderedList', 'w3c.21', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><p>bar|</p><p>baz</p></div>',
  sampleId: 21
});

testCaseFor('insertUnorderedList', 'w3c.21r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><p>bar^</p><p>baz</p></div>',
  sampleId: '21r'
});

testCaseFor('insertUnorderedList', 'w3c.22', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote>bar|</blockquote><p>baz</p></div>',
  sampleId: 22
});

testCaseFor('insertUnorderedList', 'w3c.22r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote>bar^</blockquote><p>baz</p></div>',
  sampleId: '22r'
});

testCaseFor('insertUnorderedList', 'w3c.23', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote>bar|</blockquote><p>baz</p></div>',
  sampleId: 23
});

testCaseFor('insertUnorderedList', 'w3c.23r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote>bar^</blockquote><p>baz</p></div>',
  sampleId: '23r'
});

testCaseFor('insertUnorderedList', 'w3c.24', {
  after: '<div contenteditable><dl><ul><dt>^foo</dt><dd>bar|</dd></ul><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>^foo</dt><dd>bar|</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: 24
});

testCaseFor('insertUnorderedList', 'w3c.24r', {
  after: '<div contenteditable><dl><ul><dt>^foo</dt><dd>bar|</dd></ul><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>|foo</dt><dd>bar^</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: '24r'
});

testCaseFor('insertUnorderedList', 'w3c.25', {
  after: '<div contenteditable><dl><dt>foo</dt><ul><dd>^bar</dd><dt>baz|</dt></ul><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>^bar</dd><dt>baz|</dt><dd>quz</dd></dl></div>',
  sampleId: 25
});

testCaseFor('insertUnorderedList', 'w3c.25r', {
  after: '<div contenteditable><dl><dt>foo</dt><ul><dd>^bar</dd><dt>baz|</dt></ul><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>|bar</dd><dt>baz^</dt><dd>quz</dd></dl></div>',
  sampleId: '25r'
});

testCaseFor('insertUnorderedList', 'w3c.26', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p><p>baz</p></blockquote></div>',
  sampleId: 26
});

testCaseFor('insertUnorderedList', 'w3c.26r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p><p>baz</p></blockquote></div>',
  sampleId: '26r'
});

testCaseFor('insertUnorderedList', 'w3c.27', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p><p>baz</p></blockquote></div>',
  sampleId: 27
});

testCaseFor('insertUnorderedList', 'w3c.27r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p><p>baz</p></blockquote></div>',
  sampleId: '27r'
});

testCaseFor('insertUnorderedList', 'w3c.28', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol></div>',
  sampleId: 28
});

testCaseFor('insertUnorderedList', 'w3c.28r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><li>baz</li></ol></div>',
  sampleId: '28r'
});

testCaseFor('insertUnorderedList', 'w3c.29', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>^bar|</div>',
  sampleId: 29
});

testCaseFor('insertUnorderedList', 'w3c.29r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>|bar^</div>',
  sampleId: '29r'
});

testCaseFor('insertUnorderedList', 'w3c.30', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol></div>',
  before: '<div contenteditable>^foo|<ol><li>bar</li></ol></div>',
  sampleId: 30
});

testCaseFor('insertUnorderedList', 'w3c.30r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol></div>',
  before: '<div contenteditable>|foo^<ol><li>bar</li></ol></div>',
  sampleId: '30r'
});

testCaseFor('insertUnorderedList', 'w3c.31', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol></div>',
  sampleId: 31
});

testCaseFor('insertUnorderedList', 'w3c.31r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>|bar^<ol><li>baz</li></ol></div>',
  sampleId: '31r'
});

testCaseFor('insertUnorderedList', 'w3c.32', {
  after: '<div contenteditable><ol><ul><li>^foo|</li></ul></ol></div>',
  before: '<div contenteditable><ol><ol><li>^foo|</li></ol></ol></div>',
  sampleId: 32
});

testCaseFor('insertUnorderedList', 'w3c.32r', {
  after: '<div contenteditable><ol><ul><li>^foo|</li></ul></ol></div>',
  before: '<div contenteditable><ol><ol><li>|foo^</li></ol></ol></div>',
  sampleId: '32r'
});

testCaseFor('insertUnorderedList', 'w3c.33', {
  after: '<div contenteditable><ul><li>^foo|</li></ul>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<br>bar</li><li>baz</li></ol></div>',
  sampleId: 33
});

testCaseFor('insertUnorderedList', 'w3c.33r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<br>bar</li><li>baz</li></ol></div>',
  sampleId: '33r'
});

testCaseFor('insertUnorderedList', 'w3c.34', {
  after: '<div contenteditable>foo<br><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>^bar|</li><li>baz</li></ol></div>',
  sampleId: 34
});

testCaseFor('insertUnorderedList', 'w3c.34r', {
  after: '<div contenteditable>foo<br><ul><li>^bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>|bar^</li><li>baz</li></ol></div>',
  sampleId: '34r'
});

testCaseFor('insertUnorderedList', 'w3c.35', {
  after: '<div contenteditable><div><ul><li>^foo|</li></ul></div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>^foo|</div>bar</li><li>baz</li></ol></div>',
  sampleId: 35
});

testCaseFor('insertUnorderedList', 'w3c.35r', {
  after: '<div contenteditable><div><ul><li>^foo|</li></ul></div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>|foo^</div>bar</li><li>baz</li></ol></div>',
  sampleId: '35r'
});

testCaseFor('insertUnorderedList', 'w3c.36', {
  after: '<div contenteditable><ol><li>foo<ul><li>^bar|</li></ul><ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>^bar|</li><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: 36
});

testCaseFor('insertUnorderedList', 'w3c.36r', {
  after: '<div contenteditable><ol><li>foo<ul><li>^bar|</li></ul><ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>|bar^</li><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: '36r'
});

testCaseFor('insertUnorderedList', 'w3c.37', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>^baz|</li></ol></li><li>quz</li></ol></div>',
  sampleId: 37
});

testCaseFor('insertUnorderedList', 'w3c.37r', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>|baz^</li></ol></li><li>quz</li></ol></div>',
  sampleId: '37r'
});

testCaseFor('insertUnorderedList', 'w3c.38', {
  after: '<div contenteditable><ol><li>foo</li><ul><li>^bar|</li></ul><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>^bar|</li><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: 38
});

testCaseFor('insertUnorderedList', 'w3c.38r', {
  after: '<div contenteditable><ol><li>foo</li><ul><li>^bar|</li></ul><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>|bar^</li><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: '38r'
});

testCaseFor('insertUnorderedList', 'w3c.39', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li></ol><ul><li>^baz|</li></ul><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>^baz|</li></ol><li>quz</li></ol></div>',
  sampleId: 39
});

testCaseFor('insertUnorderedList', 'w3c.39r', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li></ol><ul><li>^baz|</li></ul><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>|baz^</li></ol><li>quz</li></ol></div>',
  sampleId: '39r'
});

testCaseFor('insertUnorderedList', 'w3c.40', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: 40
});

testCaseFor('insertUnorderedList', 'w3c.40r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: '40r'
});

testCaseFor('insertUnorderedList', 'w3c.41', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: 41
});

testCaseFor('insertUnorderedList', 'w3c.41r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: '41r'
});

testCaseFor('insertUnorderedList', 'w3c.42', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: 42
});

testCaseFor('insertUnorderedList', 'w3c.42r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: '42r'
});

testCaseFor('insertUnorderedList', 'w3c.43', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: 43
});

testCaseFor('insertUnorderedList', 'w3c.43r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar|</li></ul><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: '43r'
});

testCaseFor('insertUnorderedList', 'w3c.44', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol><ul><li>^quz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>^quz|</li></ol></div>',
  sampleId: 44
});

testCaseFor('insertUnorderedList', 'w3c.44r', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol><ul><li>^quz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>|quz^</li></ol></div>',
  sampleId: '44r'
});

testCaseFor('insertUnorderedList', 'w3c.45', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol><ul><li>^quz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>^quz|</li></ol></div>',
  sampleId: 45
});

testCaseFor('insertUnorderedList', 'w3c.45r', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol><ul><li>^quz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>|quz^</li></ol></div>',
  sampleId: '45r'
});

testCaseFor('insertUnorderedList', 'w3c.46', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar</li><li>baz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar</li><li>baz|</li></ol></div>',
  sampleId: 46
});

testCaseFor('insertUnorderedList', 'w3c.46r', {
  after: '<div contenteditable><ol><li>foo</li></ol><ul><li>^bar</li><li>baz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar</li><li>baz^</li></ol></div>',
  sampleId: '46r'
});

testCaseFor('insertUnorderedList', 'w3c.47', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol></li><li>baz</li></ol></div>',
  sampleId: 47
});

testCaseFor('insertUnorderedList', 'w3c.47r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol></li><li>baz</li></ol></div>',
  sampleId: '47r'
});

testCaseFor('insertUnorderedList', 'w3c.48', {
  after: '<div contenteditable><ol><li>foo<ul><li>b^ar</li></ul></li></ol><ul><li>b|az</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b^ar</li></ol></li><li>b|az</li></ol></div>',
  sampleId: 48
});

testCaseFor('insertUnorderedList', 'w3c.48r', {
  after: '<div contenteditable><ol><li>foo<ul><li>b^ar</li></ul></li></ol><ul><li>b|az</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b|ar</li></ol></li><li>b^az</li></ol></div>',
  sampleId: '48r'
});

testCaseFor('insertUnorderedList', 'w3c.49', {
  after: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul><p>extra</p></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol><p>extra</p></div>',
  sampleId: 49
});

testCaseFor('insertUnorderedList', 'w3c.49r', {
  after: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul><p>extra</p></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar</li></ol></li><li>baz^</li></ol><p>extra</p></div>',
  sampleId: '49r'
});

testCaseFor('insertUnorderedList', 'w3c.50', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: 50
});

testCaseFor('insertUnorderedList', 'w3c.50r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: '50r'
});

testCaseFor('insertUnorderedList', 'w3c.51', {
  after: '<div contenteditable><ol><li>foo<ul><li>^bar|</li></ul>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>^bar|</li></ol>baz</li></ol></div>',
  sampleId: 51
});

testCaseFor('insertUnorderedList', 'w3c.51r', {
  after: '<div contenteditable><ol><li>foo<ul><li>^bar|</li></ul>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>|bar^</li></ol>baz</li></ol></div>',
  sampleId: '51r'
});

testCaseFor('insertUnorderedList', 'w3c.52', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>^baz|</li></ol></div>',
  sampleId: 52
});

testCaseFor('insertUnorderedList', 'w3c.52r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>|baz^</li></ol></div>',
  sampleId: '52r'
});

testCaseFor('insertUnorderedList', 'w3c.53', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol>baz</li></ol></div>',
  sampleId: 53
});

testCaseFor('insertUnorderedList', 'w3c.53r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol>baz</li></ol></div>',
  sampleId: '53r'
});

testCaseFor('insertUnorderedList', 'w3c.54', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 54
});

testCaseFor('insertUnorderedList', 'w3c.54r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '54r'
});

testCaseFor('insertUnorderedList', 'w3c.55', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 55
});

testCaseFor('insertUnorderedList', 'w3c.55r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '55r'
});

testCaseFor('insertUnorderedList', 'w3c.56', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>^bar|</div>',
  sampleId: 56
});

testCaseFor('insertUnorderedList', 'w3c.56r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>|bar^</div>',
  sampleId: '56r'
});

testCaseFor('insertUnorderedList', 'w3c.57', {
  after: '<div contenteditable><ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable>^foo|<ul><li>bar</li></ul></div>',
  sampleId: 57
});

testCaseFor('insertUnorderedList', 'w3c.57r', {
  after: '<div contenteditable><ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable>|foo^<ul><li>bar</li></ul></div>',
  sampleId: '57r'
});

testCaseFor('insertUnorderedList', 'w3c.58', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul></div>',
  sampleId: 58
});

testCaseFor('insertUnorderedList', 'w3c.58r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>|bar^<ul><li>baz</li></ul></div>',
  sampleId: '58r'
});

testCaseFor('insertUnorderedList', 'w3c.59', {
  after: '<div contenteditable><ul><li>^foo|</li></ul></div>',
  before: '<div contenteditable><ul><ul><li>^foo|</li></ul></ul></div>',
  sampleId: 59
});

testCaseFor('insertUnorderedList', 'w3c.59r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul></div>',
  before: '<div contenteditable><ul><ul><li>|foo^</li></ul></ul></div>',
  sampleId: '59r'
});

testCaseFor('insertUnorderedList', 'w3c.60', {
  after: '<div contenteditable>^foo|<br>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<br>bar</li><li>baz</li></ul></div>',
  sampleId: 60
});

testCaseFor('insertUnorderedList', 'w3c.60r', {
  after: '<div contenteditable>^foo|<br>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<br>bar</li><li>baz</li></ul></div>',
  sampleId: '60r'
});

testCaseFor('insertUnorderedList', 'w3c.61', {
  after: '<div contenteditable>^foo|<br>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<br>bar</li><li>baz</li></ul></div>',
  sampleId: 61
});

testCaseFor('insertUnorderedList', 'w3c.61r', {
  after: '<div contenteditable>^foo|<br>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<br>bar</li><li>baz</li></ul></div>',
  sampleId: '61r'
});

testCaseFor('insertUnorderedList', 'w3c.62', {
  after: '<div contenteditable>foo<br>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>^bar|</li><li>baz</li></ul></div>',
  sampleId: 62
});

testCaseFor('insertUnorderedList', 'w3c.62r', {
  after: '<div contenteditable>foo<br>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>|bar^</li><li>baz</li></ul></div>',
  sampleId: '62r'
});

testCaseFor('insertUnorderedList', 'w3c.63', {
  after: '<div contenteditable>foo<br>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>^bar|</li><li>baz</li></ul></div>',
  sampleId: 63
});

testCaseFor('insertUnorderedList', 'w3c.63r', {
  after: '<div contenteditable>foo<br>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>|bar^</li><li>baz</li></ul></div>',
  sampleId: '63r'
});

testCaseFor('insertUnorderedList', 'w3c.64', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>^foo|</div>bar</li><li>baz</li></ul></div>',
  sampleId: 64
});

testCaseFor('insertUnorderedList', 'w3c.64r', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>|foo^</div>bar</li><li>baz</li></ul></div>',
  sampleId: '64r'
});

testCaseFor('insertUnorderedList', 'w3c.65', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>^foo|</div>bar</li><li>baz</li></ul></div>',
  sampleId: 65
});

testCaseFor('insertUnorderedList', 'w3c.65r', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>|foo^</div>bar</li><li>baz</li></ul></div>',
  sampleId: '65r'
});

testCaseFor('insertUnorderedList', 'w3c.66', {
  after: '<div contenteditable><ul><li>foo<li>^bar|</li><ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>^bar|</li><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: 66
});

testCaseFor('insertUnorderedList', 'w3c.66r', {
  after: '<div contenteditable><ul><li>foo<li>^bar|</li><ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>|bar^</li><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: '66r'
});

testCaseFor('insertUnorderedList', 'w3c.67', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul><li>^baz|</li></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>^baz|</li></ul></li><li>quz</li></ul></div>',
  sampleId: 67
});

testCaseFor('insertUnorderedList', 'w3c.67r', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul><li>^baz|</li></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>|baz^</li></ul></li><li>quz</li></ul></div>',
  sampleId: '67r'
});

testCaseFor('insertUnorderedList', 'w3c.68', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>^bar|</li><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: 68
});

testCaseFor('insertUnorderedList', 'w3c.68r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>|bar^</li><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: '68r'
});

testCaseFor('insertUnorderedList', 'w3c.69', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li></ul><li>^baz|</li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>^baz|</li></ul><li>quz</li></ul></div>',
  sampleId: 69
});

testCaseFor('insertUnorderedList', 'w3c.69r', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li></ul><li>^baz|</li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>|baz^</li></ul><li>quz</li></ul></div>',
  sampleId: '69r'
});

testCaseFor('insertUnorderedList', 'w3c.70', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: 70
});

testCaseFor('insertUnorderedList', 'w3c.70r', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: '70r'
});

testCaseFor('insertUnorderedList', 'w3c.71', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: 71
});

testCaseFor('insertUnorderedList', 'w3c.71r', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: '71r'
});

testCaseFor('insertUnorderedList', 'w3c.72', {
  after: '<div contenteditable>^foo|<br><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: 72
});

testCaseFor('insertUnorderedList', 'w3c.72r', {
  after: '<div contenteditable>^foo|<br><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: '72r'
});

testCaseFor('insertUnorderedList', 'w3c.73', {
  after: '<div contenteditable>^foo|<br><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: 73
});

testCaseFor('insertUnorderedList', 'w3c.73r', {
  after: '<div contenteditable>^foo|<br><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: '73r'
});

testCaseFor('insertUnorderedList', 'w3c.74', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: 74
});

testCaseFor('insertUnorderedList', 'w3c.74r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: '74r'
});

testCaseFor('insertUnorderedList', 'w3c.75', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: 75
});

testCaseFor('insertUnorderedList', 'w3c.75r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: '75r'
});

testCaseFor('insertUnorderedList', 'w3c.76', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: 76
});

testCaseFor('insertUnorderedList', 'w3c.76r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: '76r'
});

testCaseFor('insertUnorderedList', 'w3c.77', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: 77
});

testCaseFor('insertUnorderedList', 'w3c.77r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar|<br><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: '77r'
});

testCaseFor('insertUnorderedList', 'w3c.78', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>^quz|</li></ul></div>',
  sampleId: 78
});

testCaseFor('insertUnorderedList', 'w3c.78r', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>|quz^</li></ul></div>',
  sampleId: '78r'
});

testCaseFor('insertUnorderedList', 'w3c.79', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>^quz|</li></ul></div>',
  sampleId: 79
});

testCaseFor('insertUnorderedList', 'w3c.79r', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>|quz^</li></ul></div>',
  sampleId: '79r'
});

testCaseFor('insertUnorderedList', 'w3c.80', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>^quz|</li></ul></div>',
  sampleId: 80
});

testCaseFor('insertUnorderedList', 'w3c.80r', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>|quz^</li></ul></div>',
  sampleId: '80r'
});

testCaseFor('insertUnorderedList', 'w3c.81', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>^quz|</li></ul></div>',
  sampleId: 81
});

testCaseFor('insertUnorderedList', 'w3c.81r', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul>^quz|</div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>|quz^</li></ul></div>',
  sampleId: '81r'
});

testCaseFor('insertUnorderedList', 'w3c.82', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar<br>baz|</div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar</li><li>baz|</li></ul></div>',
  sampleId: 82
});

testCaseFor('insertUnorderedList', 'w3c.82r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar<br>baz|</div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar</li><li>baz^</li></ul></div>',
  sampleId: '82r'
});

testCaseFor('insertUnorderedList', 'w3c.83', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar<br>baz|</div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar</li><li>baz|</li></ul></div>',
  sampleId: 83
});

testCaseFor('insertUnorderedList', 'w3c.83r', {
  after: '<div contenteditable><ul><li>foo</li></ul>^bar<br>baz|</div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar</li><li>baz^</li></ul></div>',
  sampleId: '83r'
});

testCaseFor('insertUnorderedList', 'w3c.84', {
  after: '<div contenteditable>^foo<br>bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul></li><li>baz</li></ul></div>',
  sampleId: 84
});

testCaseFor('insertUnorderedList', 'w3c.84r', {
  after: '<div contenteditable>^foo<br>bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul></li><li>baz</li></ul></div>',
  sampleId: '84r'
});

testCaseFor('insertUnorderedList', 'w3c.85', {
  after: '<div contenteditable>^foo<br>bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul></li><li>baz</li></ul></div>',
  sampleId: 85
});

testCaseFor('insertUnorderedList', 'w3c.85r', {
  after: '<div contenteditable>^foo<br>bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul></li><li>baz</li></ul></div>',
  sampleId: '85r'
});

testCaseFor('insertUnorderedList', 'w3c.86', {
  after: '<div contenteditable><ul><li>foo<li>b^ar</li></li></ul>b|az</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b^ar</li></ul></li><li>b|az</li></ul></div>',
  sampleId: 86
});

testCaseFor('insertUnorderedList', 'w3c.86r', {
  after: '<div contenteditable><ul><li>foo<li>b^ar</li></li></ul>b|az</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b|ar</li></ul></li><li>b^az</li></ul></div>',
  sampleId: '86r'
});

testCaseFor('insertUnorderedList', 'w3c.87', {
  after: '<div contenteditable><ul><li>foo<li>b^ar</li></li></ul>b|az</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b^ar</li></ul></li><li>b|az</li></ul></div>',
  sampleId: 87
});

testCaseFor('insertUnorderedList', 'w3c.87r', {
  after: '<div contenteditable><ul><li>foo<li>b^ar</li></li></ul>b|az</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b|ar</li></ul></li><li>b^az</li></ul></div>',
  sampleId: '87r'
});

testCaseFor('insertUnorderedList', 'w3c.88', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul><p>extra</p></div>',
  sampleId: 88
});

testCaseFor('insertUnorderedList', 'w3c.88r', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar</li></ul></li><li>baz^</li></ul><p>extra</p></div>',
  sampleId: '88r'
});

testCaseFor('insertUnorderedList', 'w3c.89', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul><p>extra</p></div>',
  sampleId: 89
});

testCaseFor('insertUnorderedList', 'w3c.89r', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar</li></ul></li><li>baz^</li></ul><p>extra</p></div>',
  sampleId: '89r'
});

testCaseFor('insertUnorderedList', 'w3c.90', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: 90
});

testCaseFor('insertUnorderedList', 'w3c.90r', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: '90r'
});

testCaseFor('insertUnorderedList', 'w3c.91', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: 91
});

testCaseFor('insertUnorderedList', 'w3c.91r', {
  after: '<div contenteditable>^foo|<ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: '91r'
});

testCaseFor('insertUnorderedList', 'w3c.92', {
  after: '<div contenteditable><ul><li>foo<li>^bar|</li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>^bar|</li></ul>baz</li></ul></div>',
  sampleId: 92
});

testCaseFor('insertUnorderedList', 'w3c.92r', {
  after: '<div contenteditable><ul><li>foo<li>^bar|</li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>|bar^</li></ul>baz</li></ul></div>',
  sampleId: '92r'
});

testCaseFor('insertUnorderedList', 'w3c.93', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>^baz|</li></ul></div>',
  sampleId: 93
});

testCaseFor('insertUnorderedList', 'w3c.93r', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>|baz^</li></ul></div>',
  sampleId: '93r'
});

testCaseFor('insertUnorderedList', 'w3c.94', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>^baz|</li></ul></div>',
  sampleId: 94
});

testCaseFor('insertUnorderedList', 'w3c.94r', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>|baz^</li></ul></div>',
  sampleId: '94r'
});

testCaseFor('insertUnorderedList', 'w3c.95', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul>baz</li></ul></div>',
  sampleId: 95
});

testCaseFor('insertUnorderedList', 'w3c.95r', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul>baz</li></ul></div>',
  sampleId: '95r'
});

testCaseFor('insertUnorderedList', 'w3c.96', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul>baz</li></ul></div>',
  sampleId: 96
});

testCaseFor('insertUnorderedList', 'w3c.96r', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul>baz</li></ul></div>',
  sampleId: '96r'
});

testCaseFor('insertUnorderedList', 'w3c.97', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|<br>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul>quz</div>',
  sampleId: 97
});

testCaseFor('insertUnorderedList', 'w3c.97r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|<br>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>|baz^</li></ul>quz</div>',
  sampleId: '97r'
});

testCaseFor('insertUnorderedList', 'w3c.98', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|<br>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul>quz</div>',
  sampleId: 98
});

testCaseFor('insertUnorderedList', 'w3c.98r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|<br>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>|baz^</li></ul>quz</div>',
  sampleId: '98r'
});

testCaseFor('insertUnorderedList', 'w3c.99', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz<br><ul><li>quz|</li></ul></div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz</li></ul>quz|</div>',
  sampleId: 99
});

testCaseFor('insertUnorderedList', 'w3c.99r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz<br><ul><li>quz|</li></ul></div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>|baz</li></ul>quz^</div>',
  sampleId: '99r'
});

testCaseFor('insertUnorderedList', 'w3c.100', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>^bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: 100
});

testCaseFor('insertUnorderedList', 'w3c.100r', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>|bar^</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: '100r'
});

testCaseFor('insertUnorderedList', 'w3c.101', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>^bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: 101
});

testCaseFor('insertUnorderedList', 'w3c.101r', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>|bar^</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: '101r'
});

testCaseFor('insertUnorderedList', 'w3c.102', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>^foo<ul><li>bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: 102
});

testCaseFor('insertUnorderedList', 'w3c.102r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>|foo<ul><li>bar^</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: '102r'
});

testCaseFor('insertUnorderedList', 'w3c.103', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><blockquote>bar</blockquote>baz</div>',
  before: '<div contenteditable>^foo|<blockquote>bar</blockquote>baz</div>',
  sampleId: 103
});

testCaseFor('insertUnorderedList', 'w3c.103r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><blockquote>bar</blockquote>baz</div>',
  before: '<div contenteditable>|foo^<blockquote>bar</blockquote>baz</div>',
  sampleId: '103r'
});

testCaseFor('insertUnorderedList', 'w3c.104', {
  after: '<div contenteditable>foo<blockquote><ul><li>^bar|</li></ul></blockquote>baz</div>',
  before: '<div contenteditable>foo<blockquote>^bar|</blockquote>baz</div>',
  sampleId: 104
});

testCaseFor('insertUnorderedList', 'w3c.104r', {
  after: '<div contenteditable>foo<blockquote><ul><li>^bar|</li></ul></blockquote>baz</div>',
  before: '<div contenteditable>foo<blockquote>|bar^</blockquote>baz</div>',
  sampleId: '104r'
});

testCaseFor('insertUnorderedList', 'w3c.105', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>^foo<blockquote>bar|</blockquote>baz</div>',
  sampleId: 105
});

testCaseFor('insertUnorderedList', 'w3c.105r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul>baz</div>',
  before: '<div contenteditable>|foo<blockquote>bar^</blockquote>baz</div>',
  sampleId: '105r'
});

testCaseFor('insertUnorderedList', 'w3c.106', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><ul><li>^bar|</li></ul></blockquote>baz</div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>^bar|</blockquote>baz</div>',
  sampleId: 106
});

testCaseFor('insertUnorderedList', 'w3c.106r', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><ul><li>^bar|</li></ul></blockquote>baz</div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>|bar^</blockquote>baz</div>',
  sampleId: '106r'
});

testCaseFor('insertUnorderedList', 'w3c.107', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>^foo|<blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  sampleId: 107
});

testCaseFor('insertUnorderedList', 'w3c.107r', {
  after: '<div contenteditable><ul><li>^foo|</li></ul><blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>|foo^<blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  sampleId: '107r'
});

testCaseFor('insertUnorderedList', 'w3c.108', {
  after: '<div contenteditable>foo<blockquote><ul><li>^bar|</li></ul>baz</blockquote></div>',
  before: '<div contenteditable>foo<blockquote>^bar|<br>baz</blockquote></div>',
  sampleId: 108
});

testCaseFor('insertUnorderedList', 'w3c.108r', {
  after: '<div contenteditable>foo<blockquote><ul><li>^bar|</li></ul>baz</blockquote></div>',
  before: '<div contenteditable>foo<blockquote>|bar^<br>baz</blockquote></div>',
  sampleId: '108r'
});

testCaseFor('insertUnorderedList', 'w3c.109', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><blockquote>baz</blockquote></div>',
  before: '<div contenteditable>^foo<blockquote>bar|<br>baz</blockquote></div>',
  sampleId: 109
});

testCaseFor('insertUnorderedList', 'w3c.109r', {
  after: '<div contenteditable><ul><li>^foo</li><li>bar|</li></ul><blockquote>baz</blockquote></div>',
  before: '<div contenteditable>|foo<blockquote>bar^<br>baz</blockquote></div>',
  sampleId: '109r'
});

testCaseFor('insertUnorderedList', 'w3c.110', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><ul><li>^bar|</li></ul>baz</blockquote></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>^bar|<br>baz</blockquote></div>',
  sampleId: 110
});

testCaseFor('insertUnorderedList', 'w3c.110r', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><ul><li>^bar|</li></ul>baz</blockquote></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>|bar^<br>baz</blockquote></div>',
  sampleId: '110r'
});

testCaseFor('insertUnorderedList', 'w3c.111', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>^foo|</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: 111
});

testCaseFor('insertUnorderedList', 'w3c.111r', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>|foo^</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: '111r'
});

testCaseFor('insertUnorderedList', 'w3c.112', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>^foo|</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: 112
});

testCaseFor('insertUnorderedList', 'w3c.112r', {
  after: '<div contenteditable><p><ul><li>^foo|</li></ul></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>|foo^</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: '112r'
});

testCaseFor('insertUnorderedList', 'w3c.113', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 113
});

testCaseFor('insertUnorderedList', 'w3c.113r', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '113r'
});

testCaseFor('insertUnorderedList', 'w3c.114', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 114
});

testCaseFor('insertUnorderedList', 'w3c.114r', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '114r'
});

testCaseFor('insertUnorderedList', 'w3c.115', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p></blockquote><p>baz</p></div>',
  sampleId: 115
});

testCaseFor('insertUnorderedList', 'w3c.115r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p></blockquote><p>baz</p></div>',
  sampleId: '115r'
});

testCaseFor('insertUnorderedList', 'w3c.116', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p></blockquote><p>baz</p></div>',
  sampleId: 116
});

testCaseFor('insertUnorderedList', 'w3c.116r', {
  after: '<div contenteditable><p><ul><li>^foo</li><li>bar|</li></ul></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p></blockquote><p>baz</p></div>',
  sampleId: '116r'
});

testCaseFor('insertUnorderedList', 'w3c.117', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 117
});

testCaseFor('insertUnorderedList', 'w3c.117r', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '117r'
});

testCaseFor('insertUnorderedList', 'w3c.118', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 118
});

testCaseFor('insertUnorderedList', 'w3c.118r', {
  after: '<div contenteditable><ol><li>foo</li></ol><blockquote><p><ul><li>^bar|</li></ul></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '118r'
});

testCaseFor('insertUnorderedList', 'w3c.119', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 119
});

testCaseFor('insertUnorderedList', 'w3c.119r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '119r'
});

testCaseFor('insertUnorderedList', 'w3c.120', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 120
});

testCaseFor('insertUnorderedList', 'w3c.120r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul>^bar|<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '120r'
});

testCaseFor('insertUnorderedList', 'w3c.121', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 121
});

testCaseFor('insertUnorderedList', 'w3c.121r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '121r'
});

testCaseFor('insertUnorderedList', 'w3c.122', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 122
});

testCaseFor('insertUnorderedList', 'w3c.122r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '122r'
});

testCaseFor('insertUnorderedList', 'w3c.123', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 123
});

testCaseFor('insertUnorderedList', 'w3c.123r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '123r'
});

testCaseFor('insertUnorderedList', 'w3c.124', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 124
});

testCaseFor('insertUnorderedList', 'w3c.124r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li></ul><span style="color: blue">^bar|</span><br><ul style="color:blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '124r'
});

testCaseFor('insertUnorderedList', 'w3c.125', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 125
});

testCaseFor('insertUnorderedList', 'w3c.125r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '125r'
});

testCaseFor('insertUnorderedList', 'w3c.126', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 126
});

testCaseFor('insertUnorderedList', 'w3c.126r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '126r'
});

testCaseFor('insertUnorderedList', 'w3c.127', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 127
});

testCaseFor('insertUnorderedList', 'w3c.127r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '127r'
});

testCaseFor('insertUnorderedList', 'w3c.128', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 128
});

testCaseFor('insertUnorderedList', 'w3c.128r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li></ul><span style="text-indent: 1em">^bar|</span><br><ul style="text-indent:1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '128r'
});

testCaseFor('insertUnorderedList', 'w3c.129', {
  after: '<div contenteditable>^foo|<br><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 129
});

testCaseFor('insertUnorderedList', 'w3c.129r', {
  after: '<div contenteditable>^foo|<br><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '129r'
});

testCaseFor('insertUnorderedList', 'w3c.130', {
  after: '<div contenteditable>^foo|<br><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 130
});

testCaseFor('insertUnorderedList', 'w3c.130r', {
  after: '<div contenteditable>^foo|<br><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '130r'
});

testCaseFor('insertUnorderedList', 'w3c.131', {
  after: '<div contenteditable><span style="color: blue">^foo|</span><br><ul style="color:blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 131
});

testCaseFor('insertUnorderedList', 'w3c.131r', {
  after: '<div contenteditable><span style="color: blue">^foo|</span><br><ul style="color:blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '131r'
});

testCaseFor('insertUnorderedList', 'w3c.132', {
  after: '<div contenteditable><span style="color: blue">^foo|</span><br><ul style="color:blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 132
});

testCaseFor('insertUnorderedList', 'w3c.132r', {
  after: '<div contenteditable><span style="color: blue">^foo|</span><br><ul style="color:blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color:blue"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '132r'
});

testCaseFor('insertUnorderedList', 'w3c.133', {
  after: '<div contenteditable><span style="text-indent: 1em">^foo|</span><br><ul style="text-indent:1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 133
});

testCaseFor('insertUnorderedList', 'w3c.133r', {
  after: '<div contenteditable><span style="text-indent: 1em">^foo|</span><br><ul style="text-indent:1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '133r'
});

testCaseFor('insertUnorderedList', 'w3c.134', {
  after: '<div contenteditable><span style="text-indent: 1em">^foo|</span><br><ul style="text-indent:1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 134
});

testCaseFor('insertUnorderedList', 'w3c.134r', {
  after: '<div contenteditable><span style="text-indent: 1em">^foo|</span><br><ul style="text-indent:1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '134r'
});

testCaseFor('insertUnorderedList', 'w3c.135', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 135
});

testCaseFor('insertUnorderedList', 'w3c.135r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '135r'
});

testCaseFor('insertUnorderedList', 'w3c.136', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 136
});

testCaseFor('insertUnorderedList', 'w3c.136r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul>^baz|</div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '136r'
});

testCaseFor('insertUnorderedList', 'w3c.137', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li></ul><span style="color: blue">^baz|</span></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 137
});

testCaseFor('insertUnorderedList', 'w3c.137r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li></ul><span style="color: blue">^baz|</span></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '137r'
});

testCaseFor('insertUnorderedList', 'w3c.138', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li></ul><span style="color: blue">^baz|</span></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 138
});

testCaseFor('insertUnorderedList', 'w3c.138r', {
  after: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li></ul><span style="color: blue">^baz|</span></div>',
  before: '<div contenteditable><ul style="color:blue"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '138r'
});

testCaseFor('insertUnorderedList', 'w3c.139', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em">^baz|</span></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 139
});

testCaseFor('insertUnorderedList', 'w3c.139r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em">^baz|</span></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '139r'
});

testCaseFor('insertUnorderedList', 'w3c.140', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em">^baz|</span></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 140
});

testCaseFor('insertUnorderedList', 'w3c.140r', {
  after: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em">^baz|</span></div>',
  before: '<div contenteditable><ul style="text-indent:1em"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '140r'
});

testCaseFor('insertUnorderedList', 'w3c.141', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul> </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>^bar|</p></div>',
  sampleId: 141
});

testCaseFor('insertUnorderedList', 'w3c.141r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul> </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>|bar^</p></div>',
  sampleId: '141r'
});

testCaseFor('insertUnorderedList', 'w3c.142', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul> </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>^bar|</p></div>',
  sampleId: 142
});

testCaseFor('insertUnorderedList', 'w3c.142r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li></ul> </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>|bar^</p></div>',
  sampleId: '142r'
});

testCaseFor('insertUnorderedList', 'w3c.143', {
  after: '<div contenteditable> <ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable><p>^foo|</p> <ul><li>bar</li></ul></div>',
  sampleId: 143
});

testCaseFor('insertUnorderedList', 'w3c.143r', {
  after: '<div contenteditable> <ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable><p>|foo^</p> <ul><li>bar</li></ul></div>',
  sampleId: '143r'
});

testCaseFor('insertUnorderedList', 'w3c.144', {
  after: '<div contenteditable> <ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable><p>^foo|</p> <ul><li>bar</li></ul></div>',
  sampleId: 144
});

testCaseFor('insertUnorderedList', 'w3c.144r', {
  after: '<div contenteditable> <ul><li>^foo|</li><li>bar</li></ul></div>',
  before: '<div contenteditable><p>|foo^</p> <ul><li>bar</li></ul></div>',
  sampleId: '144r'
});

testCaseFor('insertUnorderedList', 'w3c.145', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul>  </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>^bar|</p> <ul><li>baz</li></ul></div>',
  sampleId: 145
});

testCaseFor('insertUnorderedList', 'w3c.145r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul>  </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>|bar^</p> <ul><li>baz</li></ul></div>',
  sampleId: '145r'
});

testCaseFor('insertUnorderedList', 'w3c.146', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul>  </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>^bar|</p> <ul><li>baz</li></ul></div>',
  sampleId: 146
});

testCaseFor('insertUnorderedList', 'w3c.146r', {
  after: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul>  </div>',
  before: '<div contenteditable><ul><li>foo</li></ul> <p>|bar^</p> <ul><li>baz</li></ul></div>',
  sampleId: '146r'
});

testCaseFor('insertUnorderedList', 'w3c.147', {
  after: '<div contenteditable><div style="font-size: 1.3em"><ul><li><span style="font-size: 1.3em">^1</span></li><li><span style="font-size: 1.1em">2|</span></li></ul></div></div>',
  before: '<div contenteditable>^<div style="font-size: 1.3em">1</div><div style="font-size: 1.1em">2</div>|</div>',
  sampleId: 147
});

testCaseFor('insertUnorderedList', 'w3c.147r', {
  after: '<div contenteditable><div style="font-size: 1.3em"><ul><li><span style="font-size: 1.3em">^1</span></li><li><span style="font-size: 1.1em">2|</span></li></ul></div></div>',
  before: '<div contenteditable>|<div style="font-size: 1.3em">1</div><div style="font-size: 1.1em">2</div>^</div>',
  sampleId: '147r'
});

testCaseFor('insertUnorderedList', 'w3c.148', {
  after: '<div contenteditable><div style="font-size: 1.3em"><ul><li><span style="font-size: 1.3em">^1</span></li><li><span style="font-size: 1.1em">2|</span></li></ul></div></div>',
  before: '<div contenteditable>^<div style="font-size: 1.3em">1</div><div style="font-size: 1.1em">2</div>|</div>',
  sampleId: 148
});

testCaseFor('insertUnorderedList', 'w3c.148r', {
  after: '<div contenteditable><div style="font-size: 1.3em"><ul><li><span style="font-size: 1.3em">^1</span></li><li><span style="font-size: 1.1em">2|</span></li></ul></div></div>',
  before: '<div contenteditable>|<div style="font-size: 1.3em">1</div><div style="font-size: 1.1em">2</div>^</div>',
  sampleId: '148r'
});
