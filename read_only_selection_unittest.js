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
