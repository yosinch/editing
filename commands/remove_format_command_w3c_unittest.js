// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This test is generated from https://dvcs.w3.org/hg/editing/raw-file/tip/conformancetest/data.js
// in HTML Editing APIs specification of https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html

'use strict';

// 284 test cases
testCaseFor('removeFormat', 'w3c.1', {
  after: '<div contenteditable>foo|bar</div>',
  before: '<div contenteditable>foo|bar</div>',
  sampleId: 1
});

testCaseFor('removeFormat', 'w3c.2', {
  after: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  before: '<div contenteditable><span>foo</span>|<span>bar</span></div>',
  sampleId: 2
});

testCaseFor('removeFormat', 'w3c.3', {
  after: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  before: '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  sampleId: 3
});

testCaseFor('removeFormat', 'w3c.3r', {
  after: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  before: '<div contenteditable><span>foo|</span><span>^bar</span></div>',
  sampleId: '3r'
});

testCaseFor('removeFormat', 'w3c.4', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b>bar</b>baz|</div>',
  sampleId: 4
});

testCaseFor('removeFormat', 'w3c.4r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b>bar</b>baz^</div>',
  sampleId: '4r'
});

testCaseFor('removeFormat', 'w3c.5', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b>bar</b>baz|</div>',
  sampleId: 5
});

testCaseFor('removeFormat', 'w3c.5r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b>bar</b>baz^</div>',
  sampleId: '5r'
});

testCaseFor('removeFormat', 'w3c.6', {
  after: '<div contenteditable>foo^barbaz|</div>',
  before: '<div contenteditable>foo^<b>bar</b>baz|</div>',
  sampleId: 6
});

testCaseFor('removeFormat', 'w3c.6r', {
  after: '<div contenteditable>foo|barbaz^</div>',
  before: '<div contenteditable>foo|<b>bar</b>baz^</div>',
  sampleId: '6r'
});

testCaseFor('removeFormat', 'w3c.7', {
  after: '<div contenteditable>foo^barbaz|</div>',
  before: '<div contenteditable>foo^<b>bar</b>baz|</div>',
  sampleId: 7
});

testCaseFor('removeFormat', 'w3c.7r', {
  after: '<div contenteditable>foo|barbaz^</div>',
  before: '<div contenteditable>foo|<b>bar</b>baz^</div>',
  sampleId: '7r'
});

testCaseFor('removeFormat', 'w3c.8', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo^<b>bar</b>|baz</div>',
  sampleId: 8
});

testCaseFor('removeFormat', 'w3c.8r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo|<b>bar</b>^baz</div>',
  sampleId: '8r'
});

testCaseFor('removeFormat', 'w3c.9', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo^<b>bar</b>|baz</div>',
  sampleId: 9
});

testCaseFor('removeFormat', 'w3c.9r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo|<b>bar</b>^baz</div>',
  sampleId: '9r'
});

testCaseFor('removeFormat', 'w3c.10', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo<b>^bar|</b>baz</div>',
  sampleId: 10
});

testCaseFor('removeFormat', 'w3c.10r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo<b>|bar^</b>baz</div>',
  sampleId: '10r'
});

testCaseFor('removeFormat', 'w3c.11', {
  after: '<div contenteditable>foo^bar|baz</div>',
  before: '<div contenteditable>foo<b>^bar|</b>baz</div>',
  sampleId: 11
});

testCaseFor('removeFormat', 'w3c.11r', {
  after: '<div contenteditable>foo|bar^baz</div>',
  before: '<div contenteditable>foo<b>|bar^</b>baz</div>',
  sampleId: '11r'
});

testCaseFor('removeFormat', 'w3c.12', {
  after: '<div contenteditable>foo<b>b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b^a|r</b>baz</div>',
  sampleId: 12
});

testCaseFor('removeFormat', 'w3c.12r', {
  after: '<div contenteditable>foo<b>b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b|a^r</b>baz</div>',
  sampleId: '12r'
});

testCaseFor('removeFormat', 'w3c.13', {
  after: '<div contenteditable>foo<b>b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b^a|r</b>baz</div>',
  sampleId: 13
});

testCaseFor('removeFormat', 'w3c.13r', {
  after: '<div contenteditable>foo<b>b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b|a^r</b>baz</div>',
  sampleId: '13r'
});

testCaseFor('removeFormat', 'w3c.14', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<strong>bar</strong>baz|</div>',
  sampleId: 14
});

testCaseFor('removeFormat', 'w3c.14r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<strong>bar</strong>baz^</div>',
  sampleId: '14r'
});

testCaseFor('removeFormat', 'w3c.15', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span style="font-weight: bold">bar</span>baz|</div>',
  sampleId: 15
});

testCaseFor('removeFormat', 'w3c.15r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span style="font-weight: bold">bar</span>baz^</div>',
  sampleId: '15r'
});

testCaseFor('removeFormat', 'w3c.16', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span style="font-weight: bold">bar</span>baz|</div>',
  sampleId: 16
});

testCaseFor('removeFormat', 'w3c.16r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span style="font-weight: bold">bar</span>baz^</div>',
  sampleId: '16r'
});

testCaseFor('removeFormat', 'w3c.17', {
  after: '<div contenteditable>foo<span style="font-weight: bold">b</span>^a|<span style="font-weight: bold">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-weight: bold">b^a|r</span>baz</div>',
  sampleId: 17
});

testCaseFor('removeFormat', 'w3c.17r', {
  after: '<div contenteditable>foo<span style="font-weight: bold">b</span>|a^<span style="font-weight: bold">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-weight: bold">b|a^r</span>baz</div>',
  sampleId: '17r'
});

testCaseFor('removeFormat', 'w3c.18', {
  after: '<div contenteditable>foo<span style="font-weight: bold">b</span>^a|<span style="font-weight: bold">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-weight: bold">b^a|r</span>baz</div>',
  sampleId: 18
});

testCaseFor('removeFormat', 'w3c.18r', {
  after: '<div contenteditable>foo<span style="font-weight: bold">b</span>|a^<span style="font-weight: bold">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-weight: bold">b|a^r</span>baz</div>',
  sampleId: '18r'
});

testCaseFor('removeFormat', 'w3c.19', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span style="font-variant: small-caps">bar</span>baz|</div>',
  sampleId: 19
});

testCaseFor('removeFormat', 'w3c.19r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span style="font-variant: small-caps">bar</span>baz^</div>',
  sampleId: '19r'
});

testCaseFor('removeFormat', 'w3c.20', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span style="font-variant: small-caps">bar</span>baz|</div>',
  sampleId: 20
});

testCaseFor('removeFormat', 'w3c.20r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span style="font-variant: small-caps">bar</span>baz^</div>',
  sampleId: '20r'
});

testCaseFor('removeFormat', 'w3c.21', {
  after: '<div contenteditable>foo<span style="font-variant: small-caps">b</span>^a|<span style="font-variant: small-caps">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-variant: small-caps">b^a|r</span>baz</div>',
  sampleId: 21
});

testCaseFor('removeFormat', 'w3c.21r', {
  after: '<div contenteditable>foo<span style="font-variant: small-caps">b</span>|a^<span style="font-variant: small-caps">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-variant: small-caps">b|a^r</span>baz</div>',
  sampleId: '21r'
});

testCaseFor('removeFormat', 'w3c.22', {
  after: '<div contenteditable>foo<span style="font-variant: small-caps">b</span>^a|<span style="font-variant: small-caps">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-variant: small-caps">b^a|r</span>baz</div>',
  sampleId: 22
});

testCaseFor('removeFormat', 'w3c.22r', {
  after: '<div contenteditable>foo<span style="font-variant: small-caps">b</span>|a^<span style="font-variant: small-caps">r</span>baz</div>',
  before: '<div contenteditable>foo<span style="font-variant: small-caps">b|a^r</span>baz</div>',
  sampleId: '22r'
});

testCaseFor('removeFormat', 'w3c.23', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b id="foo">bar</b>baz|</div>',
  sampleId: 23
});

testCaseFor('removeFormat', 'w3c.23r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b id="foo">bar</b>baz^</div>',
  sampleId: '23r'
});

testCaseFor('removeFormat', 'w3c.24', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b id="foo">bar</b>baz|</div>',
  sampleId: 24
});

testCaseFor('removeFormat', 'w3c.24r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b id="foo">bar</b>baz^</div>',
  sampleId: '24r'
});

testCaseFor('removeFormat', 'w3c.25', {
  after: '<div contenteditable>foo<b id="foo">b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b id="foo">b^a|r</b>baz</div>',
  sampleId: 25
});

testCaseFor('removeFormat', 'w3c.25r', {
  after: '<div contenteditable>foo<b id="foo">b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b id="foo">b|a^r</b>baz</div>',
  sampleId: '25r'
});

testCaseFor('removeFormat', 'w3c.26', {
  after: '<div contenteditable>foo<b id="foo">b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b id="foo">b^a|r</b>baz</div>',
  sampleId: 26
});

testCaseFor('removeFormat', 'w3c.26r', {
  after: '<div contenteditable>foo<b id="foo">b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b id="foo">b|a^r</b>baz</div>',
  sampleId: '26r'
});

testCaseFor('removeFormat', 'w3c.27', {
  after: '<div contenteditable>^foo<a>bar</a>baz|</div>',
  before: '<div contenteditable>^foo<a>bar</a>baz|</div>',
  sampleId: 27
});

testCaseFor('removeFormat', 'w3c.27r', {
  after: '<div contenteditable>|foo<a>bar</a>baz^</div>',
  before: '<div contenteditable>|foo<a>bar</a>baz^</div>',
  sampleId: '27r'
});

testCaseFor('removeFormat', 'w3c.28', {
  after: '<div contenteditable>foo<a>b^a|r</a>baz</div>',
  before: '<div contenteditable>foo<a>b^a|r</a>baz</div>',
  sampleId: 28
});

testCaseFor('removeFormat', 'w3c.28r', {
  after: '<div contenteditable>foo<a>b|a^r</a>baz</div>',
  before: '<div contenteditable>foo<a>b|a^r</a>baz</div>',
  sampleId: '28r'
});

testCaseFor('removeFormat', 'w3c.29', {
  after: '<div contenteditable>^foo<a href="foo">bar</a>baz|</div>',
  before: '<div contenteditable>^foo<a href="foo">bar</a>baz|</div>',
  sampleId: 29
});

testCaseFor('removeFormat', 'w3c.29r', {
  after: '<div contenteditable>|foo<a href="foo">bar</a>baz^</div>',
  before: '<div contenteditable>|foo<a href="foo">bar</a>baz^</div>',
  sampleId: '29r'
});

testCaseFor('removeFormat', 'w3c.30', {
  after: '<div contenteditable>foo<a href="foo">b^a|r</a>baz</div>',
  before: '<div contenteditable>foo<a href="foo">b^a|r</a>baz</div>',
  sampleId: 30
});

testCaseFor('removeFormat', 'w3c.30r', {
  after: '<div contenteditable>foo<a href="foo">b|a^r</a>baz</div>',
  before: '<div contenteditable>foo<a href="foo">b|a^r</a>baz</div>',
  sampleId: '30r'
});

testCaseFor('removeFormat', 'w3c.31', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<abbr>bar</abbr>baz|</div>',
  sampleId: 31
});

testCaseFor('removeFormat', 'w3c.31r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<abbr>bar</abbr>baz^</div>',
  sampleId: '31r'
});

testCaseFor('removeFormat', 'w3c.32', {
  after: '<div contenteditable>foo<abbr>b</abbr>^a|<abbr>r</abbr>baz</div>',
  before: '<div contenteditable>foo<abbr>b^a|r</abbr>baz</div>',
  sampleId: 32
});

testCaseFor('removeFormat', 'w3c.32r', {
  after: '<div contenteditable>foo<abbr>b</abbr>|a^<abbr>r</abbr>baz</div>',
  before: '<div contenteditable>foo<abbr>b|a^r</abbr>baz</div>',
  sampleId: '32r'
});

testCaseFor('removeFormat', 'w3c.33', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<acronym>bar</acronym>baz|</div>',
  sampleId: 33
});

testCaseFor('removeFormat', 'w3c.33r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<acronym>bar</acronym>baz^</div>',
  sampleId: '33r'
});

testCaseFor('removeFormat', 'w3c.34', {
  after: '<div contenteditable>foo<acronym>b</acronym>^a|<acronym>r</acronym>baz</div>',
  before: '<div contenteditable>foo<acronym>b^a|r</acronym>baz</div>',
  sampleId: 34
});

testCaseFor('removeFormat', 'w3c.34r', {
  after: '<div contenteditable>foo<acronym>b</acronym>|a^<acronym>r</acronym>baz</div>',
  before: '<div contenteditable>foo<acronym>b|a^r</acronym>baz</div>',
  sampleId: '34r'
});

testCaseFor('removeFormat', 'w3c.35', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b>bar</b>baz|</div>',
  sampleId: 35
});

testCaseFor('removeFormat', 'w3c.35r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b>bar</b>baz^</div>',
  sampleId: '35r'
});

testCaseFor('removeFormat', 'w3c.36', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b>bar</b>baz|</div>',
  sampleId: 36
});

testCaseFor('removeFormat', 'w3c.36r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b>bar</b>baz^</div>',
  sampleId: '36r'
});

testCaseFor('removeFormat', 'w3c.37', {
  after: '<div contenteditable>foo<b>b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b^a|r</b>baz</div>',
  sampleId: 37
});

testCaseFor('removeFormat', 'w3c.37r', {
  after: '<div contenteditable>foo<b>b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b|a^r</b>baz</div>',
  sampleId: '37r'
});

testCaseFor('removeFormat', 'w3c.38', {
  after: '<div contenteditable>foo<b>b</b>^a|<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b^a|r</b>baz</div>',
  sampleId: 38
});

testCaseFor('removeFormat', 'w3c.38r', {
  after: '<div contenteditable>foo<b>b</b>|a^<b>r</b>baz</div>',
  before: '<div contenteditable>foo<b>b|a^r</b>baz</div>',
  sampleId: '38r'
});

testCaseFor('removeFormat', 'w3c.39', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<bdi dir="rtl">bar</bdi>baz|</div>',
  sampleId: 39
});

testCaseFor('removeFormat', 'w3c.39r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<bdi dir="rtl">bar</bdi>baz^</div>',
  sampleId: '39r'
});

testCaseFor('removeFormat', 'w3c.40', {
  after: '<div contenteditable>foo<bdi dir="rtl">b</bdi>^a|<bdi dir="rtl">r</bdi>baz</div>',
  before: '<div contenteditable>foo<bdi dir="rtl">b^a|r</bdi>baz</div>',
  sampleId: 40
});

testCaseFor('removeFormat', 'w3c.40r', {
  after: '<div contenteditable>foo<bdi dir="rtl">b</bdi>|a^<bdi dir="rtl">r</bdi>baz</div>',
  before: '<div contenteditable>foo<bdi dir="rtl">b|a^r</bdi>baz</div>',
  sampleId: '40r'
});

testCaseFor('removeFormat', 'w3c.41', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<bdo dir="rtl">bar</bdo>baz|</div>',
  sampleId: 41
});

testCaseFor('removeFormat', 'w3c.41r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<bdo dir="rtl">bar</bdo>baz^</div>',
  sampleId: '41r'
});

testCaseFor('removeFormat', 'w3c.42', {
  after: '<div contenteditable>foo<bdo dir="rtl">b</bdo>^a|<bdo dir="rtl">r</bdo>baz</div>',
  before: '<div contenteditable>foo<bdo dir="rtl">b^a|r</bdo>baz</div>',
  sampleId: 42
});

testCaseFor('removeFormat', 'w3c.42r', {
  after: '<div contenteditable>foo<bdo dir="rtl">b</bdo>|a^<bdo dir="rtl">r</bdo>baz</div>',
  before: '<div contenteditable>foo<bdo dir="rtl">b|a^r</bdo>baz</div>',
  sampleId: '42r'
});

testCaseFor('removeFormat', 'w3c.43', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<big>bar</big>baz|</div>',
  sampleId: 43
});

testCaseFor('removeFormat', 'w3c.43r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<big>bar</big>baz^</div>',
  sampleId: '43r'
});

testCaseFor('removeFormat', 'w3c.44', {
  after: '<div contenteditable>foo<big>b</big>^a|<big>r</big>baz</div>',
  before: '<div contenteditable>foo<big>b^a|r</big>baz</div>',
  sampleId: 44
});

testCaseFor('removeFormat', 'w3c.44r', {
  after: '<div contenteditable>foo<big>b</big>|a^<big>r</big>baz</div>',
  before: '<div contenteditable>foo<big>b|a^r</big>baz</div>',
  sampleId: '44r'
});

testCaseFor('removeFormat', 'w3c.45', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<blink>bar</blink>baz|</div>',
  sampleId: 45
});

testCaseFor('removeFormat', 'w3c.45r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<blink>bar</blink>baz^</div>',
  sampleId: '45r'
});

testCaseFor('removeFormat', 'w3c.46', {
  after: '<div contenteditable>foo<blink>b</blink>^a|<blink>r</blink>baz</div>',
  before: '<div contenteditable>foo<blink>b^a|r</blink>baz</div>',
  sampleId: 46
});

testCaseFor('removeFormat', 'w3c.46r', {
  after: '<div contenteditable>foo<blink>b</blink>|a^<blink>r</blink>baz</div>',
  before: '<div contenteditable>foo<blink>b|a^r</blink>baz</div>',
  sampleId: '46r'
});

testCaseFor('removeFormat', 'w3c.47', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<cite>bar</cite>baz|</div>',
  sampleId: 47
});

testCaseFor('removeFormat', 'w3c.47r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<cite>bar</cite>baz^</div>',
  sampleId: '47r'
});

testCaseFor('removeFormat', 'w3c.48', {
  after: '<div contenteditable>foo<cite>b</cite>^a|<cite>r</cite>baz</div>',
  before: '<div contenteditable>foo<cite>b^a|r</cite>baz</div>',
  sampleId: 48
});

testCaseFor('removeFormat', 'w3c.48r', {
  after: '<div contenteditable>foo<cite>b</cite>|a^<cite>r</cite>baz</div>',
  before: '<div contenteditable>foo<cite>b|a^r</cite>baz</div>',
  sampleId: '48r'
});

testCaseFor('removeFormat', 'w3c.49', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<code>bar</code>baz|</div>',
  sampleId: 49
});

testCaseFor('removeFormat', 'w3c.49r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<code>bar</code>baz^</div>',
  sampleId: '49r'
});

testCaseFor('removeFormat', 'w3c.50', {
  after: '<div contenteditable>foo<code>b</code>^a|<code>r</code>baz</div>',
  before: '<div contenteditable>foo<code>b^a|r</code>baz</div>',
  sampleId: 50
});

testCaseFor('removeFormat', 'w3c.50r', {
  after: '<div contenteditable>foo<code>b</code>|a^<code>r</code>baz</div>',
  before: '<div contenteditable>foo<code>b|a^r</code>baz</div>',
  sampleId: '50r'
});

testCaseFor('removeFormat', 'w3c.51', {
  after: '<div contenteditable>^foo<del>bar</del>baz|</div>',
  before: '<div contenteditable>^foo<del>bar</del>baz|</div>',
  sampleId: 51
});

testCaseFor('removeFormat', 'w3c.51r', {
  after: '<div contenteditable>|foo<del>bar</del>baz^</div>',
  before: '<div contenteditable>|foo<del>bar</del>baz^</div>',
  sampleId: '51r'
});

testCaseFor('removeFormat', 'w3c.52', {
  after: '<div contenteditable>foo<del>b^a|r</del>baz</div>',
  before: '<div contenteditable>foo<del>b^a|r</del>baz</div>',
  sampleId: 52
});

testCaseFor('removeFormat', 'w3c.52r', {
  after: '<div contenteditable>foo<del>b|a^r</del>baz</div>',
  before: '<div contenteditable>foo<del>b|a^r</del>baz</div>',
  sampleId: '52r'
});

testCaseFor('removeFormat', 'w3c.53', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<dfn>bar</dfn>baz|</div>',
  sampleId: 53
});

testCaseFor('removeFormat', 'w3c.53r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<dfn>bar</dfn>baz^</div>',
  sampleId: '53r'
});

testCaseFor('removeFormat', 'w3c.54', {
  after: '<div contenteditable>foo<dfn>b</dfn>^a|<dfn>r</dfn>baz</div>',
  before: '<div contenteditable>foo<dfn>b^a|r</dfn>baz</div>',
  sampleId: 54
});

testCaseFor('removeFormat', 'w3c.54r', {
  after: '<div contenteditable>foo<dfn>b</dfn>|a^<dfn>r</dfn>baz</div>',
  before: '<div contenteditable>foo<dfn>b|a^r</dfn>baz</div>',
  sampleId: '54r'
});

testCaseFor('removeFormat', 'w3c.55', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<em>bar</em>baz|</div>',
  sampleId: 55
});

testCaseFor('removeFormat', 'w3c.55r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<em>bar</em>baz^</div>',
  sampleId: '55r'
});

testCaseFor('removeFormat', 'w3c.56', {
  after: '<div contenteditable>foo<em>b</em>^a|<em>r</em>baz</div>',
  before: '<div contenteditable>foo<em>b^a|r</em>baz</div>',
  sampleId: 56
});

testCaseFor('removeFormat', 'w3c.56r', {
  after: '<div contenteditable>foo<em>b</em>|a^<em>r</em>baz</div>',
  before: '<div contenteditable>foo<em>b|a^r</em>baz</div>',
  sampleId: '56r'
});

testCaseFor('removeFormat', 'w3c.57', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<font>bar</font>baz|</div>',
  sampleId: 57
});

testCaseFor('removeFormat', 'w3c.57r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<font>bar</font>baz^</div>',
  sampleId: '57r'
});

testCaseFor('removeFormat', 'w3c.58', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<font>bar</font>baz|</div>',
  sampleId: 58
});

testCaseFor('removeFormat', 'w3c.58r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<font>bar</font>baz^</div>',
  sampleId: '58r'
});

testCaseFor('removeFormat', 'w3c.59', {
  after: '<div contenteditable>foo<font>b</font>^a|<font>r</font>baz</div>',
  before: '<div contenteditable>foo<font>b^a|r</font>baz</div>',
  sampleId: 59
});

testCaseFor('removeFormat', 'w3c.59r', {
  after: '<div contenteditable>foo<font>b</font>|a^<font>r</font>baz</div>',
  before: '<div contenteditable>foo<font>b|a^r</font>baz</div>',
  sampleId: '59r'
});

testCaseFor('removeFormat', 'w3c.60', {
  after: '<div contenteditable>foo<font>b</font>^a|<font>r</font>baz</div>',
  before: '<div contenteditable>foo<font>b^a|r</font>baz</div>',
  sampleId: 60
});

testCaseFor('removeFormat', 'w3c.60r', {
  after: '<div contenteditable>foo<font>b</font>|a^<font>r</font>baz</div>',
  before: '<div contenteditable>foo<font>b|a^r</font>baz</div>',
  sampleId: '60r'
});

testCaseFor('removeFormat', 'w3c.61', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<font color="blue">bar</font>baz|</div>',
  sampleId: 61
});

testCaseFor('removeFormat', 'w3c.61r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<font color="blue">bar</font>baz^</div>',
  sampleId: '61r'
});

testCaseFor('removeFormat', 'w3c.62', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<font color="blue">bar</font>baz|</div>',
  sampleId: 62
});

testCaseFor('removeFormat', 'w3c.62r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<font color="blue">bar</font>baz^</div>',
  sampleId: '62r'
});

testCaseFor('removeFormat', 'w3c.63', {
  after: '<div contenteditable>foo<font color="blue">b</font>^a|<font color="blue">r</font>baz</div>',
  before: '<div contenteditable>foo<font color="blue">b^a|r</font>baz</div>',
  sampleId: 63
});

testCaseFor('removeFormat', 'w3c.63r', {
  after: '<div contenteditable>foo<font color="blue">b</font>|a^<font color="blue">r</font>baz</div>',
  before: '<div contenteditable>foo<font color="blue">b|a^r</font>baz</div>',
  sampleId: '63r'
});

testCaseFor('removeFormat', 'w3c.64', {
  after: '<div contenteditable>foo<font color="blue">b</font>^a|<font color="blue">r</font>baz</div>',
  before: '<div contenteditable>foo<font color="blue">b^a|r</font>baz</div>',
  sampleId: 64
});

testCaseFor('removeFormat', 'w3c.64r', {
  after: '<div contenteditable>foo<font color="blue">b</font>|a^<font color="blue">r</font>baz</div>',
  before: '<div contenteditable>foo<font color="blue">b|a^r</font>baz</div>',
  sampleId: '64r'
});

testCaseFor('removeFormat', 'w3c.65', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<i>bar</i>baz|</div>',
  sampleId: 65
});

testCaseFor('removeFormat', 'w3c.65r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<i>bar</i>baz^</div>',
  sampleId: '65r'
});

testCaseFor('removeFormat', 'w3c.66', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<i>bar</i>baz|</div>',
  sampleId: 66
});

testCaseFor('removeFormat', 'w3c.66r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<i>bar</i>baz^</div>',
  sampleId: '66r'
});

testCaseFor('removeFormat', 'w3c.67', {
  after: '<div contenteditable>foo<i>b</i>^a|<i>r</i>baz</div>',
  before: '<div contenteditable>foo<i>b^a|r</i>baz</div>',
  sampleId: 67
});

testCaseFor('removeFormat', 'w3c.67r', {
  after: '<div contenteditable>foo<i>b</i>|a^<i>r</i>baz</div>',
  before: '<div contenteditable>foo<i>b|a^r</i>baz</div>',
  sampleId: '67r'
});

testCaseFor('removeFormat', 'w3c.68', {
  after: '<div contenteditable>foo<i>b</i>^a|<i>r</i>baz</div>',
  before: '<div contenteditable>foo<i>b^a|r</i>baz</div>',
  sampleId: 68
});

testCaseFor('removeFormat', 'w3c.68r', {
  after: '<div contenteditable>foo<i>b</i>|a^<i>r</i>baz</div>',
  before: '<div contenteditable>foo<i>b|a^r</i>baz</div>',
  sampleId: '68r'
});

testCaseFor('removeFormat', 'w3c.69', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<ins>bar</ins>baz|</div>',
  sampleId: 69
});

testCaseFor('removeFormat', 'w3c.69r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<ins>bar</ins>baz^</div>',
  sampleId: '69r'
});

testCaseFor('removeFormat', 'w3c.70', {
  after: '<div contenteditable>foo<ins>b</ins>^a|<ins>r</ins>baz</div>',
  before: '<div contenteditable>foo<ins>b^a|r</ins>baz</div>',
  sampleId: 70
});

testCaseFor('removeFormat', 'w3c.70r', {
  after: '<div contenteditable>foo<ins>b</ins>|a^<ins>r</ins>baz</div>',
  before: '<div contenteditable>foo<ins>b|a^r</ins>baz</div>',
  sampleId: '70r'
});

testCaseFor('removeFormat', 'w3c.71', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<kbd>bar</kbd>baz|</div>',
  sampleId: 71
});

testCaseFor('removeFormat', 'w3c.71r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<kbd>bar</kbd>baz^</div>',
  sampleId: '71r'
});

testCaseFor('removeFormat', 'w3c.72', {
  after: '<div contenteditable>foo<kbd>b</kbd>^a|<kbd>r</kbd>baz</div>',
  before: '<div contenteditable>foo<kbd>b^a|r</kbd>baz</div>',
  sampleId: 72
});

testCaseFor('removeFormat', 'w3c.72r', {
  after: '<div contenteditable>foo<kbd>b</kbd>|a^<kbd>r</kbd>baz</div>',
  before: '<div contenteditable>foo<kbd>b|a^r</kbd>baz</div>',
  sampleId: '72r'
});

testCaseFor('removeFormat', 'w3c.73', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<mark>bar</mark>baz|</div>',
  sampleId: 73
});

testCaseFor('removeFormat', 'w3c.73r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<mark>bar</mark>baz^</div>',
  sampleId: '73r'
});

testCaseFor('removeFormat', 'w3c.74', {
  after: '<div contenteditable>foo<mark>b</mark>^a|<mark>r</mark>baz</div>',
  before: '<div contenteditable>foo<mark>b^a|r</mark>baz</div>',
  sampleId: 74
});

testCaseFor('removeFormat', 'w3c.74r', {
  after: '<div contenteditable>foo<mark>b</mark>|a^<mark>r</mark>baz</div>',
  before: '<div contenteditable>foo<mark>b|a^r</mark>baz</div>',
  sampleId: '74r'
});

testCaseFor('removeFormat', 'w3c.75', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<nobr>bar</nobr>baz|</div>',
  sampleId: 75
});

testCaseFor('removeFormat', 'w3c.75r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<nobr>bar</nobr>baz^</div>',
  sampleId: '75r'
});

testCaseFor('removeFormat', 'w3c.76', {
  after: '<div contenteditable>foo<nobr>b</nobr>^a|<nobr>r</nobr>baz</div>',
  before: '<div contenteditable>foo<nobr>b^a|r</nobr>baz</div>',
  sampleId: 76
});

testCaseFor('removeFormat', 'w3c.76r', {
  after: '<div contenteditable>foo<nobr>b</nobr>|a^<nobr>r</nobr>baz</div>',
  before: '<div contenteditable>foo<nobr>b|a^r</nobr>baz</div>',
  sampleId: '76r'
});

testCaseFor('removeFormat', 'w3c.77', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<q>bar</q>baz|</div>',
  sampleId: 77
});

testCaseFor('removeFormat', 'w3c.77r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<q>bar</q>baz^</div>',
  sampleId: '77r'
});

testCaseFor('removeFormat', 'w3c.78', {
  after: '<div contenteditable>foo<q>b</q>^a|<q>r</q>baz</div>',
  before: '<div contenteditable>foo<q>b^a|r</q>baz</div>',
  sampleId: 78
});

testCaseFor('removeFormat', 'w3c.78r', {
  after: '<div contenteditable>foo<q>b</q>|a^<q>r</q>baz</div>',
  before: '<div contenteditable>foo<q>b|a^r</q>baz</div>',
  sampleId: '78r'
});

testCaseFor('removeFormat', 'w3c.79', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<samp>bar</samp>baz|</div>',
  sampleId: 79
});

testCaseFor('removeFormat', 'w3c.79r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<samp>bar</samp>baz^</div>',
  sampleId: '79r'
});

testCaseFor('removeFormat', 'w3c.80', {
  after: '<div contenteditable>foo<samp>b</samp>^a|<samp>r</samp>baz</div>',
  before: '<div contenteditable>foo<samp>b^a|r</samp>baz</div>',
  sampleId: 80
});

testCaseFor('removeFormat', 'w3c.80r', {
  after: '<div contenteditable>foo<samp>b</samp>|a^<samp>r</samp>baz</div>',
  before: '<div contenteditable>foo<samp>b|a^r</samp>baz</div>',
  sampleId: '80r'
});

testCaseFor('removeFormat', 'w3c.81', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<s>bar</s>baz|</div>',
  sampleId: 81
});

testCaseFor('removeFormat', 'w3c.81r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<s>bar</s>baz^</div>',
  sampleId: '81r'
});

testCaseFor('removeFormat', 'w3c.82', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<s>bar</s>baz|</div>',
  sampleId: 82
});

testCaseFor('removeFormat', 'w3c.82r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<s>bar</s>baz^</div>',
  sampleId: '82r'
});

testCaseFor('removeFormat', 'w3c.83', {
  after: '<div contenteditable>foo<s>b</s>^a|<s>r</s>baz</div>',
  before: '<div contenteditable>foo<s>b^a|r</s>baz</div>',
  sampleId: 83
});

testCaseFor('removeFormat', 'w3c.83r', {
  after: '<div contenteditable>foo<s>b</s>|a^<s>r</s>baz</div>',
  before: '<div contenteditable>foo<s>b|a^r</s>baz</div>',
  sampleId: '83r'
});

testCaseFor('removeFormat', 'w3c.84', {
  after: '<div contenteditable>foo<s>b</s>^a|<s>r</s>baz</div>',
  before: '<div contenteditable>foo<s>b^a|r</s>baz</div>',
  sampleId: 84
});

testCaseFor('removeFormat', 'w3c.84r', {
  after: '<div contenteditable>foo<s>b</s>|a^<s>r</s>baz</div>',
  before: '<div contenteditable>foo<s>b|a^r</s>baz</div>',
  sampleId: '84r'
});

testCaseFor('removeFormat', 'w3c.85', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<small>bar</small>baz|</div>',
  sampleId: 85
});

testCaseFor('removeFormat', 'w3c.85r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<small>bar</small>baz^</div>',
  sampleId: '85r'
});

testCaseFor('removeFormat', 'w3c.86', {
  after: '<div contenteditable>foo<small>b</small>^a|<small>r</small>baz</div>',
  before: '<div contenteditable>foo<small>b^a|r</small>baz</div>',
  sampleId: 86
});

testCaseFor('removeFormat', 'w3c.86r', {
  after: '<div contenteditable>foo<small>b</small>|a^<small>r</small>baz</div>',
  before: '<div contenteditable>foo<small>b|a^r</small>baz</div>',
  sampleId: '86r'
});

testCaseFor('removeFormat', 'w3c.87', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span>bar</span>baz|</div>',
  sampleId: 87
});

testCaseFor('removeFormat', 'w3c.87r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span>bar</span>baz^</div>',
  sampleId: '87r'
});

testCaseFor('removeFormat', 'w3c.88', {
  after: '<div contenteditable>foo<span>b</span>^a|<span>r</span>baz</div>',
  before: '<div contenteditable>foo<span>b^a|r</span>baz</div>',
  sampleId: 88
});

testCaseFor('removeFormat', 'w3c.88r', {
  after: '<div contenteditable>foo<span>b</span>|a^<span>r</span>baz</div>',
  before: '<div contenteditable>foo<span>b|a^r</span>baz</div>',
  sampleId: '88r'
});

testCaseFor('removeFormat', 'w3c.89', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<strike>bar</strike>baz|</div>',
  sampleId: 89
});

testCaseFor('removeFormat', 'w3c.89r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<strike>bar</strike>baz^</div>',
  sampleId: '89r'
});

testCaseFor('removeFormat', 'w3c.90', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<strike>bar</strike>baz|</div>',
  sampleId: 90
});

testCaseFor('removeFormat', 'w3c.90r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<strike>bar</strike>baz^</div>',
  sampleId: '90r'
});

testCaseFor('removeFormat', 'w3c.91', {
  after: '<div contenteditable>foo<strike>b</strike>^a|<strike>r</strike>baz</div>',
  before: '<div contenteditable>foo<strike>b^a|r</strike>baz</div>',
  sampleId: 91
});

testCaseFor('removeFormat', 'w3c.91r', {
  after: '<div contenteditable>foo<strike>b</strike>|a^<strike>r</strike>baz</div>',
  before: '<div contenteditable>foo<strike>b|a^r</strike>baz</div>',
  sampleId: '91r'
});

testCaseFor('removeFormat', 'w3c.92', {
  after: '<div contenteditable>foo<strike>b</strike>^a|<strike>r</strike>baz</div>',
  before: '<div contenteditable>foo<strike>b^a|r</strike>baz</div>',
  sampleId: 92
});

testCaseFor('removeFormat', 'w3c.92r', {
  after: '<div contenteditable>foo<strike>b</strike>|a^<strike>r</strike>baz</div>',
  before: '<div contenteditable>foo<strike>b|a^r</strike>baz</div>',
  sampleId: '92r'
});

testCaseFor('removeFormat', 'w3c.93', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<strong>bar</strong>baz|</div>',
  sampleId: 93
});

testCaseFor('removeFormat', 'w3c.93r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<strong>bar</strong>baz^</div>',
  sampleId: '93r'
});

testCaseFor('removeFormat', 'w3c.94', {
  after: '<div contenteditable>foo<strong>b</strong>^a|<strong>r</strong>baz</div>',
  before: '<div contenteditable>foo<strong>b^a|r</strong>baz</div>',
  sampleId: 94
});

testCaseFor('removeFormat', 'w3c.94r', {
  after: '<div contenteditable>foo<strong>b</strong>|a^<strong>r</strong>baz</div>',
  before: '<div contenteditable>foo<strong>b|a^r</strong>baz</div>',
  sampleId: '94r'
});

testCaseFor('removeFormat', 'w3c.95', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<sub>bar</sub>baz|</div>',
  sampleId: 95
});

testCaseFor('removeFormat', 'w3c.95r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<sub>bar</sub>baz^</div>',
  sampleId: '95r'
});

testCaseFor('removeFormat', 'w3c.96', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<sub>bar</sub>baz|</div>',
  sampleId: 96
});

testCaseFor('removeFormat', 'w3c.96r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<sub>bar</sub>baz^</div>',
  sampleId: '96r'
});

testCaseFor('removeFormat', 'w3c.97', {
  after: '<div contenteditable>foo<sub>b</sub>^a|<sub>r</sub>baz</div>',
  before: '<div contenteditable>foo<sub>b^a|r</sub>baz</div>',
  sampleId: 97
});

testCaseFor('removeFormat', 'w3c.97r', {
  after: '<div contenteditable>foo<sub>b</sub>|a^<sub>r</sub>baz</div>',
  before: '<div contenteditable>foo<sub>b|a^r</sub>baz</div>',
  sampleId: '97r'
});

testCaseFor('removeFormat', 'w3c.98', {
  after: '<div contenteditable>foo<sub>b</sub>^a|<sub>r</sub>baz</div>',
  before: '<div contenteditable>foo<sub>b^a|r</sub>baz</div>',
  sampleId: 98
});

testCaseFor('removeFormat', 'w3c.98r', {
  after: '<div contenteditable>foo<sub>b</sub>|a^<sub>r</sub>baz</div>',
  before: '<div contenteditable>foo<sub>b|a^r</sub>baz</div>',
  sampleId: '98r'
});

testCaseFor('removeFormat', 'w3c.99', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<sup>bar</sup>baz|</div>',
  sampleId: 99
});

testCaseFor('removeFormat', 'w3c.99r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<sup>bar</sup>baz^</div>',
  sampleId: '99r'
});

testCaseFor('removeFormat', 'w3c.100', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<sup>bar</sup>baz|</div>',
  sampleId: 100
});

testCaseFor('removeFormat', 'w3c.100r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<sup>bar</sup>baz^</div>',
  sampleId: '100r'
});

testCaseFor('removeFormat', 'w3c.101', {
  after: '<div contenteditable>foo<sup>b</sup>^a|<sup>r</sup>baz</div>',
  before: '<div contenteditable>foo<sup>b^a|r</sup>baz</div>',
  sampleId: 101
});

testCaseFor('removeFormat', 'w3c.101r', {
  after: '<div contenteditable>foo<sup>b</sup>|a^<sup>r</sup>baz</div>',
  before: '<div contenteditable>foo<sup>b|a^r</sup>baz</div>',
  sampleId: '101r'
});

testCaseFor('removeFormat', 'w3c.102', {
  after: '<div contenteditable>foo<sup>b</sup>^a|<sup>r</sup>baz</div>',
  before: '<div contenteditable>foo<sup>b^a|r</sup>baz</div>',
  sampleId: 102
});

testCaseFor('removeFormat', 'w3c.102r', {
  after: '<div contenteditable>foo<sup>b</sup>|a^<sup>r</sup>baz</div>',
  before: '<div contenteditable>foo<sup>b|a^r</sup>baz</div>',
  sampleId: '102r'
});

testCaseFor('removeFormat', 'w3c.103', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<tt>bar</tt>baz|</div>',
  sampleId: 103
});

testCaseFor('removeFormat', 'w3c.103r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<tt>bar</tt>baz^</div>',
  sampleId: '103r'
});

testCaseFor('removeFormat', 'w3c.104', {
  after: '<div contenteditable>foo<tt>b</tt>^a|<tt>r</tt>baz</div>',
  before: '<div contenteditable>foo<tt>b^a|r</tt>baz</div>',
  sampleId: 104
});

testCaseFor('removeFormat', 'w3c.104r', {
  after: '<div contenteditable>foo<tt>b</tt>|a^<tt>r</tt>baz</div>',
  before: '<div contenteditable>foo<tt>b|a^r</tt>baz</div>',
  sampleId: '104r'
});

testCaseFor('removeFormat', 'w3c.105', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<u>bar</u>baz|</div>',
  sampleId: 105
});

testCaseFor('removeFormat', 'w3c.105r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<u>bar</u>baz^</div>',
  sampleId: '105r'
});

testCaseFor('removeFormat', 'w3c.106', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<u>bar</u>baz|</div>',
  sampleId: 106
});

testCaseFor('removeFormat', 'w3c.106r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<u>bar</u>baz^</div>',
  sampleId: '106r'
});

testCaseFor('removeFormat', 'w3c.107', {
  after: '<div contenteditable>foo<u>b</u>^a|<u>r</u>baz</div>',
  before: '<div contenteditable>foo<u>b^a|r</u>baz</div>',
  sampleId: 107
});

testCaseFor('removeFormat', 'w3c.107r', {
  after: '<div contenteditable>foo<u>b</u>|a^<u>r</u>baz</div>',
  before: '<div contenteditable>foo<u>b|a^r</u>baz</div>',
  sampleId: '107r'
});

testCaseFor('removeFormat', 'w3c.108', {
  after: '<div contenteditable>foo<u>b</u>^a|<u>r</u>baz</div>',
  before: '<div contenteditable>foo<u>b^a|r</u>baz</div>',
  sampleId: 108
});

testCaseFor('removeFormat', 'w3c.108r', {
  after: '<div contenteditable>foo<u>b</u>|a^<u>r</u>baz</div>',
  before: '<div contenteditable>foo<u>b|a^r</u>baz</div>',
  sampleId: '108r'
});

testCaseFor('removeFormat', 'w3c.109', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<var>bar</var>baz|</div>',
  sampleId: 109
});

testCaseFor('removeFormat', 'w3c.109r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<var>bar</var>baz^</div>',
  sampleId: '109r'
});

testCaseFor('removeFormat', 'w3c.110', {
  after: '<div contenteditable>foo<var>b</var>^a|<var>r</var>baz</div>',
  before: '<div contenteditable>foo<var>b^a|r</var>baz</div>',
  sampleId: 110
});

testCaseFor('removeFormat', 'w3c.110r', {
  after: '<div contenteditable>foo<var>b</var>|a^<var>r</var>baz</div>',
  before: '<div contenteditable>foo<var>b|a^r</var>baz</div>',
  sampleId: '110r'
});

testCaseFor('removeFormat', 'w3c.111', {
  after: '<div contenteditable>^foo<br>bar|</div>',
  before: '<div contenteditable>^foo<br>bar|</div>',
  sampleId: 111
});

testCaseFor('removeFormat', 'w3c.111r', {
  after: '<div contenteditable>|foo<br>bar^</div>',
  before: '<div contenteditable>|foo<br>bar^</div>',
  sampleId: '111r'
});

testCaseFor('removeFormat', 'w3c.112', {
  after: '<div contenteditable>^foo<hr>bar|</div>',
  before: '<div contenteditable>^foo<hr>bar|</div>',
  sampleId: 112
});

testCaseFor('removeFormat', 'w3c.112r', {
  after: '<div contenteditable>|foo<hr>bar^</div>',
  before: '<div contenteditable>|foo<hr>bar^</div>',
  sampleId: '112r'
});

testCaseFor('removeFormat', 'w3c.113', {
  after: '<div contenteditable>^foo<wbr>bar|</div>',
  before: '<div contenteditable>^foo<wbr>bar|</div>',
  sampleId: 113
});

testCaseFor('removeFormat', 'w3c.113r', {
  after: '<div contenteditable>|foo<wbr>bar^</div>',
  before: '<div contenteditable>|foo<wbr>bar^</div>',
  sampleId: '113r'
});

testCaseFor('removeFormat', 'w3c.114', {
  after: '<div contenteditable>^foo<img>bar|</div>',
  before: '<div contenteditable>^foo<img>bar|</div>',
  sampleId: 114
});

testCaseFor('removeFormat', 'w3c.114r', {
  after: '<div contenteditable>|foo<img>bar^</div>',
  before: '<div contenteditable>|foo<img>bar^</div>',
  sampleId: '114r'
});

testCaseFor('removeFormat', 'w3c.115', {
  after: '<div contenteditable>^foo<img src="abc">bar|</div>',
  before: '<div contenteditable>^foo<img src="abc">bar|</div>',
  sampleId: 115
});

testCaseFor('removeFormat', 'w3c.115r', {
  after: '<div contenteditable>|foo<img src="abc">bar^</div>',
  before: '<div contenteditable>|foo<img src="abc">bar^</div>',
  sampleId: '115r'
});

testCaseFor('removeFormat', 'w3c.116', {
  after: '<div contenteditable>^foo<video></video>bar|</div>',
  before: '<div contenteditable>^foo<video></video>bar|</div>',
  sampleId: 116
});

testCaseFor('removeFormat', 'w3c.116r', {
  after: '<div contenteditable>|foo<video></video>bar^</div>',
  before: '<div contenteditable>|foo<video></video>bar^</div>',
  sampleId: '116r'
});

testCaseFor('removeFormat', 'w3c.117', {
  after: '<div contenteditable>^foo<video src="abc"></video>bar|</div>',
  before: '<div contenteditable>^foo<video src="abc"></video>bar|</div>',
  sampleId: 117
});

testCaseFor('removeFormat', 'w3c.117r', {
  after: '<div contenteditable>|foo<video src="abc"></video>bar^</div>',
  before: '<div contenteditable>|foo<video src="abc"></video>bar^</div>',
  sampleId: '117r'
});

testCaseFor('removeFormat', 'w3c.118', {
  after: '<div contenteditable>^foo<svg><circle cx="20" cy="20" fill="blue" r="20"></circle></svg>bar|</div>',
  before: '<div contenteditable>^foo<svg><circle cx="20" cy="20" fill="blue" r="20"></circle></svg>bar|</div>',
  sampleId: 118
});

testCaseFor('removeFormat', 'w3c.118r', {
  after: '<div contenteditable>|foo<svg><circle cx="20" cy="20" fill="blue" r="20"></circle></svg>bar^</div>',
  before: '<div contenteditable>|foo<svg><circle cx="20" cy="20" fill="blue" r="20"></circle></svg>bar^</div>',
  sampleId: '118r'
});

testCaseFor('removeFormat', 'w3c.119', {
  after: '<div contenteditable>^foo<nonexistentelement>bar</nonexistentelement>baz|</div>',
  before: '<div contenteditable>^foo<nonexistentelement>bar</nonexistentelement>baz|</div>',
  sampleId: 119
});

testCaseFor('removeFormat', 'w3c.119r', {
  after: '<div contenteditable>|foo<nonexistentelement>bar</nonexistentelement>baz^</div>',
  before: '<div contenteditable>|foo<nonexistentelement>bar</nonexistentelement>baz^</div>',
  sampleId: '119r'
});

testCaseFor('removeFormat', 'w3c.120', {
  after: '<div contenteditable>foo<nonexistentelement>b^a|r</nonexistentelement>baz</div>',
  before: '<div contenteditable>foo<nonexistentelement>b^a|r</nonexistentelement>baz</div>',
  sampleId: 120
});

testCaseFor('removeFormat', 'w3c.120r', {
  after: '<div contenteditable>foo<nonexistentelement>b|a^r</nonexistentelement>baz</div>',
  before: '<div contenteditable>foo<nonexistentelement>b|a^r</nonexistentelement>baz</div>',
  sampleId: '120r'
});

testCaseFor('removeFormat', 'w3c.121', {
  after: '<div contenteditable>^foo<nonexistentelement style="display: block">bar</nonexistentelement>baz|</div>',
  before: '<div contenteditable>^foo<nonexistentelement style="display: block">bar</nonexistentelement>baz|</div>',
  sampleId: 121
});

testCaseFor('removeFormat', 'w3c.121r', {
  after: '<div contenteditable>|foo<nonexistentelement style="display: block">bar</nonexistentelement>baz^</div>',
  before: '<div contenteditable>|foo<nonexistentelement style="display: block">bar</nonexistentelement>baz^</div>',
  sampleId: '121r'
});

testCaseFor('removeFormat', 'w3c.122', {
  after: '<div contenteditable>foo<nonexistentelement style="display: block">b^a|r</nonexistentelement>baz</div>',
  before: '<div contenteditable>foo<nonexistentelement style="display: block">b^a|r</nonexistentelement>baz</div>',
  sampleId: 122
});

testCaseFor('removeFormat', 'w3c.122r', {
  after: '<div contenteditable>foo<nonexistentelement style="display: block">b|a^r</nonexistentelement>baz</div>',
  before: '<div contenteditable>foo<nonexistentelement style="display: block">b|a^r</nonexistentelement>baz</div>',
  sampleId: '122r'
});

testCaseFor('removeFormat', 'w3c.123', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span id="foo">bar</span>baz|</div>',
  sampleId: 123
});

testCaseFor('removeFormat', 'w3c.123r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span id="foo">bar</span>baz^</div>',
  sampleId: '123r'
});

testCaseFor('removeFormat', 'w3c.124', {
  after: '<div contenteditable>foo<span id="foo">b</span>^a|<span>r</span>baz</div>',
  before: '<div contenteditable>foo<span id="foo">b^a|r</span>baz</div>',
  sampleId: 124
});

testCaseFor('removeFormat', 'w3c.124r', {
  after: '<div contenteditable>foo<span id="foo">b</span>|a^<span>r</span>baz</div>',
  before: '<div contenteditable>foo<span id="foo">b|a^r</span>baz</div>',
  sampleId: '124r'
});

testCaseFor('removeFormat', 'w3c.125', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<span class="foo">bar</span>baz|</div>',
  sampleId: 125
});

testCaseFor('removeFormat', 'w3c.125r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<span class="foo">bar</span>baz^</div>',
  sampleId: '125r'
});

testCaseFor('removeFormat', 'w3c.126', {
  after: '<div contenteditable>foo<span class="foo">b</span>^a|<span class="foo">r</span>baz</div>',
  before: '<div contenteditable>foo<span class="foo">b^a|r</span>baz</div>',
  sampleId: 126
});

testCaseFor('removeFormat', 'w3c.126r', {
  after: '<div contenteditable>foo<span class="foo">b</span>|a^<span class="foo">r</span>baz</div>',
  before: '<div contenteditable>foo<span class="foo">b|a^r</span>baz</div>',
  sampleId: '126r'
});

testCaseFor('removeFormat', 'w3c.127', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b style="font-weight: normal">bar</b>baz|</div>',
  sampleId: 127
});

testCaseFor('removeFormat', 'w3c.127r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b style="font-weight: normal">bar</b>baz^</div>',
  sampleId: '127r'
});

testCaseFor('removeFormat', 'w3c.128', {
  after: '<div contenteditable>^foobarbaz|</div>',
  before: '<div contenteditable>^foo<b style="font-weight: normal">bar</b>baz|</div>',
  sampleId: 128
});

testCaseFor('removeFormat', 'w3c.128r', {
  after: '<div contenteditable>|foobarbaz^</div>',
  before: '<div contenteditable>|foo<b style="font-weight: normal">bar</b>baz^</div>',
  sampleId: '128r'
});

testCaseFor('removeFormat', 'w3c.129', {
  after: '<div contenteditable>foo<b style="font-weight: normal">b</b>^a|<b style="font-weight: normal">r</b>baz</div>',
  before: '<div contenteditable>foo<b style="font-weight: normal">b^a|r</b>baz</div>',
  sampleId: 129
});

testCaseFor('removeFormat', 'w3c.129r', {
  after: '<div contenteditable>foo<b style="font-weight: normal">b</b>|a^<b style="font-weight: normal">r</b>baz</div>',
  before: '<div contenteditable>foo<b style="font-weight: normal">b|a^r</b>baz</div>',
  sampleId: '129r'
});

testCaseFor('removeFormat', 'w3c.130', {
  after: '<div contenteditable>foo<b style="font-weight: normal">b</b>^a|<b style="font-weight: normal">r</b>baz</div>',
  before: '<div contenteditable>foo<b style="font-weight: normal">b^a|r</b>baz</div>',
  sampleId: 130
});

testCaseFor('removeFormat', 'w3c.130r', {
  after: '<div contenteditable>foo<b style="font-weight: normal">b</b>|a^<b style="font-weight: normal">r</b>baz</div>',
  before: '<div contenteditable>foo<b style="font-weight: normal">b|a^r</b>baz</div>',
  sampleId: '130r'
});

testCaseFor('removeFormat', 'w3c.131', {
  after: '<div contenteditable><p style="background-color: aqua">foo^bar|baz</p></div>',
  before: '<div contenteditable><p style="background-color: aqua">foo^bar|baz</p></div>',
  sampleId: 131
});

testCaseFor('removeFormat', 'w3c.131r', {
  after: '<div contenteditable><p style="background-color: aqua">foo|bar^baz</p></div>',
  before: '<div contenteditable><p style="background-color: aqua">foo|bar^baz</p></div>',
  sampleId: '131r'
});

testCaseFor('removeFormat', 'w3c.132', {
  after: '<div contenteditable><p><span style="background-color: aqua">foo</span>^bar|<span style="background-color: aqua">baz</span></p></div>',
  before: '<div contenteditable><p><span style="background-color: aqua">foo^bar|baz</span></p></div>',
  sampleId: 132
});

testCaseFor('removeFormat', 'w3c.132r', {
  after: '<div contenteditable><p><span style="background-color: aqua">foo</span>|bar^<span style="background-color: aqua">baz</span></p></div>',
  before: '<div contenteditable><p><span style="background-color: aqua">foo|bar^baz</span></p></div>',
  sampleId: '132r'
});

testCaseFor('removeFormat', 'w3c.133', {
  after: '<div contenteditable><p><span style="background-color: aqua">foo</span>^bar|<span style="background-color: aqua">baz</span></p></div>',
  before: '<div contenteditable><p><span style="background-color: aqua">foo^bar|baz</span></p></div>',
  sampleId: 133
});

testCaseFor('removeFormat', 'w3c.133r', {
  after: '<div contenteditable><p><span style="background-color: aqua">foo</span>|bar^<span style="background-color: aqua">baz</span></p></div>',
  before: '<div contenteditable><p><span style="background-color: aqua">foo|bar^baz</span></p></div>',
  sampleId: '133r'
});

testCaseFor('removeFormat', 'w3c.134', {
  after: '<div contenteditable><p><span style="font-weight: bold">foo</span>^bar|<span style="font-weight: bold">baz</span></p></div>',
  before: '<div contenteditable><p style="font-weight: bold">foo^bar|baz</p></div>',
  sampleId: 134
});

testCaseFor('removeFormat', 'w3c.134r', {
  after: '<div contenteditable><p><span style="font-weight: bold">foo</span>|bar^<span style="font-weight: bold">baz</span></p></div>',
  before: '<div contenteditable><p style="font-weight: bold">foo|bar^baz</p></div>',
  sampleId: '134r'
});

testCaseFor('removeFormat', 'w3c.135', {
  after: '<div contenteditable><p><b>foo</b>^bar|<b>baz</b></p></div>',
  before: '<div contenteditable><p style="font-weight: bold">foo^bar|baz</p></div>',
  sampleId: 135
});

testCaseFor('removeFormat', 'w3c.135r', {
  after: '<div contenteditable><p><b>foo</b>|bar^<b>baz</b></p></div>',
  before: '<div contenteditable><p style="font-weight: bold">foo|bar^baz</p></div>',
  sampleId: '135r'
});

testCaseFor('removeFormat', 'w3c.136', {
  after: '<div contenteditable><p><span style="font-weight: bold">foo</span>^bar|<span style="font-weight: bold">baz</span></p></div>',
  before: '<div contenteditable><b><p style="font-weight: bold">foo^bar|baz</p></b></div>',
  sampleId: 136
});

testCaseFor('removeFormat', 'w3c.136r', {
  after: '<div contenteditable><p><span style="font-weight: bold">foo</span>|bar^<span style="font-weight: bold">baz</span></p></div>',
  before: '<div contenteditable><b><p style="font-weight: bold">foo|bar^baz</p></b></div>',
  sampleId: '136r'
});

testCaseFor('removeFormat', 'w3c.137', {
  after: '<div contenteditable><p><b>foo</b>^bar|<b>baz</b></p></div>',
  before: '<div contenteditable><b><p style="font-weight: bold">foo^bar|baz</p></b></div>',
  sampleId: 137
});

testCaseFor('removeFormat', 'w3c.137r', {
  after: '<div contenteditable><p><b>foo</b>|bar^<b>baz</b></p></div>',
  before: '<div contenteditable><b><p style="font-weight: bold">foo|bar^baz</p></b></div>',
  sampleId: '137r'
});

testCaseFor('removeFormat', 'w3c.138', {
  after: '<div contenteditable><p style="font-variant: small-caps">foo^bar|baz</p></div>',
  before: '<div contenteditable><p style="font-variant: small-caps">foo^bar|baz</p></div>',
  sampleId: 138
});

testCaseFor('removeFormat', 'w3c.138r', {
  after: '<div contenteditable><p style="font-variant: small-caps">foo|bar^baz</p></div>',
  before: '<div contenteditable><p style="font-variant: small-caps">foo|bar^baz</p></div>',
  sampleId: '138r'
});

testCaseFor('removeFormat', 'w3c.139', {
  after: '<div contenteditable>^<p style="font-variant: small-caps">foobarbaz</p>|</div>',
  before: '<div contenteditable>^<p style="font-variant: small-caps">foobarbaz</p>|</div>',
  sampleId: 139
});

testCaseFor('removeFormat', 'w3c.139r', {
  after: '<div contenteditable>|<p style="font-variant: small-caps">foobarbaz</p>^</div>',
  before: '<div contenteditable>|<p style="font-variant: small-caps">foobarbaz</p>^</div>',
  sampleId: '139r'
});

testCaseFor('removeFormat', 'w3c.140', {
  after: '<div contenteditable><p style="text-indent: 2em">foo^bar|baz</p></div>',
  before: '<div contenteditable><p style="text-indent: 2em">foo^bar|baz</p></div>',
  sampleId: 140
});

testCaseFor('removeFormat', 'w3c.140r', {
  after: '<div contenteditable><p style="text-indent: 2em">foo|bar^baz</p></div>',
  before: '<div contenteditable><p style="text-indent: 2em">foo|bar^baz</p></div>',
  sampleId: '140r'
});

testCaseFor('removeFormat', 'w3c.141', {
  after: '<div contenteditable>^<p style="text-indent: 2em">foobarbaz</p>|</div>',
  before: '<div contenteditable>^<p style="text-indent: 2em">foobarbaz</p>|</div>',
  sampleId: 141
});

testCaseFor('removeFormat', 'w3c.141r', {
  after: '<div contenteditable>|<p style="text-indent: 2em">foobarbaz</p>^</div>',
  before: '<div contenteditable>|<p style="text-indent: 2em">foobarbaz</p>^</div>',
  sampleId: '141r'
});

testCaseFor('removeFormat', 'w3c.142', {
  after: '<div contenteditable><table>^<tbody><tr><td>foo</td></tr></tbody>|</table></div>',
  before: '<div contenteditable><table>^<tbody><tr><td><b>foo</b></td></tr></tbody>|</table></div>',
  sampleId: 142
});

testCaseFor('removeFormat', 'w3c.142r', {
  after: '<div contenteditable><table>|<tbody><tr><td>foo</td></tr></tbody>^</table></div>',
  before: '<div contenteditable><table>|<tbody><tr><td><b>foo</b></td></tr></tbody>^</table></div>',
  sampleId: '142r'
});

testCaseFor('removeFormat', 'w3c.143', {
  after: '<div contenteditable><table>^<tbody><tr><td>foo</td></tr></tbody>|</table></div>',
  before: '<div contenteditable><table>^<tbody><tr><td><b>foo</b></td></tr></tbody>|</table></div>',
  sampleId: 143
});

testCaseFor('removeFormat', 'w3c.143r', {
  after: '<div contenteditable><table>|<tbody><tr><td>foo</td></tr></tbody>^</table></div>',
  before: '<div contenteditable><table>|<tbody><tr><td><b>foo</b></td></tr></tbody>^</table></div>',
  sampleId: '143r'
});
