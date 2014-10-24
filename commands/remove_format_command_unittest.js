// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('removeFormat.element.all', {
  before: '<p contenteditable>^<b>abcd</b>|</p>',
  after:'<p contenteditable>^abcd|</p>'
});

testCaseFor('removeFormat.element.partial', {
  before: '<p contenteditable>^<b>abcd|<i>efg</i></b></p>',
  after:'<p contenteditable>^abcd|<b><i>efg</i></b></p>'
});

testCaseFor('removeFormat.contents.all', {
  before: '<p contenteditable><b>^abcd|</b></p>',
  after:'<p contenteditable>^abcd|</p>'
});

testCaseFor('removeFormat.contents.partial', {
  before: '<p contenteditable><i><b>ab^cd|</b></i></p>',
  after:'<p contenteditable><i><b>ab</b></i>^cd|</p>'
});

testCaseFor('removeFormat.contents.partial2', {
  before: '<b contenteditable><i>ab^cd|</i></b>',
  after:'<b contenteditable><i>ab</i>^cd|</b>'
});

testCaseFor('removeFormat.class', {
  before: '<p contenteditable><style>.bold{font-weight:bold}</style>^<span class="bold">abcd</span>|</p>',
  after:'<p contenteditable><style>.bold{font-weight:bold}</style><span class="bold">^abcd|</span></p>',
  notes: 'class="bold" does not affect removeFormat'
});

testCaseFor('removeFormat.nested_div_style', {
  before: '<div contenteditable><div style="font-weight: bold">fo^o<div style="font-style: italic">bar</div>ba|z</div>',
  after: '<div contenteditable><div><span style="font-weight: bold">fo</span>^o<div>bar</div>ba|<b>z</b></div></div>',
});

// We should move B and I inside P.
testCaseFor('removeFormat.phrasing_grouping.1', {
  after: '<div contenteditable><p><i><b><span style="font-weight: bold">foo</span></b></i>^bar|<i><b>baz</b></i></p></div>',
  before: '<div contenteditable><i><b><p style="font-weight: bold">foo^bar|baz</p></b></i></div>',
  notes: 'from removeFormat.w3c.136'
});

testCaseFor('removeFormat.phrasing_grouping.2', {
  after: '<div contenteditable><p><i><b><span style="font-weight: bold">foo</span></b></i>^bar|<i><b>baz</b></i></p><i><b>quux</b></i></div>',
  before: '<div contenteditable><i><b><p style="font-weight: bold">foo^bar|baz</p>quux</b></i></div>',
  notes: 'from removeFormat.w3c.136'
});
