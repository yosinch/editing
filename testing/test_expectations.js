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

    // remove format
    'removeFormat.nested_div_style': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.88': {expected: 'fail', reason: 'issue #24'},
    'removeFormat.w3c.88r': {expected: 'fail', reason: 'issue #24'},
    'removeFormat.w3c.121': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.121r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.134': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.134r': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.135': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.135r': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.136': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.136r': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.137': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.137r': {expected: 'fail', reason: 'issue #25'},
    'removeFormat.w3c.140': {expected: 'fail', reason: 'issue #26'},
    'removeFormat.w3c.140r': {expected: 'fail', reason: 'issue #26'},
    'removeFormat.w3c.142': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.142r': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143r': {expected: 'fail', reason: 'issue #21'},

    // unlink command
    'unlink.contents.partial.anchor.focus': {expected: 'fail',
                                             reason: 'issue #8'},
    'unlink.contents.nodes.partial.anchor.focus': {expected: 'fail',
                                                   reason: 'issue #8'},
    'unlink.contents.nodes.partial.focus.anchor': {expected: 'fail',
                                                   reason: 'issue #8'}
  };
})());

