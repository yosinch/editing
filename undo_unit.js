// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.UndoUnit = (function() {
  'use strict';

  function ASSERT_EDITING_IN_PROGRESS(undoUnit) {
    if (!undoUnit.endingSelection_)
      return;
    throw new Error("You can't mutate DOM tree once you set ending selection.");
  }

  /**
   * @constructor
   * @final
   * @struct
   * @param {!Document} contextDocument
   * @param {string} name A name for this undoUnit for error message.
   * @param {!editing.ImmutableSelection} selection
   */
  function UndoUnit(contextDocument, name, selection) {
    /** @private @type {!Document} */
    this.document_ = contextDocument;

    /** @private @type {?editing.ImmutableSelection} */
    this.endingSelection_ = null;

    /** @private @type {string} */
    this.name_ = name;

    /** @private @type {!Array.<!editing.Operation>} */
    this.operations_ = [];

    // We don't make ending selection as starting selection here. Because,
    // |ImmutableSelection| doesn't track DOM modification during command
    // execution.
    /** @private @type {?editing.ImmutableSelection} */
    this.startingSelection_ = selection;

    /** @private @type {!Map.<!Element, !editing.SetStyle>} */
    this.styledElements_ = new Map();

    Object.seal(this);
  }

  // Forward type declarations for closure compiler.
  UndoUnit.prototype = /** @struct */ {
    /**
     * @this {!UndoUnit}
     * @param {!Node} parentNode
     * @param {!Node} newChild
     */
    appendChild: function(parentNode, newChild) {},

    /**
     * @this {!UndoUnit}
     * @param {!Node} parentNode
     * @param {!Node} newChild
     * @param {?Node} refChild
     */
    insertBefore: function(parentNode, newChild, refChild) {},

    /**
     * @this {!UndoUnit}
     * @param {!Node} parentNode
     * @param {!Node} oldChild
     */
    removeChild: function(parentNode, oldChild) {},
  };

  /**
   * @this {!UndoUnit}
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
   * @this {!UndoUnit}
   * @return {!editing.ImmutableSelection}
   */
  function endingSelection() {
    if (!this.endingSelection_)
      throw new Error('You should set ending selection at end of command.');
    return this.endingSelection_;
  }

  /**
   * @this {!UndoUnit}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {?Node} refChild
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
   * @this {!UndoUnit}
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
   * @this {!UndoUnit}
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
   * @this {!UndoUnit}
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
   * @this {!UndoUnit}
   * @param {!Element} element
   * @param {string} propertyName
   */
  function removeStyle(element, propertyName) {
    console.assert(editing.dom.isElement(element));
    this.setStyle(element, propertyName, '');
  }

  /**
   * @this {!UndoUnit}
   * @param {!Element} element
   * @param {string} name
   * @param {string} newValue
   */
  function setAttribute(element, name, newValue) {
    console.assert(editing.dom.isElement(element),
                   'Node ' + element + ' must be an Element.');
    ASSERT_EDITING_IN_PROGRESS(this);
    var operation = new editing.SetAttribute(element, name, newValue);
    this.operations_.push(operation);
    operation.execute();
  }

  /**
   * @this {!UndoUnit}
   * @param {!editing.ImmutableSelection} selection
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
    if (!this.document_.contains(anchorNode)) {
      throw new Error('Can not set anchor node not in document ' +
                      anchorNode + ' parent=' + anchorNode.parentNode);
    }
    if (anchorOffset < 0 ||
        anchorOffset > editing.dom.maxOffset(anchorNode)) {
      throw new Error('Invalid anchor offset ' + anchorOffset +
                      ' on ' + anchorNode +
                      ' max=' + editing.dom.maxOffset(anchorNode));
    }
    if (!this.document_.contains(focusNode)) {
      throw new Error('Can not set focus node not in document ' +
                      focusNode);
    }
    if (focusOffset < 0 || focusOffset > editing.dom.maxOffset(focusNode)) {
      throw new Error('Invalid focus offset ' + focusOffset +
                      ' on ' + focusNode +
                      ' max=' + editing.dom.maxOffset(focusNode));
    }
    this.endingSelection_ = selection;
  }

  /**
   * @this {!UndoUnit}
   * @param {!Element} element
   * @param {string} propertyName
   * @param {string} newValue
   */
  function setStyle(element, propertyName, newValue) {
    console.assert(editing.dom.isElement(element));
    var operation = this.styledElements_.get(element);
    if (!operation) {
      operation = new editing.SetStyle(element);
      this.operations_.push(operation);
      this.styledElements_.set(element, operation);
    }
    operation.setProperty(propertyName, newValue);
    operation.execute();
  }

  /**
   * @this {!UndoUnit}
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

  UndoUnit.prototype = /** @struct */ {
    // Selection after executing editing command. This |ImmutableSelection| is
    // put into undo stack for redo operation. See also |startingSelection|
    get endingSelection() { return endingSelection.call(this); },
    get document() { return this.document_; },
    get operations() { return this.operations_; },
    get name() { return this.name_; },
    get startingSelection() { return this.startingSelection_; },
    appendChild: appendChild,
    constructor: UndoUnit,
    insertBefore: insertBefore,
    removeAttribute: removeAttribute,
    removeChild: removeChild,
    removeStyle: removeStyle,
    replaceChild: replaceChild,
    setAttribute: setAttribute,
    setEndingSelection: setEndingSelection,
    setStyle: setStyle,
    splitText: splitText,
  };
  Object.freeze(UndoUnit.prototype);
  return UndoUnit;
})();
