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
   * @param {!editing.ImmutableSelection} selection
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

  /** @return {!editing.ImmutableSelection} */
  Editor.prototype.getDomSelection = function() {};

  /**
   * @type {editing.ImmutableSelection}
   */
  Editor.prototype.selection_;

  /**
   * @param {!editing.ImmutableSelection} selection
   */
  Editor.prototype.setDomSelection = function(selection) {};

  /**
   * @this {!editing.Editor}
   * @param {string} name
   * @param {!editing.ImmutableSelection} selection
   * @return {!editing.EditingContext}
   */
  function createContext(name, selection) {
    console.assert(selection instanceof editing.ImmutableSelection,
                   selection + ' must be ImmutableSelection');
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
    var userInterface = Boolean(opt_userInterface);
    var value = opt_value === undefined ? '' : String(opt_value);
    var commandDefinition = editing.lookupCommand(name);
    if (!commandDefinition)
      throw new Error('No such command ' + name);
    if (this.currentContext_) {
      throw new Error("We don't execute document.execCommand('" + name +
        "') this time, because it is called recursively in" +
        " document.execCommand('" + this.currentContext_.name + "')");
    }

    this.selection_ = this.getDomSelection();
    var context = this.createContext(name, this.selection_);
    if (!commandDefinition.undoable)
      return commandDefinition.function(context, userInterface, value);

    this.currentContext_ = context;
    var succeeded = false;
    var returnValue;
    try {
      returnValue = commandDefinition.function(context, userInterface, value);
      succeeded = true;
    } catch (exception) {
      console.log('execCommand', exception);
      throw exception;
    } finally {
      this.currentContext_ = null;
      if (!succeeded)
        return false;
      console.assert(context.endingSelection instanceof
                     editing.ImmutableSelection);
      console.assert(context.startingSelection instanceof
                     editing.ImmutableSelection);
      this.setDomSelection(context.endingSelection);
      this.undoStack_.push({
        commandName: name,
        endingSelection: context.endingSelection,
        operations: context.operations,
        startingSelection: context.startingSelection
      });
      return returnValue;
    }
  }

  /**
   * @this {!Editor}
   * @return {!editing.ImmutableSelection}
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

  Editor.prototype = /** @struct*/ {
    createContext: createContext,
    currentContext: function() { return this.currentContext_; },
    execCommand: execCommand,
    getDomSelection: getDomSelection ,
    get document() { return this.document_; },
    get selection() { return this.selection_; },
    setDomSelection: setDomSelection,
    redo: redo,
    undo: undo
  };
  Object.freeze(Editor.prototype);;
  return Editor;
})();
