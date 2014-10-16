// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.dom2 = (function() {
  'use strict';

  /**
   * @constructor
   * @implements $jscomp.Iterable.<!Array.<!Node>>
   * @final
   * @param {!Array.<!Node>} nodes
   */
  function NodeGroups(nodes) {
    /** @private */
    this.nodes_ = nodes;

    /** @private */
    this.currentIndex_ = 0;

    // For closure compiler
    /** @return {!$jscomp.Iterator.<!Array.<!Node>>} */
    this.$$iterator;

    Object.seal(this);
  }

  NodeGroups.prototype = {
    /**
     * @this {!NodeGroups}
     * @return {{done: boolean, value: (!Array.<!Node>)}}
     */
    next: function() {
      // Devide the top nodes into groups: the successive text nodes should be
      // in the same group. Otherwise, the node is in a single group.
      if (this.nodes_.length <= this.currentIndex_)
        return {done: true, value: []};
      
      var node = this.nodes_[this.currentIndex_];
      if (!editing.dom.isText(node)) {
        this.currentIndex_++
        return {done: false, value: [node]};
      }

      var nodes = this.nodes_.slice(this.currentIndex_);
      var textNodes = takeWhile(nodes, function(node, index) {
        return editing.dom.isText(node) &&
          (index == 0 || nodes[index-1].nextSibling === node);
      });
      this.currentIndex_ += textNodes.length;
      return {done: false, value: textNodes};
    }
  };

  // TODO(hajimehoshi): Once V8 and closure compiler support E6 object literal
  // syntax, we should put below in |AncestorsOrSelf.prototype = {...}|.
  NodeGroups.prototype[Symbol.iterator] = function() { return this; };

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function canContentOfDL(node) {
    var name = node.nodeName;
    return name === 'DD' || name === 'DT';
  }
  
  /**
   * @param {!Array.<T>} arr
   * @param {function(T, number):boolean} predicate
   * @return {number}
   * @template T
   */
  function firstIndex(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i], i))
        return i;
    }
    return -1;
  }

  /**
   * @param {!Node} node
   * @param {function(!Node):boolean} predicate
   * @return {Node}
   */
  function firstSelfOrAncestor(node, predicate) {
    if (predicate(node))
      return node;
    var ancestors = editing.dom.ancestorsWhile(node, function(node) {
      return !predicate(node)
    });
    if (!ancestors.length)
      return node.parentNode;
    return ancestors[ancestors.length - 1].parentNode;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} parent
   * @param {!Node} node
   * @param {Node} ref
   */
  function insertChildNodesBefore(context, parent, node, ref) {
    var child = null;
    while (child = node.firstChild)
      context.insertBefore(parent, child, ref);
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isBreakElement(node) {
    return node.nodeType === Node.ELEMENT_NODE &&
      (node.nodeName === 'BR' || node.nodeName === 'WBR');
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isContainer(node) {
    return isTableCell(node) || isListMergeableContainer(node);
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isInList(node) {
    for (var currentNode = node.parentNode; currentNode;
         currentNode = currentNode.parentNode) {
      if (isList(currentNode))
        return true;
    }
    return false;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isList(node) {
    var name = node.nodeName;
    return editing.dom.isElement(node) && (name === 'OL' || name === 'UL');
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isListItem(node) {
    return node.nodeName === 'LI';
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isListMergeableContainer(node) {
    // TODO(hajimehoshi): Add grouping tags here
    var name = node.nodeName;
    return name === 'P' || name === 'BLOCKQUOTE';
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isPhrasingElement(node) {
    // TODO(hajimehoshi)
    return node.nodeType === Node.ELEMENT_NODE && editing.dom.isPhrasing(node);
  }

  /**
   * @param {!Node} node
   * @return boolean
   */
  function isTableCell(node) {
    var name = node.nodeName;
    return name === 'TR' || name === 'TD' || name === 'TH' ||
      name === 'COLGROUP' || name === 'TBODY' || name === 'THEAD';
  }

  /**
   * @param {!Element} node
   */
  function removeIfEmpty(context, node) {
    if (!node.hasChildNodes())
      context.removeChild(node.parentNode, node);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Node} node
   * @param {string} name
   * @return {!Node}
   */
  function replaceNodeName(context, node, name) {
    console.assert(node.parentNode);
    var newNode = context.createElement(name);
    insertChildNodesBefore(context, newNode, node, null);
    // TODO(hajimehoshi): Copy attributes?
    var parent = /** @type {!Node} */(node.parentNode);
    context.replaceChild(parent, newNode, node);
    return newNode;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} listItemNode
   * @return {{first: !Element, second: !Element}}
   *
   * Splits the list at |listItemNode| and returns the two lists.
   */
  function splitList(context, listItemNode) {
    console.assert(isListItem(listItemNode));
    var listNode = listItemNode.parentNode;
    console.assert(listNode && isList(listNode));

    // Separate |listNode| into |firstList| and |secondList|.
    var firstList = /** @type {!Element} */(listNode);
    var secondList = context.createElement(listNode.nodeName);

    // Copy 'style' attribute.
    // TODO(hajimehoshi): Copy other attributes?
    if (firstList.hasAttribute('style')) {
      context.setAttribute(secondList, 'style',
                           firstList.getAttribute('style'));
    }
    context.insertAfter(listNode.parentNode, secondList, firstList);
    
    for (var node of editing.dom.nextSiblings(listItemNode))
      context.appendChild(secondList, node);
    context.insertBefore(secondList.parentNode, listItemNode, secondList);

    return {
      first: firstList,
      second: secondList,
    };
  }

  /**
   * @param {!Array.<T>} originalArray
   * @param {function(T, number):boolean} predicate
   * @return {!Array.<T>}
   * @template T
   */
  function takeWhile(originalArray, predicate) {
    var newArray = [];
    for (var i = 0; i < originalArray.length; i++) {
      var value = originalArray[i];
      if (!predicate(value, i))
        return newArray;
      newArray.push(value);
    }
    return newArray;
  }

  var dom2 = {
    NodeGroups: NodeGroups,
    canContentOfDL: canContentOfDL,
    firstIndex: firstIndex,
    firstSelfOrAncestor: firstSelfOrAncestor,
    insertChildNodesBefore: insertChildNodesBefore,
    isBreakElement: isBreakElement,
    isContainer: isContainer,
    isListMergeableContainer: isListMergeableContainer,
    isInList: isInList,
    isPhrasingElement: isPhrasingElement,
    isList: isList,
    isListItem: isListItem,
    isTableCell: isTableCell,
    removeIfEmpty: removeIfEmpty,
    replaceNodeName: replaceNodeName,
    splitList: splitList,
    takeWhile: takeWhile,
  };
  Object.freeze(dom2);
  return dom2;
})();
