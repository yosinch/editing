// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.define('EditingContext', (function() {
  function ASSERT_EDITING_IN_PROGRESS(context) {
    if (!context.endingSelection_)
      return;
    throw new Error("You can't mutate DOM tree once you set ending selection.");
  }

  /**
   * @constructor
   * @final
   * @param {!editing.Editor} editor
   * @param {string} name A name for this context for error message.
   * @param {!editing.ReadOnlySelection} selection
   */
  function EditingContext(editor, name, selection) {
    console.assert(editor instanceof editing.Editor);
    console.assert(selection instanceof editing.ReadOnlySelection);
    var document = editor.document;
    this.document_ = document;
    this.editor_ = editor;
    this.endingSelection_ = null;
    this.name_ = name;
    this.operations_ = [];
    // We don't make ending selection as starting selection here. Because,
    // |ReadOnlySelection| doesn't track DOM modification during command
    // execution.
    this.startingSelection_ = selection
    Object.seal(this);
  }

  /** @type {!Document} */
  EditingContext.prototype.document;

  /** @type {!editing.Editor} */
  EditingContext.prototype.editor_;

  /** @type {!Array.<!editing.Operation>} */
  EditingContext.prototype.operations_;

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   */
  EditingContext.prototype.appendChild = function(parentNode, newChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} node
   * @return {boolean}
   */
  EditingContext.prototype.inDocument = function(node) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {!Node} refChild
   */
  EditingContext.prototype.insertAfter = function(
      parentNode, newChild, refChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {?Node} refChild
   */
  EditingContext.prototype.insertBefore = function(
      parentNode, newChild, refChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {string} name
   */
  EditingContext.prototype.removeAttribute = function(element, name) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} oldChild
   */
  EditingContext.prototype.removeChild = function(parentNode, oldChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {!Node} oldChild
   */
  EditingContext.prototype.replaceChild = function(
      parentNode, newChild, oldChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parent
   * @param {!Node} child
   * @return {!Node}
   */
  EditingContext.prototype.splitNode = function(parent, child) {};

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refChild
   * @return {!Node}
   */
  EditingContext.prototype.splitNodeLeft = function(element, refChild) {};

  /**
   * @this {!EditingContext}
   * @param {!Text} node
   * @param {number} offset
   * @return {!Text}
   */
  EditingContext.prototype.splitText = function(node, offset) {};

  /**
    * @this {!EditingContext}
    * @param {!Node} refNode
    * @return {!Node}
   */
  EditingContext.prototype.splitTree = function(treeNode, refNode) {};


  /**
   * @this {!EditingContext}
   * @param {!Node} treeNode
   * @param {!Node} refNode
   * @return {!Node}
   */
  EditingContext.prototype.splitTreeLeft = function(treeNode, refNode) {};

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   */
  function appendChild(parentNode, newChild) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (newChild.parentNode)
      this.removeChild(newChild.parentNode, newChild);
    var operation = new editing.AppendChild(parentNode, newChild);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!EditingContext}
   * @param {string} tagName
   * @return {!Element}
   */
  function createElement(tagName) {
    return this.document_.createElement(tagName);
  }

  /**
   * @this {!EditingContext}
   * @param {string} text
   * @return {!Text}
   */
  function createTextNode(text) {
    return this.document_.createTextNode(text);
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} node
   * @return {!Node}
   */
  function cloneNode(node) {
    return node.cloneNode(false);
  }

  /**
   * @this {!EditingContext}
   * @return {!editing.ReadOnlySelection}
   */
  function endingSelection() {
    if (!this.endingSelection_)
      throw new Error('You should set ending selection at end of command.');
    return this.endingSelection_;
  }

  /**
   * @this {!editing.EditingContext}
   * @param {string} name
   * @param {boolean=} opt_userInterface
   * @param {string=} opt_value
   *
   * Emulation of |Document.execCommand|.
   */
  function execCommand(name, opt_userInterface, opt_value) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (typeof(name) != 'string') {
      console.log('execCommand name', name);
      throw new Error('execCommand takes string: ' + name);
    }
    var userInterface = arguments.length >= 2 ? Boolean(opt_userInterface)
                                              : false;
    var value = arguments.length >= 3 ? String(opt_value) : '';
    var commandFunction = editing.lookupCommand(name);
    if (!commandFunction)
      throw new Error('No such command ' + name);
    return commandFunction(this, userInterface, value);
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} node
   * @return {boolean}
   */
  function inDocument(node) {
    for (var runner = node; runner; runner = runner.parentNode) {
      if (runner === this.document_)
        return true;
    }
    return false;
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
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {!Node} refChild
   */
  function insertBefore(parentNode, newChild, refChild) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (!refChild) {
      this.appendChild(parentNode, newChild);
      return;
    }
    if (parentNode !== refChild.parentNode)
      throw new Error('Parent of refChild ' + refChild + ' must be ' +
                      parentNode);
    if (newChild.parentNode)
      this.removeChild(newChild.parentNode, newChild);
    var operation = new editing.InsertBefore(parentNode, newChild, refChild);
    this.operations_.push(operation);
    operation.execute();
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
   * @this {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
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
     * @param {?Node} node
     * @param {number} offset
     */
    function splitIfNeeded(context, node, offset) {
      if (!node || !editing.nodes.isText(node) || !offset)
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

      // Split text node for using container and offset in container as
      // boundary points.
      var newTextNode = context.splitText(textNode, offset);
      if (anchorNode === node && anchorOffset >= offset) {
        anchorNode = newTextNode;
        anchorOffset -= offset;
      }
      if (focusNode === node && focusOffset >= offset) {
        focusNode = newTextNode;
        focusOffset -= offset;
      }
    }

    /**
     * @param {?Node} node
     * @param {number} offset
     */
    function useContainerIfPossible(node, offset) {
      if (!node || !editing.nodes.isText(node))
        return;
      var container = node.parentNode;
      var offsetInContainer = editing.nodes.nodeIndex(node);
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

    return new editing.ReadOnlySelection(anchorNode, anchorOffset,
                                         focusNode, focusOffset,
                                         selection.direction);
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {string} name
   */
  function removeAttribute(element, name) {
    ASSERT_EDITING_IN_PROGRESS(this);
    console.assert(typeof(name) == 'string',
        'Attribute name must be string rather than ' + name);
    if (!element.hasAttribute(name))
      return;
    var operation = new editing.RemoveAttribute(element, name);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} oldChild
   */
  function removeChild(parentNode, oldChild) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (oldChild.parentNode !== parentNode)
      throw new Error('A parent of oldChild ' + oldChild + ' must be ' +
                      oldChild.parentNode.outerHTML +
                      ' instead of ' + parentNode.outerHTML);
    var operation = new editing.RemoveChild(parentNode, oldChild);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {!Node} oldChild
   */
  function replaceChild(parentNode, newChild, oldChild) {
    ASSERT_EDITING_IN_PROGRESS(this);
    if (oldChild.parentNode !== parentNode)
      throw new Error('A parent of oldChild ' + oldChild + ' must be ' +
                      oldChild.parentNode.outerHTML +
                      ' instead of ' + parentNode.outerHTML);
    if (newChild.parentNode)
      this.removeChild(newChild.parentNode, newChild);
    var operation = new editing.ReplaceChild(parentNode, newChild, oldChild);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {string} name
   * @param {string} newValue
   */
  function setAttribute(element, name, newValue) {
    console.assert(editing.nodes.isElement(element),
                   'Node ' + element + ' must be an Element.');
    ASSERT_EDITING_IN_PROGRESS(this);
    var operation = new editing.SetAttribute(element, name, newValue);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!EditingContext}
   * @param {!editing.ReadOnlySelection} selection
   */
  function setEndingSelection(selection) {
    if (this.endingSelection_)
      throw new Error('ending selection is already set.');
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
    if (!anchorNode)
      throw new Error('Can not set null anchor node to ending ');
    if (!focusNode)
      throw new Error('Can not set null focus node to ending ');
    if (!this.inDocument(anchorNode)) {
      throw new Error('Can not set anchor node not in document ' +
                      anchorNode + ' parent=' + anchorNode.parentNode);
    }
    if (anchorOffset < 0 ||
        anchorOffset > editing.nodes.maxOffset(anchorNode)) {
      throw new Error('Invalid anchor offset ' + anchorOffset +
                      ' on ' + anchorNode +
                      ' max=' + editing.nodes.maxOffset(anchorNode));
    }
    if (!this.inDocument(focusNode)) {
      throw new Error('Can not set focus node not in document ' +
                      focusNode);
    }
    if (focusOffset < 0 || focusOffset > editing.nodes.maxOffset(focusNode)) {
      throw new Error('Invalid focus offset ' + focusOffset +
                      ' on ' + focusNode +
                      ' max=' + editing.nodes.maxOffset(focusNode));
    }
    this.endingSelection_ = selection;
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {string} propertyName
   * @param {string} newValue
   */
  function setStyle(element, propertyName, newValue) {
    console.assert(editing.nodes.isElement(element));
    var operation = new editing.SetStyle(element, propertyName, newValue);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
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
    console.assert(selection.isNormalized);
    var selectedNodes = editing.nodes.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [null];

    // Add ancestors of start node of selected nodes if all descendant nodes
    // in selected range, e.g. <a>^foo<b>bar</b>|</a>.
    // Note: selection doesn't need to end beyond end tag.
    var startNode = selectedNodes[0];
    var needSplits = [];
    var runner = startNode;
    if (editing.nodes.isText(runner)) {
      if (runner.previousSibling && runner.parentNode &&
          editing.nodes.isPhrasing(runner.parentNode)) {
        needSplits.push(runner);
      }
      runner = runner.parentNode;
    }
    while (runner && predicate(runner)) {
      if ((needSplits.length || runner.previousSibling) && runner.parentNode &&
          editing.nodes.isElement(runner.parentNode) &&
          editing.nodes.isPhrasing(runner.parentNode)) {
        needSplits.push(runner);
      }
      runner = runner.parentNode;
    }
    if (runner === startNode) {
      selectedNodes.unshift(null);
      return selectedNodes;
    }
    if (needSplits.length) {
      var oldTree = needSplits[needSplits.length - 1].parentNode;
      var newTree = this.splitTree(oldTree, needSplits[0]);
      if (oldTree == runner)
        runner = newTree;
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
   * @param {!Node} parent
   * @param {!Node} child
   * @return {!Node}
   *
   * Split |parent| at |child|, and returns new node which contains |child|
   * to its sibling nodes.
   * This function is similar to |splitNodeLeft|, which move child nodes before
   * |refChild| to new element.
   */
  function splitNode(parent, child) {
    if (!parent.parentNode)
      throw new Error('Parent ' + parent + ' must have a parent.');

    var newParent = /** @type {!Element} */(parent.cloneNode(false));
    this.removeAttribute(newParent, 'id');
    /*
     * TODO(yosin) Once http://crbug.com/411795 and  http://crbug.com/411795
     * fixed. We should remove "name" attribute from cloned node.
     if (newParent.nodeName === 'A')
      this.removeAttribute(newParent, 'name');
    */
    var sibling = child;
    while (sibling) {
      console.assert(sibling.parentNode === parent);
      var nextSibling = sibling.nextSibling;
      this.appendChild(newParent, sibling);
      sibling = nextSibling;
    }
    this.insertAfter(parent.parentNode, newParent, parent);
    return newParent;
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} element
   * @param {!Node} refChild
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
   * @param {!Text} node
   * @param {number} offset
   * @return {!Text}
   */
  function splitText(node, offset) {
    ASSERT_EDITING_IN_PROGRESS(this);
    var newNode = /** @type {!Text} */(node.splitText(offset));
    this.operations_.push(new editing.SplitText(node, newNode));
    return newNode;
  }

  /**
   * @this {!EditingContext}
   * @param {!Node} treeNode
   * @param {!Node} refNode
   * @return {!Node}
   *
   * This function is similar to |splitTreeLeft| but it moves nodes |refNode|
   * and after |refNode| to new element.
   */
  function splitTree(treeNode, refNode) {
    console.assert(editing.nodes.isDescendantOf(refNode, treeNode),
                  'refNode', refNode,
                  'must be descendant of treeNdoe', treeNode);
    var lastNode = refNode;
    for (var runner = refNode.parentNode; runner && runner !== treeNode;
         runner = runner.parentNode) {
      lastNode = this.splitNode(runner, lastNode);
    }
    return this.splitNode(treeNode, lastNode);
  }


  /**
   * @this {!EditingContext}
   * @param {!Node} treeNode
   * @param {!Node} refNode
   * @return {!Node}
   *
   * Split |treeNode| at |refNode| by moving nodes before |refNode| to
   * new element and return it.
   *
   * This function is similar to |splitTree| but moves nodes before |refNode|
   * to new element.
   */
  function splitTreeLeft(treeNode, refNode) {
    console.assert(editing.nodes.isDescendantOf(refNode, treeNode),
                  'refNode', refNode,
                  'must be descendant of treeNdoe', treeNode);
    var lastNode = refNode;
    for (var runner = refNode.parentNode; runner && runner !== treeNode;
         runner = runner.parentNode) {
      this.splitNodeLeft(/** @type {!Element} */(runner), lastNode);
      lastNode = runner;
    }
    return this.splitNodeLeft(/** @type {!Element} */(treeNode), lastNode);
  }

  /**
   * @this {!EditingContext}
   * @param {!Element} parent
   * @param {?Node} stopChild
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

  Object.defineProperties(EditingContext.prototype, {
    appendChild: {value: appendChild},
    constructor: {value: EditingContext},
    cloneNode: {value: cloneNode },
    document: {get: function() { return this.document_; }},
    document_: {writable: true},
    createElement: {value: createElement},
    createTextNode: {value: createTextNode},
    editor: {get: function() { return this.editor_; }},
    editor_: {writable: true},
    // Selection after executing editing command. This |ReadOnlySelection| is
    // put into undo stack for redo operation. See also |startingSelection|
    endingSelection: {get: endingSelection},
    endingSelection_: {writable: true},
    execCommand: {value: execCommand},
    inDocument: {value: inDocument},
    insertAfter: {value: insertAfter},
    insertBefore: {value: insertBefore},
    insertChildrenBefore: {value: insertChildrenBefore},
    operations: {get: function() { return this.operations_; }},
    operations_: {writable: true},
    name: {get: function() { return this.name_; }},
    name_: {writable: true},
    normalizeSelection: {value: normalizeSelection},
    removeAttribute: {value: removeAttribute},
    removeChild: {value: removeChild},
    replaceChild: {value: replaceChild},
    setAttribute: {value: setAttribute},
    setEndingSelection: {value: setEndingSelection },
    setStyle: {value: setStyle},
    setUpEffectiveNodes: {value: setUpEffectiveNodes},
    splitNode: {value: splitNode},
    splitNodeLeft: {value: splitNodeLeft},
    splitText: {value: splitText},
    splitTree: {value: splitTree},
    splitTreeLeft: {value: splitTreeLeft},
    // Selection before executing editing command. This |ReadOnlySelection| is
    // put into undo stack for undo operation. See also |endingSelection|
    startingSelection: {get: function() { return this.startingSelection_; }},
    startingSelection_: {writable: true},
    unwrapElement: {value: unwrapElement}
  });
  return EditingContext;
})());
