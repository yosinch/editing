// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function dumpNodes(nodes) {
  var sink = ''
  var delimiter = '';
  nodes.forEach(function(node) {
    if (editing.nodes.isText(node))
      sink += delimiter + node.nodeValue;
    else
      sink += delimiter + node.nodeName;
    delimiter = ',';
  });
  return sink;
}

//
// removeAttribute
//
testCaseWithSample('context.removeAttribute.1',
    '<p contenteditable>|<a id="foo">bar</a></p>',
    function(context, selectionIn) {
      var element = context.document.querySelector('a');
      context.removeAttribute(element, 'id');
      expectFalse(function () { return element.hasAttribute('id') });
    });

testCaseWithSample('context.removeAttribute.2',
    '<p contenteditable>|<a id="foo">bar</a></p>',
    function(context, selectionIn) {
      var element = context.document.querySelector('a');
      // No exception for non-existing removing attribute.
      context.removeAttribute(element, 'notexist');
    });

//
// splitNode
//
testCaseWithSample('context.splitNode.1',
    '<p contenteditable><a>one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNode(oldTree, refNode);
      expectEq('<a>one</a>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<a><b>two</b>three</a>',
              function() { return testing.serializeNode(newTree); });
      expectEq(newTree, function() { return oldTree.nextSibling; });
    });

// We don't copy "id" attribute.
testCaseWithSample('context.splitNode.2',
    '<p contenteditable><a id="foo">one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNode(oldTree, refNode);
      expectEq('<a id="foo">one</a>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<a><b>two</b>three</a>',
              function() { return testing.serializeNode(newTree); });
      expectEq(newTree, function() { return oldTree.nextSibling; });
    });

//
// splitNodeLeft
//
testCaseWithSample('context.splitNodeLeft.1',
    '<p contenteditable><a>one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNodeLeft(oldTree, refNode);
      expectEq('<a>one</a>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<a><b>two</b>three</a>',
              function() { return testing.serializeNode(oldTree); });
    });

// We don't copy "id" attribute.
testCaseWithSample('context.splitNodeLeft.2',
    '<p contenteditable><a id="foo">one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNodeLeft(oldTree, refNode);
      expectEq('<a id="foo">one</a>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<a><b>two</b>three</a>',
              function() { return testing.serializeNode(oldTree); });
    });

//
// splitTree
//
testCaseWithSample('context.splitTree.shallow',
    '<p contenteditable><e1>one</e1>|<e2>two</e2><e3>three</e3></p>',
    function(context, selectionIn) {
      var selection = editing.nodes.normalizeSelection(context, selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode;
      var newTree = context.splitTree(oldTree, refNode);
      expectEq('<p contenteditable><e1>one</e1></p>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<p contenteditable><e2>two</e2><e3>three</e3></p>',
              function() { return testing.serializeNode(newTree); });
    });

testCaseWithSample('context.splitTree.deep',
    '<p contenteditable><b>bold1<i>italic1<s>strike1|strike2</s>italic2</i>bold2</b></p>',
    function(context, selectionIn) {
      var selection = editing.nodes.normalizeSelection(context, selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode.parentNode.parentNode;
      var newTree = context.splitTree(oldTree, refNode);
      expectEq('<b>bold1<i>italic1<s>strike1</s></i></b>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<b><i><s>strike2</s>italic2</i>bold2</b>',
               function() { return testing.serializeNode(newTree); });
    });

//
// unwrapElement
//
testCaseWithSample('context.unwrapElement.1',
    '<p contenteditable>|<a>foo</a></p>',
    function(context, selectionIn) {
      var parent = context.document.querySelector('a');
      var tree = parent.parentNode;
      context.unwrapElement(parent, null);
      expectEq('<p contenteditable>foo</p>',
               function() { return testing.serializeNode(tree); });
    });

testCaseWithSample('context.unwrapElement.2',
    '<p contenteditable>|<a>foo<b>bar</b></a></p>',
    function(context, selectionIn) {
      var parent = context.document.querySelector('a');
      var tree = parent.parentNode;
      context.unwrapElement(parent, null);
      expectEq('<p contenteditable>foo<b>bar</b></p>',
               function() { return testing.serializeNode(tree); });
    });

testCaseWithSample('context.unwrapElement.3',
    '<p contenteditable>|<a>foo<b>bar</b>baz</a></p>',
    function(context, selectionIn) {
      var parent = context.document.querySelector('a');
      var tree = parent.parentNode;
      context.unwrapElement(parent, null);
      expectEq('<p contenteditable>foo<b>bar</b>baz</p>',
               function() { return testing.serializeNode(tree); });
    });

testCaseWithSample('context.unwrapElement.3.stopChild',
    '<p contenteditable>|<a>foo<b>bar</b>baz</a></p>',
    function(context, selectionIn) {
      var parent = context.document.querySelector('a');
      var tree = parent.parentNode;
      context.unwrapElement(parent, parent.lastChild);
      expectEq('<p contenteditable>foo<b>bar</b><a>baz</a></p>',
               function() { return testing.serializeNode(tree); });
    });
