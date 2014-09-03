// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testing.define('TEST_EXPECTATIONS', (function() {
  var DO_NOT_REMOVE_CLASS = 'We do not remove element with "class" attribute.';
  var DO_NOT_USE_SPAN = 'Chrome uses SPAN to propagate style from' +
    ' non-phrasing element.';
  var IE_BACKWARD_SELECTION = 'IE does not work well for backward selection.';
  var IE_IGNORES_A_ATTRS = 'IE compatibility.' +
      ' Replace A element even if it has "name" attribute';
  var W3C_SELECTION_IS_INCORRECT = 'W3C selection range is incorrect.';
  return {
    // createLink command
/*
    'createLink.w3c.23': {expected: 'warn', reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.23r': {expected: 'warn',
                          reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.35': {expected: 'warn', reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.35r': {expected: 'warn',
                           reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.46': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.46r': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.47': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.47r': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
*/
    // remove format
/*
    'removeFormat.w3c.125': {expected: 'fail', reason: DO_NOT_REMOVE_CLASS},
    'removeFormat.w3c.125r': {expected: 'fail', reason: DO_NOT_REMOVE_CLASS},
    'removeFormat.w3c.126': {expected: 'fail', reason: DO_NOT_REMOVE_CLASS},
    'removeFormat.w3c.126r': {expected: 'fail', reason: DO_NOT_REMOVE_CLASS},
    'removeFormat.w3c.134': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      chrome: '<div contenteditable><p><span style="font-weight: bold">foo</span>bar<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><span style="font-weight: bold">foo</span>bar<span style="font-weight: bold">baz</span></p></div>'
    },
    'removeFormat.w3c.134r': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      chrome: '<div contenteditable><p><span style="font-weight: bold">foo</span>bar<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><span style="font-weight: bold">foo</span>bar<span style="font-weight: bold">baz</span></p></div>'
    },
    'removeFormat.w3c.135': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><p style="font-weight: bold">foo^bar|baz</p></div>',
      chrome: '<div contenteditable><p><span style="font-weight: bold">foo</span>^bar|<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><b>foo</b>^bar|<b>baz</b></p></div>'
    },
    'removeFormat.w3c.135r': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><p style="font-weight: bold">foo|bar^baz</p></div>',
      chrome: '<div contenteditable><p><span style="font-weight: bold">foo</span>|bar^<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><b>foo</b>|bar^<b>baz</b></p></div>'
    },
    'removeFormat.w3c.136': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><b><p style="font-weight: bold">foo^bar|baz</p></b></div>',
      chrome: '<div contenteditable><p><b><span style="font-weight: bold">foo</span></b>^bar|<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><span style="font-weight: bold">foo</span>^bar|<span style="font-weight: bold">baz</span></p></div>'
    },
    'removeFormat.w3c.136r': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><b><p style="font-weight: bold">foo^bar|baz</p></b></div>',
      chrome: '<div contenteditable><p><b><span style="font-weight: bold">foo</span></b>|bar^<b>baz</b></p></div>',
      w3c: '<div contenteditable><p><span style="font-weight: bold">foo</span>|bar^<span style="font-weight: bold">baz</span></p></div>'
    },
    'removeFormat.w3c.137': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><b><p style="font-weight: bold">foo^bar|baz</p></b></div>',
      chrome: '<div contenteditable><p><b><span style="font-weight: bold">foo</span></b>bar<b>baz</b></p></div>',
      firefox: '<div contenteditable><b><p style="font-weight: bold">foobarbaz</p></b></div>',
      ie: '<div contenteditable><b></b><p style="font-weight: bold"><b>foo</b>bar<b>baz</b></p><b></b></div>',
      w3c: ' <div contenteditable><p><b>foo</b>bar<b>baz</b></p></div>'
    },
    'removeFormat.w3c.137r': {
      expected: 'fail',
      reason: DO_NOT_USE_SPAN,
      before: '<div contenteditable><b><p style="font-weight: bold">foo|bar^baz</p></b></div>',
      chrome: '<div contenteditable><p><b><span style="font-weight: bold">foo</span></b>bar<b>baz</b></p></div>',
      firefox: '<div contenteditable><b><p style="font-weight: bold">foobarbaz</p></b></div>',
      ie: '<div contenteditable><b></b><p style="font-weight: bold"><b>foo</b>bar<b>baz</b></p><b></b></div>',
      w3c: ' <div contenteditable><p><b>foo</b>bar<b>baz</b></p></div>'
    },
*/
    // unlink command
    'unlink.contents.partial.anchor.focus': {expected: 'fail',
                                             reason: 'issue #8'},
    'unlink.contents.nodes.partial.anchor.focus': {expected: 'fail',
                                                   reason: 'issue #8'},
    'unlink.contents.nodes.partial.focus.anchor': {expected: 'fail',
                                                   reason: 'issue #8'}
  };
})());

