// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.EditingContext = (function() {
  'use strict';

  function ASSERT_EDITING_IN_PROGRESS(context) {
    if (!context.endingSelection_)
      return;
    throw new Error("You can't mutate DOM tree once you set ending selection.");
  }

  /**
   * @constructor
   * @extends {editing.UndoUnit}
   * @final
   * @struct
   * @param {!Document} contextDocument
   * @param {string} name A name for this context for error message.
   * @param {!editing.ImmutableSelection} selection
   */
  function EditingContext(contextDocument, name, selection) {
    editing.UndoUnit.call(this, contextDocument, name, selection);
    Object.seal(this);
  }

  // Forward type declarations for closure compiler.
  EditingContext.prototype = /** @struct */ {
    /**
     * @this {!EditingContext}
     * @param {!Node} parentNode
     * @param {!Node} newChild
     * @param {!Node} refChild
     */
    insertAfter: function(parentNode, newChild, refChild) {},

    /**
     * @this {!EditingContext}
     * @param {!Element} element
     * @param {!Node} child
     * @return {!Element}
     */
    splitNode: function(element, child) {},

    /**
     * @this {!EditingContext}
     * @param {!Element} element
     * @param {!Node} refChild
     * @return {!Element}
     */
    splitNodeLeft: function(element, refChild) {},

    /**
      * @this {!EditingContext}
      * @param {!Element} element
      * @param {!Node} refNode
      * @return {!Element}
     */
    splitTree: function(element, refNode) {},

    /**
     * @this {!EditingContext}
     * @param {!Element} element
     * @param {!Node} refNode
     * @return {!Element}
     */
    splitTreeLeft: function(element, refNode) {}
  };

  /**
   * @this {!EditingContext}
   * @param {string} tagName
   * @return {!Element}
   */
  function createElement(tagName) {
    return this.document.createElement(tagName);
  }

  /**
   * @this {!EditingContext}
   * @param {string} text
   * @return {!Text}
   */
  function createTextNode(text) {
    return this.document.createTextNode(text);
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} parent
   * @param {!Node} newChild
   * @param {!Node} refChild
   */
  function insertAfter(parent, newChild, refChild) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (!refChild)
      throw new Error('refChild can not be null for insertAfter.');
    if (parent !== refChild.parentNode)
      throw new Error('Parent of refChild ' + refChild + ' must be ' + parent);
    if (newChild.parentNode)
      this.removeChild(newChild.parentNode, newChild);
    this.insertBefore(parent, newChild, refChild.nextSibling);
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} oldParent
   * @param {!Node} refNode
   */
  function insertChildrenBefore(oldParent, refNode) {
    var newParent = refNode.parentNode;
    if (!newParent)
      throw new Error('refNode ' + refNode + ' must have a parent.');
    var child = oldParent.firstChild;
    while (child) {
      var nextSibling = child.nextSibling;
      this.insertBefore(newParent, child, refNode);
      child = nextSibling;
    }
  }

  /**
   * @this {!editing.EditingContext}
   * @param {!Element} newElement
   * @param {!Element} oldElement
   */
  function moveAllChildren(newElement, oldElement) {
    var child;
    while (child = oldElement.firstChild)
      this.appendChild(newElement, child);
  }

  /**
   * @this {!editing.EditingContext} context
   * @param {!editing.ImmutableSelection} selection
   */
  function normalizeSelection(selection) {
    if (selection.isEmpty)
      return selection;

    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;

    /**
     * @param {!editing.EditingContext} context
     * @param {Node} node
     * @param {number} offset
     */
    function splitIfNeeded(context, node, offset) {
      if (!node || !editing.dom.isText(node) || !offset)
        return;
      var textNode = /** @type {!Text} */(node);
      var text = node.nodeValue;
      if (!offset || text.length === offset)
        return;
      if (offset > text.length) {
        throw new Error('Offset ' + offset + ' must be grater than zero and ' +
                        'less than ' + text.length + ' for ' + node);
      }

      // We include leading and trailing whiespaces for canceling selection
      // canonicalization.
      // TODO(yosin) Once http://crbug.com/346613 is fixed, we don't need to
      // have this code fragment.
      if (!node.previousSibling) {
        // TODO(yosin) We should consider whitespace definition differences
        // between JS and HTML5, e.g. |preserve-whitespace| CSS property,
        // |xml:whitespace| attribute.
        var trimLeft = text.trimLeft();
        var visibleLeft = text.length - trimLeft.length;
        if (offset <= visibleLeft) {
          // |node| has leading whitespaces,
          if (anchorNode === node && anchorOffset === offset)
            anchorOffset = 0;
          if (focusNode === node && focusOffset === offset)
            focusOffset = 0;
          return;
        }
      }
      if (!node.nextSibling) {
        var trimRight = text.trimRight();
        var visibleRight = trimRight.length;
        if (offset >= visibleRight) {
          // |node| has trailing whitespaces,
          if (anchorNode === node && anchorOffset === offset)
            anchorOffset = text.length;
          if (focusNode === node && focusOffset === offset)
            focusOffset = text.length;
          return;
        }
      }

      // Split text node for using container and offset in container as
      // boundary points.
      var containerNode = textNode.parentNode;
      var nodeIndex = editing.dom.nodeIndex(textNode);
      var newTextNode = context.splitText(textNode, offset);
      if (anchorNode === containerNode) {
        if (anchorOffset >= nodeIndex)
          ++anchorOffset;
      } else if (anchorNode === node && anchorOffset >= offset) {
        anchorNode = newTextNode;
        anchorOffset -= offset;
      }
      if (focusNode === containerNode) {
        if (focusOffset >= nodeIndex)
          ++focusOffset;
      } else if (focusNode === node && focusOffset >= offset) {
        focusNode = newTextNode;
        focusOffset -= offset;
      }
    }

    /**
     * @param {Node} node
     * @param {number} offset
     */
    function useContainerIfPossible(node, offset) {
      if (!node || !editing.dom.isText(node))
        return;
      var container = node.parentNode;
      var offsetInContainer = editing.dom.nodeIndex(node);
      if (anchorNode === node && anchorOffset == offset) {
        anchorNode = container;
        anchorOffset = offset ? offsetInContainer + 1 : offsetInContainer;
      }
      if (focusNode === node && focusOffset == offset) {
        focusNode = container;
        focusOffset = offset ? offsetInContainer + 1 : offsetInContainer;
      }
    }

    // Split text boundary point
    splitIfNeeded(this, anchorNode, anchorOffset);
    splitIfNeeded(this, focusNode, focusOffset);

    // Convert text node + offset to container node + offset.
    useContainerIfPossible(anchorNode, anchorOffset);
    useContainerIfPossible(focusNode, focusOffset);

    return new editing.ImmutableSelection(anchorNode, anchorOffset,
                                         focusNode, focusOffset,
                                         selection.direction);
  }

  /**
   * @this {!editing.EditingContext}
   * @param {!Node} node
   */
  function removeNodePreservingChildren(node) {
    var parentNode = node.parentNode;
    while (node.firstChild)
      this.insertBefore(parentNode, node.firstChild, node);
    this.removeChild(parentNode, node);
  }

  /**
   * @this {!editing.EditingContext}
   * @param {!editing.ImmutableSelection} selection
   * @param {!function(!Node):boolean} predicate
   * @return {!Array.<!Node>}
   *
   * Computes effective nodes for inline formatting commands. |selection|
   * should be normalized. In addition to the selected nodes, this unshifts
   * ancestor nodes until the result of |predicate| is false.
   *
   * If |predicate| always returns true until reaching the top node, this
   * returns null and the following selected nodes.
   */
  function setUpEffectiveNodes(selection, predicate) {
    return this.setUpEffectiveNodesWithSplitter(selection, predicate,
                                                splitTree);
  }

  /**
   * @this {!editing.EditingContext} context
   * @param {!editing.ImmutableSelection} selection
   * @param {!function(!Node):boolean} predicate
   * @param {!function(!Node, !Node): !Node} splitter
   * @return {!Array.<!Node>}
   */
  function setUpEffectiveNodesWithSplitter(selection, predicate, splitter) {
    console.assert(selection.isNormalized);
    var selectedNodes = editing.dom.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [null];

    // Add ancestors of start node of selected nodes if all descendant nodes
    // in selected range, e.g. <a>^foo<b>bar</b>|</a>.
    // Note: selection doesn't need to end beyond end tag.
    var startNode = selectedNodes[0];
    var needSplits = [];
    var runner = startNode;
    if (editing.dom.isText(runner)) {
      if (runner.previousSibling && runner.parentNode &&
          editing.dom.isPhrasing(runner.parentNode)) {
        needSplits.push(runner);
      }
      runner = runner.parentNode;
    }
    while (runner && predicate(runner)) {
      if ((needSplits.length || runner.previousSibling) && runner.parentNode &&
          editing.dom.isElement(runner.parentNode) &&
          editing.dom.isPhrasing(runner.parentNode)) {
        needSplits.push(runner);
      }
      runner = runner.parentNode;
    }
    if (runner === startNode) {
      selectedNodes.unshift(null);
      return selectedNodes;
    }
    if (needSplits.length) {
      var endNode = selectedNodes[selectedNodes.length - 1];
      var oldTree = needSplits[needSplits.length - 1].parentNode;
      var newTree = splitter.call(this, oldTree, needSplits[0]);
      if (oldTree == runner)
        runner = newTree;
      selectedNodes = [];
      var node = startNode;
      while (node != endNode) {
        selectedNodes.push(node);
        node = editing.dom.nextNode(node);
      }
      selectedNodes.push(endNode);
    }

    var effectiveNodes = selectedNodes;
    for (var ancestor = startNode.parentNode; ancestor != runner;
         ancestor = ancestor.parentNode) {
      effectiveNodes.unshift(ancestor);
    }
    effectiveNodes.unshift(runner);
    return effectiveNodes;
  }

  /**
   * @this {!EditingContext}
   * @return {boolean}
   */
  function shouldUseCSS() {
    return this.document.queryCommandValue('styleWithCSS') === 'true';
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refChild
   * @return {!Element}
   *
   * Split |parent| at |child|, and returns new node which contains |child|
   * to its sibling nodes.
   * This function is similar to |splitNodeLeft|, which move child nodes before
   * |refChild| to new element.
   */
  function splitNode(element, refChild) {
    console.assert(element.parentNode, element);
    console.assert(refChild.parentNode === element, refChild);
    if (element.firstChild === refChild)
      return element;
    var newElement = /** @type {!Element} */(element.cloneNode(false));
    this.removeAttribute(newElement, 'id');
    /*
     * TODO(yosin) Once http://crbug.com/411795 and  http://crbug.com/411795
     * fixed. We should remove "name" attribute from cloned node.
     if (newElement.nodeName === 'A')
      this.removeAttribute(newElement, 'name');
    */
    var sibling = refChild;
    while (sibling) {
      console.assert(sibling.parentNode === element);
      var nextSibling = sibling.nextSibling;
      this.appendChild(newElement, sibling);
      sibling = nextSibling;
    }
    this.insertAfter(/** @type{!Node} */(element.parentNode), newElement,
                     element);
    return newElement;
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refChild
   * @return {!Element}
   *
   * Split |element| at |refChild| by moving child nodes before |refChild|
   * to new element and returns it.
   *
   * This function is similar to |splitNode|, which move child nodes after
   * |refChild| to new element.
   *
   * The "id" attribute is in new element.
   */
  function splitNodeLeft(element, refChild) {
    console.assert(refChild.parentNode === element,
                 'refChild', refChild, ' should be child of ', element);
    console.assert(refChild !== element.firstChild,
                   'refChild', refChild, ' must not be a first child of',
                   element);
    var newElement = element.cloneNode(false);
    this.removeAttribute(element, 'id');
    /*
     * TODO(yosin) Once http://crbug.com/411795 and  http://crbug.com/411795
     * fixed. We should remove "name" attribute from cloned node.
     if (element.nodeName === 'A')
      this.removeAttribute(element, 'name');
    */
    var child = element.firstChild;
    while (child !== refChild) {
      var nextSibling = child.nextSibling;
      this.appendChild(newElement, child);
      child = nextSibling;
    }
    this.insertBefore(/** @type {!Node} */(element.parentNode),
      newElement, element);
    return newElement;
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refNode
   * @return {!Element}
   *
   * This function is similar to |splitTreeLeft| but it moves nodes |refNode|
   * and after |refNode| to new element.
   */
  function splitTree(element, refNode) {
    console.assert(editing.dom.isDescendantOf(refNode, element),
                  'refNode', refNode,
                  'must be descendant of treeNdoe', element);
    var lastNode = refNode;
    for (var runner = refNode.parentNode;
         runner && runner !== element && editing.dom.isElement(runner);
         runner = runner.parentNode) {
      lastNode = this.splitNode(/** @type {!Element} */(runner), lastNode);
    }
    return this.splitNode(element, lastNode);
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refNode
   * @return {!Element}
   *
   * Split |element| at |refNode| by moving nodes before |refNode| to
   * new element and return it.
   *
   * This function is similar to |splitTree| but moves nodes before |refNode|
   * to new element.
   */
  function splitTreeLeft(element, refNode) {
    console.assert(editing.dom.isDescendantOf(refNode, element),
                  'refNode', refNode,
                  'must be descendant of treeNdoe', element);
    var lastNode = refNode;
    for (var runner = refNode.parentNode;
         runner && runner !== element && editing.dom.isElement(runner);
         runner = runner.parentNode) {
      this.splitNodeLeft(/** @type {!Element} */(runner), lastNode);
      lastNode = runner;
    }
    return this.splitNodeLeft(/** @type {!Element} */(element), lastNode);
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} parent
   * @param {Node} stopChild
   */
   function unwrapElement(parent, stopChild) {
      console.assert(!stopChild || stopChild.parentNode == parent,
                     'unwrapElement', parent, stopChild);
      var child = parent.firstChild;
      var ancestor = parent.parentNode;
      if (!ancestor)
        throw new Error('Parent ' + parent + ' must have a parent.');
      while (child != stopChild) {
        var nextSibling = child.nextSibling;
        this.insertBefore(ancestor, child, parent);
        child = nextSibling;
      }
      if (parent.firstChild)
        return;
      this.removeChild(ancestor, parent);
   }

  EditingContext.prototype = /** @type {!EditingContext} */ (Object.create(
    editing.UndoUnit.prototype, {
    constructor: {value: EditingContext},
    createElement: {value: createElement },
    createTextNode: {value: createTextNode },
    insertAfter: {value: insertAfter},
    insertChildrenBefore: {value: insertChildrenBefore},
    moveAllChildren: {value: moveAllChildren},
    normalizeSelection: {value: normalizeSelection},
    removeNodePreservingChildren: {value: removeNodePreservingChildren},
    setUpEffectiveNodes: {value: setUpEffectiveNodes},
    setUpEffectiveNodesWithSplitter: {value: setUpEffectiveNodesWithSplitter},
    shouldUseCSS: { get: function() { return shouldUseCSS.call(this); } },
    splitNode: {value: splitNode},
    splitNodeLeft: {value: splitNodeLeft},
    splitTree: {value: splitTree},
    splitTreeLeft: {value: splitTreeLeft},
    unwrapElement: {value: unwrapElement}
  }));
  Object.freeze(EditingContext.prototype);
  return EditingContext;
})();
