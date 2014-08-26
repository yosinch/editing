// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testCaseFor('undo', 'createLinke.1', {
  before: '<p contenteditable>^abcd|</p>',
  after:'<p contenteditable><a href="URL">^abcd|</a></p>',
  value: 'URL'
});

testCaseFor('undo', 'unlink.1', {
  before:'<p contenteditable><a href="URL">^abcd|</a></p>',
  after: '<p contenteditable>^abcd|</p>',
});
