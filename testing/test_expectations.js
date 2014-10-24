// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

testing.define('TEST_EXPECTATIONS', (function() {
  'use strict';

  return {
    // insert ordered list
    'insertOrderedList.w3c.26': {expected: 'fail', reason: 'issue #39'},
    'insertOrderedList.w3c.26r': {expected: 'fail', reason: 'issue #39'},
    'insertOrderedList.w3c.27': {expected: 'fail', reason: 'issue #39'},
    'insertOrderedList.w3c.27r': {expected: 'fail', reason: 'issue #39'},
    'insertOrderedList.w3c.78': {expected: 'fail', reason: 'issue #59'},
    'insertOrderedList.w3c.78r': {expected: 'fail', reason: 'issue #59'},

    // remove format
    'removeFormat.phrasing_grouping.1': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.phrasing_grouping.2': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.w3c.121': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.121r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.136': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.w3c.136r': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.w3c.137': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.w3c.137r': {expected: 'fail', reason: 'issue #76'},
    'removeFormat.w3c.140': {expected: 'fail', reason: 'issue #26'},
    'removeFormat.w3c.140r': {expected: 'fail', reason: 'issue #26'},
    'removeFormat.w3c.142': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.142r': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143r': {expected: 'fail', reason: 'issue #21'},
  };
})());

