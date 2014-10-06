// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.SelectionTracker = (function() {
  'use strict';

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
   * @struct
   * @param {!Node} node
   * @param {number} offset
   */
  function NodeAndOffset(node, offset) {
    /** @type {!Node} */
    this.node = node;
    /** @type {number} */
    this.offset = offset;
    Object.seal(this);
  }

  /**
   * @constructor
   * @final
   * @struct
   * @param {!Node} node
   * @param {number} offset
   * @param {!StartOrEnd} startOrEnd
   */
  function TrackablePosition(node, offset, startOrEnd) {
    console.assert(editing.dom.isElement(node), 'node=' + node);
    console.assert(offset >= 0, node, offset);
    var maxOffset = editing.dom.maxOffset(node);
    console.assert(offset <= maxOffset, node, offset);
    /** @type {TrackingType} */
    var type;
    /** @type {?Node} */
    var refNode;
    if (!node.hasChildNodes()) {
      type = TrackingType.BEFORE_ALL_CHILDREN;
      refNode = node;
    } else if (maxOffset == offset) {
      type = TrackingType.AFTER_NODE;
      refNode = node.lastChild;
    } else if (offset && startOrEnd == StartOrEnd.END) {
      type = TrackingType.AFTER_NODE;
      refNode = node.childNodes[offset - 1];
    } else {
      type = TrackingType.NODE;
      refNode = node.childNodes[offset];
    }
    if (!refNode) {
      console.log('refNode should not be null', type, node, offset, startOrEnd,
                  maxOffset, maxOffset == offset);
      throw new Error('We can not track');
    }
    /** @private @type {TrackingType} */
    this.type_ = type;
    /** @private @type {!Node} */
    this.node_ = refNode;
    Object.seal(this);
  }

  TrackablePosition.prototype = /** @struct */ {
    /**
     * @this {!TrackablePosition}
     * @return {!NodeAndOffset}
     */
    convertToNodeAndOffset: function() {
      var node = this.node_;
      if (!node.parentNode)
        throw new Error('Node should be in document.');
      switch (this.type_) {
        case TrackingType.AFTER_NODE:
          return new NodeAndOffset(node.parentNode,
                                   editing.dom.nodeIndex(node) + 1);
        case TrackingType.BEFORE_ALL_CHILDREN:
          return new NodeAndOffset(node, 0);
        case TrackingType.NODE:
          return new NodeAndOffset(node.parentNode,
                                   editing.dom.nodeIndex(node));
        default:
          throw new Error('Bad TrackablePosition.type ' + this.type_);
      }
    },

    /**
     * @this {!TrackablePosition}
     * @param {!Node} node
     */
    willRemoveNode: function(node) {
      if (this.node_ !== node &&
          !editing.dom.isDescendantOf(this.node_, node)) {
        return;
      }
      var oldNode = this.node_;
      var oldType = this.type_;
      this.type_ = TrackingType.AFTER_NODE;
      var refNode = editing.dom.previousNode(oldNode);
      if (!refNode) {
        console.log('oldNode', oldNode, 'have no previous node.');
        throw new Error('We should not remove first node.');
      }
      this.node_ = refNode;
    },

    /**
     * @this {!TrackablePosition}
     * @param {!Element} element
     */
    willUnwrapElement: function(element) {
      if (this.node_ !== element)
        return;
      var oldNode = this.node_;
      var oldType = this.type_;
      /** @type {Node} */
      var refNode;
      switch (oldType) {
        case TrackingType.AFTER_NODE:
          this.type_ = TrackingType.NODE;
          refNode = editing.dom.nextNodeSkippingChildren(oldNode);
          if (!refNode) {
            this.type_ = TrackingType.AFTER_NODE;
            refNode = oldNode.lastChild;
          }
          break;
        case TrackingType.BEFORE_ALL_CHILDREN:
          throw new Error('UnwrapElement should not call for element without' +
                          ' children.');
          break;
        case TrackingType.NODE:
          this.type_ = TrackingType.NODE;
          refNode = oldNode.firstChild;
          break;
        default:
          throw new Error('Bad TrackablePosition.type ' + this.type_);
      }
      if (!refNode) {
        console.log(this.node_, this, oldNode, oldType, element.outerHTML);
        throw new Error('We failed to track selection.');
      }
      this.node_ = refNode;
    }
  };
  Object.freeze(TrackablePosition.prototype);

  /**
   * @constructor
   * @final
   * @struct
   * @param {!editing.EditingContext} context
   * @param {!editing.ImmutableSelection} selection
   */
  function SelectionTracker(context, selection) {
    /** @private @type {!editing.EditingContext} */
    this.context_ = context;
    /** @private @type {!TrackablePosition} */
    this.start_ = new TrackablePosition(selection.startContainer,
                                        selection.startOffset,
                                        StartOrEnd.START);
    /** @private @type {!TrackablePosition} */
    this.end_ = new TrackablePosition(selection.endContainer,
                                      selection.endOffset,
                                      StartOrEnd.END);
    Object.freeze(this);
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
    this.context_.setEndingSelection(new editing.ImmutableSelection(
        anchorNodeAndOffset.node, anchorNodeAndOffset.offset,
        focusNodeAndOffset.node, focusNodeAndOffset.offset,
        selection.direction));
  }

  /**
   * @this {!SelectionTracker}
   */
  function finishWithStartAsAnchor() {
    var startNodeAndOffset = this.start_.convertToNodeAndOffset();
    var endNodeAndOffset = this.end_.convertToNodeAndOffset();
    this.context_.setEndingSelection(new editing.ImmutableSelection(
        startNodeAndOffset.node, startNodeAndOffset.offset,
        endNodeAndOffset.node, endNodeAndOffset.offset,
        editing.SelectionDirection.ANCHOR_IS_START));
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

  SelectionTracker.prototype = /** @struct */ {
    constructor: SelectionTracker,
    finish: finish,
    finishWithStartAsAnchor: finishWithStartAsAnchor,
    willRemoveNode: willRemoveNode,
    willUnwrapElement: willUnwrapElement
  };
  Object.freeze(SelectionTracker.prototype);

  return SelectionTracker;
})();
