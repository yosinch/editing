// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To avoid "redefinition error" from closure compiler, we use bracket for
// initializing |SelectionDirection|.
editing['SelectionDirection'] = {
  ANCHOR_IS_START: 'ANCHOR_IS_START',
  FOCUS_IS_START: 'FOCUS_IS_START'
};

editing.ImmutableSelection = (function() {
  'use strict';

  /**
   * @constructor
   * @final
   * @struct
   * @param {Node} anchorNode
   * @param {number} anchorOffset
   * @param {Node} focusNode
   * @param {number} focusOffset
   * @param {editing.SelectionDirection} direction
   */
  function ImmutableSelection(anchorNode, anchorOffset, focusNode, focusOffset,
                              direction) {
    /** @private @type {Node} */
    this.anchorNode_ = anchorNode;
    /** @private @type {number} */
    this.anchorOffset_ = anchorOffset;
    /** @private @type {editing.SelectionDirection} */
    this.direction_ = direction;
    /** @private @type {Node} */
    this.focusNode_ = focusNode;
    /** @private @type {number} */
    this.focusOffset_ = focusOffset;
    Object.freeze(this);
  }

  // Forward declaration for closure compiler
  ImmutableSelection.prototype = /** @struct */ {
    /** @type {!Node} */
    get anchorNode() {},

    /** @type {number} */
    get anchorOffset() {},

    /** @type {!Node} */
    get focusNode() {},

    /** @type {number} */
    get focusOffset() {},

    /** @type {boolean} */
    get isCaret() {},

    /** @type {boolean} */
    get isEmpty() {}
  };

  /**
   * @this {!ImmutableSelection}
   * @return {!Node}
   */
  function endContainer() {
    if (!this.anchorNode_ || !this.focusNode_)
      throw new Error('Empty selection');
    return this.direction_ == editing.SelectionDirection.FOCUS_IS_START ?
        this.anchorNode_ : this.focusNode_;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {number}
   */
  function endOffset() {
    if (!this.anchorNode_ || !this.focusNode_)
      throw new Error('Empty selection');
    return this.direction_ == editing.SelectionDirection.FOCUS_IS_START ?
        this.anchorOffset_ : this.focusOffset_;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {boolean}
   */
  function isCaret() {
    if (this.isEmpty)
      return false;
    return this.anchorNode_ === this.focusNode_ &&
           this.anchorOffset_ == this.focusOffset_;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {boolean}
   */
  function isEditable() {
    if (!this.anchorNode_)
      return false;
    if (editing.dom.isElement(this.anchorNode_))
      return this.anchorNode_.isContentEditable;
    var parentNode = this.anchorNode_.parentNode;
    if (!parentNode)
      return false;
    return parentNode.isContentEditable;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {boolean}
   */
  function isEmpty() {
    return !this.anchorNode_;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {boolean}
   */
  function isNormalized() {
    if (!this.anchorNode_ || !this.focusNode_)
      return false;
    return !editing.dom.isText(this.anchorNode_) &&
           !editing.dom.isText(this.focusNode_);
  }

  /**
   * @this {!ImmutableSelection}
   * @return {boolean}
   */
  function isRange() {
    return !this.isEmpty && !this.isCaret;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {!Node}
   */
  function startContainer() {
    if (!this.anchorNode_ || !this.focusNode_)
      throw new Error('Empty selection');
    return this.direction_ == editing.SelectionDirection.ANCHOR_IS_START ?
        this.anchorNode_ : this.focusNode_;
  }

  /**
   * @this {!ImmutableSelection}
   * @return {number}
   */
  function startOffset() {
    console.assert(this.anchorNode_);
    return this.direction_ == editing.SelectionDirection.ANCHOR_IS_START ?
        this.anchorOffset_ : this.focusOffset_;
  }

  ImmutableSelection.prototype = /** @struct */ {
    get anchorNode() { return this.anchorNode_; },
    get anchorOffset() { return this.anchorOffset_; },
    get direction() { return this.direction_; },
    get endContainer() { return endContainer.call(this); },
    get endOffset() { return endOffset.call(this); },
    get focusNode() { return this.focusNode_; },
    get focusOffset() { return this.focusOffset_; },
    get isCaret() { return isCaret.call(this); },
    get isEditable() { return isEditable.call(this); },
    get isEmpty() { return isEmpty.call(this); },
    get isNormalized() { return isNormalized.call(this); },
    get isRange() { return isRange.call(this); },
    get startContainer() { return startContainer.call(this); },
    get startOffset() { return startOffset.call(this); },
  };
  Object.freeze(ImmutableSelection.prototype);

  /** @const @type {!ImmutableSelection} */
  ImmutableSelection.EMPTY_SELECTION = new ImmutableSelection(
    null, 0, null, 0, editing.SelectionDirection.ANCHOR_IS_START);

  return ImmutableSelection;
})();
