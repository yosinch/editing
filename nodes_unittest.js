// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function dumpNodes(nodes) {
  var sink = ''
  var delimiter = '';
  nodes.forEach(function(node) {
    if (node === null)
      sink += "(null)";
    else if (editing.nodes.isText(node))
      sink += delimiter + node.nodeValue;
    else
      sink += delimiter + node.nodeName;
    delimiter = ',';
  });
  return sink;
}

//
// computeSelectedNodes
//
testCaseWithSample('nodes.computeSelectedNodes.NodesText',
  '<p contenteditable>^abcd|</p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('abcd', function() { return dumpNodes(nodes); });
});

testCaseWithSample('nodes.computeSelectedNodes.NodesTextPartial',
  '<p contenteditable>ab^c|d</p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('c', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2>e1After|</e1></p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,e1After', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree2',
  '<p contenteditable>^abcd<b>efg</b>|</p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('abcd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree3',
  '<p contenteditable>ab^cd<b>efg</b>|</p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('cd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree4',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2><e4>e4|</e4></e1></p>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,E4,e4', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.Nodes.Tree.Empty',
  '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTreeUL',
  '<div contenteditable>^<ul><li>one</li><li>two</li></ul>|</div>',
  function(context, selection) {
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('UL,LI,one,LI,two', function() { return dumpNodes(nodes); });
  });

//
// isEditable
//
testCaseWithSample('nodes.isEditable', '', function(context, selection) {
  var elementA = context.createElement('a');
  expectFalse(function () { return editing.nodes.isEditable(elementA); });

  var elementB = context.createElement('b');
  context.appendChild(elementA, elementB);
  context.setAttribute(elementA, 'contentEditable', 'true');
  expectTrue(function () { return editing.nodes.isContentEditable(elementA); });
  expectFalse(function () { return editing.nodes.isEditable(elementA); });
  expectTrue(function () { return editing.nodes.isEditable(elementB); });
});

//
// isInteractive
//
testCaseWithSample('nodes.isInteractive', '', function(context, selection) {
  var elementA = context.createElement('a');
  var elementB = context.createElement('b');
  expectTrue(function () { return editing.nodes.isInteractive(elementA); });
  expectFalse(function () { return editing.nodes.isInteractive(elementB); });
});

//
// isPhrasing
//
testCaseWithSample('nodes.isPhrasing', '', function(context, selection) {
  var elementA = context.createElement('a');
  var elementB = context.createElement('b');
  var elementDiv = context.createElement('div');
  var elementH1 = context.createElement('h1');
  expectTrue(function () { return editing.nodes.isPhrasing(elementA); });
  expectTrue(function () { return editing.nodes.isPhrasing(elementB); });
  expectFalse(function () { return editing.nodes.isPhrasing(elementDiv); });
  expectFalse(function () { return editing.nodes.isPhrasing(elementH1); });
});

//
// isWhitespaceNode
//
testCaseWithSample('nodes.isWhitespaceNode', '', function(context, selection) {
  var elementA = context.createElement('a');
  var textB = context.createTextNode('b');
  var textC = context.createTextNode('  ');
  expectFalse(function () { return editing.nodes.isWhitespaceNode(elementA); });
  expectFalse(function () { return editing.nodes.isWhitespaceNode(textB); });
  expectTrue(function () { return editing.nodes.isWhitespaceNode(textC); });
});
