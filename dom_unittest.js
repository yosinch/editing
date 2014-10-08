// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function dumpNodes(nodes) {
  var sink = ''
  var delimiter = '';
  for (var node of nodes) {
    sink += delimiter;
    if (node === null)
      sink += "(null)";
    else if (editing.dom.isText(node))
      sink += node.nodeValue;
    else
      sink += node.nodeName;
    delimiter = ',';
  }
  return sink;
}

//
// HTMLIterable
//
testCaseWithSample('dom.HTMLIterable.1',
  '|<select><option>1</option><option>2</option><option>3</option></select>',
  function(sample) {
    var selectElement = sample.document.querySelector('select');
    var results = [];
    for (var option of new editing.dom.HTMLIterable(selectElement.options))
      results.push(option.value);
    expectEq('1,2,3', function() { return results.join(','); });
  });

//
// ancestorsOrSelf
//
testCaseWithSample('dom.ancestorsOrSelf.1',
  '<div><foo>0<bar>1<baz>|2</baz>3</bar>4</foo>',
  function(sample, selection) {
    var results = [];
    var sample = selection.anchorNode;
    for (var node of editing.dom.ancestorsOrSelf(sample))
      results.push(node.nodeName);
    expectEq('#text,BAZ,BAR,FOO,DIV,BODY,HTML,#document',
             function() { return results.join(','); });
  });

//
// ancestorsWhile
//
testCaseWithSample('dom.ancestorsWhile.Nodes',
  '<div><a>foo<b>bar<i>baz<u>q$u|x</u></i></b></a></div>',
  function(sample, selection) {
    var node = selection.anchorNode;
    expectEq('U,I,B,A', function() {
        return dumpNodes(
          editing.dom.ancestorsWhile(node, function(node) {
            return node.nodeName !== 'DIV';
          }));
      });
    expectEq('U,I,B', function() {
        return dumpNodes(
          editing.dom.ancestorsWhile(node, function(node) {
            return node.nodeName !== 'A';
          }));
      });
    expectEq('U,I', function() {
        return dumpNodes(
          editing.dom.ancestorsWhile(node, function(node) {
            return node.nodeName !== 'B';
          }));
      });
    expectEq('U', function() {
        return dumpNodes(
          editing.dom.ancestorsWhile(node, function(node) {
            return node.nodeName !== 'I';
          }));
      });
    expectEq('', function() {
        return dumpNodes(
          editing.dom.ancestorsWhile(node, function(node) {
            return node.nodeName !== 'U';
          }));
      });
  }
);

//
// canContainRangeEndPoint
//
testCaseWithSample('dom.canContainRangeEndPoint.NodesText',
  '<p contenteditable>^abcd|</p>',
  function(sample) {
    function canContainRangeEndPoint(tagName) {
      var element = sample.createElement(tagName);
      return editing.dom.canContainRangeEndPoint(element);
    }

    expectTrue(function() { return canContainRangeEndPoint('a'); });
    expectTrue(function() { return canContainRangeEndPoint('b'); });
    expectTrue(function() { return canContainRangeEndPoint('div'); });

    expectFalse(function() { return canContainRangeEndPoint('button'); });
    expectFalse(function() { return canContainRangeEndPoint('input'); });
    expectFalse(function() { return canContainRangeEndPoint('progress'); });
  });

//
// computeSelectedNodes
//
testCaseWithSample('dom.computeSelectedNodes.NodesText',
  '<p contenteditable>^abcd|</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('abcd', function() { return dumpNodes(nodes); });
});

testCaseWithSample('dom.computeSelectedNodes.NodesTextPartial',
  '<p contenteditable>ab^c|d</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('c', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.NodesTree',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2>e1After|</e1></p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,e1After', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.NodesTree2',
  '<p contenteditable>^abcd<b>efg</b>|</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('abcd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.NodesTree3',
  '<p contenteditable>ab^cd<b>efg</b>|</p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('cd,B,efg', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.NodesTree4',
  '<p contenteditable><e1><e2>e2Before<e3>^e3</e3>e2After</e2><e4>e4|</e4></e1></p>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('e3,e2After,E4,e4', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.Nodes.Tree.Empty',
  '<div contenteditable><span>foo^</span><span>|bar</span></div>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('', function() { return dumpNodes(nodes); });
  });

testCaseWithSample('dom.computeSelectedNodes.NodesTreeUL',
  '<div contenteditable>^<ul><li>one</li><li>two</li></ul>|</div>',
  function(sample, selection) {
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', selection);
    var normalizedSelection = context.normalizeSelection(selection);
    var nodes = editing.dom.computeSelectedNodes(normalizedSelection);
    expectEq('UL,LI,one,LI,two', function() { return dumpNodes(nodes); });
  });

//
// isEditable
//
testCaseWithSample('dom.isEditable', '', function(sample, selection) {
  var elementA = sample.createElement('a');
  expectFalse(function () { return editing.dom.isEditable(elementA); });

  var elementB = sample.createElement('b');
  elementA.appendChild(elementB);
  elementA.setAttribute('contentEditable', 'true');
  expectTrue(function () { return editing.dom.isContentEditable(elementA); });
  expectFalse(function () { return editing.dom.isEditable(elementA); });
  expectTrue(function () { return editing.dom.isEditable(elementB); });
});

//
// isInteractive
//
testCaseWithSample('dom.isInteractive', '', function(sample, selection) {
  var elementA = sample.createElement('a');
  var elementB = sample.createElement('b');
  expectTrue(function () { return editing.dom.isInteractive(elementA); });
  expectFalse(function () { return editing.dom.isInteractive(elementB); });
});

//
// isPhrasing
//
testCaseWithSample('dom.isPhrasing', '', function(sample, selection) {
  var elementA = sample.createElement('a');
  var elementB = sample.createElement('b');
  var elementDiv = sample.createElement('div');
  var elementH1 = sample.createElement('h1');
  expectTrue(function () { return editing.dom.isPhrasing(elementA); });
  expectTrue(function () { return editing.dom.isPhrasing(elementB); });
  expectFalse(function () { return editing.dom.isPhrasing(elementDiv); });
  expectFalse(function () { return editing.dom.isPhrasing(elementH1); });
});

//
// isWhitespaceNode
//
testCaseWithSample('dom.isWhitespaceNode', '', function(sample, selection) {
  var elementA = sample.createElement('a');
  var textB = sample.createTextNode('b');
  var textC = sample.createTextNode('  ');
  expectFalse(function () { return editing.dom.isWhitespaceNode(elementA); });
  expectFalse(function () { return editing.dom.isWhitespaceNode(textB); });
  expectTrue(function () { return editing.dom.isWhitespaceNode(textC); });
});
