// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.define('SelectionTracker', (function() {
  /** @enum {string} */
  var StartOrEnd = {
    END: 'END',
    START: 'START'
  };

  /** @enum {string} */
  var TrackingType = {
    // <b>foo|</b> node is "foo".
    // <b>foo</b>| node is "b"
    AFTER_NODE: 'AFTER_NODE',
    // <b>|</b> node is "b"
    BEFORE_ALL_CHILDREN: 'BEFORE_ALL_CHILDREN',
    // <b>|foo</b> node is "b"
    // |<b>foo</b> node is "b"
    NODE: 'NODE'
  };

  /**
   * @constructor
   * @final
   * @param {!Node} node
   * @param {number} offset
   */
  function NodeAndOffset(node, offset) {
    this.node = node;
    this.offset = offset;
    Object.seal(this);
  }

  Object.defineProperties(NodeAndOffset.prototype, {
    node: {writable: true},
    offset: {writable: true}
  });

  /**
   * @constructor
   * @final
   * @param {!Node} node
   * @param {number} offset
   * @param {!StartOrEnd} startOrEnd
   */
  function TrackablePosition(node, offset, startOrEnd) {
    console.assert(editing.nodes.isElement(node), 'node=' + node);
    console.assert(offset >= 0, node, offset);
    var maxOffset = editing.nodes.maxOffset(node);
    console.assert(offset <= maxOffset, node, offset);
    if (!node.hasChildNodes()) {
      this.type_ = TrackingType.BEFORE_ALL_CHILDREN;
      this.node_ = node;
    } else if (maxOffset == offset) {
      this.type_ = TrackingType.AFTER_NODE;
      this.node_ = node.lastChild;
    } else if (offset && startOrEnd == StartOrEnd.END) {
      this.type_ = TrackingType.AFTER_NODE;
      this.node_ = node.childNodes[offset - 1];
    } else {
      this.type_ = TrackingType.NODE;
      this.node_ = node.childNodes[offset];
    }
    console.assert(this.node_, this, node, offset, startOrEnd, maxOffset,
                   maxOffset == offset);
    Object.seal(this);
  }

  /**
   * @type {!function(): !NodeAndOffset}
   */
  TrackablePosition.prototype.convertToNodeAndOffset;

  /**
   * @type {!function(!Node)}
   */
  TrackablePosition.prototype.willRemoveNode;

  /**
   * @type {!function(!Element)}
   */
  TrackablePosition.prototype.willUnwrapElement;

  Object.defineProperties(TrackablePosition.prototype, (function() {
    /**
     * @this {!TrackablePosition}
     * @return {!NodeAndOffset}
     */
    function convertToNodeAndOffset() {
      var node = this.node_;
      switch (this.type_) {
        case TrackingType.AFTER_NODE:
          return new NodeAndOffset(node.parentNode,
                                   editing.nodes.nodeIndex(node) + 1);
        case TrackingType.BEFORE_ALL_CHILDREN:
          return new NodeAndOffset(node, 0);
        case TrackingType.NODE:
          return new NodeAndOffset(node.parentNode,
                                   editing.nodes.nodeIndex(node));
        default:
          throw new Error('Bad TrackablePosition.type ' + this.type_);
      }
    }

    /**
     * @this {!TrackablePosition}
     * @param {!Node} node
     */
    function willRemoveNode(node) {
      if (this.node_ !== node &&
          !editing.nodes.isDescendantOf(this.node_, node)) {
        return;
      }
      var oldNode = this.node_;
      var oldType = this.type_;
      this.type_ = TrackingType.AFTER_NODE;
      this.node_ = editing.nodes.previousNode(oldNode);
      console.assert(this.node_, this, oldNode, oldType, node);
    }

    /**
     * @this {!TrackablePosition}
     * @param {!Element} element
     */
    function willUnwrapElement(element) {
      if (this.node_ !== element)
        return;
      var oldNode = this.node_;
      var oldType = this.type_;
      switch (oldType) {
        case TrackingType.AFTER_NODE:
          this.type_ = TrackingType.NODE;
          this.node_ = editing.nodes.nextNodeSkippingChildren(oldNode);
          if (!this.node_) {
            this.type_ = TrackingType.AFTER_NODE;
            this.node_ = oldNode.lastChild;
          }
          break;
        case TrackingType.BEFORE_ALL_CHILDREN:
          throw new Error('UnwrapElement should not call for element without' +
                          ' children.');
          break;
        case TrackingType.NODE:
          this.type_ = TrackingType.NODE;
          this.node_ = oldNode.firstChild;
          break;
        default:
          throw new Error('Bad TrackablePosition.type ' + this.type_);
      }
      console.assert(this.node_, this, oldNode, oldType, element.outerHTML);
    }

    return {
      convertToNodeAndOffset: {value: convertToNodeAndOffset},
      node_: {writable: true},
      type_: {writable: true},
      willRemoveNode: {value: willRemoveNode},
      willUnwrapElement: {value: willUnwrapElement}
    }
  })());

  /**
   * @constructor
   * @final
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   */
  function SelectionTracker(context, selection) {
    this.context_ = context;
    this.start_ = new TrackablePosition(selection.startContainer,
                                        selection.startOffset,
                                        StartOrEnd.START);
    this.end_ = new TrackablePosition(selection.endContainer,
                                      selection.endOffset,
                                      StartOrEnd.END);
    Object.seal(this);
  }

  /**
   * @this {!SelectionTracker}
   */
  function finish() {
    var anchorNodeAndOffset;
    var focusNodeAndOffset;
    var selection = this.context_.startingSelection;
    if (selection.direction == editing.SelectionDirection.ANCHOR_IS_START) {
      anchorNodeAndOffset = this.start_.convertToNodeAndOffset();
      focusNodeAndOffset = this.end_.convertToNodeAndOffset();
    } else {
      focusNodeAndOffset = this.start_.convertToNodeAndOffset();
      anchorNodeAndOffset = this.end_.convertToNodeAndOffset();
    }
    this.context_.setEndingSelection(new editing.ReadOnlySelection(
        anchorNodeAndOffset.node, anchorNodeAndOffset.offset,
        focusNodeAndOffset.node, focusNodeAndOffset.offset,
        selection.direction));
  }

  /**
   * @this {!SelectionTracker}
   * @param {!Node} node
   */
  function willRemoveNode(node) {
    this.start_.willRemoveNode(node);
    this.end_.willRemoveNode(node);
  }

  /**
   * @this {!SelectionTracker}
   * @param {!Element} element
   *
   * This function is called before moving all children of |element| to
   * before |element|, we called "unwrap". |element| must have at least one
   * child.
   *
   * See "unlink" command for example of usage.
   */
  function willUnwrapElement(element) {
    this.start_.willUnwrapElement(element);
    this.end_.willUnwrapElement(element);
  }

  Object.defineProperties(SelectionTracker.prototype, {
    constructor: {value: SelectionTracker},
    context_: {writable: true},
    end_:{writable: true},
    finish: {value: finish},
    start_: {writable: true},
    willRemoveNode: {value: willRemoveNode},
    willUnwrapElement: {value: willUnwrapElement}
  });

  return SelectionTracker;
})());
