// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('insertOrderedList.w3c.1', {
  after: '<div contenteditable><ol><li>foo|bar</li></ol></div>',
  before: '<div contenteditable>foo|bar</div>',
  sampleId: 1
});

testCaseFor('insertOrderedList.w3c.2', {
  after: '<div contenteditable><ol><li>foo^bar|baz</li></ol></div>',
  before: '<div contenteditable>foo^bar|baz</div>',
  sampleId: 2
});

testCaseFor('insertOrderedList.w3c.2r', {
  after: '<div contenteditable><ol><li>foo^bar|baz</li></ol></div>',
  before: '<div contenteditable>foo|bar^baz</div>',
  sampleId: '2r'
});

testCaseFor('insertOrderedList.w3c.3', {
  after: '<div contenteditable>foo<br><ol><li>^bar|</li></ol></div>',
  before: '<div contenteditable>foo<br>^bar|</div>',
  sampleId: 3
});

testCaseFor('insertOrderedList.w3c.3r', {
  after: '<div contenteditable>foo<br><ol><li>^bar|</li></ol></div>',
  before: '<div contenteditable>foo<br>|bar^</div>',
  sampleId: '3r'
});

testCaseFor('insertOrderedList.w3c.4', {
  after: '<div contenteditable><ol><li>f^oo</li><li>b|ar</li></ol>baz</div>',
  before: '<div contenteditable>f^oo<br>b|ar<br>baz</div>',
  sampleId: 4
});

testCaseFor('insertOrderedList.w3c.4r', {
  after: '<div contenteditable><ol><li>f^oo</li><li>b|ar</li></ol>baz</div>',
  before: '<div contenteditable>f|oo<br>b^ar<br>baz</div>',
  sampleId: '4r'
});

testCaseFor('insertOrderedList.w3c.5', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol>bar</p></div>',
  before: '<div contenteditable><p>^foo|<br>bar</p></div>',
  sampleId: 5
});

testCaseFor('insertOrderedList.w3c.5r', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol>bar</p></div>',
  before: '<div contenteditable><p>|foo^<br>bar</p></div>',
  sampleId: '5r'
});

testCaseFor('insertOrderedList.w3c.6', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>^foo<ol><li>bar|</li></ol>baz</div>',
  sampleId: 6
});

testCaseFor('insertOrderedList.w3c.6r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>|foo<ol><li>bar^</li></ol>baz</div>',
  sampleId: '6r'
});

testCaseFor('insertOrderedList.w3c.12', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td><ol><li>^b|ar</li></ol></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b^a|r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: 12
});

testCaseFor('insertOrderedList.w3c.12r', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td><ol><li>^b|ar</li></ol></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b|a^r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: '12r'
});

testCaseFor('insertOrderedList.w3c.13', {
  after: '<div contenteditable><table><tbody><tr><td><ol><li>fo^o</li></ol></td><td><ol><li>b|ar</li></ol></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>fo^o</td><td>b|ar</td><td>baz</td></tr></tbody></table></div>',
  sampleId: 13
});

testCaseFor('insertOrderedList.w3c.13r', {
  after: '<div contenteditable><table><tbody><tr><td><ol><li>fo^o</li></ol></td><td><ol><li>b|ar</li></ol></td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>fo|o</td><td>b^ar</td><td>baz</td></tr></tbody></table></div>',
  sampleId: '13r'
});

testCaseFor('insertOrderedList.w3c.14', {
  after: '<div contenteditable><ol><li>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</li></ol></div>',
  before: '<div contenteditable>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</div>',
  sampleId: 14
});

testCaseFor('insertOrderedList.w3c.14r', {
  after: '<div contenteditable><ol><li>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</li></ol></div>',
  before: '<div contenteditable>|<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>^</div>',
  sampleId: '14r'
});

testCaseFor('insertOrderedList.w3c.15', {
  after: '<div contenteditable><p>foo</p><p><ol><li>^bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>^bar|</p><p>baz</p></div>',
  sampleId: 15
});

testCaseFor('insertOrderedList.w3c.15r', {
  after: '<div contenteditable><p>foo</p><p><ol><li>^bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>|bar^</p><p>baz</p></div>',
  sampleId: '15r'
});

testCaseFor('insertOrderedList.w3c.16', {
  after: '<div contenteditable><p>foo</p><p><ol><li>^bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>^bar|</p><p>baz</p></div>',
  sampleId: 16
});

testCaseFor('insertOrderedList.w3c.16r', {
  after: '<div contenteditable><p>foo</p><p><ol><li>^bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><p>|bar^</p><p>baz</p></div>',
  sampleId: '16r'
});

testCaseFor('insertOrderedList.w3c.17', {
  after: '<div contenteditable><p>foo</p><blockquote><ol><li>^bar|</li></ol></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote>^bar|</blockquote><p>baz</p></div>',
  sampleId: 17
});

testCaseFor('insertOrderedList.w3c.17r', {
  after: '<div contenteditable><p>foo</p><blockquote><ol><li>^bar|</li></ol></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote>|bar^</blockquote><p>baz</p></div>',
  sampleId: '17r'
});

testCaseFor('insertOrderedList.w3c.18', {
  after: '<div contenteditable><dl><dt>foo</dt><ol><li>^bar|</li></ol><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>^bar|</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: 18
});

testCaseFor('insertOrderedList.w3c.18r', {
  after: '<div contenteditable><dl><dt>foo</dt><ol><li>^bar|</li></ol><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>|bar^</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: '18r'
});

testCaseFor('insertOrderedList.w3c.19', {
  after: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><ol><li>^baz|</li></ol><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><dt>^baz|</dt><dd>quz</dd></dl></div>',
  sampleId: 19
});

testCaseFor('insertOrderedList.w3c.19r', {
  after: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><ol><li>^baz|</li></ol><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>bar</dd><dt>|baz^</dt><dd>quz</dd></dl></div>',
  sampleId: '19r'
});

testCaseFor('insertOrderedList.w3c.20', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><p>bar|</p><p>baz</p></div>',
  sampleId: 20
});

testCaseFor('insertOrderedList.w3c.20r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><p>bar^</p><p>baz</p></div>',
  sampleId: '20r'
});

testCaseFor('insertOrderedList.w3c.21', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><p>bar|</p><p>baz</p></div>',
  sampleId: 21
});

testCaseFor('insertOrderedList.w3c.21r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><p>bar^</p><p>baz</p></div>',
  sampleId: '21r'
});

testCaseFor('insertOrderedList.w3c.22', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote>bar|</blockquote><p>baz</p></div>',
  sampleId: 22
});

testCaseFor('insertOrderedList.w3c.22r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote>bar^</blockquote><p>baz</p></div>',
  sampleId: '22r'
});

testCaseFor('insertOrderedList.w3c.23', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote>bar|</blockquote><p>baz</p></div>',
  sampleId: 23
});

testCaseFor('insertOrderedList.w3c.23r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote>bar^</blockquote><p>baz</p></div>',
  sampleId: '23r'
});

testCaseFor('insertOrderedList.w3c.24', {
  after: '<div contenteditable><dl><ol><li>^foo</li><dd>bar|</dd></ol><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>^foo</dt><dd>bar|</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: 24
});

testCaseFor('insertOrderedList.w3c.24r', {
  after: '<div contenteditable><dl><ol><li>^foo</li><dd>bar|</dd></ol><dt>baz</dt><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>|foo</dt><dd>bar^</dd><dt>baz</dt><dd>quz</dd></dl></div>',
  sampleId: '24r'
});

testCaseFor('insertOrderedList.w3c.25', {
  after: '<div contenteditable><dl><dt>foo</dt><ol><li>^bar</li><dt>baz|</dt></ol><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>^bar</dd><dt>baz|</dt><dd>quz</dd></dl></div>',
  sampleId: 25
});

testCaseFor('insertOrderedList.w3c.25r', {
  after: '<div contenteditable><dl><dt>foo</dt><ol><li>^bar</li><dt>baz|</dt></ol><dd>quz</dd></dl></div>',
  before: '<div contenteditable><dl><dt>foo</dt><dd>|bar</dd><dt>baz^</dt><dd>quz</dd></dl></div>',
  sampleId: '25r'
});

testCaseFor('insertOrderedList.w3c.26', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p><p>baz</p></blockquote></div>',
  sampleId: 26
});

testCaseFor('insertOrderedList.w3c.26r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p><p>baz</p></blockquote></div>',
  sampleId: '26r'
});

testCaseFor('insertOrderedList.w3c.27', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p><p>baz</p></blockquote></div>',
  sampleId: 27
});

testCaseFor('insertOrderedList.w3c.27r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><blockquote><p>baz</p></blockquote></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p><p>baz</p></blockquote></div>',
  sampleId: '27r'
});

testCaseFor('insertOrderedList.w3c.30', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>^bar|</div>',
  sampleId: 30
});

testCaseFor('insertOrderedList.w3c.30r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>|bar^</div>',
  sampleId: '30r'
});

testCaseFor('insertOrderedList.w3c.31', {
  after: '<div contenteditable><ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable>^foo|<ol><li>bar</li></ol></div>',
  sampleId: 31
});

testCaseFor('insertOrderedList.w3c.31r', {
  after: '<div contenteditable><ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable>|foo^<ol><li>bar</li></ol></div>',
  sampleId: '31r'
});

testCaseFor('insertOrderedList.w3c.32', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol></div>',
  sampleId: 32
});

testCaseFor('insertOrderedList.w3c.32r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li></ol>|bar^<ol><li>baz</li></ol></div>',
  sampleId: '32r'
});
