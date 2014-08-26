// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/** @constructor @final */
function TestRunner() {}

/** @const @type {!TestRunner} */
var testRunner;

/** @type {!function(string, !function())} */
TestRunner.prototype.addTest;

/** @type {!function((string|!function()), !Object=)} */
TestRunner.prototype.fail = function(message, opt_options) {};

/** @type {!function() : !Array.<string>} */
TestRunner.prototype.getSectionNames;

/** @type {!function((string|!function()), !Object=)} */
TestRunner.prototype.record;

/** @type {!function((string|!function()), !Object=)} */
TestRunner.prototype.warn;

/** @type {!function((string|!function()), !Object=)} */
TestRunner.prototype.pass;
