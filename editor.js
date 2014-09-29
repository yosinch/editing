// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.define('Editor', (function() {
  'use strict';

  var DEBUG = true;

  /**
   * @constructor
   * @final
   * @param {!Document} document
   */
  function Editor(document) {
    this.context_ = null;
    this.currentContext_ = null;
    this.document_ = document;
    this.redoStack_ = [];
    this.selection_ = null;
    this.undoStack_ = [];
    Object.seal(this);
  }

  /**
   * @this {!Editor}
   * @param {string} name
   * @param {!editing.ReadOnlySelection} selection
   * @return {!editing.EditingContext}
   */
  Editor.prototype.createContext = function(name, selection) {};

  /**
   * @param {!Document} document
   * @return {!Editor}
   */
  Editor.getOrCreate = function(document) {
    if (!document.editor_)
      document.editor_ = new editing.Editor(document);
    return document.editor_;
  }

  /** @return {!editing.ReadOnlySelection} */
  Editor.prototype.getDomSelection = function() {};

  /**
   * @type {editing.ReadOnlySelection}
   */
  Editor.prototype.selection_;

  /**
   * @param {!editing.ReadOnlySelection} selection
   */
  Editor.prototype.setDomSelection = function(selection) {};

  /**
   * @this {!editing.Editor}
   * @param {string} name
   * @param {!editing.ReadOnlySelection} selection
   * @return {!editing.EditingContext}
   */
  function createContext(name, selection) {
    console.assert(selection instanceof editing.ReadOnlySelection,
                   selection + ' must be ReadOnlySelection');
    return new editing.EditingContext(this, name, selection);
  }

  /**
   * @this {!Editor}
   * @param {string} name
   * @param {boolean=} opt_userInterface
   * @param {string=} opt_value
   *
   * Emulation of |Document.execCommand|.
   */
  function execCommand(name, opt_userInterface, opt_value) {
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
    if (this.currentContext_) {
      throw new Error("We don't execute document.execCommand('" + name +
        "') this time, because it is called recursively in" +
        " document.execCommand('" + this.currentContext_.name + "')");
    }
    this.selection_ = this.getDomSelection();
    var context = this.createContext(name, this.selection_);
    this.currentContext_ = context;
    var succeeded = false;
    var returnValue;
    if (DEBUG) {
      // TODO(yosin) Once we finish debugging, we should move calling
      // |commandFunction| into try-finally block.
      returnValue = commandFunction(context, userInterface, value);
      this.currentContext_ = null;
      this.setDomSelection(context.endingSelection);
      this.undoStack_.push({commandName: name,
                            endingSelection: context.endingSelection,
                            operations: context.operations,
                            startingSelection: context.startingSelection});
      return returnValue;
    }
    try {
      returnValue = commandFunction(context, userInterface, value);
      succeeded = true;
    } catch (exception) {
      console.log('execCommand', exception);
    } finally {
      this.currentContext_ = null;
      if (!succeeded)
        return 'FAILED';
      console.assert(context.endingSelection instanceof
                     editing.ReadOnlySelection);
      console.assert(context.startingSelection instanceof
                     editing.ReadOnlySelection);
      this.setDomSelection(context.endingSelection);
      this.undoStack_.push({commandName: name,
                            endingSelection: context.endingSelection,
                            operations: context.operations,
                            startingSelection: context.startingSelection});
      return returnValue;
    }
  }

  /**
   * @this {!Editor}
   * @return {!editing.ReadOnlySelection}
   */
  function getDomSelection() {
    /**
     * @param {!Selection} domSelection
     * @return {editing.SelectionDirection}
     */
    function computeDirection(domSelection) {
      if (!domSelection.rangeCount)
        return editing.SelectionDirection.ANCHOR_IS_START;
      var range = domSelection.getRangeAt(0);
      if (domSelection.anchorNode === domSelection.focusNode) {
        return domSelection.anchorOffset <= domSelection.focusOffset ?
            editing.SelectionDirection.ANCHOR_IS_START :
            editing.SelectionDirection.FOCUS_IS_START;
      }
      return equalPositions(range.startContainer, range.startOffset,
                            domSelection.anchorNode,
                            domSelection.anchorOffset) ?
        editing.SelectionDirection.ANCHOR_IS_START :
        editing.SelectionDirection.FOCUS_IS_START;
    }

    /**
     * @param {Node} container1
     * @param {number} offset1
     * @param {Node} container2
     * @param {number} offset2
     * @return {boolean}
     */
    function equalPositions(container1, offset1, container2, offset2) {
      if (container1 === container2)
        return offset1 === offset2;
      if (!container1 || !container2)
        return false;
      if (!offset1 && container1.nodeType !== Node.ELEMENT_NODE) {
        offset1 = editing.nodes.nodeIndex(container1);
        container1 = container1.parentNode;
      }
      if (!offset2 && container2.nodeType !== Node.ELEMENT_NODE) {
        offset2 = editing.nodes.nodeIndex(container2);
        container2 = container2.parentNode;
      }
      return container1 === container2 && offset1 === offset2;
    }

    var domSelection = this.document_.getSelection();
    return new editing.ReadOnlySelection(
        domSelection.anchorNode, domSelection.anchorOffset,
        domSelection.focusNode, domSelection.focusOffset,
        computeDirection(domSelection));
  }

  /**
   * @this {!Editor}
   * @return {boolean}
   */
  function redo(context) {
    if (!this.redoStack_.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }
    var commandData = this.redoStack_.pop();
    for (var operation of commandData.operations)
      operation.redo();
    this.undoStack_.push(commandData);
    context.setEndingSelection(commandData.endingSelection);
    return true;
  }

  /**
   * @this {!Editor}
   * @param {!editing.ReadOnlySelection} selection
   */
  function setDomSelection(selection) {
    console.assert(selection instanceof editing.ReadOnlySelection, selection);
    this.selection_ = selection;
    var domSelection = this.document_.getSelection();
    if (selection.isEmpty) {
      domSelection.removeAllRanges();
      return;
    }
    domSelection.collapse(selection.anchorNode, selection.anchorOffset);

    // Chrome throws an IndexError for Selection.extend() when specifying to
    // middle or beyond trailing whitespaces, http://crbug.com/413156
    // Following code is work around of that.
    if (!editing.nodes.isText(selection.focusNode)) {
      domSelection.extend(selection.focusNode, selection.focusOffset);
      return;
    }
    var trimmed = selection.focusNode.nodeValue.trimRight();
    domSelection.extend(selection.focusNode,
                        Math.min(selection.focusOffset, trimmed.length));
  }

  /**
   * @this {!Editor}
   * @param {!editing.EditingContext} context
   * @return {boolean}
   */
  function undo(context) {
    if (!this.undoStack_.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }
    var commandData = this.undoStack_.pop();
    // TODO(yosin) We should not use |reverse()| here. We can do this
    // without copying array.
    for (var operation of commandData.operations.slice().reverse())
      operation.undo();
    this.redoStack_.push(commandData);
    context.setEndingSelection(commandData.startingSelection);
    return true;
  }

  Object.defineProperties(Editor.prototype, {
    createContext: {value: createContext},
    currentContext: {value: function() { return this.currentContext_; }},
    currentContext_: {writable: true},
    document: {get: function() { return this.document_; }},
    document_: {writable: true},
    execCommand: {value: execCommand},
    getDomSelection: {value: getDomSelection },
    selection: {get: function() { return this.selection_; }},
    selection_: {writable: true},
    setDomSelection: {value: setDomSelection },
    redo: {value: redo},
    redoStack_: {writable: true},
    undo: {value: undo},
    undoStack_: {writable: true}
  });
  return Editor;
})());
