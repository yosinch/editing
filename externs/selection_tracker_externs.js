// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @constructor
 * @final
 * @param {!editing.EditingContext} context
 * @param {!editing.ReadOnlySelection} selection
 */
editing.SelectionTracker = function(context, selection) {}

/** @type {!function()} */
editing.SelectionTracker.prototype.finish = function() {};

/** @type {!function()} */
editing.SelectionTracker.prototype.finishWithStartAsAnchor = function() {};

/** @type {!function(!Node)} */
editing.SelectionTracker.prototype.willRemoveNode = function(node) {};

/** @type {!function(!Element, ?Node)} */
editing.SelectionTracker.prototype.willUnwrapElement =
    function(element, child) {};
