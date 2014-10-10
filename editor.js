// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.Editor = (function() {
  'use strict';

  /**
   * @constructor
   * @final
   * @struct
   * @param {!Document} document
   */
  function Editor(document) {
    /** @type {editing.EditingContext} */
    this.currentContext_ = null;
    /** @const @type {!Document} */
    this.document_ = document;
    /** @type {!Array.<!editing.EditingContext>} */
    this.redoStack_ = [];
    /** @type {editing.ImmutableSelection} */
    this.selection_ = null;
    /** @type {!Array.<!editing.EditingContext>} */
    this.undoStack_ = [];
    Object.seal(this);
  }

  // Forward declaration for Closure compiler.
  Editor.prototype = /** @struct */{
    /**
     * @this {!Editor}
     * @param {string} name
     * @param {!editing.ImmutableSelection} selection
     * @return {!editing.EditingContext}
     */
    createContext: function(name, selection) {},

    /** @return {!editing.ImmutableSelection} */
    getSelectionFromDom: function() {},

    /**
     * @param {!editing.ImmutableSelection} selection
     */
    setDomSelection: function(selection) {}
  };

  /**
   * @param {string} commandName
   * @param {!UndoableCommandFunction} commandFunction
   * @return {!CommandFunction}
   */
  Editor.createCommandFunction = function(commandName, commandFunction) {
    return function(contextDocument, userInterface, value) {
      console.assert(typeof userInterface === 'boolean', userInterface);
      console.assert(typeof value === 'string', value);
      var editor = Editor.getOrCreate(contextDocument);
      editor.selection_ = editor.getSelectionFromDom();
      var context = editor.createContext(commandName, editor.selection_);
      editor.currentContext_ = context;
      var succeeded = false;
      var returnValue;
      try {
        returnValue = commandFunction(context, userInterface, value);
        succeeded = true;
      } catch (exception) {
        console.log('execCommand', exception, exception.stack);
        throw exception;
      } finally {
        editor.currentContext_ = null;
        if (!succeeded)
          return false;
        console.assert(context.endingSelection instanceof
                       editing.ImmutableSelection);
        editor.setDomSelection(context.endingSelection);
        editor.undoStack_.push(context);
        return returnValue;
      }
    }
  }

  /**
   * @param {!Document} document
   * @return {!Editor}
   */
  Editor.getOrCreate = function(document) {
    if (!document.editor_)
      document.editor_ = new editing.Editor(document);
    return document.editor_;
  }

  /**
   * @this {!Editor}
   * @param {string} name
   * @param {!editing.ImmutableSelection} selection
   * @return {!editing.EditingContext}
   */
  function createContext(name, selection) {
    return new editing.EditingContext(this.document_, name, selection);
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
    var userInterface = Boolean(opt_userInterface);
    var value = opt_value === undefined ? '' : String(opt_value);
    var commandFunction = editing.lookupCommand(name);
    if (!commandFunction)
      return false;
    if (this.currentContext_) {
      throw new Error("We don't execute document.execCommand('" + name +
        "') this time, because it is called recursively in" +
        " document.execCommand('" + this.currentContext_.name + "')");
    }
    return commandFunction(this.document, userInterface, value);
  }

  /**
   * @this {!Editor}
   * @return {!editing.ImmutableSelection}
   */
  function getSelectionFromDom() {
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
      if (equalPositions(range.startContainer, range.startOffset,
                            domSelection.anchorNode,
                            domSelection.anchorOffset)) {
        return editing.SelectionDirection.ANCHOR_IS_START;
      }
      return editing.SelectionDirection.FOCUS_IS_START;
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
        offset1 = editing.dom.nodeIndex(container1);
        container1 = container1.parentNode;
      }
      if (!offset2 && container2.nodeType !== Node.ELEMENT_NODE) {
        offset2 = editing.dom.nodeIndex(container2);
        container2 = container2.parentNode;
      }
      return container1 === container2 && offset1 === offset2;
    }

    var domSelection = this.document_.getSelection();
    return new editing.ImmutableSelection(
        domSelection.anchorNode, domSelection.anchorOffset,
        domSelection.focusNode, domSelection.focusOffset,
        computeDirection(domSelection));
  }

  /**
   * @this {!Editor}
   * @return {boolean}
   */
  function redo() {
    if (!this.redoStack_.length)
      return false;
    var context = this.redoStack_.pop();
    for (var operation of context.operations)
      operation.redo();
    this.undoStack_.push(context);
    this.setDomSelection(context.endingSelection);
    return true;
  }

  /**
   * @this {!Editor}
   * @param {!editing.ImmutableSelection} selection
   */
  function setDomSelection(selection) {
    console.assert(selection instanceof editing.ImmutableSelection, selection);
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
    if (!editing.dom.isText(selection.focusNode)) {
      domSelection.extend(selection.focusNode, selection.focusOffset);
      return;
    }
    var trimmed = selection.focusNode.nodeValue.trimRight();
    domSelection.extend(selection.focusNode,
                        Math.min(selection.focusOffset, trimmed.length));
  }

  /**
   * @this {!Editor}
   * @return {boolean}
   */
  function undo() {
    if (!this.undoStack_.length)
      return false;
    var context = this.undoStack_.pop();
    for (var operation of context.operations.slice().reverse())
      operation.undo();
    this.redoStack_.push(context);
    this.setDomSelection(context.startingSelection);
    return true;
  }

  Editor.prototype = /** @struct*/ {
    createContext: createContext,
    currentContext: function() { return this.currentContext_; },
    execCommand: execCommand,
    getSelectionFromDom: getSelectionFromDom,
    get document() { return this.document_; },
    get selection() { return this.selection_; },
    setDomSelection: setDomSelection,
    redo: redo,
    undo: undo
  };
  Object.freeze(Editor.prototype);;
  return Editor;
})();
