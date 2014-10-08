// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file./*

function createHtmlGetter(element) {
  return function() {
    return element.outerHTML;
  }
}

//
// AppendChild
//
testCaseWithSample('operations.appendChild.1',
    '|<p>foo</p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var newChild = sample.createElement('bar');
      var operation = new editing.AppendChild(parentNode, newChild);

      operation.redo();
      expectEq('<p>foo<bar></bar></p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p>foo</p>', createHtmlGetter(parentNode));
    });

//
// InsertBefore
//
testCaseWithSample('operations.insertBefore.1',
    '|<p>foo</p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var newChild = sample.createElement('bar');
      var operation = new editing.InsertBefore(parentNode, newChild,
                                               parentNode.firstChild);
      operation.redo();
      expectEq('<p><bar></bar>foo</p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p>foo</p>', createHtmlGetter(parentNode));
    });

//
// RemoveAttribute
//
testCaseWithSample('operations.removeAttribute.1',
    '|<p><foo x="1"></p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var element = parentNode.firstChild;
      var operation = new editing.RemoveAttribute(element, 'x');

      operation.redo();
      expectEq('<p><foo></foo></p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p><foo x="1"></foo></p>', createHtmlGetter(parentNode));
    });

//
// RemoveChild
//
testCaseWithSample('operations.removeChild.1',
    '|<p>foo</p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var oldChild = parentNode.firstChild;
      var operation = new editing.RemoveChild(parentNode, oldChild);
      operation.redo();
      expectEq('<p></p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p>foo</p>', createHtmlGetter(parentNode));
    });

//
// ReplaceChild
//
testCaseWithSample('operations.replceChild.1',
    '|<p>foo</p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var newChild = sample.createTextNode('bar');
      var oldChild = parentNode.firstChild;
      var operation = new editing.ReplaceChild(parentNode, newChild, oldChild);
      operation.redo();
      expectEq('<p>bar</p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p>foo</p>', createHtmlGetter(parentNode));
    });

//
// SetAttribute
//
testCaseWithSample('operations.setAttribute.1',
    '|<p><foo x="1"></p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var element = parentNode.firstChild;
      var operation = new editing.SetAttribute(element, 'x', 'baz');

      operation.redo();
      expectEq('<p><foo x="baz"></foo></p>', createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p><foo x="1"></foo></p>', createHtmlGetter(parentNode));
    });

//
// SetStyle
//
testCaseWithSample('operations.setStyle.1',
    '|<p><foo style="color: blue;"></p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var element = parentNode.firstChild;
      var operation = new editing.SetStyle(element);
      operation.setProperty('color', 'red');

      operation.redo();
      expectEq('<p><foo style="color: red;"></foo></p>',
               createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p><foo style="color: blue;"></foo></p>',
               createHtmlGetter(parentNode));
    });

testCaseWithSample('operations.setStyle.2',
    '|<p><foo style="color: blue;"></p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var element = parentNode.firstChild;
      var operation = new editing.SetStyle(element);
      operation.setProperty('font-weight', 'bold');
      operation.setProperty('color', 'red');

      operation.redo();
      expectEq('<p><foo style="color: red; font-weight: bold;"></foo></p>',
               createHtmlGetter(parentNode));

      operation.undo();
      expectEq('<p><foo style="color: blue;"></foo></p>',
               createHtmlGetter(parentNode));
    });

//
// SplitText
//
testCaseWithSample('operations.splitText.1',
    '|<p>foobar</p>',
    function(sample, selection) {
      var parentNode = sample.document.body.firstChild;
      var textNode = parentNode.firstChild;
      var newNode = sample.createTextNode('bar');
      var operation = new editing.SplitText(textNode, newNode);

      operation.redo();
      expectEq('<p>foobar</p>', createHtmlGetter(parentNode));
      expectEq('foo', function() { return parentNode.firstChild.nodeValue; });
      expectEq('bar', function() { return parentNode.lastChild.nodeValue; });

      operation.undo();
      expectEq('<p>foobar</p>', createHtmlGetter(parentNode));
    });
