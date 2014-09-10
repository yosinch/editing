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
// setUpEffectiveNodes
//
testCaseWithSample('nodes.setUpEffectiveNodes.1',
    '<p contenteditable>foo<b>^bar<i>baz</i></b>|quux</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
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
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return node.nodeName !== 'SPAN';
        });
      expectEq('SPAN,foo, ,SPAN,bar', function() { return dumpNodes(nodes) });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.3',
    '<p contenteditable>aaa<b>b^bb<i>cc|c</i>ddd<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
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
    '<p contenteditable>123<b>4^56<i>78|9</i>abc<i>def</i>ghi</b>jkl</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          // This will always return true.
          return node.nodeName !== 'A';
        });
      expectEq('(null),#document,HTML,BODY,P,B,56,I,78', function() {
        return dumpNodes(nodes)
      });
      expectEq('123<b>4</b><b>56<i>789</i>abc<i>def</i>ghi</b>jkl',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

// From createLink.w3c.8
testCaseWithSample('nodes.setUpEffectiveNodes.3_3',
    '<p contenteditable><span>123^456|</span><span>789</span></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return editing.nodes.isPhrasing(node);
        });
      expectEq('P,SPAN,456', function() {
        return dumpNodes(nodes)
      });
      expectEq('<span>123</span><span>456</span><span>789</span>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.4',
    '<p contenteditable>aaa<b>b^bb<i>ccc</i>dd|d<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
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
      var normalizedSelection = context.normalizeSelection(selection);
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
      var normalizedSelection = context.normalizeSelection(selection);
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
      var normalizedSelection = context.normalizeSelection(selection);
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

testCaseWithSample('nodes.setUpEffectiveNodes.8',
    // We should not split non-phrasing element.
    '<p contenteditable>foo^bar|baz</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return editing.nodes.isPhrasing(node);
        });
      expectEq('P,bar', function() { return dumpNodes(nodes) });
      var pContents = context.document.body.firstChild;
      expectEq('foo',
               function() {
                 return pContents.firstChild.nodeValue;
               });
      expectEq('baz',
               function() {
                 return pContents.lastChild.nodeValue;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.9',
    // We should not split non-phrasing element.
    '<p contenteditable><a><b>foo^barbaz|</b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
        context, normalizedSelection, function(node) {
          return editing.nodes.isPhrasing(node);
        });
      expectEq('P,A,B,barbaz', function() {
        return dumpNodes(nodes)
      });
      expectEq('<a><b>foo</b></a><a><b>barbaz</b></a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });


testCaseWithSample('nodes.setUpEffectiveNodes.Nesting',
    '<p contenteditable><a href="URL">foo<b>^bar|</b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,bar', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b>bar</b></a>', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Nesting.2',
    '<p contenteditable><a href="URL">foo<b><i>^bar|</i></b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,I,bar', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b><i>bar</i></b></a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Nesting.3',
    '<p contenteditable><a href="URL">foo<b>^bar</b>baz|</a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,bar,baz', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b>bar</b>baz</a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('nodes.setUpEffectiveNodes.Junk',
    '<p contenteditable><a href="URL">foo<b>^bar|</b>baz</a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = editing.nodes.setUpEffectiveNodes(
          context, normalizedSelection, function(node) {
            return node.nodeName === 'A' || editing.nodes.isPhrasing(node);
          });
      expectEq('P,A,B,bar', function() {
        return dumpNodes(nodes)
      });
      expectEq('<a href="URL">foo</a><a href="URL"><b>bar</b>baz</a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

//
// ReadOnlySelection.nodes
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
