// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//////////////////////////////////////////////////////////////////////
//
// ImmutableSelection
//

/**
 * @constructor
 * @final
 * @param {Node} anchorNode
 * @param {number} anchorOffset
 * @param {Node} focusNode
 * @param {number} focusOffset
 * @param {!editing.SelectionDirection} direction
 */
editing.ImmutableSelection = function(anchorNode, anchorOffset,
                                      focusNode, focusOffset, direction) {}


/** @const @type {!editing.ImmutableSelection} */
editing.ImmutableSelection.EMPTY_SELECTION;

/** @type {!Node} */
editing.ImmutableSelection.prototype.anchorNode;

/** @type {number} */
editing.ImmutableSelection.prototype.anchorOffset;

/** @type {!editing.SelectionDirection} */
editing.ImmutableSelection.prototype.direction;

/** @type {!Node} */
editing.ImmutableSelection.prototype.endContainer;

/** @type {number} */
editing.ImmutableSelection.prototype.endOffset;

/** @type {!Node} */
editing.ImmutableSelection.prototype.focusNode;

/** @type {number} */
editing.ImmutableSelection.prototype.focusOffset;

/** @type {boolean} */
editing.ImmutableSelection.prototype.isCaret;

/** @type {boolean} */
editing.ImmutableSelection.prototype.isEmpty;

/** @type {boolean} */
editing.ImmutableSelection.prototype.isNormalized;

/** @type {boolean} */
editing.ImmutableSelection.prototype.isRange;

/** @type {!Node} */
editing.ImmutableSelection.prototype.startContainer;

/** @type {number} */
editing.ImmutableSelection.prototype.startOffset;
