// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.dom = (function() {
  'use strict';

  /**
   * @constructor
   * @implements $jscomp.Iterable.<!Node>
   * @final
   * @param {Node} node
   */
  function AncestorsOrSelf(node) {
    /** @private @type {Node} */
    this.currentNode_ = node;

    // For closure compiler
    /** @return {!$jscomp.Iterator.<!Node>} */
    this.$$iterator;

    Object.seal(this);
  }

  AncestorsOrSelf.prototype = {
    /** @this {!AncestorsOrSelf}
     * @return {{done: boolean, value: (!Node|undefined)}}
     */
    next: function() {
      if (!this.currentNode_)
        return {done: true, value: undefined};
      var resultNode = this.currentNode_;
      this.currentNode_ = this.currentNode_.parentNode;
      return {done: false, value: resultNode};
    }
  };

  // TODO(yosin) Once V8 and closure compiler support E6 object literal syntax,
  // we should put below in |AncestorsOrSelf.prototype = {...}|.
  AncestorsOrSelf.prototype[Symbol.iterator] = function() { return this; };

  /**
   * @constructor
   * @implements $jscomp.Iterable.<!Element>
   * @final
   * @param {!HTMLCollection} collection
   */
  function HTMLIterable(collection) {
    /** @private @type {!HTMLCollection} */
    this.collection_ = collection;
    /** @private @type {number} */
    this.index_ = 0;

    // For closure compiler
    /** @return {!$jscomp.Iterator.<!Element>} */
    this.$$iterator;

    Object.seal(this);
  }

  HTMLIterable.prototype = {
    /** @this {!HTMLIterable}
     * @return {{done: boolean, value: (!Element|undefined)}}
     */
    next: function() {
      if (this.index_ >= this.collection_.length)
        return {done: true, value: undefined}
      var element = this.collection_[this.index_];
      ++this.index_;
      return {done: false, value: element};
    }
  };

  // TODO(yosin) Once V8 and closure compiler support E6 object literal syntax,
  // we should put below in |HTMLIterable.prototype = {...}|.
  HTMLIterable.prototype[Symbol.iterator] = function() { return this; };

  /**
   * @constructor
   * @final
   * @param {Node} startNode
   */
  function NextNodes(startNode) {
    /** @private @type {Node} */
    this.currentNode_ = startNode;
    Object.seal(this);
  }

  NextNodes.prototype = {
    /** @this {!NextNodes}
     * @return {{done: boolean, value: (!Node|undefined)}}
     */
    next: function() {
      var resultNode = this.currentNode_;
      if (!resultNode)
        return {done: true, value: undefined};
      this.currentNode_ = nextNode(this.currentNode_);
      return {done: false, value: resultNode};
    }
  };

  // TODO(yosin) Once V8 and closure compiler support E6 object literal syntax,
  // we should put below in |NextNodes.prototype = {...}|.
  NextNodes.prototype[Symbol.iterator] = function() { return this; };

  /**
   * @param {!Node} node
   * @return {!$jscomp.Iterable.<!Node>}
   */
  function ancestors(node) {
    return new AncestorsOrSelf(node.parentNode);
  }

  /**
   * @param {!Node} node
   * @return {!$jscomp.Iterable.<!Node>}
   */
  function ancestorsOrSelf(node) {
    return new AncestorsOrSelf(node);
  }

  /**
   * @param {!Node} node
   * @param {function(!Node):boolean} predicate
   * @return {!Array.<!Node>}
   */
  function ancestorsWhile(node, predicate) {
    var result = [];
    for (var ancestor = node.parentNode; ancestor && predicate(ancestor);
         ancestor = ancestor.parentNode) {
      result.push(ancestor);
    }
    return result;
  }

  /**
   * @param {!Node} node1
   * @param {!Node} node2
   * @return {Node}
   */
  function commonAncestor(node1, node2) {
    console.assert(node1.ownerDocument === node2.ownerDocument);
    if (node1 === node2)
      return node1;
    var depth1 = 0;
    for (var node = node1; node; node = node.parentNode) {
      if (node == node2)
        return node;
      ++depth1;
    }
    var depth2 = 0;
    for (var node = node2; node; node = node.parentNode) {
      if (node == node1)
        return node;
      ++depth2;
    }
    var runner1 = node1;
    var runner2 = node2;
    if (depth1 > depth2) {
      for (var depth  = depth1; depth > depth2; --depth) {
        runner1 = runner1.parentNode;
      }
    } else if (depth2 > depth1) {
      for (var depth  = depth2; depth > depth1; --depth) {
        runner2 = runner2.parentNode;
      }
    }
    while (runner1) {
      if (runner1 == runner2)
        return runner1;
       runner1 = runner1.parentNode;
       runner2 = runner2.parentNode;
    }
    console.assert(!runner2);
    return null;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function canContainRangeEndPoint(node) {
    if (!isElement(node))
      return true;
    return editing.contentModel.canContainRangeEndPoint(node.nodeName);
  }

  /**
   * @param {!editing.ImmutableSelection} selection
   * @return {!Array.<!Node>}
   *
   * Note: When selection range has no node, e.g. <p><a>foo^</a>|</p>; enclosing
   * end tag, return value is empty array.
   */
  function computeSelectedNodes(selection) {
    if (selection.isEmpty)
      return [];

    var startContainer = /** @type {!Node} */(selection.startContainer);
    var startOffset = selection.startOffset;
    if (isText(startContainer)) {
      startOffset = nodeIndex(startContainer);
      startContainer = startContainer.parentNode;
    }

    var endContainer = /** @type {!Node} */(selection.endContainer);
    var endOffset = selection.endOffset;
    if (isText(endContainer)) {
      endOffset = nodeIndex(endContainer);
      endContainer = endContainer.parentNode;
    }

    /** @const @type {Node} */
    var startNode = startContainer.childNodes[startOffset] ||
                    nextNode(selection.startContainer.lastChild);

    // Both, |startNode| and |endNode| are nullable, e.g. <a><b>abcd|</b></a>
    if (!startNode)
      return [];

    /** @type {Node} */
    var stopNode;
    if (endOffset) {
      stopNode = endContainer.childNodes[endOffset] ||
                 nextNodeSkippingChildren(endContainer.lastChild);
    } else {
      stopNode = endContainer;
    }

    var nodes = [];
    var runner = startNode;
    while (runner !== stopNode) {
      nodes.push(runner);
      runner = nextNode(runner);
    }
    return nodes;
  }

  /**
   * @param {!Node} node
   * @param {!Node} other
   * Returns true if |other| is an ancestor of |node|, otherwise false.
   */
  function isDescendantOf(node, other) {
    console.assert(other);
    for (var runner = node.parentNode; runner; runner = runner.parentNode) {
      if (runner == other)
        return true;
    }
    return false;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isEditable(node) {
    var container = node.parentNode;
    if (!container)
      return false;
    return container.isContentEditable;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isElement(node) {
    return node.nodeType == Node.ELEMENT_NODE;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isInteractive(node) {
    return editing.contentModel.isInteractive(node.nodeName);
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isPhrasing(node) {
    if (!isElement(node))
      return true;
    return editing.contentModel.isPhrasing(node.nodeName);
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isText(node) {
    return node.nodeType == Node.TEXT_NODE;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isVisibleNode(node) {
    if (isWhitespaceNode(node))
      return false;
    if (node.nodeType != Node.ELEMENT_NODE)
      return Boolean(node.parentNode && isVisibleNode(node.parentNode));
    var element = /** @type {!Element} */(node);
    return window.getComputedStyle(element).display !== 'none';
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isWhitespaceNode(node) {
    if (!isText(node))
      return false;
    // Since, JS "\s" matches Unicode space characters, we don't use it.
    // Following regexp comes from HTML5 spec.
    // See https://github.com/yosin-chromium/editing/issues/65 for details.
    return /^[\r\n\t\f ]*$/.test(node.nodeValue);
  }

  /**
   * @param {!Node} current
   * @return {Node}
   */
  function lastWithIn(current) {
    var descendant = current.lastChild;
    for (var child = descendant; child; child = child.lastChild) {
      descendant = child;
    }
    return descendant;
  }

  /**
   * @param {!Node} node
   * @return {number}
   */
  function maxOffset(node) {
    return isText(node) ? node.nodeValue.length :
                                        node.childNodes.length;
  }

  /**
   * @param {Node} current
   * @return {Node}
   * nextNode(<a><b>foo|</b><a>bar) = bar
   */
  function nextNode(current) {
    if (!current)
      return null;
    if (current.firstChild)
      return current.firstChild;
    if (current.nextSibling)
      return current.nextSibling;
    return nextAncestorOrSibling(current);
  }

  /**
   * @param {Node} node
   * @return {!NextNodes}
   */
  function nextNodes(node) {
    return new NextNodes(node);
  }

  /**
   * @param {!Node} current
   * @return {Node}
   */
  function nextAncestorOrSibling(current) {
    console.assert(!current.nextSibling);
    for (var parent = current.parentNode; parent; parent = parent.parentNode) {
      if (parent.nextSibling)
        return parent.nextSibling;
    }
    return null;
  }

  /**
   * @param {Node} current
   * @return {Node}
   */
  function nextNodeSkippingChildren(current) {
    if (!current)
      return null;
    if (current.nextSibling)
      return current.nextSibling;
    return nextAncestorOrSibling(current);
  }

  /**
   * @param {!Node} node
   * @return {!Array.<!Node>}
   */
  function nextSiblings(node) {
    var nodes = [];
    var current = node;
    while (current = current.nextSibling)
      nodes.push(current)
    return nodes;
  }

  /**
   * @param {!Node} node
   * @return {number}
   */
  function nodeIndex(node) {
    var index = 0;
    var parentNode = node.parentNode;
    console.assert(parentNode, node);
    for (var child = parentNode.firstChild; child; child = child.nextSibling) {
      if (child === node)
        return index;
      ++index;
    }
    throw new Error('UNREACHABLE');
  }

  /**
   * @param {!Node} current
   * @return {Node}
   */
  function previousNode(current) {
    var previous = current.previousSibling;
    if (!previous)
      return current.parentNode;
    var child;
    while (child = previous.lastChild) {
      previous = child;
    }
    return previous;
  }

  /**
   * @param {!Node} current
   * @return {Node}
   */
  function previousNodeSkippingChildren(current) {
    if (current.previousSibling)
      return current.previousSibling;
    for (var parent = current.parentNode; parent; parent = parent.parentNode) {
      if (parent.previousSibling)
        return parent.previousSibling;
    }
    return null;
  }

  /**
   * @param {!Node} node
   * @return {!Array.<!Node>}
   */
  function previousSiblings(node) {
    var nodes = [];
    var current = node;
    while (current = current.previousSibling)
      nodes.push(current)
    return nodes;
  }

  var dom = {
    HTMLIterable: HTMLIterable,
    ancestors: ancestors,
    ancestorsOrSelf: ancestorsOrSelf,
    ancestorsWhile: ancestorsWhile,
    canContainRangeEndPoint: canContainRangeEndPoint,
    commonAncestor: commonAncestor,
    computeSelectedNodes: computeSelectedNodes,
    isDescendantOf: isDescendantOf,
    isEditable: isEditable,
    isElement: isElement,
    isInteractive: isInteractive,
    isPhrasing: isPhrasing,
    isText: isText,
    isVisibleNode: isVisibleNode,
    isWhitespaceNode: isWhitespaceNode,
    lastWithIn: lastWithIn,
    maxOffset: maxOffset,
    nextNode: nextNode,
    nextNodes: nextNodes,
    nextAncestorOrSibling: nextAncestorOrSibling,
    nextNodeSkippingChildren: nextNodeSkippingChildren,
    nextSiblings: nextSiblings,
    nodeIndex: nodeIndex,
    previousNode: previousNode,
    previousNodeSkippingChildren: previousNodeSkippingChildren,
    previousSiblings: previousSiblings,
  };
  Object.freeze(dom);
  return dom;
})();
