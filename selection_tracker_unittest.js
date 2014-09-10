// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function expectOnContextResult(expectedResult, context) {
  expectEq(expectedResult, function() {
    return testing.serializeNode(context.document.body.firstChild,
                                 {selection: context.endingSelection});
  });
}

//
// SelectionTracker.finish
//
testCaseWithSample('SelectionTracker.finish.1',
  '<p contenteditable>^abcd|</p>', function(context, selection) {
  var tracker = new editing.SelectionTracker(context,
      context.normalizeSelection(selection));
  tracker.finish();
  expectOnContextResult('<p contenteditable>^abcd|</p>', context);
});

testCaseWithSample('SelectionTracker.finish.2',
  '<p contenteditable>|abcd^</p>', function(context, selection) {
  var tracker = new editing.SelectionTracker(context,
      context.normalizeSelection(selection));
  tracker.finish();
  expectOnContextResult('<p contenteditable>|abcd^</p>', context);
});

//
// SelectionTracker.finishWithStartAsAnchor
//
testCaseWithSample('SelectionTracker.finishWithStartAsAnchor.1',
  '<p contenteditable>^abcd|</p>', function(context, selection) {
  var tracker = new editing.SelectionTracker(context,
      context.normalizeSelection(selection));
  tracker.finishWithStartAsAnchor();
  expectOnContextResult('<p contenteditable>^abcd|</p>', context);
});

testCaseWithSample('SelectionTracker.finishWithStartAsAnchor.2',
  '<p contenteditable>|abcd^</p>', function(context, selection) {
  var tracker = new editing.SelectionTracker(context,
      context.normalizeSelection(selection));
  tracker.finishWithStartAsAnchor();
  expectOnContextResult('<p contenteditable>^abcd|</p>', context);
});
