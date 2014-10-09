// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

testing.define('Sample', (function() {
  'use strict';

  function indexOfNode(node) {
    var parentNode = node.parentNode;
    var index = 0;
    for (var child = parentNode.firstChild; child;
         child = child.nextSibling) {
      if (child === node)
        return index;
      ++index;
    }
    throw new Error('UNREACHABLE');
  }

  // If boundary point is between text nodes, we merge them.
  function fixupAnchorAndFocus(selection, node) {
    if (node.nodeType != Node.TEXT_NODE)
      return;
    var previousSibling = node.previousSibling;
    if (!previousSibling || previousSibling.nodeType != Node.TEXT_NODE)
      return;
    var beforeText = previousSibling.textContent;
    previousSibling.textContent = beforeText + node.textContent;
    var containerNode = node.parentNode;
    var nodeIndex = indexOfNode(node);
    containerNode.removeChild(node);
    if (selection.anchorNode === node) {
      selection.anchorNode = previousSibling;
      selection.anchorOffset += beforeText.length;
    } else if (selection.anchorNode === containerNode &&
               selection.anchorOffset >= nodeIndex) {
      --selection.anchorOffset;
    }
    if (selection.focusNode === node) {
      selection.focusNode = previousSibling;
      selection.focusOffset += beforeText.length;
    } else if (selection.focusNode === containerNode &&
               selection.focusOffset >= nodeIndex) {
      --selection.focusOffset;
    }
  }

  function parseAnchorAndFocus(selection, node) {
    var child = node.firstChild;
    if (child) {
      while (child){
        var nextSibling = child.nextSibling;
        parseAnchorAndFocus(selection, child);
        child = nextSibling;
      }
      return;
    }

    if (node.nodeType != Node.COMMENT_NODE)
      return;

    var marker = node.nodeValue;
    if (marker != '|' && marker != '^')
      return;

    // Remove marker node
    var nextSibling = node.nextSibling;
    var previousSibling = node.previousSibling;
    var offsetInContainer = indexOfNode(node);
    var containerNode = node.parentNode;
    containerNode.removeChild(node);

    if (previousSibling && previousSibling.nodeType == Node.TEXT_NODE) {
      containerNode = previousSibling;
      offsetInContainer = previousSibling.nodeValue.length;
    }

    if (nextSibling && nextSibling.nodeType == Node.TEXT_NODE) {
      containerNode = nextSibling;
      offsetInContainer = 0;
    }

    if (marker == '^') {
      selection.anchorNode = containerNode;
      selection.anchorOffset = offsetInContainer;
    } else {
      selection.focusNode = containerNode;
      selection.focusOffset = offsetInContainer;
    }

    if (!selection.anchorNode && selection.focusNode) {
      selection.direction = editing.SelectionDirection.FOCUS_IS_START;
      selection.anchorNode = selection.focusNode;
      selection.anchorOffset = selection.focusOffset;
    }
  }

  /**
   * @param {!Document} document
   * @param {string} htmlText
   */
  function parseSample(document, htmlText) {
    if (htmlText.indexOf('^') != htmlText.lastIndexOf('^'))
      throw new Error('More than one focus marker in "' + htmlText + '"');

    if (htmlText.indexOf('|') != htmlText.lastIndexOf('|'))
      throw new Error('More than one focus marker in "' + htmlText + '"');

    if (htmlText.indexOf('|') < 0)
      throw new Error('You should have at most one | in "' + htmlText + '"');

    document.body.innerHTML = htmlText.replace('|', '<!--|-->')
        .replace('^', '<!--^-->');

    var selection = {
      anchorNode: null,
      anchorOffset: 0,
      direction: editing.SelectionDirection.ANCHOR_IS_START,
      focusNode: null,
      focusOffset: 0,
    };

    parseAnchorAndFocus(selection, document.body);
    fixupAnchorAndFocus(selection, selection.anchorNode);
    fixupAnchorAndFocus(selection, selection.focusNode);
    return new editing.ImmutableSelection(
        selection.anchorNode, selection.anchorOffset,
        selection.focusNode, selection.focusOffset,
        selection.direction);
  }

  /**
   * @constructor
   * @final
   * @struct
   * @param {string} htmlText
   */
  function Sample(htmlText) {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    // Note: Firefox requires focus to retrieve selection from IFRAME.
    iframe.focus();

    /** @type {editing.ImmutableSelection} */
    this.endingSelection_ = null;
    /** @type {!HTMLIFrameEleemnt} */
    this.iframe_ = iframe;
    /** @type {!Document} */
    this.document_ = iframe.contentDocument;
    /** @type {Selection} */
    this.domSelection_ = iframe.contentWindow.getSelection();
    if (!this.domSelection_)
      throw new Error('Can not get selection from IFRAME');

    // IE11 |Selection| doesn't have |extend| function.
    if (!this.domSelection_.extend) {
      this.domSelection_.extend = function(focusNode, focusOffset) {
        var anchor = document.createRange();
        anchor.setStart(this.anchorNode, this.anchorOffset);
        var focus = document.createRange();
        focus.setStart(focusNode, focusOffset);
        this.removeAllRanges();
        if (anchor.compareBoundaryPoints(Range.START_TO_START, focus) <= 0) {
          anchor.setEnd(focusNode, focusOffset);
        } else {
          anchor.setStart(focusNode, focusOffset);
        }
        this.addRange(anchor);
      }
    }
    /** @type {editing.ImmutableSelection} */
    this.startingSelection_ = parseSample(this.document, htmlText);
    var editor = editing.Editor.getOrCreate(this.document_);
    editor.setDomSelection(this.startingSelection_);
    Object.seal(this);
  }

  /** @type {!Document} */
  Sample.prototype.document;

  /**
   * @this {!Sample}
   * @param {string} name
   * @param {boolean=} opt_userInterface
   * @param {string=} opt_value
   *
   * Emulation of |Document.execCommand|.
   */
  function execCommand(name, opt_userInterface, opt_value) {
    var editor = editing.Editor.getOrCreate(this.document_);
    if (testRunner.useTryCatch) {
      var returnValue = 'UNKNOWN';
      try {
        returnValue = this.document_.execCommand.apply(
            this.document_, arguments);
      } catch (exception) {
        throw new Error('execCommand ' + exception);
      }
      try {
        this.endingSelection_ = editor.getSelectionFromDom();
      } catch (exception){
        throw new Error('setSelection ' + exception);
      }
    } else {
      returnValue = this.document_.execCommand.apply(
          this.document_, arguments);
      this.endingSelection_ = editor.getSelectionFromDom();
    }
    return returnValue;
  }

  /**
   * @this {!Sample}
   * @param {string} tagName
   * @param {!Element}
   */
  function createElement(tagName) {
    return this.document_.createElement(tagName);
  }

  /**
   * @this {!Sample}
   * @param {string} text
   * @return {!Text}
   */
  function createTextNode(text) {
    return this.document_.createTextNode(text);
  }

  /**
   * @this {!Sample}
   */
  function finish() {
    console.assert(this.iframe_);
    this.iframe_.parentNode.removeChild(this.iframe_);
    this.iframe_ = null;
  }

  /**
   * @this {!Sample}
   * @return {string}
   */
  function getContentHtml() {
    return testing.serializeNode(this.document_.body.firstChild);
  }

  Sample.prototype = /** @struct */ {
    createElement: createElement,
    createTextNode: createTextNode,
    execCommand: execCommand,
    finish: finish,
    get document() { return this.document_; },
    get domSelection() { return this.domSelection_; },
    get endingSelection() { return this.endingSelection_; },
    get startingSelection() { return this.startingSelection_; },
    getContentHtml: getContentHtml
  };
  Object.freeze(Sample.prototype);
  return Sample;
})());
