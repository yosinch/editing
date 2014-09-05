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
// setUpEffectiveNodes
//
testCaseWithSample('nodes.setUpEffectiveNodes.1',
    '<p contenteditable>foo<b>^bar<i>baz</i></b>|quux</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'B';
          });
      expectEq('B,bar,I,baz', function() { return dumpNodes(nodes) });
      expectEq('foo<b>bar<i>baz</i></b>quux', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.2',
    '<p contenteditable><span style="font-weight: bold">^foo</span> <span>bar|</span></p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'SPAN';
          });
      expectEq('SPAN,foo, ,SPAN,bar', function() { return dumpNodes(nodes) });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.3',
    '<p contenteditable>aaa<b>b^bb<i>cc|c</i>ddd<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,cc', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.3_2',
    '<p contenteditable>aaa<b>b^bb<i>cc|c</i>ddd<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          // This will always return true.
          return node.nodeName !== 'A';
        });
      expectEq('bb,I,cc', function() { return dumpNodes(nodes) });
      // Nothing will be split.
      expectEq('aaa<b>bbb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.4',
    '<p contenteditable>aaa<b>b^bb<i>ccc</i>dd|d<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,ccc,dd', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.5',
    '<p contenteditable>aaa<b>b^bb<i>ccc</i>ddd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,ccc,ddd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.6',
    '<p contenteditable>aaa<b>bbb<i>c^cc</i>ddd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'B';
        });
      // 'bbb' is not included.
      expectEq('B,I,cc,ddd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>bbb<i>c</i></b><b><i>cc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.7',
    '<p contenteditable>aaa<b>bbb<i>ccc</i>d^dd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'B';
        });
      // 'bbb' is not included.
      expectEq('B,dd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>bbb<i>ccc</i>d</b><b>dd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Nesting',
    '<p contenteditable><a>foo<b>^bar|</b></a></p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,foo,B,bar', function() { return dumpNodes(nodes) });
      expectEq('<a>foo<b>bar</b></a>', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Nesting.2',
    '<p contenteditable><a>foo<b><i>^bar|</i></b></a></p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,foo,B,I,bar', function() { return dumpNodes(nodes) });
      expectEq('<a>foo<b><i>bar</i></b></a>', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Nesting.3',
    '<p contenteditable><a>foo<b>^bar</b>baz|</a></p>',
    function(context, selection) {
      var normalizedSelection = editing.nodes.normalizeSelection(
        context, selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,foo,B,bar,baz', function() { return dumpNodes(nodes) });
      expectEq('<a>foo<b>bar</b>baz</a>', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

//
// ReadOnlySelection.nodes
//
testCaseWithSample('nodes.computeSelectedNodes.NodesText',
  '<p contenteditable>^abcd|</p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('abcd', function() { return dumpNodes(nodes); });
});

testCaseWithSample('nodes.computeSelectedNodes.NodesTextPartial',
  '<p contenteditable>ab^c|d</p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('c', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2>e1After|</e1></p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,e1After', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree2',
  '<p contenteditable>^abcd<b>efg</b>|</p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('abcd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree3',
  '<p contenteditable>ab^cd<b>efg</b>|</p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('cd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTree4',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2><e4>e4|</e4></e1></p>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,E4,e4', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.Nodes.Tree.Empty',
  '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
    var nodes = editing.nodes.computeSelectedNodes(normalizedSelection);
    expectEq('', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('nodes.computeSelectedNodes.NodesTreeUL',
  '<div contenteditable>^<ul><li>one</li><li>two</li></ul>|</div>',
  function(context, selection) {
    var normalizedSelection = editing.nodes.normalizeSelection(
      context, selection);
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

//
// normalizeSelection
//
testCaseWithSample('nodes.normalizeSelection.splitTextCaret',
  '<p contenteditable>ab|cd</p>', function(context, selectionIn) {
  var selection = editing.nodes.normalizeSelection(context, selectionIn);
  expectTrue(function() { return selection.isCaret; });
  expectFalse(function() { return selection.isEmpty; });
  expectFalse(function() { return selection.isRange; });
  expectEq('P', function() { return selection.anchorNode.nodeName; });
  expectEq(1, function() { return selection.anchorOffset; });
  expectEq('P', function() { return selection.focusNode.nodeName; });
  expectEq(1, function() { return selection.focusOffset; });
});

testCaseWithSample('nodes.normalizeSelection.splitTextCaretInTree',
  '<p contenteditable><b>bold_1<i>italic_1<s>strike_1|strike_2</s>italic_2</i>bold_2</b></p>',
  function(context, selectionIn) {
    var selection = editing.nodes.normalizeSelection(context, selectionIn);
    expectTrue(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectFalse(function() { return selection.isRange; });
    expectEq('S', function() { return selection.anchorNode.nodeName; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq('S', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });

testCaseWithSample('nodes.normalizeSelection.splitTextAnchorFocus',
  '<p contenteditable>a^bc|d</p>', function(context, selectionIn) {
    var selection = editing.nodes.normalizeSelection(context, selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(2, function() { return selection.focusOffset; });
  });

testCaseWithSample('nodes.normalizeSelection.splitTextFocusAnchor',
  '<p contenteditable>a|bc^d</p>', function(context, selectionIn) {
    var selection = editing.nodes.normalizeSelection(context, selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(2, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });
