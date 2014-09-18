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
// normalizeSelection
//
testCaseWithSample('context.normalizeSelection.splitTextCaret',
  '<p contenteditable>ab|cd</p>', function(context, selectionIn) {
  var selection = context.normalizeSelection(selectionIn);
  expectTrue(function() { return selection.isCaret; });
  expectFalse(function() { return selection.isEmpty; });
  expectFalse(function() { return selection.isRange; });
  expectEq('P', function() { return selection.anchorNode.nodeName; });
  expectEq(1, function() { return selection.anchorOffset; });
  expectEq('P', function() { return selection.focusNode.nodeName; });
  expectEq(1, function() { return selection.focusOffset; });
});

testCaseWithSample('context.normalizeSelection.splitTextCaretInTree',
  '<p contenteditable><b>bold_1<i>italic_1<s>strike_1|strike_2</s>italic_2</i>bold_2</b></p>',
  function(context, selectionIn) {
    var selection = context.normalizeSelection(selectionIn);
    expectTrue(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectFalse(function() { return selection.isRange; });
    expectEq('S', function() { return selection.anchorNode.nodeName; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq('S', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });

testCaseWithSample('context.normalizeSelection.splitTextAnchorFocus',
  '<p contenteditable>a^bc|d</p>', function(context, selectionIn) {
    var selection = context.normalizeSelection(selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(1, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(2, function() { return selection.focusOffset; });
  });

testCaseWithSample('context.normalizeSelection.splitTextFocusAnchor',
  '<p contenteditable>a|bc^d</p>', function(context, selectionIn) {
    var selection = context.normalizeSelection(selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(2, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });

// We extend selection over leading and trailing whitespaces.
testCaseWithSample('context.normalizeSelection.surrounding.whitespaces.1',
  '<p contenteditable> ^0123| </p>', function(context, selectionIn) {
    var selection = context.normalizeSelection(selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(0, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });

testCaseWithSample('context.normalizeSelection.surrounding.whitespaces.2',
  // Boundary points are middle of leading/trailing whitespaces.
  '<p contenteditable> ^ 0123 | </p>', function(context, selectionIn) {
    var selection = context.normalizeSelection(selectionIn);
    expectFalse(function() { return selection.isCaret; });
    expectFalse(function() { return selection.isEmpty; });
    expectTrue(function() { return selection.isRange; });
    expectEq('P', function() { return selection.anchorNode.nodeName; });
    expectEq(0, function() { return selection.anchorOffset; });
    expectEq('P', function() { return selection.focusNode.nodeName; });
    expectEq(1, function() { return selection.focusOffset; });
  });

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
// setUpEffectiveNodes
//
testCaseWithSample('context.setUpEffectiveNodes.1',
    '<p contenteditable>foo<b>^bar<i>baz</i></b>|quux</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bar,I,baz', function() { return dumpNodes(nodes) });
      expectEq('foo<b>bar<i>baz</i></b>quux', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('context.setUpEffectiveNodes.2',
    '<p contenteditable><span style="font-weight: bold">^foo</span> <span>bar|</span></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'SPAN';
        });
      expectEq('SPAN,foo, ,SPAN,bar', function() { return dumpNodes(nodes) });
    });

testCaseWithSample('context.setUpEffectiveNodes.3',
    '<p contenteditable>aaa<b>b^bb<i>cc|c</i>ddd<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,cc', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.3_2',
    '<p contenteditable>123<b>4^56<i>78|9</i>abc<i>def</i>ghi</b>jkl</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
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
testCaseWithSample('context.setUpEffectiveNodes.3_3',
    '<p contenteditable><span>123^456|</span><span>789</span></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
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

testCaseWithSample('context.setUpEffectiveNodes.4',
    '<p contenteditable>aaa<b>b^bb<i>ccc</i>dd|d<i>eee</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,ccc,dd', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.5',
    '<p contenteditable>aaa<b>b^bb<i>ccc</i>ddd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      expectEq('B,bb,I,ccc,ddd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>b</b><b>bb<i>ccc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.6',
    '<p contenteditable>aaa<b>bbb<i>c^cc</i>ddd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      // 'bbb' is not included.
      expectEq('B,I,cc,ddd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>bbb<i>c</i></b><b><i>cc</i>ddd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.7',
    '<p contenteditable>aaa<b>bbb<i>ccc</i>d^dd<i>ee|e</i>fff</b>ggg</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
          return node.nodeName !== 'B';
        });
      // 'bbb' is not included.
      expectEq('B,dd,I,ee', function() { return dumpNodes(nodes) });
      expectEq('aaa<b>bbb<i>ccc</i>d</b><b>dd<i>eee</i>fff</b>ggg',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.8',
    // We should not split non-phrasing element.
    '<p contenteditable>foo^bar|baz</p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
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

testCaseWithSample('context.setUpEffectiveNodes.9',
    // We should not split non-phrasing element.
    '<p contenteditable><a><b>foo^barbaz|</b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
        function(node) {
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

testCaseWithSample('context.setUpEffectiveNodes.Nesting',
    '<p contenteditable><a href="URL">foo<b>^bar|</b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
          function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,bar', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b>bar</b></a>', function() {
        return context.document.body.firstChild.innerHTML;
      });
    });

testCaseWithSample('context.setUpEffectiveNodes.Nesting.2',
    '<p contenteditable><a href="URL">foo<b><i>^bar|</i></b></a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
          function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,I,bar', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b><i>bar</i></b></a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.Nesting.3',
    '<p contenteditable><a href="URL">foo<b>^bar</b>baz|</a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
          function(node) {
            return node.nodeName !== 'A';
          });
      expectEq('A,B,bar,baz', function() { return dumpNodes(nodes) });
      expectEq('<a href="URL">foo</a><a href="URL"><b>bar</b>baz</a>',
               function() {
                 return context.document.body.firstChild.innerHTML;
               });
    });

testCaseWithSample('context.setUpEffectiveNodes.Junk',
    '<p contenteditable><a href="URL">foo<b>^bar|</b>baz</a></p>',
    function(context, selection) {
      var normalizedSelection = context.normalizeSelection(selection);
      var nodes = context.setUpEffectiveNodes(normalizedSelection,
          function(node) {
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
// shouldUseCSS
//
testCaseWithSample('context.shouldUseCSS',
    '<p contenteditable>012|</p>', function(context) {
  context.document.execCommand('styleWithCSS', false, true);
  expectTrue(function() { return context.shouldUseCSS; });

  context.document.execCommand('styleWithCSS', false, false);
  expectFalse(function() { return context.shouldUseCSS; });
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

// We copy "name" attribute for "A" until http://crbug.com/411785 and
// http://crbug.com/411795
testCaseWithSample('context.splitNode.3',
    '<p contenteditable><a name="foo">one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNode(oldTree, refNode);
      expectEq('<a name="foo">one</a>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<a name="foo"><b>two</b>three</a>',
              function() { return testing.serializeNode(newTree); });
      expectEq(newTree, function() { return oldTree.nextSibling; });
    });

// We copy "name" attribute for "A" until http://crbug.com/411785 and
// http://crbug.com/411795
testCaseWithSample('context.splitNode.4',
    '<p contenteditable><s name="foo">one|<b>two</b>three</s></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('s');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNode(oldTree, refNode);
      expectEq('<s name="foo">one</s>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<s name="foo"><b>two</b>three</s>',
              function() { return testing.serializeNode(newTree); });
      expectEq(newTree, function() { return oldTree.nextSibling; });
    });

// From createLink.style.6.css
testCaseWithSample('context.splitNode.5',
    '<p contenteditable>|<i> after</i>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = context.document.querySelector('i').firstChild; // " after"
      var oldTree = context.document.querySelector('i');
      var newTree = context.splitTree(oldTree, refNode);
      expectTrue(function() { return oldTree === newTree; });
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

// We copy "name" attribute for "A" until http://crbug.com/411785 and
// http://crbug.com/411795
testCaseWithSample('context.splitNodeLeft.3',
    '<p contenteditable><a name="foo">one|<b>two</b>three</a></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('a');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNodeLeft(oldTree, refNode);
      expectEq('<a name="foo">one</a>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<a name="foo"><b>two</b>three</a>',
              function() { return testing.serializeNode(oldTree); });
    });

// We copy "name" attribute for "A" until http://crbug.com/411785 and
// http://crbug.com/411795
testCaseWithSample('context.splitNodeLeft.4',
    '<p contenteditable><s name="foo">one|<b>two</b>three</s></p>',
    function(context, selectionIn) {
      var oldTree = context.document.querySelector('s');
      var refNode = oldTree.childNodes[1];
      var newTree = context.splitNodeLeft(oldTree, refNode);
      expectEq('<s name="foo">one</s>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<s name="foo"><b>two</b>three</s>',
              function() { return testing.serializeNode(oldTree); });
    });

//
// splitTree
//
testCaseWithSample('context.splitTree.1',
    '<p contenteditable><e1>one</e1>|<e2>two</e2><e3>three</e3></p>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode;
      var newTree = context.splitTree(oldTree, refNode);
      expectEq('<p contenteditable><e1>one</e1></p>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<p contenteditable><e2>two</e2><e3>three</e3></p>',
              function() { return testing.serializeNode(newTree); });
    });

testCaseWithSample('context.splitTree.2',
    '<p contenteditable><b>bold1<i>italic1<s>strike1|strike2</s>italic2</i>bold2</b></p>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode.parentNode.parentNode;
      var newTree = context.splitTree(oldTree, refNode);
      expectEq('<b>bold1<i>italic1<s>strike1</s></i></b>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<b><i><s>strike2</s>italic2</i>bold2</b>',
               function() { return testing.serializeNode(newTree); });
    });

// From createLink.style.6.css
testCaseWithSample('context.splitTree.3',
    '<p contenteditable>|<a href="otherurl"><b style="font-style: italic;">world</b><i> after</i></a></p>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = context.document.querySelector('i').firstChild; // " after"
      var oldTree = context.document.querySelector('a');
      var newTree = context.splitTree(oldTree, refNode);
      expectEq('<a href="otherurl"><b style="font-style: italic">world</b></a>',
               function() { return testing.serializeNode(oldTree); });
      expectEq('<a href="otherurl"><i> after</i></a>',
               function() { return testing.serializeNode(newTree); });
    });

//
// splitTreeLeft
//
testCaseWithSample('context.splitTreeLeft.shallow',
    '<p contenteditable><e1>one</e1>|<e2>two</e2><e3>three</e3></p>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode;
      var newTree = context.splitTreeLeft(oldTree, refNode);
      expectEq('<p contenteditable><e1>one</e1></p>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<p contenteditable><e2>two</e2><e3>three</e3></p>',
              function() { return testing.serializeNode(oldTree); });
    });

testCaseWithSample('context.splitTreeLeft.deep',
    '<p contenteditable><b>bold1<i>italic1<s>strike1|strike2</s>italic2</i>bold2</b></p>',
    function(context, selectionIn) {
      var selection = context.normalizeSelection(selectionIn);
      var refNode = selection.focusNode.childNodes[selection.focusOffset];
      var oldTree = refNode.parentNode.parentNode.parentNode;
      var newTree = context.splitTreeLeft(oldTree, refNode);
      expectEq('<b>bold1<i>italic1<s>strike1</s></i></b>',
               function() { return testing.serializeNode(newTree); });
      expectEq('<b><i><s>strike2</s>italic2</i>bold2</b>',
               function() { return testing.serializeNode(oldTree); });
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
