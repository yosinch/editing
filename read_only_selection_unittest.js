// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//
// ReadOnlySelection.direction
//
testCaseWithSample('ReadOnlySelection.directionAnchorIsStart',
  '<p contenteditable>^abcd|</p>', function(context, selection) {
  expectEq(editing.SelectionDirection.ANCHOR_IS_START, function() {
    return selection.direction; });
});

testCaseWithSample('ReadOnlySelection.directionFocusIsStart',
  '<p contenteditable>|abcd^</p>', function(context, selection) {
  expectEq(editing.SelectionDirection.FOCUS_IS_START, function() {
    return selection.direction; });
});

///
// isEditable
//
testCaseWithSample('ReadOnlySelection.isEditable.1',
  '<p contenteditable>|abcd</p>', function(context, selection) {
  expectTrue(function() { return selection.isEditable; });
});

testCaseWithSample('ReadOnlySelection.isEditable.2',
  '<p contenteditable>|abcd^</p>', function(context, selection) {
  expectTrue(function() { return selection.isEditable; });
});

testCaseWithSample('ReadOnlySelection.isEditable.3',
  '|abcd', function(context, selection) {
  expectFalse(function() { return selection.isEditable; });
});

testCaseWithSample('ReadOnlySelection.isEditable.4',
  '^abcd|', function(context, selection) {
  expectFalse(function() { return selection.isEditable; });
});

//
// isNormalized
//
testCaseWithSample('ReadOnlySelection.isNormalized.caret.1',
  '<p contenteditable>|abcd</p>', function(context, selection) {
  expectFalse(function() { return selection.isNormalized; });
  var selection2 = context.normalizeSelection(selection);
  expectTrue(function() { return selection2.isNormalized; });
});

testCaseWithSample('ReadOnlySelection.isNormalized.caret.2',
  '<p contenteditable>ab|cd</p>', function(context, selection) {
  expectFalse(function() { return selection.isNormalized; });
  var selection2 = context.normalizeSelection(selection);
  expectTrue(function() { return selection2.isNormalized; });
});

testCaseWithSample('ReadOnlySelection.isNormalized.caret.3',
  '<p contenteditable>abcd|</p>', function(context, selection) {
  expectFalse(function() { return selection.isNormalized; });
  var selection2 = context.normalizeSelection(selection);
  expectTrue(function() { return selection2.isNormalized; });
});

testCaseWithSample('ReadOnlySelection.isNormalized.range.1',
  '<p contenteditable>|abcd^</p>', function(context, selection) {
  expectFalse(function() { return selection.isNormalized; });
  var selection2 = context.normalizeSelection(selection);
  expectTrue(function() { return selection2.isNormalized; });
});

testCaseWithSample('ReadOnlySelection.isNormalized.range.2',
  '<p contenteditable>ab|cd^</p>', function(context, selection) {
  expectFalse(function() { return selection.isNormalized; });
  var selection2 = context.normalizeSelection(selection);
  expectTrue(function() { return selection2.isNormalized; });
});
