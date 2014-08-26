// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This test is generated from https://dvcs.w3.org/hg/editing/raw-file/tip/conformancetest/data.js
// in HTML Editing APIs specification of https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html

'use strict';

// 63 test cases
testCaseFor('unlink', 'w3c.1', {
  after: '<div contenteditable>foo|bar</div>',
  before: '<div contenteditable>foo|bar</div>',
  sampleId: 1
});

testCaseFor('unlink', 'w3c.2', {
  after: '<div contenteditable><p>^foo</p> <p>bar|</p></div>',
  before: '<div contenteditable><p>^foo</p> <p>bar|</p></div>',
  sampleId: 2
});

testCaseFor('unlink', 'w3c.2r', {
  after: '<div contenteditable><p>|foo</p> <p>bar^</p></div>',
  before: '<div contenteditable><p>|foo</p> <p>bar^</p></div>',
  sampleId: '2r'
});

testCaseFor('unlink', 'w3c.3', {
  after: '<div contenteditable><span>^foo</span> <span>bar|</span></div>',
  before: '<div contenteditable><span>^foo</span> <span>bar|</span></div>',
  sampleId: 3
});

testCaseFor('unlink', 'w3c.3r', {
  after: '<div contenteditable><span>|foo</span> <span>bar^</span></div>',
  before: '<div contenteditable><span>|foo</span> <span>bar^</span></div>',
  sampleId: '3r'
});

testCaseFor('unlink', 'w3c.4', {
  after: '<div contenteditable><p>^foo</p><p> <span>bar</span> </p><p>baz|</p></div>',
  before: '<div contenteditable><p>^foo</p><p> <span>bar</span> </p><p>baz|</p></div>',
  sampleId: 4
});

testCaseFor('unlink', 'w3c.4r', {
  after: '<div contenteditable><p>|foo</p><p> <span>bar</span> </p><p>baz^</p></div>',
  before: '<div contenteditable><p>|foo</p><p> <span>bar</span> </p><p>baz^</p></div>',
  sampleId: '4r'
});

testCaseFor('unlink', 'w3c.5', {
  after: '<div contenteditable><b>foo|bar</b></div>',
  before: '<div contenteditable><b>foo|bar</b></div>',
  sampleId: 5
});

testCaseFor('unlink', 'w3c.6', {
  after: '<div contenteditable><i>foo|bar</i></div>',
  before: '<div contenteditable><i>foo|bar</i></div>',
  sampleId: 6
});

testCaseFor('unlink', 'w3c.7', {
  after: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  before: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  sampleId: 7
});

testCaseFor('unlink', 'w3c.8', {
  after: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  before: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  sampleId: 8
});

testCaseFor('unlink', 'w3c.8r', {
  after: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  before: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  sampleId: '8r'
});

testCaseFor('unlink', 'w3c.9', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo^bar|baz</div>',
  sampleId: 9
});

testCaseFor('unlink', 'w3c.9r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo|bar^baz</div>',
  sampleId: '9r'
});

testCaseFor('unlink', 'w3c.10', {
  after: '<div contenteditable>foo^bar<b>baz|qoz</b>quz</div>',
  before: '<div contenteditable>foo^bar<b>baz|qoz</b>quz</div>',
  sampleId: 10
});

testCaseFor('unlink', 'w3c.10r', {
  after: '<div contenteditable>foo|bar<b>baz^qoz</b>quz</div>',
  before: '<div contenteditable>foo|bar<b>baz^qoz</b>quz</div>',
  sampleId: '10r'
});

testCaseFor('unlink', 'w3c.11', {
  after: '<div contenteditable>foo^bar<i>baz|qoz</i>quz</div>',
  before: '<div contenteditable>foo^bar<i>baz|qoz</i>quz</div>',
  sampleId: 11
});

testCaseFor('unlink', 'w3c.11r', {
  after: '<div contenteditable>foo|bar<i>baz^qoz</i>quz</div>',
  before: '<div contenteditable>foo|bar<i>baz^qoz</i>quz</div>',
  sampleId: '11r'
});

testCaseFor('unlink', 'w3c.12', {
  after: '<div contenteditable>^<p></p><p> </p><p>foo</p>|</div>',
  before: '<div contenteditable>^<p></p><p> </p><p>foo</p>|</div>',
  sampleId: 12
});

testCaseFor('unlink', 'w3c.12r', {
  after: '<div contenteditable>|<p></p><p> </p><p>foo</p>^</div>',
  before: '<div contenteditable>|<p></p><p> </p><p>foo</p>^</div>',
  sampleId: '12r'
});

testCaseFor('unlink', 'w3c.13', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo^bar|baz</a></div>',
  sampleId: 13
});

testCaseFor('unlink', 'w3c.13r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo|bar^baz</a></div>',
  sampleId: '13r'
});

testCaseFor('unlink', 'w3c.14', {
  after: '<div contenteditable>foo^barbaz|</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo^barbaz</a>|</div>',
  sampleId: 14
});

testCaseFor('unlink', 'w3c.14r', {
  after: '<div contenteditable>foo|barbaz^</div>',
  before: '<div contenteditable><a href="http://www.google.com/">foo|barbaz</a>^</div>',
  sampleId: '14r'
});

testCaseFor('unlink', 'w3c.15', {
  after: '<div contenteditable>^foobar|baz</div>',
  before: '<div contenteditable>^<a href="http://www.google.com/">foobar|baz</a></div>',
  sampleId: 15
});

testCaseFor('unlink', 'w3c.15r', {
  after: '<div contenteditable>|foobar^baz</div>',
  before: '<div contenteditable>|<a href="http://www.google.com/">foobar^baz</a></div>',
  sampleId: '15r'
});

testCaseFor('unlink', 'w3c.16', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^<a href="http://www.google.com/">foobarbaz</a>|</div>',
  sampleId: 16
});

testCaseFor('unlink', 'w3c.16r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|<a href="http://www.google.com/">foobarbaz</a>^</div>',
  sampleId: '16r'
});

testCaseFor('unlink', 'w3c.17', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable><a href="http://www.google.com/">^foobarbaz|</a></div>',
  sampleId: 17
});

testCaseFor('unlink', 'w3c.17r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable><a href="http://www.google.com/">|foobarbaz^</a></div>',
  sampleId: '17r'
});

testCaseFor('unlink', 'w3c.18', {
  after: '<div contenteditable>foob|arbaz</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">b|ar</a>baz</div>',
  sampleId: 18
});

testCaseFor('unlink', 'w3c.19', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">^bar|</a>baz</div>',
  sampleId: 19
});

testCaseFor('unlink', 'w3c.19r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">|bar^</a>baz</div>',
  sampleId: '19r'
});

testCaseFor('unlink', 'w3c.20', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo^<a href="http://www.google.com/">bar</a>|baz</div>',
  sampleId: 20
});

testCaseFor('unlink', 'w3c.20r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo|<a href="http://www.google.com/">bar</a>^baz</div>',
  sampleId: '20r'
});

testCaseFor('unlink', 'w3c.21', {
  after: '<div contenteditable>foo^barbaz|</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">^bar</a>baz|</div>',
  sampleId: 21
});

testCaseFor('unlink', 'w3c.21r', {
  after: '<div contenteditable>foo|barbaz^</div>',
  before: '<div contenteditable>foo<a href="http://www.google.com/">|bar</a>baz^</div>',
  sampleId: '21r'
});

testCaseFor('unlink', 'w3c.22', {
  after: '<div contenteditable>^foobar|baz</div>',
  before: '<div contenteditable>^foo<a href="http://www.google.com/">bar|</a>baz</div>',
  sampleId: 22
});

testCaseFor('unlink', 'w3c.22r', {
  after: '<div contenteditable>|foobar^baz</div>',
  before: '<div contenteditable>|foo<a href="http://www.google.com/">bar^</a>baz</div>',
  sampleId: '22r'
});

testCaseFor('unlink', 'w3c.23', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<a href="http://www.google.com/">bar</a>baz|</div>',
  sampleId: 23
});

testCaseFor('unlink', 'w3c.23r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<a href="http://www.google.com/">bar</a>baz^</div>',
  sampleId: '23r'
});

testCaseFor('unlink', 'w3c.24', {
  after: '<div contenteditable><a id="foo">foobar|baz</a></div>',
  before: '<div contenteditable><a id="foo" href="http://www.google.com/">foobar|baz</a></div>',
  sampleId: 24
});

testCaseFor('unlink', 'w3c.25', {
  after: '<div contenteditable><a id="foo">foo^bar|baz</a></div>',
  before: '<div contenteditable><a id="foo" href="http://www.google.com/">foo^bar|baz</a></div>',
  sampleId: 25
});

testCaseFor('unlink', 'w3c.25r', {
  after: '<div contenteditable><a id="foo">foo|bar^baz</a></div>',
  before: '<div contenteditable><a id="foo" href="http://www.google.com/">foo|bar^baz</a></div>',
  sampleId: '25r'
});

testCaseFor('unlink', 'w3c.26', {
  after: '<div contenteditable><a id="foo">^foobarbaz|</a></div>',
  before: '<div contenteditable><a id="foo" href="http://www.google.com/">^foobarbaz|</a></div>',
  sampleId: 26
});

testCaseFor('unlink', 'w3c.26r', {
  after: '<div contenteditable><a id="foo">|foobarbaz^</a></div>',
  before: '<div contenteditable><a id="foo" href="http://www.google.com/">|foobarbaz^</a></div>',
  sampleId: '26r'
});

testCaseFor('unlink', 'w3c.27', {
  after: '<div contenteditable>foo<a id="foo">^bar|</a>baz</div>',
  before: '<div contenteditable>foo<a id="foo" href="http://www.google.com/">^bar|</a>baz</div>',
  sampleId: 27
});

testCaseFor('unlink', 'w3c.27r', {
  after: '<div contenteditable>foo<a id="foo">|bar^</a>baz</div>',
  before: '<div contenteditable>foo<a id="foo" href="http://www.google.com/">|bar^</a>baz</div>',
  sampleId: '27r'
});

testCaseFor('unlink', 'w3c.28', {
  after: '<div contenteditable>foo^<a id="foo">bar</a>|baz</div>',
  before: '<div contenteditable>foo^<a id="foo" href="http://www.google.com/">bar</a>|baz</div>',
  sampleId: 28
});

testCaseFor('unlink', 'w3c.28r', {
  after: '<div contenteditable>foo|<a id="foo">bar</a>^baz</div>',
  before: '<div contenteditable>foo|<a id="foo" href="http://www.google.com/">bar</a>^baz</div>',
  sampleId: '28r'
});

testCaseFor('unlink', 'w3c.29', {
  after: '<div contenteditable>^foo<a id="foo">bar</a>baz|</div>',
  before: '<div contenteditable>^foo<a id="foo" href="http://www.google.com/">bar</a>baz|</div>',
  sampleId: 29
});

testCaseFor('unlink', 'w3c.29r', {
  after: '<div contenteditable>|foo<a id="foo">bar</a>baz^</div>',
  before: '<div contenteditable>|foo<a id="foo" href="http://www.google.com/">bar</a>baz^</div>',
  sampleId: '29r'
});

testCaseFor('unlink', 'w3c.30', {
  after: '<div contenteditable><a name="foo">foobar|baz</a></div>',
  before: '<div contenteditable><a name=foo>foobar|baz</a></div>',
  sampleId: 30
});

testCaseFor('unlink', 'w3c.31', {
  after: '<div contenteditable><a name="foo">foo^bar|baz</a></div>',
  before: '<div contenteditable><a name=foo>foo^bar|baz</a></div>',
  sampleId: 31
});

testCaseFor('unlink', 'w3c.31r', {
  after: '<div contenteditable><a name="foo">foo|bar^baz</a></div>',
  before: '<div contenteditable><a name=foo>foo|bar^baz</a></div>',
  sampleId: '31r'
});

testCaseFor('unlink', 'w3c.32', {
  after: '<div contenteditable><a name="foo">^foobarbaz|</a></div>',
  before: '<div contenteditable><a name=foo>^foobarbaz|</a></div>',
  sampleId: 32
});

testCaseFor('unlink', 'w3c.32r', {
  after: '<div contenteditable><a name="foo">|foobarbaz^</a></div>',
  before: '<div contenteditable><a name=foo>|foobarbaz^</a></div>',
  sampleId: '32r'
});

testCaseFor('unlink', 'w3c.33', {
  after: '<div contenteditable>foo<a name="foo">^bar|</a>baz</div>',
  before: '<div contenteditable>foo<a name=foo>^bar|</a>baz</div>',
  sampleId: 33
});

testCaseFor('unlink', 'w3c.33r', {
  after: '<div contenteditable>foo<a name="foo">|bar^</a>baz</div>',
  before: '<div contenteditable>foo<a name=foo>|bar^</a>baz</div>',
  sampleId: '33r'
});

testCaseFor('unlink', 'w3c.34', {
  after: '<div contenteditable>foo^<a name="foo">bar</a>|baz</div>',
  before: '<div contenteditable>foo^<a name=foo>bar</a>|baz</div>',
  sampleId: 34
});

testCaseFor('unlink', 'w3c.34r', {
  after: '<div contenteditable>foo|<a name="foo">bar</a>^baz</div>',
  before: '<div contenteditable>foo|<a name=foo>bar</a>^baz</div>',
  sampleId: '34r'
});

testCaseFor('unlink', 'w3c.35', {
  after: '<div contenteditable>^foo<a name="foo">bar</a>baz|</div>',
  before: '<div contenteditable>^foo<a name=foo>bar</a>baz|</div>',
  sampleId: 35
});

testCaseFor('unlink', 'w3c.35r', {
  after: '<div contenteditable>|foo<a name="foo">bar</a>baz^</div>',
  before: '<div contenteditable>|foo<a name=foo>bar</a>baz^</div>',
  sampleId: '35r'
});
