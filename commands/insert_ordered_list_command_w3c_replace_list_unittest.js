// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('insertOrderedList.w3c.8', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>^foo<ul><li>bar|</li></ul>baz</div>',
  sampleId: 8
});

testCaseFor('insertOrderedList.w3c.8r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>|foo<ul><li>bar^</li></ul>baz</div>',
  sampleId: '8r'
});

testCaseFor('insertOrderedList.w3c.9', {
  after: '<div contenteditable>foo<ol><li>^bar</li><li>baz|</li></ol></div>',
  before: '<div contenteditable>foo<ul><li>^bar</li></ul>baz|</div>',
  sampleId: 9
});

testCaseFor('insertOrderedList.w3c.9r', {
  after: '<div contenteditable>foo<ol><li>^bar</li><li>baz|</li></ol></div>',
  before: '<div contenteditable>foo<ul><li>|bar</li></ul>baz^</div>',
  sampleId: '9r'
});

testCaseFor('insertOrderedList.w3c.10', {
  after: '<div contenteditable>foo<ol><li>^bar</li><li>baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>^bar</li></ul><ol><li>baz|</li></ol>quz</div>',
  sampleId: 10
});

testCaseFor('insertOrderedList.w3c.10r', {
  after: '<div contenteditable>foo<ol><li>^bar</li><li>baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>|bar</li></ul><ol><li>baz^</li></ol>quz</div>',
  sampleId: '10r'
});

testCaseFor('insertOrderedList.w3c.11', {
  after: '<div contenteditable>foo<br>^bar<br><ol><li>baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ol><li>^bar</li></ol><ul><li>baz|</li></ul>quz</div>',
  sampleId: 11
});

testCaseFor('insertOrderedList.w3c.11r', {
  after: '<div contenteditable>foo<br>^bar<br><ol><li>baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ol><li>|bar</li></ol><ul><li>baz^</li></ul>quz</div>',
  sampleId: '11r'
});

testCaseFor('insertOrderedList.w3c.71', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 71
});

testCaseFor('insertOrderedList.w3c.71r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '71r'
});

testCaseFor('insertOrderedList.w3c.72', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>^bar|</div>',
  sampleId: 72
});

testCaseFor('insertOrderedList.w3c.72r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>|bar^</div>',
  sampleId: '72r'
});

testCaseFor('insertOrderedList.w3c.73', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul></div>',
  before: '<div contenteditable>^foo|<ul><li>bar</li></ul></div>',
  sampleId: 73
});

testCaseFor('insertOrderedList.w3c.73r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul></div>',
  before: '<div contenteditable>|foo^<ul><li>bar</li></ul></div>',
  sampleId: '73r'
});

testCaseFor('insertOrderedList.w3c.74', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>^bar|<ul><li>baz</li></ul></div>',
  sampleId: 74
});

testCaseFor('insertOrderedList.w3c.74r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li></ul>|bar^<ul><li>baz</li></ul></div>',
  sampleId: '74r'
});

testCaseFor('insertOrderedList.w3c.75', {
  after: '<div contenteditable><ul><ol><li>^foo|</li></ol></ul></div>',
  before: '<div contenteditable><ul><ul><li>^foo|</li></ul></ul></div>',
  sampleId: 75
});

testCaseFor('insertOrderedList.w3c.75r', {
  after: '<div contenteditable><ul><ol><li>^foo|</li></ol></ul></div>',
  before: '<div contenteditable><ul><ul><li>|foo^</li></ul></ul></div>',
  sampleId: '75r'
});

testCaseFor('insertOrderedList.w3c.76', {
  after: '<div contenteditable><ol><li>^foo|</li></ol>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<br>bar</li><li>baz</li></ul></div>',
  sampleId: 76
});

testCaseFor('insertOrderedList.w3c.76r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<br>bar</li><li>baz</li></ul></div>',
  sampleId: '76r'
});

testCaseFor('insertOrderedList.w3c.77', {
  after: '<div contenteditable>foo<br><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>^bar|</li><li>baz</li></ul></div>',
  sampleId: 77
});

testCaseFor('insertOrderedList.w3c.77r', {
  after: '<div contenteditable>foo<br><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<br>|bar^</li><li>baz</li></ul></div>',
  sampleId: '77r'
});

testCaseFor('insertOrderedList.w3c.78', {
  after: '<div contenteditable><div><ol><li>^foo|</li></ol></div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>^foo|</div>bar</li><li>baz</li></ul></div>',
  sampleId: 78
});

testCaseFor('insertOrderedList.w3c.78r', {
  after: '<div contenteditable><div><ol><li>^foo|</li></ol></div>bar<br><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li><div>|foo^</div>bar</li><li>baz</li></ul></div>',
  sampleId: '78r'
});

testCaseFor('insertOrderedList.w3c.79', {
  after: '<div contenteditable><ul><li>foo<ol><li>^bar|</li></ol><ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>^bar|</li><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: 79
});

testCaseFor('insertOrderedList.w3c.79r', {
  after: '<div contenteditable><ul><li>foo<ol><li>^bar|</li></ol><ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>|bar^</li><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: '79r'
});

testCaseFor('insertOrderedList.w3c.80', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul><ol><li>^baz|</li></ol></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>^baz|</li></ul></li><li>quz</li></ul></div>',
  sampleId: 80
});

testCaseFor('insertOrderedList.w3c.80r', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul><ol><li>^baz|</li></ol></li><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>|baz^</li></ul></li><li>quz</li></ul></div>',
  sampleId: '80r'
});

testCaseFor('insertOrderedList.w3c.81', {
  after: '<div contenteditable><ul><li>foo</li><ol><li>^bar|</li></ol><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>^bar|</li><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: 81
});

testCaseFor('insertOrderedList.w3c.81r', {
  after: '<div contenteditable><ul><li>foo</li><ol><li>^bar|</li></ol><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>|bar^</li><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: '81r'
});

testCaseFor('insertOrderedList.w3c.82', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li></ul><ol><li>^baz|</li></ol><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>^baz|</li></ul><li>quz</li></ul></div>',
  sampleId: 82
});

testCaseFor('insertOrderedList.w3c.82r', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li></ul><ol><li>^baz|</li></ol><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>|baz^</li></ul><li>quz</li></ul></div>',
  sampleId: '82r'
});

testCaseFor('insertOrderedList.w3c.83', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: 83
});

testCaseFor('insertOrderedList.w3c.83r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul></li><li>baz</li></ul></div>',
  sampleId: '83r'
});

testCaseFor('insertOrderedList.w3c.84', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo|</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: 84
});

testCaseFor('insertOrderedList.w3c.84r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><ul><li>bar</li></ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo^</li><ul><li>bar</li></ul><li>baz</li></ul></div>',
  sampleId: '84r'
});

testCaseFor('insertOrderedList.w3c.85', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: 85
});

testCaseFor('insertOrderedList.w3c.85r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul><ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^<ul><li>baz</li></ul></li><li>quz</li></ul></div>',
  sampleId: '85r'
});

testCaseFor('insertOrderedList.w3c.86', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar|</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: 86
});

testCaseFor('insertOrderedList.w3c.86r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar|</li></ol><ul><ul><li>baz</li></ul><li>quz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar^</li><ul><li>baz</li></ul><li>quz</li></ul></div>',
  sampleId: '86r'
});

testCaseFor('insertOrderedList.w3c.87', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul><ol><li>^quz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>^quz|</li></ul></div>',
  sampleId: 87
});

testCaseFor('insertOrderedList.w3c.87r', {
  after: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li></ul><ol><li>^quz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li><li>baz</li></ul></li><li>|quz^</li></ul></div>',
  sampleId: '87r'
});

testCaseFor('insertOrderedList.w3c.88', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul><ol><li>^quz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>^quz|</li></ul></div>',
  sampleId: 88
});

testCaseFor('insertOrderedList.w3c.88r', {
  after: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul></ul><ol><li>^quz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li><ul><li>bar</li><li>baz</li></ul><li>|quz^</li></ul></div>',
  sampleId: '88r'
});

testCaseFor('insertOrderedList.w3c.89', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar</li><li>baz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li><li>^bar</li><li>baz|</li></ul></div>',
  sampleId: 89
});

testCaseFor('insertOrderedList.w3c.89r', {
  after: '<div contenteditable><ul><li>foo</li></ul><ol><li>^bar</li><li>baz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo</li><li>|bar</li><li>baz^</li></ul></div>',
  sampleId: '89r'
});

testCaseFor('insertOrderedList.w3c.90', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul></li><li>baz</li></ul></div>',
  sampleId: 90
});

testCaseFor('insertOrderedList.w3c.90r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul></li><li>baz</li></ul></div>',
  sampleId: '90r'
});

testCaseFor('insertOrderedList.w3c.91', {
  after: '<div contenteditable><ul><li>foo<ol><li>b^ar</li></ol></li></ul><ol><li>b|az</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b^ar</li></ul></li><li>b|az</li></ul></div>',
  sampleId: 91
});

testCaseFor('insertOrderedList.w3c.91r', {
  after: '<div contenteditable><ul><li>foo<ol><li>b^ar</li></ol></li></ul><ol><li>b|az</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>b|ar</li></ul></li><li>b^az</li></ul></div>',
  sampleId: '91r'
});

testCaseFor('insertOrderedList.w3c.92', {
  after: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol><p>extra</p></div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar</li></ul></li><li>baz|</li></ul><p>extra</p></div>',
  sampleId: 92
});

testCaseFor('insertOrderedList.w3c.92r', {
  after: '<div contenteditable><ol><li>^foo<ol><li>bar</li></ol></li><li>baz|</li></ol><p>extra</p></div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar</li></ul></li><li>baz^</li></ul><p>extra</p></div>',
  sampleId: '92r'
});

testCaseFor('insertOrderedList.w3c.93', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>^foo|<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: 93
});

testCaseFor('insertOrderedList.w3c.93r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul><li>bar</li></ul>baz</div>',
  before: '<div contenteditable><ul><li>|foo^<ul><li>bar</li></ul>baz</li></ul></div>',
  sampleId: '93r'
});

testCaseFor('insertOrderedList.w3c.94', {
  after: '<div contenteditable><ul><li>foo<ol><li>^bar|</li></ol>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>^bar|</li></ul>baz</li></ul></div>',
  sampleId: 94
});

testCaseFor('insertOrderedList.w3c.94r', {
  after: '<div contenteditable><ul><li>foo<ol><li>^bar|</li></ol>baz</li></ul></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>|bar^</li></ul>baz</li></ul></div>',
  sampleId: '94r'
});

testCaseFor('insertOrderedList.w3c.95', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul><ol><li>^baz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>^baz|</li></ul></div>',
  sampleId: 95
});

testCaseFor('insertOrderedList.w3c.95r', {
  after: '<div contenteditable>foo<ul><li>bar</li></ul><ol><li>^baz|</li></ol></div>',
  before: '<div contenteditable><ul><li>foo<ul><li>bar</li></ul>|baz^</li></ul></div>',
  sampleId: '95r'
});

testCaseFor('insertOrderedList.w3c.96', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable><ul><li>^foo<ul><li>bar|</li></ul>baz</li></ul></div>',
  sampleId: 96
});

testCaseFor('insertOrderedList.w3c.96r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable><ul><li>|foo<ul><li>bar^</li></ul>baz</li></ul></div>',
  sampleId: '96r'
});

testCaseFor('insertOrderedList.w3c.97', {
  after: '<div contenteditable>foo<ol><li>bar</li><li>^baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz|</li></ul>quz</div>',
  sampleId: 97
});

testCaseFor('insertOrderedList.w3c.97r', {
  after: '<div contenteditable>foo<ol><li>bar</li><li>^baz|</li></ol>quz</div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>|baz^</li></ul>quz</div>',
  sampleId: '97r'
});

testCaseFor('insertOrderedList.w3c.98', {
  after: '<div contenteditable>foo<ol><li>bar</li><li>^baz</li><li>quz|</li></ol></div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>^baz</li></ul>quz|</div>',
  sampleId: 98
});

testCaseFor('insertOrderedList.w3c.98r', {
  after: '<div contenteditable>foo<ol><li>bar</li><li>^baz</li><li>quz|</li></ol></div>',
  before: '<div contenteditable>foo<ol><li>bar</li></ol><ul><li>|baz</li></ul>quz^</div>',
  sampleId: '98r'
});

testCaseFor('insertOrderedList.w3c.99', {
  after: '<div contenteditable>foo<ol><li>^bar|</li><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>^bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: 99
});

testCaseFor('insertOrderedList.w3c.99r', {
  after: '<div contenteditable>foo<ol><li>^bar|</li><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>foo<ul><li>|bar^</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: '99r'
});

testCaseFor('insertOrderedList.w3c.100', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>^foo<ul><li>bar|</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: 100
});

testCaseFor('insertOrderedList.w3c.100r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li><li>baz</li></ol>quz</div>',
  before: '<div contenteditable>|foo<ul><li>bar^</li></ul><ol><li>baz</li></ol>quz</div>',
  sampleId: '100r'
});
