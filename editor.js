// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.define('Editor', (function() {
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
   * @type {?editing.ReadOnlySelection}
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
    if (!this.selection_)
      throw new Error('Editor must have a selection.');
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
    var domSeleciton = this.document_.getSelection();
    function direction() {
      if (!domSeleciton.rangeCount)
        return editing.SelectionDirection.ANCHOR_IS_START;
      var range = domSeleciton.getRangeAt(0);
      if (range.startContainer === domSeleciton.anchorNode &&
          range.startOffset == domSeleciton.anchorOffset) {
        return editing.SelectionDirection.ANCHOR_IS_START;
      }
      return editing.SelectionDirection.FOCUS_IS_START;
    }
    return new editing.ReadOnlySelection(
        domSeleciton.anchorNode, domSeleciton.anchorOffset,
        domSeleciton.focusNode, domSeleciton.focusOffset,
        direction());
  }

  /**
   * @this {!Editor}
   */
  function loadDomSelection() {
    this.selection_ = this.getDomSelection();
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
    commandData.operations.forEach(function(operation) {
      operation.redo();
    });
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
    domSelection.extend(selection.focusNode, selection.focusOffset);
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
    commandData.operations.slice().reverse().forEach(function(operation) {
      operation.undo();
    });
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
    loadDomSelection: {value: loadDomSelection},
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
