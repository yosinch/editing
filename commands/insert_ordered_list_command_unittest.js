// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('insertOrderedList.crbug.412680', {
  before: '<div contenteditable>^foo<hr>bar|</div>',
  after: '<div contenteditable><ul><li>foo</li></ul><hr><ul><li>bar</li></ul></div>',
  sampleId: 'crbug/412680',
});
