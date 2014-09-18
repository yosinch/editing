// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// applyInheritedStyle
//
testCaseWithSample('style.applyInheritedStyle.1',
    '<p contenteditable>|<span id="sample" style="font-style: italic; font-weight: bold">012</span><span id="target" style="font-weight: normal">345</span></p>',
  function(context) {
    var sample = context.document.querySelector('#sample');
    var style = new editing.EditingStyle(sample);
    var target = context.document.querySelector('#target');
    style.applyInheritedStyle(context, target);

    // We should not change 'font-weight' to 'bold', because |element| has
    // 'font-weight' CSS property in STYLE attribute.
    expectEq('<span id="target" style="font-weight: normal; font-style: italic;">345</span>',
             function() { return target.outerHTML; });
  });

//
// createElements
//
testCaseWithSample('style.createElements.1',
    '<p contenteditable>|foo</p>', function(context) {
  function sample(propertyName, propertyValue) {
     var element = context.createElement('span');
     element.style[propertyName] = propertyValue;
     var style = new editing.EditingStyle(element);
     var result = [];
     style.createElements(context, function(context, property, styleElement) {
       result.push(styleElement);
     });
     if (result.length !== 1)
       return '';
     return result[0].outerHTML;
  }

  expectEq('<font color="red"></font>', function() {
    return sample('color', 'red');
  });
  expectEq('<font face="monospace"></font>', function() {
    return sample('font-family', 'monospace');
  });
  expectEq('<b></b>', function() {
    return sample('font-weight', 'bold');
  });
  expectEq('<i></i>', function() {
    return sample('font-style', 'italic');
  });
  expectEq('<u></u>', function() {
    return sample('text-decoration', 'underline');
  });
  expectEq('<s></s>', function() {
    return sample('text-decoration', 'line-through');
  });
  expectEq('<sub></sub>', function() {
    return sample('vertical-align', 'sub');
  });
  expectEq('<sup></sup>', function() {
    return sample('vertical-align', 'super');
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
