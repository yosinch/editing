// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// When |url| parameter is empty, |createLink| does nothing and returns
// false.
testCase('createLink.NoUrl', function() {
  if (testing.browserId == 'ie') {
    // Since IE shows modal dialog box to get URL, we don't run this test case,
    // to avoid manual closing modal dialog box.
    testRunner.skip('IE shows modal dialog box');
    return;
  }

  var sample = new testing.Sample('<p contenteditable>abcd|</p>');
  var editor = editing.Editor.getOrCreate(sample.document);
  editor.setDomSelection(sample.startingSelection);
  expectFalse(function() { return editor.execCommand('createLink'); });
  sample.finish();
});

// not editable
testCaseFor('createLink.not_editable.1', {
  after:'ab|cd',
  before: 'ab|cd',
  returnValue: false,
  value: 'URL'
});

testCaseFor('createLink.not_editable.2', {
  after:'a^b|cd',
  before: 'a^b|cd',
  returnValue: false,
  value: 'URL'
});

// Simple createLink
// <b>foo|bar</b> => <b>foo^<a>url</a>|bar</b>
testCaseFor('createLink.CaretAtFirst', {
  before: '<p contenteditable>|abcd</p>',
  after:'<p contenteditable><a href="URL">^URL|</a>abcd</p>',
  value: 'URL'
});

testCaseFor('createLink.Caret.AtLast', {
  before: '<p contenteditable>abcd|</p>',
  after: '<p contenteditable>abcd<a href="URL">^URL|</a></p>',
  value: 'URL'
});

testCaseFor('createLink.Caret.AtMiddle', {
  before: '<p contenteditable>ab|cd</p>',
  after:  '<p contenteditable>ab<a href="URL">^URL|</a>cd</p>',
  value: 'URL'
});

// createLink in interactive
// <a><b>foo|bar</b></a> => <a><b>foo</b></a><b><a>URL</a></b><a><b>bar</a>
testCaseFor('createLink.Caret.InteractiveAtFirst', {
  before: '<p contenteditable><a><b>|abcd</b></a></p>',
  after:  '<p contenteditable><a><b><a href="URL">^URL|</a>abcd</b></a></p>',
  value: 'URL'
});

testCaseFor('createLink.Caret.InteractiveAtLast', {
  before: '<p contenteditable><a><b>abcd|</b></a></p>',
  after:  '<p contenteditable><a><b>abcd<a href="URL">^URL|</a></b></a></p>',
  value: 'URL'
});

testCaseFor('createLink.Caret.InteractiveAtMiddle', {
  before: '<p contenteditable><a><b>ab|cd</b></a></p>',
  after:  '<p contenteditable><a><b>ab<a href="URL">^URL|</a>cd</b></a></p>',
  value: 'URL'
});

// http://jsfiddle.net/66566/
// <p contenteditable><a href="foo">^foo|</a></p>
// =>
// <p contenteditable>^<a href="URL">foo</a>|</p>
testCaseFor('createLink.Range.AnchorText.1', {
  before: '<p contenteditable><a href="foo">^foo|</a></p>',
  after:  '<p contenteditable><a href="URL">^foo|</a></p>',
  value: 'URL'
});

// Variation of w3c.42
// http://jsfiddle.net/66566/1/
// <p contenteditable<a href="foo">^fo|o</a></p>
// =>
// CR: <p contenteditable<a href="FOO">^fo<a href="URL">o</a></a></p>
// FF: <p contenteditable<a href="URL">foo</a></p>
// IE: <p contenteditable<a href="URL">foo</a></p>
testCaseFor('createLink.Range.AnchorText.2', {
  before: '<p contenteditable><a href="foo">^fo|o</a></p>',
  after:  '<p contenteditable><a href="URL">^fo|</a><a href="foo">o</a></p>',
  value: 'URL'
});


// Create link with LI
// Node: P element can't have UL as content, because P's context model is
// PHRASING,
testCaseFor('createLink.RangeList', {
  before: '<div contenteditable>^<ul><li>one</li><li>two</li></ul>|</div>',
  after:  '<div contenteditable><ul><li><a href="URL">^one</a></li><li><a href="URL">two|</a></li></ul></div>',
  value: 'URL'
});

// Create link with range.
testCaseFor('createLink.Range.SimpleText', {
  before: '<p contenteditable>^abcd|</p>',
  after:  '<p contenteditable><a href="URL">^abcd|</a></p>',
  value: 'URL'
});

testCaseFor('createLink.Range.SimpleTree', {
  before: '<p contenteditable>^abcd<b>efg</b>|</p>',
  after:  '<p contenteditable><a href="URL">^abcd<b>efg|</b></a></p>',
  value: 'URL'
});

// Crete link for end tag.
// CR: Insert anchor because of selection normalization.
// FF: No insertion, returns true
// IE: No insertion, ending selection is empty
// See also w3c.9 "^</span><span>|"
testCaseFor('createLink.EndTag', {
  before: '<p contenteditable><b>abc^</b>|</p>',
  after:  '<p contenteditable><b>abc<a href="URL">^URL|</a></b></p>',
  value: 'URL'
});

// Variation of w3c.3
// <span style="font-weight: bold"> is in effective nodes.
// An anchor element should have whitespace text node.
testCaseFor('createLink.Range.3.1', {
  after: '<div contenteditable><a href="URL"><span style="font-weight: bold">^foo</span> <span>bar|</span></a></div>',
  before: '<div contenteditable><span style="font-weight: bold">^foo</span> <span>bar|</span></div>',
  value: 'URL'
});

// Similar to "Range.3.1", but use B and I instead of SPAN.
testCaseFor('createLink.Range.3.2', {
  after: '<div contenteditable><a href="URL"><b>^foo</b> <i>bar|</i></a></div>',
  before: '<div contenteditable><b>^foo</b> <i>bar|</i></div>',
  value: 'URL'
});

// Variation of w3c.11
testCaseFor('createLink.Range.11.1', {
  after: '<div contenteditable>foo<b><a href="URL">^bar</a><i><a href="URL">baz |</a>quux</i></b>mox</div>',
  before: '<div contenteditable>foo<b>^bar<i>baz |quux</i></b>mox</div>',
  value: 'URL'
});

// <b>...</b> is in effective range.
testCaseFor('createLink.Range.11.2', {
  after: '<div contenteditable>foo<b><a href="URL">^bar<i>baz|</i></a></b>quux</div>',
  before: '<div contenteditable>foo<b>^bar<i>baz|</i></b>quux</div>',
  value: 'URL'
});

testCaseFor('createLink.Range.11.3', {
  after: '<div contenteditable>foo<a href="URL"><b>^bar<i>baz</i></b>q|</a>uux</div>',
  before: '<div contenteditable>foo<b>^bar<i>baz</i></b>q|uux</div>',
  value: 'URL'
});

// Check w3c.42 is special case.
// before: <div contenteditable><a href="otherurl"><b>foobarbaz</b></a></div>
// after:  <div contenteditable><b><a href="otherurl">foo</a><a href="http://www.google.com/">bar</a><a href="otherurl">baz</a></b></div>
// Wrap A by B.
testCaseFor('createLink.Range.42.1', {
  after: '<div contenteditable><b><a href="URL">^foo|</a></b><a href="otherurl">bar</a></div>',
  before: '<div contenteditable><a href="otherurl"><b>^foo|</b>bar</a></div>',
  value: 'URL'
});

testCaseFor('createLink.Range.42.2', {
  after: '<div contenteditable><b><i><a href="URL">^foo|</a><a href="otherurl">bar</a></i></b></div>',
  before: '<div contenteditable><a href="otherurl"><b><i>^foo|bar</i></b></a></div>',
  value: 'URL'
});

testCaseFor('createLink.Range.42.3', {
  after: '<div contenteditable><a href="otherurl">abc</a><b><i><a href="URL">^foo|</a><a href="otherurl">bar</a></i></b></div>',
  before: '<div contenteditable><a href="otherurl">abc<b><i>^foo|bar</i></b></a></div>',
  value: 'URL'
});

// Taken from "LayoutTests/editing/execCommand/createLink.html"
testCaseFor('createLink.createLink.html_starthere', {
  after: '<div contenteditable="true" id="test3">012<a href="http://www.apple.com"><b>345</b></a><a href="http://www.google.com"><span id="starthere">^ 678</span> 9A|</a>B</div>',
  before: '<div contenteditable="true" id="test3">012<a href="http://www.apple.com"><b>345</b><span id="starthere">^ 678</span></a> 9A|B</div>',
  value: 'http://www.google.com'
});

// Merge into previous A. Like creeateLink.w3c.20
testCaseFor('createLink.merge_into_previous', {
  after: '<p contenteditable><a href="URL">123^456|</a></p>',
  before: '<p contenteditable><a href="URL">123</a>^456|</p>',
  value: 'URL'
});

// LayoutTests/editing/execCommand/unlink.html
testCaseFor('createLink.layout_tests_editing_exec_command_unlink', {
  after: '<p contenteditable><span id="test4end"><a href="URL">^3|</a></span></p>',
  before: '<p contenteditable><span id="test4end">^3|</span></p>',
  value: 'URL'
});

// Chrome doesn't replace A elements without attributes.
testCaseFor('createLink.abc.1', {
  after: '<p contenteditable><b><a>1</a><a href="URL">^2|</a><a>3</a></b></p>',
  before: '<p contenteditable><a><b>1^2|3</b></a></p>',
  value: 'URL'
});

testCaseFor('createLink.abc.2', {
  after: '<p contenteditable><b><a href="URL">^123|</a></b></p>',
  before: '<p contenteditable><a><b>^123|</b></a></p>',
  value: 'URL'
});

testCaseFor('createLink.abc.3', {
  after: '<p contenteditable><a href="URL">^123456789|</a></p>',
  before: '<p contenteditable>^123<a>456</a>789|</p>',
  value: 'URL'
});

// Selection ends at leading whitespaces
// http://crbug.com/413156 Can't extend selection beyond whitespace
testCaseFor('createLink.leading_whitespaces.1', {
  after: '<div contenteditable><a href="URL"> ^123|</a></div>',
  before: '<div contenteditable> ^123|</div>',
  value: 'URL'
});

testCaseFor('createLink.leading_whitespaces.2', {
  after: '<div contenteditable><a href="URL"> ^123|</a></div>',
  before: '<div contenteditable>^ 123|</div>',
  value: 'URL'
});

// Selection ends at trailing whitespaces
// http://crbug.com/413156 Can't extend selection beyond whitespace
testCaseFor('createLink.trailing_whitespaces.1', {
  after: '<div contenteditable><a href="URL">^123| </a></div>',
  before: '<div contenteditable>^123 |</div>',
  value: 'URL'
});

testCaseFor('createLink.trailing_whitespaces.2', {
  after: '<div contenteditable><a href="URL">^123|  </a></div>',
  before: '<div contenteditable>^123 | </div>',
  value: 'URL'
});

// A element with STYLE attribute
testCaseFor('createLink.style.1', {
  after: '<div contenteditable><a href="URL">^hello <b>world|</b></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-weight: bold">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  value: 'URL'
});

testCaseFor('createLink.style.1.css', {
  after: '<div contenteditable><a href="URL">^hello <span style="font-weight: bold">world|</span></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-weight: bold">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  styleWithCSS: true,
  value: 'URL'
});

testCaseFor('createLink.style.2', {
  after: '<div contenteditable><a href="URL">^hello <i>world|</i></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-style: italic">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  value: 'URL'
});

testCaseFor('createLink.style.2.css', {
  after: '<div contenteditable><a href="URL">^hello|</a> <a href="URL" style="font-style: italic">world</a></div>',
  before: '<div contenteditable>^hello| <a href="URL" style="font-style: italic">world</a></div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  styleWithCSS: true,
  value: 'URL'
});

// If there are more than one inline style, we don't convert it to elemnt.
testCaseFor('createLink.style.3', {
  after: '<div contenteditable><a href="URL">^hello <b><i>world|</i></b></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-weight: bold; font-style: italic">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  value: 'URL'
});

testCaseFor('createLink.style.3.css', {
  after: '<div contenteditable><a href="URL">^hello <span style="font-weight: bold; font-style: italic">world|</span></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-weight: bold; font-style: italic;">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  styleWithCSS: true,
  value: 'URL'
});

testCaseFor('createLink.style.3r', {
  after: '<div contenteditable><a href="URL">^hello <b><i>world|</i></b></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-style: italic; font-weight: bold">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  value: 'URL'
});

testCaseFor('createLink.style.3r.css', {
  after: '<div contenteditable><a href="URL">^hello <span style="font-style: italic; font-weight: bold">world|</span></a></div>',
  before: '<div contenteditable>^hello <a href="URL" style="font-style: italic; font-weight: bold;">world</a>|</div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  styleWithCSS: true,
  value: 'URL'
});

testCaseFor('createLink.style.4', {
  after: '<div contenteditable><b><a href="URL">^hello|</a></b><a href="URL" style="font-weight: bold"> world</a></div>',
  before: '<div contenteditable><a href="URL" style="font-weight: bold">^hello| world</a></div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  value: 'URL'
});

testCaseFor('createLink.style.4.css', {
  after: '<div contenteditable><span style="font-weight: bold"><a href="URL">^hello|</a></span><a href="URL" style="font-weight: bold"> world</a></div>',
  before: '<div contenteditable><a href="URL" style="font-weight: bold">^hello| world</a></div>',
  sampleId: 'editing/execCommand/toggle-link-win.html',
  styleWithCSS: true,
  value: 'URL'
});
