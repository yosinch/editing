// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * @typedef {{
 *   name: string,
 *   testFunction: !function()
 * }}
 */
var TestCase;

/**
 * @constructor
 * @final
 */
function TestRunner() {
  this.allTestCases_ = [];
  this.results_ = [];
  this.sectionName_ = '';
  this.testCaseMap_ = {};
  this.useTryCatch_ = true;
  Object.seal(this);
}

/** @type {!Array.<!TestCase>} */
TestRunner.prototype.allTestCases_;

/** @type {!function((string|!function()), !Object=)} */
TestRunner.prototype.fail = function(message, opt_options) {};

/** @type {!Object.<string, !TestCase>} */
TestRunner.prototype.testCaseMap_;

Object.defineProperties(TestRunner.prototype, (function() {

  /**
   * @param {!TestRunner} testRunner
   * @param {string} testName
   * @return {?HTMLElement}
   */
  function addSectionIfNeeded(testRunner, testName) {
    var dotIndex = testName.indexOf('.');
    var sectionName = dotIndex > 0 ? testName.substr(0, dotIndex) : testName;
    if (testRunner.sectionName_ == sectionName) {
      var ol = document.getElementById(sectionName).nextSibling
                    .querySelector('ol');
      return /** @type {?HTMLElement} */(ol);
    }

    testRunner.sectionName_ = sectionName;
    var present = document.getElementById(sectionName);
    if (present)
      present.outerHTML = '';

    var heading = document.createElement('h3');
    heading.setAttribute('id', sectionName);
    heading.textContent = sectionName;
    document.body.appendChild(heading);

    var div = document.createElement('div');
    document.body.appendChild(div);

    var ol = document.createElement('ol');
    ol.classList.add('log');
    div.appendChild(ol);
    return /** @type {?HTMLElement} */(ol);
  }

  /**
   * @param {!function()|string} closure
   * @return {string}
   *
   * Note: Firefox inserts "use strict" and inserts spaces.
   */
  function toPrettyString(closure){
    var text = closure.toString()
        .replace('"use strict";', '')  // Firefox add "use strict".
        .replace(/function\s*\(\)\s*\{\s*return\s*/, '')
        .replace(/;\s*}/g, '');
    return text;
  }

  /**
   * @this {!TestRunner}
   * @param {string} name
   * @param {!function()} testFunction
   */
  function addTest(name, testFunction) {
    if (name in this.testCaseMap_)
      throw new Error('Test ' + name + ' is already registered.');
    var testCase = {name: name, testFunction: testFunction};
    this.allTestCases_.push(testCase);
    this.testCaseMap_[name] = testCase;
  }

  /**
   * @this {!TestRunner}
   * @param {string|!function()} message
   * @param {!Object=} opt_result
   */
  function fail(message, opt_result) {
    var result = mergeResult(
        {className: 'fail', message: toPrettyString(message)}, opt_result);
    if (result.exception)
      result.className = 'exception';
    this.results_.push(mergeResult(result, opt_result));
  }

  /**
   * @this {!TestRunner}
   * @return {!Array.<string>}
   */
  function getSectionNames() {
    var sectionNames = new Set();
    var list = [];
    this.allTestCases_.forEach(function(testCase) {
      var name = testCase.name;
      var sectionName = name.substr(0, name.indexOf('.'));
      if (sectionNames.has(sectionName))
        return;
      list.push(sectionName);
      sectionNames.add(sectionName);
    });
    return list.sort();
  }

  /**
   * @param {!Object} result
   * @param {?Object|undefined} moreResult
   */
  function mergeResult(result, moreResult){
    if (!moreResult)
      return result;
    Object.keys(moreResult).forEach(function(name) {
      var key = name == 'current' ? testing.browserId : name;
      result[key] = moreResult[name];
    });
    return result;
  }

  /**
   * @this {!TestRunner}
   * @param {string|!function()} message
   * @param {!Object=} opt_result
   */
  function pass(message, opt_result) {
    var result = {className: 'pass', message: toPrettyString(message)};
    this.results_.push(mergeResult(result, opt_result));
  }

  /**
   * @this {!TestRunner}
   * @param {string} reason
   * @param {!Object=} opt_result
   */
  function skip(reason, opt_result) {
    var result = {className: 'skip', reason: reason};
    this.results_.push(mergeResult(result, opt_result));
  }

  /**
   * @this {!TestRunner}
   * @param {string} className
   * @param {!Object=} opt_result
   */
  function record(className, opt_result) {
    var result = {className: className, message: className};
    this.results_.push(mergeResult(result, opt_result));
  }

  /**
   * @this {!TestRunner}
   * @param {string=} opt_sectionNameToRun
   */
  function runAllTests(opt_sectionNameToRun) {
    /** @const */
    var CLASS_ORDERS = {
      exception: 1,
      fail: 2,
      warn: 3,
      incompatible_html: 4,
      incompatible_selection: 5,
      incompatible_return: 6,
      pass: 100,
    };

    /** @const */
    var KEY_NAME_OREDERS = {
      actual: '3',
      before: '1',
      expected: '2'
    };

    /** @const Key names aren't displayed in test results */
    var SKIP_KEY_NAMES = {
      className: 1,
      format: 1,
      message: 1
    };

    function compareKeys(key1, key2) {
      key1 = KEY_NAME_OREDERS[key1] + key1;
      key2 = KEY_NAME_OREDERS[key2] + key2;
      return key1.localeCompare(key2);
    }

    function orderOfClass(className) {
      return CLASS_ORDERS[className] || 9999;
    }

    // To report number of test cases in progress report, we populate
    // |testCasesByClass| here.
    var testCasesByClass = {};
    function classifyTestCase(testCase, className) {
      var testCases = testCasesByClass[className];
      if (!testCases) {
        testCases = new Set();
        testCasesByClass[className] = testCases;
      }
      testCases.add(testCase);
    }

    var runTests = [];

    /**
     * @this {!TestRunner}
     * @param {!TestCase} testCase
     */
    function runTestCase(testCase) {
      this.useTryCatch_ = true;
      runTests.push(testCase);
      this.results_ = [];
      try {
        testCase.testFunction();
      } catch (exception) {
        this.fail(testCase.testFunction, {exception: exception});
      }

      // Emit test case result.
      var olSection = addSectionIfNeeded(this, testCase.name);
      var liTestCase = document.createElement('li');
      liTestCase.setAttribute('id', testCase.name);
      liTestCase.textContent = testCase.name;
      olSection.appendChild(liTestCase);
      var ol = document.createElement('ol');
      liTestCase.appendChild(ol);

      // Parse test results
      var testCaseClass = 'pass';
      var overrideResult = testing.TEST_EXPECTATIONS[testCase.name] ||
          {expected: 'pass'};
      if (overrideResult.reason) {
        overrideResult.className = 'override';
        overrideResult.message = overrideResult.reason;
        delete overrideResult['reason'];
        this.results_.push(overrideResult);
      }
      this.results_.forEach(function(result) {
        var className = result.className;
        if (className == overrideResult.expected) {
          if (overrideResult.expected != 'pass')
            classifyTestCase(testCase, 'override');
          className = 'pass';
        }
        classifyTestCase(testCase, className);

        // Total result class
        if (orderOfClass(testCaseClass) > orderOfClass(className))
          testCaseClass = className;

        var li = document.createElement('li');
        ol.appendChild(li);
        var spanMessage = document.createElement('span');
        spanMessage.classList.add(className);
        spanMessage.textContent = result.message;
        li.appendChild(spanMessage);
        var ulResult = document.createElement('ul');
        ulResult.classList.add(className);
        li.appendChild(ulResult);

        Object.keys(result).filter(function(key) {
          return !(key in SKIP_KEY_NAMES);
        }).sort(compareKeys).forEach(function(key) {
          var li = document.createElement('li');
          li.classList.add(key);
          ulResult.appendChild(li);
          var value = result[key];
          var filler = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'
          if (result.format == 'html')
            li.innerHTML = (key + filler).substr(0, 10) + ' ' + value;
          else
            li.textContent = (key + filler).substr(0, 10) + ' ' + value;
        });
      });
      liTestCase.classList.add(testCaseClass);
    }

    var startAt = new Date();
    /**
     * @this {!TestRunner}
     */
    function finish() {
      var endAt = new Date();
      //document.getElementById('statusBar').outerHTML = '';

      var resultElement = document.getElementById('results');
      resultElement.innerHTML =
        'Run ' + runTests.length + ' tests' +
        ' in ' + Math.floor((endAt - startAt) * 1000) / 1000 + ' ms' +
        Object.keys(testCasesByClass).reduce(function(sink, key) {
          var count = testCasesByClass[key].size;
          return sink + ', <span class="' + key + '">' + count + ' ' + key +
                 '</span>';
        }, '');

      Object.keys(testCasesByClass).filter(function(key) {
        return key != 'pass';
      }).sort(function(key1, key2) {
        return orderOfClass(key1) - orderOfClass(key2);
      }).forEach(function(sectionName) {
        var testCases = testCasesByClass[sectionName];
        if (!testCases.size)
          return;
        var h3 = document.createElement('h3');
        h3.textContent = sectionName + ' (' + testCases.size + ')';
        resultElement.appendChild(h3);
        var p = document.createElement('p');
        resultElement.appendChild(p);
        /** @const */ var MAX_LINKS = 50;
        var count = 0;
        testCases.forEach(function(testCase) {
          ++count;
          if (count > MAX_LINKS)
            return;
          p.appendChild(document.createTextNode(' '));
          var a = document.createElement('a');
          a.href = '#' + testCase.name;
          a.textContent = testCase.name;
          p.appendChild(a);
          if (count == MAX_LINKS && testCases.size >= MAX_LINKS)
            p.appendChild(document.createTextNode(' AND MORE!'));
        });
      });
    }

    var allTestCases = opt_sectionNameToRun ?
        this.allTestCases_.filter(function(testCase) {
          var sectionName = /** @type {string} */(opt_sectionNameToRun);
          return testCase.name.startsWith(sectionName);
        }) : this.allTestCases_;
    var testRunner = this;
    var lastBeginFrameTimeStamp = 0;
    var waitingTestCases = allTestCases.slice();

    function didBeginFrame(timeStamp) {
      /** @const */ var NUM_RUN = 5;
      for (var count = 0; count < NUM_RUN; ++count) {
        var testCase = waitingTestCases.shift();
        if (!testCase) {
          finish.call(testRunner);
          return;
        }

        var numRun = runTests.length + 1;
        var percent = Math.floor((numRun / allTestCases.length) * 1000) / 10;
        var status= 'Run ' +
            numRun + '/' + allTestCases.length + '(' + percent + '%) tests.';
        document.getElementById('progress').style.width = percent + '%';

        ['exception', 'fail'].forEach(function(key) {
          var testCases = testCasesByClass[key];
          if (!testCases || !testCases.size)
            return;
          status += ' ' + testCasesByClass[key].size + ' ' + key + '.';
        });

        status += ' Elapsed: ' + ((new Date())- startAt) + 'ms';
        if (lastBeginFrameTimeStamp) {
          var durationUs = timeStamp - lastBeginFrameTimeStamp;
          status += ' latency=' + Math.floor(durationUs * 100) / 100 + 'ms';
        }
        document.getElementById('status').textContent = status;

        runTestCase.call(testRunner, testCase);
      }
      lastBeginFrameTimeStamp = timeStamp;
      window.requestAnimationFrame(didBeginFrame);
    }

    window.requestAnimationFrame(didBeginFrame);
  }

  /**
   * @this {!TestRunner}
   * @param {string|!function()} message
   * @param {!Object=} opt_result
   */
  function warn(message, opt_result) {
    var result = {className: 'warn', message: toPrettyString(message)};
    this.results_.push(mergeResult(result, opt_result));
  }

  return {
    addTest: {value: addTest},
    allTestCases_: {writable: true},
    constructor: TestRunner,
    fail: {value: fail},
    getSectionNames: {value: getSectionNames},
    pass: {value: pass},
    record: {value: record},
    results_: {writable: true},
    runAllTests: {value: runAllTests},
    runTests_: {writable: true},
    sectionName_: {writable: true},
    skip: {value: skip},
    testsCaseMap_: {writable: true},
    useTryCatch: {get: function() { return this.useTryCatch_; }},
    useTryCatch_: {writable: true},
    warn: {value: warn}
  }
})());

// Instead of |var testRunner = {}| to make closure compiler happy.
window['testRunner'] = new TestRunner();

/**
 * For running test case from console.
 */
function run(testName) {
  var testCase = testRunner.testCaseMap_[testName];
  if (!testCase) {
    console.log('No such test case', testName);
    return;
  }
  var PADDING = '          ';
  var IGNORE_KEYS = new Set(['className', 'format']);
  testRunner.results_ = [];
  testRunner.useTryCatch_ = false;
  testCase.testFunction();
  testRunner.results_.filter(function(result) {
    return result.className !== 'pass';
  }).forEach(function(result) {
    console.log(result.className);
    Object.keys(result).filter(function(key) {
      return !IGNORE_KEYS.has(key);
    }).forEach(function(key) {
      var value = result[key]
        .replace(/<span class="[^\u0022]+">/g, '')
        .replace(new RegExp('</span>', 'g'), '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      console.log(' ', (key + PADDING).substr(0, PADDING.length), value);
    });
  });
  return testRunner.results_;
}
