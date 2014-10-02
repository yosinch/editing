// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * @param {*} expectedResult
 * @param {!function()} testFunction
 * @param {string=} opt_message
 */
function expectEq(expectedResult, testFunction, opt_message) {
  function equal(expectedResult, actualResult) {
    if (typeof(expectedResult) != typeof(actualResult))
      return false;
    if (typeof(expectedResult) == 'object')
      return expectedResult === actualResult;
    return expectedResult == actualResult;
  }

  var message = opt_message || testFunction;

  var actualResult;
  if (testRunner.useTryCatch) {
    try {
      actualResult = testFunction();
    } catch (exception) {
      testRunner.fail(message, {exception: exception});
      return;
    }
  } else {
    actualResult = testFunction();
  }

  if (equal(expectedResult, actualResult)) {
    testRunner.pass(message);
    return;
  }
  testRunner.fail(message, {
    actual: actualResult,
    expected: expectedResult,
  });
}

function expectFalse(testFunction) {
  expectEq(false, testFunction);
}

function expectNull(testFunction) {
  expectEq(null, testFunction);
}

function expectTrue(testFunction) {
  expectEq(true, testFunction);
}

function expectUndefined(testFunction) {
  expectEq(undefined, testFunction);
}

function testCase(name, testFunction) {
  testRunner.addTest(name, testFunction);
}

function testCaseWithSample(name, htmlText, testFunction) {
  testCase(name, function() {
    var sample = new testing.Sample(htmlText || '^foo|');
    var editor = editing.Editor.getOrCreate(sample.document);
    var context = editor.createContext('noname', sample.startingSelection);
    if (!(context.startingSelection instanceof editing.ImmutableSelection))
      throw new Error('No startingSelection');
    if (testRunner.useTryCatch) {
      try {
        testFunction(context, context.startingSelection);
      } finally {
        sample.finish();
      }
    } else {
      testFunction(context, context.startingSelection);
      sample.finish();
    }
  });
}

function testCaseFor(testCaseName, data) {
  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
  }

  function pretty(text) {
    var anchorIndex = text.indexOf('^');
    var focusIndex = text.indexOf('|');
    var escaped = escapeHtml(text);
    if (focusIndex < 0)
      return escaped;
    if (anchorIndex < 0)
      return escaped.replace('|', '<span class="selectionCaret">|</span>');
    if (anchorIndex < focusIndex) {
      return escaped.replace('^', '<span class="selectionRange">^')
        .replace('|', '</span><span class="selectionFocus">|</span>');
    }
    return escaped.replace('|', '<span class="selectionRange">' +
                                '<span class="selectionFocus">|</span>')
        .replace('^', '^</span>');
  }

  function setFocus(document) {
    var selection = document.getSelection();
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
      var domSelection = editor.document.getSelection();
      if (domSelection.anchorNode) {
        var element = domSelection.anchorNode;
        if (element.nodeType !== Node.ELEMENT_NODE)
          element = element.parentNode;
        element.focus();
      }
  }

  function stripMarker(text) {
    return text.replace('^', '').replace('|', '');
  }

  var commandName = testCaseName.substring(0, testCaseName.indexOf('.'));
  console.assert(commandName !== '', 'Test case name should start with' +
                 ' commandName + ".".');
  console.assert(typeof(data['after']) === 'string',
                 'Test data for ' + testCaseName + ', after must be string: ' +
                  data['after']);
  console.assert(data['after'].indexOf('|') >= 0,
                 'Test data for ' + testCaseName + ' after must have "|": ' +
                 data['after']);
  console.assert(typeof(data['before']) === 'string',
                 'Test data for ' + testCaseName + ', before must be string: ' +
                  data['before']);
  console.assert(data['before'].indexOf('|') >= 0,
                 'Test data for ' + testCaseName + ' before must have "|": ' +
                 data['before']);

  testCase(testCaseName, function() {
    var sample = new testing.Sample(data.before);
    var sample2 = new testing.Sample(data.before);
    sample.document.execCommand('styleWithCSS', false,
                                Boolean(data['styleWithCSS']));
    sample2.document.execCommand('styleWithCSS', false,
                                 Boolean(data['styleWithCSS']));
    try {
      var editor = editing.Editor.getOrCreate(sample.document);
      editor.setDomSelection(sample.startingSelection);
      sample.setFocus();

      // Execute command and check return value
      var expectedReturnValue = data.returnValue === undefined ?
          true : data.returnValue;
      var actualReturnValue = editor.execCommand(commandName,
                                                 Boolean(data['userInferface']),
                                                 data.value || '');
      if (expectedReturnValue == actualReturnValue) {
        testRunner.pass('execCommand return value');
      } else {
        testRunner.fail('execCommand return value', {
          actual: actualReturnValue,
          expected: expectedReturnValue,
        });
      }

      // Compare result HTML and selection
      var actualResult = testing.serializeNode(
          editor.document.body.firstChild,
          // TODO(yosin) Until http://crbug.com/346613 is fixed, we use
          // canonicalized selection rather than resulted selection.
          {selection: editor.getDomSelection()});
      var expectedResult = data['after'];
      if (stripMarker(expectedResult) == stripMarker(actualResult)) {
        testRunner.pass('Result HTML');
        if (expectedResult != actualResult) {
          testRunner.warn('Result Selection', {
              format: 'html',
              before: pretty(data.before),
              actual: pretty(actualResult),
              expected: pretty(expectedResult)
          });
        }
      } else {
        testRunner.fail('Result HTML', {
          format: 'html',
          before: pretty(data.before),
          actual: pretty(actualResult),
          expected: pretty(expectedResult)
        });
      }

      // Compare result with browser's result.
      var sampleResult;
      var actualResult2;
      var checkCompatiblity = function() {
        actualResult2 = testing.serializeNode(
          editor.document.body.firstChild, {
            // TODO(yosin) Until http://crbug.com/346613 is fixed, we use
            // canonicalized selection rather than resulted selection.
            selection: editor.getDomSelection(),
            visibleTextNode: false
        });

        var sampleReturnValue = sample2.execCommand(
            commandName, Boolean(data['userInferface']), data['value'] || '');
        if (actualReturnValue != sampleReturnValue) {
          testRunner.record('incompatible_return', {
              actual: actualReturnValue,
              current: sampleReturnValue
          });
        }

        sampleResult = testing.serializeNode(
          sample2.document.body.firstChild, {
            selection: sample2.endingSelection,
            visibleTextNode: false
        });
        if (sampleResult == actualResult2) {
          testRunner.record('compatible');
          testRunner.record('compatible_html');
          return;
        }
        if (stripMarker(sampleResult) == stripMarker(actualResult2)) {
          testRunner.record('compatible_html');
          testRunner.record('incompatible_selection', {
            format: 'html',
            before: pretty(data.before),
            current: pretty(sampleResult),
            new: pretty(actualResult2)
          });
          return;
        }
        testRunner.record('incompatible_html', {
            format: 'html',
            before: pretty(data.before),
            current: pretty(sampleResult),
            new: pretty(actualResult2)
        });
      }
      checkCompatiblity();

      if (data['undo'] === false)
        return;

      // Undo
      var checkUndo = function() {
        editor.execCommand('undo');
        var undoResult = testing.serializeNode(
            editor.document.body.firstChild,
            // TODO(yosin) Until http://crbug.com/346613 is fixed, we use
            // canonicalized selection rather than resulted selection.
            {selection: editor.getDomSelection()});
        sample2.execCommand('undo');
        var sampleUndoResult = testing.serializeNode(
            sample2.document.body.firstChild, {
            selection: sample2.endingSelection,
            visibleTextNode: false
        });
        if (undoResult == sampleUndoResult) {
          testRunner.pass('undo');
        } else if (stripMarker(undoResult) == stripMarker(sampleUndoResult)) {
          testRunner.warn('undo_selection', {
            format: 'html',
            before: pretty(data.before),
            current: pretty(sampleUndoResult),
            new: pretty(undoResult)
          });
          return;
        } else {
          testRunner.fail('undo', {
            format: 'html',
            before: pretty(actualResult),
            actual: pretty(undoResult),
            expected: pretty(data.before)
          });
        }
      };

      if (testRunner.useTryCatch) {
        try {
          checkUndo();
        } catch (exception) {
          testRunner.fail('undo', {exception: exception})
        }
      } else {
        checkUndo();
      }

      // Redo
      var checkRedo = function() {
        editor.execCommand('redo');
        var redoResult = testing.serializeNode(
            editor.document.body.firstChild,
            // TODO(yosin) Until http://crbug.com/346613 is fixed, we use
            // canonicalized selection rather than resulted selection.
            {selection: editor.getDomSelection()});
        if (redoResult == actualResult) {
          testRunner.pass('redo');
        } else if (stripMarker(redoResult) == stripMarker(actualResult)) {
          testRunner.warn('redo_selection', {
            format: 'html',
            before: pretty(data.before),
            actual: pretty(redoResult),
            expected: pretty(actualResult)
          });
        } else {
          testRunner.fail('redo', {
            format: 'html',
            before: pretty(data.before),
            actual: pretty(redoResult),
            expected: pretty(actualResult)
          });
        }
      };
      if (testRunner.useTryCatch) {
        try {
          checkRedo();
        } catch (exception) {
          testRunner.fail('redo', {exception: exception})
        }
      } else {
        checkRedo();
      }
    } finally {
      sample.finish();
      sample2.finish();
    }
  });
}
