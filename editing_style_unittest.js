// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// computeTagName
//
testCaseWithSample('style.createElement.1',
    '<p contenteditable>|foo</p>', function(context) {
  expectEq('B', function() {
    return editing.EditingStyle.createElement(context, {
      name: 'font-weight', value: 'bold'
    }).tagName;
  });
  expectEq('I', function() {
    return editing.EditingStyle.createElement(context, {
      name: 'font-style', value: 'italic'
    }).tagName;
  });
  expectEq('S', function() {
    return editing.EditingStyle.createElement(context, {
      name: 'text-decoration', value: 'line-through'
    }).tagName;
  });
  expectEq('U', function() {
    return editing.EditingStyle.createElement(context, {
      name: 'text-decoration', value: 'underline'
    }).tagName;
  });
});

//
// hasStyle
//
testCase('style.hasStyle.1', function() {
  var span = document.createElement('span');
  var style = new editing.EditingStyle(span);
  expectFalse(function() { return style.hasStyle; });
  span.style.fontWeight = 'bold';
  expectTrue(function() { return style.hasStyle; });
});

/*
//
// properties
//
testCase('style.properties.1', function() {
  var element = document.createElement('style');
  element.setAttribute('style', [
    'background-color: red',
    'color: blue',
    'font-size: large',
    'font-style: italic',
    'font-weight: bold',
    'text-decoration: underline',
  ].join(';'));
});
*/
