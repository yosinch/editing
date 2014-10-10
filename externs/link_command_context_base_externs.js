// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @extends {editing.CommandContext}
 * @struct
 * @param {!editing.EditingContext} context
 * @param {boolean} userInterface
 * @param {string} commandValue
 */
editing.LinkCommandContextBase = function(context, userInterface,
                                          commandValue) {};

/**
 * @param {Node} node
 * @return {boolean}
 */
editing.LinkCommandContextBase.isAnchorElement = function(node) {};

/**
 * @param {!editing.ImmutableSelection} selection
 * @return {!editing.ImmutableSelection}
 */
editing.LinkCommandContextBase.prototype.normalizeSelectedStartNode =
    function(selection) {};

/** @param {!Element} element */
editing.LinkCommandContextBase.prototype.swapParentAndChild =
    function(element) {};

/** @param {!Element} element */
editing.LinkCommandContextBase.prototype.unwrapAnchorContents =
    function(element) {};
