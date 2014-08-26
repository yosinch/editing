// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//////////////////////////////////////////////////////////////////////
//
// ReadOnlySelection
//

/**
 * @constructor
 * @final
 * @param {?Node} anchorNode
 * @param {number} anchorOffset
 * @param {?Node} focusNode
 * @param {number} focusOffset
 * @param {!editing.SelectionDirection} direction
 */
editing.ReadOnlySelection = function(anchorNode, anchorOffset,
                                     focusNode, focusOffset, direction) {}

/** @type {!Node} */
editing.ReadOnlySelection.prototype.anchorNode;

/** @type {number} */
editing.ReadOnlySelection.prototype.anchorOffset;

/** @type {!editing.SelectionDirection} */
editing.ReadOnlySelection.prototype.direction;

/** @type {!Node} */
editing.ReadOnlySelection.prototype.endContainer;

/** @type {number} */
editing.ReadOnlySelection.prototype.endOffset;

/** @type {!Node} */
editing.ReadOnlySelection.prototype.focusNode;

/** @type {number} */
editing.ReadOnlySelection.prototype.focusOffset;

/** @type {boolean} */
editing.ReadOnlySelection.prototype.isCaret;

/** @type {boolean} */
editing.ReadOnlySelection.prototype.isEmpty;

/** @type {boolean} */
editing.ReadOnlySelection.prototype.isRange;

/** @type {!Node} */
editing.ReadOnlySelection.prototype.startContainer;

/** @type {number} */
editing.ReadOnlySelection.prototype.startOffset;
