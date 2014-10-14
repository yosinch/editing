// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('insertOrderedList.w3c.101', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><blockquote>bar</blockquote>baz</div>',
  before: '<div contenteditable>^foo|<blockquote>bar</blockquote>baz</div>',
  sampleId: 101
});

testCaseFor('insertOrderedList.w3c.101r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><blockquote>bar</blockquote>baz</div>',
  before: '<div contenteditable>|foo^<blockquote>bar</blockquote>baz</div>',
  sampleId: '101r'
});

testCaseFor('insertOrderedList.w3c.102', {
  after: '<div contenteditable>foo<blockquote><ol><li>^bar|</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>foo<blockquote>^bar|</blockquote>baz</div>',
  sampleId: 102
});

testCaseFor('insertOrderedList.w3c.102r', {
  after: '<div contenteditable>foo<blockquote><ol><li>^bar|</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>foo<blockquote>|bar^</blockquote>baz</div>',
  sampleId: '102r'
});

testCaseFor('insertOrderedList.w3c.103', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>^foo<blockquote>bar|</blockquote>baz</div>',
  sampleId: 103
});

testCaseFor('insertOrderedList.w3c.103r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol>baz</div>',
  before: '<div contenteditable>|foo<blockquote>bar^</blockquote>baz</div>',
  sampleId: '103r'
});

testCaseFor('insertOrderedList.w3c.104', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>^bar|</blockquote>baz</div>',
  sampleId: 104
});

testCaseFor('insertOrderedList.w3c.104r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol>baz</div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>|bar^</blockquote>baz</div>',
  sampleId: '104r'
});

testCaseFor('insertOrderedList.w3c.105', {
  after: '<div contenteditable><blockquote><ol><li>^foo|</li><li>bar</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>^foo|<blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  sampleId: 105
});

testCaseFor('insertOrderedList.w3c.105r', {
  after: '<div contenteditable><blockquote><ol><li>^foo|</li><li>bar</li></ol></blockquote>baz</div>',
  before: '<div contenteditable>|foo^<blockquote><ol><li>bar</li></ol></blockquote>baz</div>',
  sampleId: '105r'
});

testCaseFor('insertOrderedList.w3c.106', {
  after: '<div contenteditable>foo<blockquote><ol><li>^bar|</li></ol>baz</blockquote></div>',
  before: '<div contenteditable>foo<blockquote>^bar|<br>baz</blockquote></div>',
  sampleId: 106
});

testCaseFor('insertOrderedList.w3c.106r', {
  after: '<div contenteditable>foo<blockquote><ol><li>^bar|</li></ol>baz</blockquote></div>',
  before: '<div contenteditable>foo<blockquote>|bar^<br>baz</blockquote></div>',
  sampleId: '106r'
});

testCaseFor('insertOrderedList.w3c.107', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol><blockquote>baz</blockquote></div>',
  before: '<div contenteditable>^foo<blockquote>bar|<br>baz</blockquote></div>',
  sampleId: 107
});

testCaseFor('insertOrderedList.w3c.107r', {
  after: '<div contenteditable><ol><li>^foo</li><li>bar|</li></ol><blockquote>baz</blockquote></div>',
  before: '<div contenteditable>|foo<blockquote>bar^<br>baz</blockquote></div>',
  sampleId: '107r'
});

testCaseFor('insertOrderedList.w3c.108', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><blockquote>baz</blockquote></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>^bar|<br>baz</blockquote></div>',
  sampleId: 108
});

testCaseFor('insertOrderedList.w3c.108r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><blockquote>baz</blockquote></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote>|bar^<br>baz</blockquote></div>',
  sampleId: '108r'
});

testCaseFor('insertOrderedList.w3c.109', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>^foo|</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: 109
});

testCaseFor('insertOrderedList.w3c.109r', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>|foo^</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: '109r'
});

testCaseFor('insertOrderedList.w3c.110', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>^foo|</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: 110
});

testCaseFor('insertOrderedList.w3c.110r', {
  after: '<div contenteditable><p><ol><li>^foo|</li></ol></p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>|foo^</p><blockquote><p>bar</p></blockquote><p>baz</p></div>',
  sampleId: '110r'
});

testCaseFor('insertOrderedList.w3c.111', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ol><li>^bar|</li></ol></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 111
});

testCaseFor('insertOrderedList.w3c.111r', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ol><li>^bar|</li></ol></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '111r'
});

testCaseFor('insertOrderedList.w3c.112', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ol><li>^bar|</li></ol></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 112
});

testCaseFor('insertOrderedList.w3c.112r', {
  after: '<div contenteditable><p>foo</p><blockquote><p><ol><li>^bar|</li></ol></p></blockquote><p>baz</p></div>',
  before: '<div contenteditable><p>foo</p><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '112r'
});

testCaseFor('insertOrderedList.w3c.113', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p></blockquote><p>baz</p></div>',
  sampleId: 113
});

testCaseFor('insertOrderedList.w3c.113r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p></blockquote><p>baz</p></div>',
  sampleId: '113r'
});

testCaseFor('insertOrderedList.w3c.114', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>^foo</p><blockquote><p>bar|</p></blockquote><p>baz</p></div>',
  sampleId: 114
});

testCaseFor('insertOrderedList.w3c.114r', {
  after: '<div contenteditable><p><ol><li>^foo</li><li>bar|</li></ol></p><p>baz</p></div>',
  before: '<div contenteditable><p>|foo</p><blockquote><p>bar^</p></blockquote><p>baz</p></div>',
  sampleId: '114r'
});

testCaseFor('insertOrderedList.w3c.115', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 115
});

testCaseFor('insertOrderedList.w3c.115r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '115r'
});

testCaseFor('insertOrderedList.w3c.116', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>^bar|</p></blockquote><p>baz</p></div>',
  sampleId: 116
});

testCaseFor('insertOrderedList.w3c.116r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol><p>baz</p></div>',
  before: '<div contenteditable><ol><li>foo</li></ol><blockquote><p>|bar^</p></blockquote><p>baz</p></div>',
  sampleId: '116r'
});

testCaseFor('insertOrderedList.w3c.117', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 117
});

testCaseFor('insertOrderedList.w3c.117r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li></ul><ol><li>^bar|</li></ol><ul><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '117r'
});

testCaseFor('insertOrderedList.w3c.118', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li></ul><span style="color: blue"><ol><li>^bar|</li></ol></span><ul style="color: blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 118
});

testCaseFor('insertOrderedList.w3c.118r', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li></ul><span style="color: blue"><ol><li>^bar|</li></ol></span><ul style="color: blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '118r'
});

testCaseFor('insertOrderedList.w3c.119', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li></ul><span style="color: blue"><ol><li>^bar|</li></ol></span><ul style="color: blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 119
});

testCaseFor('insertOrderedList.w3c.119r', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li></ul><span style="color: blue"><ol><li>^bar|</li></ol></span><ul style="color: blue"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '119r'
});

testCaseFor('insertOrderedList.w3c.120', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^bar|</span></li></ol></span><ul style="text-indent: 1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 120
});

testCaseFor('insertOrderedList.w3c.120r', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^bar|</span></li></ol></span><ul style="text-indent: 1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '120r'
});

testCaseFor('insertOrderedList.w3c.121', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^bar|</span></li></ol></span><ul style="text-indent: 1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>^bar|</li><li>baz</li></ul></div>',
  sampleId: 121
});

testCaseFor('insertOrderedList.w3c.121r', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^bar|</span></li></ol></span><ul style="text-indent: 1em"><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>|bar^</li><li>baz</li></ul></div>',
  sampleId: '121r'
});

testCaseFor('insertOrderedList.w3c.122', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 122
});

testCaseFor('insertOrderedList.w3c.122r', {
  after: '<div contenteditable><ol><li>^foo|</li></ol><ul id="abc"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul id="abc"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '122r'
});

testCaseFor('insertOrderedList.w3c.123', {
  after: '<div contenteditable><ol><li><span style="color: blue">^foo|</span></li></ol><ul style="color: blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 123
});

testCaseFor('insertOrderedList.w3c.123r', {
  after: '<div contenteditable><ol><li><span style="color: blue">^foo|</span></li></ol><ul style="color: blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '123r'
});

testCaseFor('insertOrderedList.w3c.124', {
  after: '<div contenteditable><ol><li><span style="color: blue">^foo|</span></li></ol><ul style="color: blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 124
});

testCaseFor('insertOrderedList.w3c.124r', {
  after: '<div contenteditable><ol><li><span style="color: blue">^foo|</span></li></ol><ul style="color: blue"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="color: blue"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '124r'
});

testCaseFor('insertOrderedList.w3c.125', {
  after: '<div contenteditable><ol><li><span style="text-indent: 1em">^foo|</span></li></ol><ul style="text-indent: 1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>^foo|</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: 125
});

testCaseFor('insertOrderedList.w3c.125r', {
  after: '<div contenteditable><ol><li><span style="text-indent: 1em">^foo|</span></li></ol><ul style="text-indent: 1em"><li>bar</li><li>baz</li></ul></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>|foo^</li><li>bar</li><li>baz</li></ul></div>',
  sampleId: '125r'
});

testCaseFor('insertOrderedList.w3c.126', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul><ol><li>^baz|</li></ol></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 126
});

testCaseFor('insertOrderedList.w3c.126r', {
  after: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li></ul><ol><li>^baz|</li></ol></div>',
  before: '<div contenteditable><ul id="abc"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '126r'
});

testCaseFor('insertOrderedList.w3c.127', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li></ul><span style="color: blue"><ol><li>^baz|</li></ol></span></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 127
});

testCaseFor('insertOrderedList.w3c.127r', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li></ul><span style="color: blue"><ol><li>^baz|</li></ol></span></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '127r'
});

testCaseFor('insertOrderedList.w3c.128', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li></ul><span style="color: blue"><ol><li>^baz|</li></ol></span></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 128
});

testCaseFor('insertOrderedList.w3c.128r', {
  after: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li></ul><span style="color: blue"><ol><li>^baz|</li></ol></span></div>',
  before: '<div contenteditable><ul style="color: blue"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '128r'
});

testCaseFor('insertOrderedList.w3c.129', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^baz|</span></li></ol></span></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>bar</li><li>^baz|</li></ul></div>',
  sampleId: 129
});

testCaseFor('insertOrderedList.w3c.129r', {
  after: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>bar</li></ul><span style="text-indent: 1em"><ol><li><span style="text-indent: 1em">^baz|</span></li></ol></span></div>',
  before: '<div contenteditable><ul style="text-indent: 1em"><li>foo</li><li>bar</li><li>|baz^</li></ul></div>',
  sampleId: '129r'
});

testCaseFor('insertOrderedList.w3c.130', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol> </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>^bar|</p></div>',
  sampleId: 130
});

testCaseFor('insertOrderedList.w3c.130r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol> </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>|bar^</p></div>',
  sampleId: '130r'
});

testCaseFor('insertOrderedList.w3c.131', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol> </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>^bar|</p></div>',
  sampleId: 131
});

testCaseFor('insertOrderedList.w3c.131r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li></ol> </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>|bar^</p></div>',
  sampleId: '131r'
});

testCaseFor('insertOrderedList.w3c.132', {
  after: '<div contenteditable> <ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable><p>^foo|</p> <ol><li>bar</li></ol></div>',
  sampleId: 132
});

testCaseFor('insertOrderedList.w3c.132r', {
  after: '<div contenteditable> <ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable><p>|foo^</p> <ol><li>bar</li></ol></div>',
  sampleId: '132r'
});

testCaseFor('insertOrderedList.w3c.133', {
  after: '<div contenteditable> <ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable><p>^foo|</p> <ol><li>bar</li></ol></div>',
  sampleId: 133
});

testCaseFor('insertOrderedList.w3c.133r', {
  after: '<div contenteditable> <ol><li>^foo|</li><li>bar</li></ol></div>',
  before: '<div contenteditable><p>|foo^</p> <ol><li>bar</li></ol></div>',
  sampleId: '133r'
});

testCaseFor('insertOrderedList.w3c.134', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol>  </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>^bar|</p> <ol><li>baz</li></ol></div>',
  sampleId: 134
});

testCaseFor('insertOrderedList.w3c.134r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol>  </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>|bar^</p> <ol><li>baz</li></ol></div>',
  sampleId: '134r'
});

testCaseFor('insertOrderedList.w3c.135', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol>  </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>^bar|</p> <ol><li>baz</li></ol></div>',
  sampleId: 135
});

testCaseFor('insertOrderedList.w3c.135r', {
  after: '<div contenteditable><ol><li>foo</li><li>^bar|</li><li>baz</li></ol>  </div>',
  before: '<div contenteditable><ol><li>foo</li></ol> <p>|bar^</p> <ol><li>baz</li></ol></div>',
  sampleId: '135r'
});
