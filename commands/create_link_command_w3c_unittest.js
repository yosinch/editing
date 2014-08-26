// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This test is generated from https://dvcs.w3.org/hg/editing/raw-file/tip/conformancetest/data.js
// in HTML Editing APIs specification of https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html

'use strict';

// 92 test cases
testCaseFor('createLink', 'w3c.1', {
  after: '<div contenteditable>foo|bar</div>',
  before: '<div contenteditable>foo|bar</div>',
  sampleId: 1,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.2', {
  after: '<div contenteditable><p><a href="http://www.google.com/">^foo</a></p> <p><a href="http://www.google.com/">bar|</a></p></div>',
  before: '<div contenteditable><p>^foo</p> <p>bar|</p></div>',
  sampleId: 2,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.2r', {
  after: '<div contenteditable><p><a href="http://www.google.com/">|foo</a></p> <p><a href="http://www.google.com/">bar^</a></p></div>',
  before: '<div contenteditable><p>|foo</p> <p>bar^</p></div>',
  sampleId: '2r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.3', {
  after: '<div contenteditable><a href="http://www.google.com/"><span>^foo</span> <span>bar|</span></a></div>',
  before: '<div contenteditable><span>^foo</span> <span>bar|</span></div>',
  sampleId: 3,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.3r', {
  after: '<div contenteditable><a href="http://www.google.com/"><span>|foo</span> <span>bar^</span></a></div>',
  before: '<div contenteditable><span>|foo</span> <span>bar^</span></div>',
  sampleId: '3r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.4', {
  after: '<div contenteditable><p><a href="http://www.google.com/">^foo</a></p><p> <a href="http://www.google.com/"><span>bar</span></a> </p><p><a href="http://www.google.com/">baz|</a></p></div>',
  before: '<div contenteditable><p>^foo</p><p> <span>bar</span> </p><p>baz|</p></div>',
  sampleId: 4,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.4r', {
  after: '<div contenteditable><p><a href="http://www.google.com/">|foo</a></p><p> <a href="http://www.google.com/"><span>bar</span></a> </p><p><a href="http://www.google.com/">baz^</a></p></div>',
  before: '<div contenteditable><p>|foo</p><p> <span>bar</span> </p><p>baz^</p></div>',
  sampleId: '4r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.5', {
  after: '<div contenteditable><p><a href="http://www.google.com/">^foo</a></p><p><a href="http://www.google.com/"><br></a></p><p><a href="http://www.google.com/">bar|</a></p></div>',
  before: '<div contenteditable><p>^foo</p><p><br></p><p>bar|</p></div>',
  sampleId: 5,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.5r', {
  after: '<div contenteditable><p><a href="http://www.google.com/">|foo</a></p><p><a href="http://www.google.com/"><br></a></p><p><a href="http://www.google.com/">bar^</a></p></div>',
  before: '<div contenteditable><p>|foo</p><p><br></p><p>bar^</p></div>',
  sampleId: '5r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.6', {
  after: '<div contenteditable><b>foo|bar</b></div>',
  before: '<div contenteditable><b>foo|bar</b></div>',
  sampleId: 6,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.7', {
  after: '<div contenteditable><i>foo|bar</i></div>',
  before: '<div contenteditable><i>foo|bar</i></div>',
  sampleId: 7,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.8', {
  after: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  before: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  sampleId: 8,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.9', {
  after: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  before: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  sampleId: 9,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.9r', {
  after: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  before: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  sampleId: '9r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.10', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^bar|</a>baz</div>',
  before: '<div contenteditable>foo^bar|baz</div>',
  sampleId: 10,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.10r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|bar^</a>baz</div>',
  before: '<div contenteditable>foo|bar^baz</div>',
  sampleId: '10r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.11', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^bar</a><b><a href="http://www.google.com/">baz|</a>qoz</b>quz</div>',
  before: '<div contenteditable>foo^bar<b>baz|qoz</b>quz</div>',
  sampleId: 11,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.11r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|bar</a><b><a href="http://www.google.com/">baz^</a>qoz</b>quz</div>',
  before: '<div contenteditable>foo|bar<b>baz^qoz</b>quz</div>',
  sampleId: '11r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.12', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^bar</a><i><a href="http://www.google.com/">baz|</a>qoz</i>quz</div>',
  before: '<div contenteditable>foo^bar<i>baz|qoz</i>quz</div>',
  sampleId: 12,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.12r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|bar</a><i><a href="http://www.google.com/">baz^</a>qoz</i>quz</div>',
  before: '<div contenteditable>foo|bar<i>baz^qoz</i>quz</div>',
  sampleId: '12r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.13', {
  after: '<div contenteditable>^<p></p><p> </p><p><a href="http://www.google.com/">foo</a></p>|</div>',
  before: '<div contenteditable>^<p></p><p> </p><p>foo</p>|</div>',
  sampleId: 13,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.13r', {
  after: '<div contenteditable>|<p></p><p> </p><p><a href="http://www.google.com/">foo</a></p>^</div>',
  before: '<div contenteditable>|<p></p><p> </p><p>foo</p>^</div>',
  sampleId: '13r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.14', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td>b<a href="http://www.google.com/">^a|</a>r</td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b^a|r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: 14,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.14r', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td><td>b<a href="http://www.google.com/">|a^</a>r</td><td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td><td>b|a^r</td><td>baz</td></tr></tbody></table></div>',
  sampleId: '14r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.15', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td>^<td><a href="http://www.google.com/">bar</a></td>|<td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td>^<td>bar</td>|<td>baz</td></tr></tbody></table></div>',
  sampleId: 15,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.15r', {
  after: '<div contenteditable><table><tbody><tr><td>foo</td>|<td><a href="http://www.google.com/">bar</a></td>^<td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr><td>foo</td>|<td>bar</td>^<td>baz</td></tr></tbody></table></div>',
  sampleId: '15r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.16', {
  after: '<div contenteditable><table><tbody><tr>^<td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td>|<td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr>^<td>foo</td><td>bar</td>|<td>baz</td></tr></tbody></table></div>',
  sampleId: 16,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.16r', {
  after: '<div contenteditable><table><tbody><tr>|<td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td>^<td>baz</td></tr></tbody></table></div>',
  before: '<div contenteditable><table><tbody><tr>|<td>foo</td><td>bar</td>^<td>baz</td></tr></tbody></table></div>',
  sampleId: '16r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.17', {
  after: '<div contenteditable><table><tbody>^<tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr>|</tbody></table></div>',
  before: '<div contenteditable><table><tbody>^<tr><td>foo</td><td>bar</td><td>baz</td></tr>|</tbody></table></div>',
  sampleId: 17,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.17r', {
  after: '<div contenteditable><table><tbody>|<tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr>^</tbody></table></div>',
  before: '<div contenteditable><table><tbody>|<tr><td>foo</td><td>bar</td><td>baz</td></tr>^</tbody></table></div>',
  sampleId: '17r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.18', {
  after: '<div contenteditable><table>^<tbody><tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr></tbody>|</table></div>',
  before: '<div contenteditable><table>^<tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody>|</table></div>',
  sampleId: 18,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.18r', {
  after: '<div contenteditable><table>|<tbody><tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr></tbody>^</table></div>',
  before: '<div contenteditable><table>|<tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody>^</table></div>',
  sampleId: '18r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.19', {
  after: '<div contenteditable>^<table><tbody><tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr></tbody></table>|</div>',
  before: '<div contenteditable>^<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>|</div>',
  sampleId: 19,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.19r', {
  after: '<div contenteditable>|<table><tbody><tr><td><a href="http://www.google.com/">foo</a></td><td><a href="http://www.google.com/">bar</a></td><td><a href="http://www.google.com/">baz</a></td></tr></tbody></table>^</div>',
  before: '<div contenteditable>|<table><tbody><tr><td>foo</td><td>bar</td><td>baz</td></tr></tbody></table>^</div>',
  sampleId: '19r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.20', {
  after: '<div contenteditable><a href="http://www.google.com/">foo^bar|baz</a></div>',
  before: '<div contenteditable><a href="http://www.google.com">foo^bar|baz</a></div>',
  sampleId: 20,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.20r', {
  after: '<div contenteditable><a href="http://www.google.com/">foo|bar^baz</a></div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo|bar^baz</a></div>',
  sampleId: '20r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.21', {
  after: '<div contenteditable><a href="http://www.google.com/">foo^barbaz</a>|</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo^barbaz</a>|</div>',
  sampleId: 21,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.21r', {
  after: '<div contenteditable><a href="http://www.google.com/">foo|barbaz</a>^</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo|barbaz</a>^</div>',
  sampleId: '21r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.22', {
  after: '<div contenteditable>^<a href="http://www.google.com/">foobar|baz</a></div>',
  before: '<div contenteditable>^<a href="http://www.google.com/">foobar|baz</a></div>',
  sampleId: 22,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.22r', {
  after: '<div contenteditable>|<a href="http://www.google.com/">foobar^baz</a></div>',
  before: '<div contenteditable>|<a href="http://www.google.com/">foobar^baz</a></div>',
  sampleId: '22r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.23', {
  after: '<div contenteditable>^<a href="http://www.google.com/">foobarbaz|</a></div>',
  before: '<div contenteditable>^<a href="http://www.google.com/">foobarbaz</a>|</div>',
  sampleId: 23,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.23r', {
  after: '<div contenteditable>|<a href="http://www.google.com/">foobarbaz^</a></div>',
  before: '<div contenteditable>|<a href="http://www.google.com/">foobarbaz</a>^</div>',
  sampleId: '23r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.24', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  before: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  sampleId: 24,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.24r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  before: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  sampleId: '24r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.25', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^bar|</a>baz</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">^bar|</a>baz</div>',
  sampleId: 25,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.25r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|bar^</a>baz</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">|bar^</a>baz</div>',
  sampleId: '25r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.26', {
  after: '<div contenteditable><a href="http://www.google.com/">^foo|bar</a>baz</div>',
  before: '<div contenteditable>^foo|<a href="http://www.google.com/">bar</a>baz</div>',
  notes: 'merge A elements.',
  sampleId: 26,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.26r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foo^bar</a>baz</div>',
  before: '<div contenteditable>|foo^<a href="http://www.google.com/">bar</a>baz</div>',
  sampleId: '26r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.27', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">bar^baz|</a></div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">bar</a>^baz|</div>',
  sampleId: 27,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.27r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">bar|baz^</a></div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">bar</a>|baz^</div>',
  sampleId: '27r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.28', {
  after: '<div contenteditable>foo^<a href="http://www.google.com/">bar</a>|baz</div>',
  before: '<div contenteditable>foo^<a href="http://www.google.com/">bar</a>|baz</div>',
  sampleId: 28,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.28r', {
  after: '<div contenteditable>foo|<a href="http://www.google.com/">bar</a>^baz</div>',
  before: '<div contenteditable>foo|<a href="http://www.google.com/">bar</a>^baz</div>',
  sampleId: '28r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.29', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^barbaz|</a></div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">^bar</a>baz|</div>',
  sampleId: 29,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.29r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|barbaz^</a></div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">|bar</a>baz^</div>',
  sampleId: '29r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.30', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobar|</a>baz</div>',
  before: '<div contenteditable>^foo<a href="http://www.google.com/">bar|</a>baz</div>',
  sampleId: 30,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.30r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobar^</a>baz</div>',
  before: '<div contenteditable>|foo<a href="http://www.google.com/">bar^</a>baz</div>',
  sampleId: '30r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.31', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  before: '<div contenteditable>^foo<a href="http://www.google.com/">bar</a>baz|</div>',
  sampleId: 31,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.31r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  before: '<div contenteditable>|foo<a href="http://www.google.com/">bar</a>baz^</div>',
  sampleId: '31r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.32', {
  after: '<div contenteditable><a href="http://www.google.com/">foo^bar|baz</a></div>',
  before: '<div contenteditable><a href="otherurl">foo^bar|baz</a></div>',
  sampleId: 32,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.32r', {
  after: '<div contenteditable><a href="http://www.google.com/">foo|bar^baz</a></div>',
  before: '<div contenteditable><a href="otherurl">foo|bar^baz</a></div>',
  sampleId: '32r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.33', {
  after: '<div contenteditable><a href="http://www.google.com/">foo^barbaz</a>|</div>',
  before: '<div contenteditable><a href="otherurl">foo^barbaz</a>|</div>',
  sampleId: 33,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.33r', {
  after: '<div contenteditable><a href="http://www.google.com/">foo|barbaz</a>^</div>',
  before: '<div contenteditable><a href="otherurl">foo|barbaz</a>^</div>',
  sampleId: '33r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.34', {
  after: '<div contenteditable>^<a href="http://www.google.com/">foobar|baz</a></div>',
  before: '<div contenteditable>^<a href="otherurl">foobar|baz</a></div>',
  sampleId: 34,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.34r', {
  after: '<div contenteditable>|<a href="http://www.google.com/">foobar^baz</a></div>',
  before: '<div contenteditable>|<a href="otherurl">foobar^baz</a></div>',
  sampleId: '34r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.35', {
  after: '<div contenteditable>^<a href="http://www.google.com/">foobarbaz|</a></div>',
  before: '<div contenteditable>^<a href="otherurl">foobarbaz</a>|</div>',
  sampleId: 35,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.35r', {
  after: '<div contenteditable>|<a href="http://www.google.com/">foobarbaz^</a></div>',
  before: '<div contenteditable>|<a href="otherurl">foobarbaz</a>^</div>',
  sampleId: '35r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.36', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  before: '<div contenteditable><a href="otherurl">^foobarbaz|</a></div>',
  sampleId: 36,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.36r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  before: '<div contenteditable><a href="otherurl">|foobarbaz^</a></div>',
  sampleId: '36r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.37', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^bar|</a>baz</div>',
  before: '<div contenteditable>foo<a href="otherurl">^bar|</a>baz</div>',
  sampleId: 37,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.37r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|bar^</a>baz</div>',
  before: '<div contenteditable>foo<a href="otherurl">|bar^</a>baz</div>',
  sampleId: '37r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.38', {
  after: '<div contenteditable>foo^<a href="http://www.google.com/">bar</a>|baz</div>',
  before: '<div contenteditable>foo^<a href="otherurl">bar</a>|baz</div>',
  sampleId: 38,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.38r', {
  after: '<div contenteditable>foo|<a href="http://www.google.com/">bar</a>^baz</div>',
  before: '<div contenteditable>foo|<a href="otherurl">bar</a>^baz</div>',
  sampleId: '38r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.39', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">^barbaz|</a></div>',
  before: '<div contenteditable>foo<a href="otherurl">^bar</a>baz|</div>',
  sampleId: 39,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.39r', {
  after: '<div contenteditable>foo<a href="http://www.google.com/">|barbaz^</a></div>',
  before: '<div contenteditable>foo<a href="otherurl">|bar</a>baz^</div>',
  sampleId: '39r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.40', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobar|</a>baz</div>',
  before: '<div contenteditable>^foo<a href="otherurl">bar|</a>baz</div>',
  sampleId: 40,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.40r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobar^</a>baz</div>',
  before: '<div contenteditable>|foo<a href="otherurl">bar^</a>baz</div>',
  sampleId: '40r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.41', {
  after: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  before: '<div contenteditable>^foo<a href="otherurl">bar</a>baz|</div>',
  sampleId: 41,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.41r', {
  after: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  before: '<div contenteditable>|foo<a href="otherurl">bar</a>baz^</div>',
  sampleId: '41r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.42', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>foo^bar|baz</b></a></div>',
  before: '<div contenteditable><a href="otherurl"><b>foo^bar|baz</b></a></div>',
  sampleId: 42,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.42r', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>foo|bar^baz</b></a></div>',
  before: '<div contenteditable><a href="otherurl"><b>foo|bar^baz</b></a></div>',
  sampleId: '42r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.43', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>foo^barbaz</b></a>|</div>',
  before: '<div contenteditable><a href="otherurl"><b>foo^barbaz</b></a>|</div>',
  sampleId: 43,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.43r', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>foo|barbaz</b></a>^</div>',
  before: '<div contenteditable><a href="otherurl"><b>foo|barbaz</b></a>^</div>',
  sampleId: '43r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.44', {
  after: '<div contenteditable>^<a href="http://www.google.com/"><b>foobar|baz</b></a></div>',
  before: '<div contenteditable>^<a href="otherurl"><b>foobar|baz</b></a></div>',
  sampleId: 44,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.44r', {
  after: '<div contenteditable>|<a href="http://www.google.com/"><b>foobar^baz</b></a></div>',
  before: '<div contenteditable>|<a href="otherurl"><b>foobar^baz</b></a></div>',
  sampleId: '44r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.45', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>^foobarbaz|</b></a></div>',
  before: '<div contenteditable><a href="otherurl"><b>^foobarbaz|</b></a></div>',
  sampleId: 45,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.45r', {
  after: '<div contenteditable><a href="http://www.google.com/"><b>|foobarbaz^</b></a></div>',
  before: '<div contenteditable><a href="otherurl"><b>|foobarbaz^</b></a></div>',
  sampleId: '45r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.46', {
  after: '<div contenteditable><span name="abc">foo<a href="http://www.google.com/">^bar|</a>baz</span></div>',
  before: '<div contenteditable><a name=abc>foo^bar|baz</a></div>',
  sampleId: 46,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.46r', {
  after: '<div contenteditable><span name="abc">foo<a href="http://www.google.com/">|bar^</a>baz</span></div>',
  before: '<div contenteditable><a name=abc>foo|bar^baz</a></div>',
  sampleId: '46r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.47', {
  after: '<div contenteditable><span name="abc"><b>foo<a href="http://www.google.com/">^bar|</a>baz</b></span></div>',
  before: '<div contenteditable><a name=abc><b>foo^bar|baz</b></a></div>',
  sampleId: 47,
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.47r', {
  after: '<div contenteditable><span name="abc"><b>foo<a href="http://www.google.com/">|bar^</a>baz</b></span></div>',
  before: '<div contenteditable><a name=abc><b>foo|bar^baz</b></a></div>',
  sampleId: '47r',
  value: 'http://www.google.com/'
});

testCaseFor('createLink', 'w3c.48', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo^bar|baz</div>',
  returnValue: false,
  sampleId: 48
});

testCaseFor('createLink', 'w3c.48r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo|bar^baz</div>',
  returnValue: false,
  sampleId: '48r'
});
