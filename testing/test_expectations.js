// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

testing.define('TEST_EXPECTATIONS', (function() {
  var IE_BACKWARD_SELECTION = 'IE does not work well for backward selection.';
  var IE_IGNORES_A_ATTRS = 'IE compatibility.' +
      ' Replace A element even if it has "name" attribute';
  var W3C_SELECTION_IS_INCORRECT = 'W3C selection range is incorrect.';
  return {
    // createLink command
    'createLink.Caret.InteractiveAtFirst': {expected: 'fail',
                                            reason: 'issue #16'},
    'createLink.Caret.InteractiveAtLast': {expected: 'fail',
                                           reason: 'issue #16'},
    'createLink.Caret.InteractiveAtMiddle': {expected: 'fail',
                                             reason: 'issue #16'},
    'createLink.EndTag': {expected: 'fail', reason: 'issue #16'},
    'createLink.Range.42.1': {expected: 'fail', reason: 'issue #16'},
    'createLink.Range.42.2': {expected: 'fail', reason: 'issue #16'},
    'createLink.Range.42.3': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.42': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.42r': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.43': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.43r': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.44': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.44r': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.45': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.45r': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.47': {expected: 'fail', reason: 'issue #16'},
    'createLink.w3c.47r': {expected: 'fail', reason: 'issue #16'},
/*
    'createLink.w3c.23': {expected: 'warn', reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.23r': {expected: 'warn',
                          reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.35': {expected: 'warn', reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.35r': {expected: 'warn',
                           reason: W3C_SELECTION_IS_INCORRECT},
    'createLink.w3c.46': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.46r': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.47': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
    'createLink.w3c.47r': {expected: 'fail', reason: IE_IGNORES_A_ATTRS},
*/
    // remove format
    'removeFormat.w3c.88': {expected: 'fail', reason: 'issue #24'},
    'removeFormat.w3c.88r': {expected: 'fail', reason: 'issue #24'},
    'removeFormat.w3c.121': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.121r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.122r': {expected: 'fail', reason: 'issue #20'},
    'removeFormat.w3c.142': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.142r': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143': {expected: 'fail', reason: 'issue #21'},
    'removeFormat.w3c.143r': {expected: 'fail', reason: 'issue #21'},

    // unlink command
    'unlink.anchor.href.style': {expected: 'fail', reason: 'issue #10'},
    'unlink.contents.partial.anchor.focus': {expected: 'fail',
                                             reason: 'issue #8'},
    'unlink.contents.nodes.partial.anchor.focus': {expected: 'fail',
                                                   reason: 'issue #8'},
    'unlink.contents.nodes.partial.focus.anchor': {expected: 'fail',
                                                   reason: 'issue #8'}
  };
})());

