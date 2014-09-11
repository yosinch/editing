// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This test is generated from https://dvcs.w3.org/hg/editing/raw-file/tip/conformancetest/data.js
// in HTML Editing APIs specification of https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html

'use strict';

testCaseFor('insertOrderedList.w3c.7', {
  after: '<div contenteditable>foo<br>^bar<br><ol><li>baz|</li></ol></div>',
  before: '<div contenteditable>foo<ol><li>^bar</li></ol>baz|</div>',
  sampleId: 7
});

testCaseFor('insertOrderedList.w3c.7r', {
  after: '<div contenteditable>foo<br>^bar<br><ol><li>baz|</li></ol></div>',
  before: '<div contenteditable>foo<ol><li>|bar</li></ol>baz^</div>',
  sampleId: '7r'
});

testCaseFor('insertOrderedList.w3c.28', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol></div>',
  sampleId: 28
});

testCaseFor('insertOrderedList.w3c.28r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><li>baz</li></ol></div>',
  sampleId: '28r'
});

testCaseFor('insertOrderedList.w3c.29', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol></div>',
  sampleId: 29
});

testCaseFor('insertOrderedList.w3c.29r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><li>baz</li></ol></div>',
  sampleId: '29r'
});

testCaseFor('insertOrderedList.w3c.33', {
  after: '<div contenteditable><ol><li>^foo|</li></ol></div>',
  before: '<div contenteditable><ol><ol><li>^foo|</li></ol></ol></div>',
  sampleId: 33
});

testCaseFor('insertOrderedList.w3c.33r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol></div>',
  before: '<div contenteditable><ol><ol><li>|foo^</li></ol></ol></div>',
  sampleId: '33r'
});

testCaseFor('insertOrderedList.w3c.34', {
  after: '<div contenteditable>^foo|<br>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<br>bar</li><li>baz</li></ol></div>',
  sampleId: 34
});

testCaseFor('insertOrderedList.w3c.34r', {
  after: '<div contenteditable>^foo|<br>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<br>bar</li><li>baz</li></ol></div>',
  sampleId: '34r'
});

testCaseFor('insertOrderedList.w3c.35', {
  after: '<div contenteditable>^foo|<br>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<br>bar</li><li>baz</li></ol></div>',
  sampleId: 35
});

testCaseFor('insertOrderedList.w3c.35r', {
  after: '<div contenteditable>^foo|<br>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<br>bar</li><li>baz</li></ol></div>',
  sampleId: '35r'
});

testCaseFor('insertOrderedList.w3c.36', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>^bar|</li><li>baz</li></ol></div>',
  sampleId: 36
});

testCaseFor('insertOrderedList.w3c.36r', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>|bar^</li><li>baz</li></ol></div>',
  sampleId: '36r'
});

testCaseFor('insertOrderedList.w3c.37', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>^bar|</li><li>baz</li></ol></div>',
  sampleId: 37
});

testCaseFor('insertOrderedList.w3c.37r', {
  after: '<div contenteditable>foo<br>^bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<br>|bar^</li><li>baz</li></ol></div>',
  sampleId: '37r'
});

testCaseFor('insertOrderedList.w3c.38', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>^foo|</div>bar</li><li>baz</li></ol></div>',
  sampleId: 38
});

testCaseFor('insertOrderedList.w3c.38r', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>|foo^</div>bar</li><li>baz</li></ol></div>',
  sampleId: '38r'
});

testCaseFor('insertOrderedList.w3c.39', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>^foo|</div>bar</li><li>baz</li></ol></div>',
  sampleId: 39
});

testCaseFor('insertOrderedList.w3c.39r', {
  after: '<div contenteditable><div>^foo|</div>bar<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li><div>|foo^</div>bar</li><li>baz</li></ol></div>',
  sampleId: '39r'
});

testCaseFor('insertOrderedList.w3c.40', {
  after: '<div contenteditable><ol><li>foo<li>^bar|</li><ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>^bar|</li><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: 40
});

testCaseFor('insertOrderedList.w3c.40r', {
  after: '<div contenteditable><ol><li>foo<li>^bar|</li><ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>|bar^</li><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: '40r'
});

testCaseFor('insertOrderedList.w3c.41', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol><li>^baz|</li></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>^baz|</li></ol></li><li>quz</li></ol></div>',
  sampleId: 41
});

testCaseFor('insertOrderedList.w3c.41r', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol><li>^baz|</li></li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>|baz^</li></ol></li><li>quz</li></ol></div>',
  sampleId: '41r'
});

testCaseFor('insertOrderedList.w3c.42', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>^bar|</li><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: 42
});

testCaseFor('insertOrderedList.w3c.42r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>|bar^</li><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: '42r'
});

testCaseFor('insertOrderedList.w3c.43', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li></ol><li>^baz|</li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>^baz|</li></ol><li>quz</li></ol></div>',
  sampleId: 43
});

testCaseFor('insertOrderedList.w3c.43r', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li></ol><li>^baz|</li><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>|baz^</li></ol><li>quz</li></ol></div>',
  sampleId: '43r'
});

testCaseFor('insertOrderedList.w3c.44', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: 44
});

testCaseFor('insertOrderedList.w3c.44r', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: '44r'
});

testCaseFor('insertOrderedList.w3c.45', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: 45
});

testCaseFor('insertOrderedList.w3c.45r', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol></li><li>baz</li></ol></div>',
  sampleId: '45r'
});

testCaseFor('insertOrderedList.w3c.46', {
  after: '<div contenteditable>^foo|<br><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: 46
});

testCaseFor('insertOrderedList.w3c.46r', {
  after: '<div contenteditable>^foo|<br><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: '46r'
});

testCaseFor('insertOrderedList.w3c.47', {
  after: '<div contenteditable>^foo|<br><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo|</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: 47
});

testCaseFor('insertOrderedList.w3c.47r', {
  after: '<div contenteditable>^foo|<br><ol><ol><li>bar</li></ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo^</li><ol><li>bar</li></ol><li>baz</li></ol></div>',
  sampleId: '47r'
});

testCaseFor('insertOrderedList.w3c.48', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: 48
});

testCaseFor('insertOrderedList.w3c.48r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: '48r'
});

testCaseFor('insertOrderedList.w3c.49', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: 49
});

testCaseFor('insertOrderedList.w3c.49r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<ol><li>baz</li></ol><ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^<ol><li>baz</li></ol></li><li>quz</li></ol></div>',
  sampleId: '49r'
});

testCaseFor('insertOrderedList.w3c.50', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: 50
});

testCaseFor('insertOrderedList.w3c.50r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: '50r'
});

testCaseFor('insertOrderedList.w3c.51', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar|</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: 51
});

testCaseFor('insertOrderedList.w3c.51r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar|<br><ol><ol><li>baz</li></ol><li>quz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar^</li><ol><li>baz</li></ol><li>quz</li></ol></div>',
  sampleId: '51r'
});

testCaseFor('insertOrderedList.w3c.52', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>^quz|</li></ol></div>',
  sampleId: 52
});

testCaseFor('insertOrderedList.w3c.52r', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>|quz^</li></ol></div>',
  sampleId: '52r'
});

testCaseFor('insertOrderedList.w3c.53', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>^quz|</li></ol></div>',
  sampleId: 53
});

testCaseFor('insertOrderedList.w3c.53r', {
  after: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li><li>baz</li></ol></li><li>|quz^</li></ol></div>',
  sampleId: '53r'
});

testCaseFor('insertOrderedList.w3c.54', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>^quz|</li></ol></div>',
  sampleId: 54
});

testCaseFor('insertOrderedList.w3c.54r', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>|quz^</li></ol></div>',
  sampleId: '54r'
});

testCaseFor('insertOrderedList.w3c.55', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>^quz|</li></ol></div>',
  sampleId: 55
});

testCaseFor('insertOrderedList.w3c.55r', {
  after: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol></ol>^quz|</div>',
  before: '<div contenteditable><ol><li>foo</li><ol><li>bar</li><li>baz</li></ol><li>|quz^</li></ol></div>',
  sampleId: '55r'
});

testCaseFor('insertOrderedList.w3c.56', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar<br>baz|</div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar</li><li>baz|</li></ol></div>',
  sampleId: 56
});

testCaseFor('insertOrderedList.w3c.56r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar<br>baz|</div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar</li><li>baz^</li></ol></div>',
  sampleId: '56r'
});

testCaseFor('insertOrderedList.w3c.57', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar<br>baz|</div>',
  before: '<div contenteditable><ol><li>foo</li><li>^bar</li><li>baz|</li></ol></div>',
  sampleId: 57
});

testCaseFor('insertOrderedList.w3c.57r', {
  after: '<div contenteditable><ol><li>foo</li></ol>^bar<br>baz|</div>',
  before: '<div contenteditable><ol><li>foo</li><li>|bar</li><li>baz^</li></ol></div>',
  sampleId: '57r'
});

testCaseFor('insertOrderedList.w3c.58', {
  after: '<div contenteditable>^foo<br>bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol></li><li>baz</li></ol></div>',
  sampleId: 58
});

testCaseFor('insertOrderedList.w3c.58r', {
  after: '<div contenteditable>^foo<br>bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol></li><li>baz</li></ol></div>',
  sampleId: '58r'
});

testCaseFor('insertOrderedList.w3c.59', {
  after: '<div contenteditable>^foo<br>bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol></li><li>baz</li></ol></div>',
  sampleId: 59
});

testCaseFor('insertOrderedList.w3c.59r', {
  after: '<div contenteditable>^foo<br>bar|<br><ol><li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol></li><li>baz</li></ol></div>',
  sampleId: '59r'
});

testCaseFor('insertOrderedList.w3c.60', {
  after: '<div contenteditable><ol><li>foo<li>b^ar</li></li></ol>b|az</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b^ar</li></ol></li><li>b|az</li></ol></div>',
  sampleId: 60
});

testCaseFor('insertOrderedList.w3c.60r', {
  after: '<div contenteditable><ol><li>foo<li>b^ar</li></li></ol>b|az</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b|ar</li></ol></li><li>b^az</li></ol></div>',
  sampleId: '60r'
});

testCaseFor('insertOrderedList.w3c.61', {
  after: '<div contenteditable><ol><li>foo<li>b^ar</li></li></ol>b|az</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b^ar</li></ol></li><li>b|az</li></ol></div>',
  sampleId: 61
});

testCaseFor('insertOrderedList.w3c.61r', {
  after: '<div contenteditable><ol><li>foo<li>b^ar</li></li></ol>b|az</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>b|ar</li></ol></li><li>b^az</li></ol></div>',
  sampleId: '61r'
});

testCaseFor('insertOrderedList.w3c.62', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol><p>extra</p></div>',
  sampleId: 62
});

testCaseFor('insertOrderedList.w3c.62r', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar</li></ol></li><li>baz^</li></ol><p>extra</p></div>',
  sampleId: '62r'
});

testCaseFor('insertOrderedList.w3c.63', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol><p>extra</p></div>',
  sampleId: 63
});

testCaseFor('insertOrderedList.w3c.63r', {
  after: '<div contenteditable>^foo<br>bar<br>baz|<br><p>extra</p></div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar</li></ol></li><li>baz^</li></ol><p>extra</p></div>',
  sampleId: '63r'
});

testCaseFor('insertOrderedList.w3c.64', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: 64
});

testCaseFor('insertOrderedList.w3c.64r', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: '64r'
});

testCaseFor('insertOrderedList.w3c.65', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>^foo|<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: 65
});

testCaseFor('insertOrderedList.w3c.65r', {
  after: '<div contenteditable>^foo|<ol><li>bar</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>|foo^<ol><li>bar</li></ol>baz</li></ol></div>',
  sampleId: '65r'
});

testCaseFor('insertOrderedList.w3c.66', {
  after: '<div contenteditable><ol><li>foo<li>^bar|</li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>^bar|</li></ol>baz</li></ol></div>',
  sampleId: 66
});

testCaseFor('insertOrderedList.w3c.66r', {
  after: '<div contenteditable><ol><li>foo<li>^bar|</li>baz</li></ol></div>',
  before: '<div contenteditable><ol><li>foo<ol><li>|bar^</li></ol>baz</li></ol></div>',
  sampleId: '66r'
});

testCaseFor('insertOrderedList.w3c.67', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>^baz|</li></ol></div>',
  sampleId: 67
});

testCaseFor('insertOrderedList.w3c.67r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>|baz^</li></ol></div>',
  sampleId: '67r'
});

testCaseFor('insertOrderedList.w3c.68', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>^baz|</li></ol></div>',
  sampleId: 68
});

testCaseFor('insertOrderedList.w3c.68r', {
  after: '<div contenteditable>foo<ol><li>bar</li></ol>^baz|</div>',
  before: '<div contenteditable><ol><li>foo<ol><li>bar</li></ol>|baz^</li></ol></div>',
  sampleId: '68r'
});

testCaseFor('insertOrderedList.w3c.69', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol>baz</li></ol></div>',
  sampleId: 69
});

testCaseFor('insertOrderedList.w3c.69r', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol>baz</li></ol></div>',
  sampleId: '69r'
});

testCaseFor('insertOrderedList.w3c.70', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ol><li>^foo<ol><li>bar|</li></ol>baz</li></ol></div>',
  sampleId: 70
});

testCaseFor('insertOrderedList.w3c.70r', {
  after: '<div contenteditable>^foo<br>bar|<br>baz</div>',
  before: '<div contenteditable><ol><li>|foo<ol><li>bar^</li></ol>baz</li></ol></div>',
  sampleId: '70r'
});
