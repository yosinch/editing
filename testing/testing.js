// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Instead of |var testing = {}| to make closure compiler happy.
window['testing']= {};

(function() {
  /**
   * @return {string}
   */
  /** @const @type {string} */ var browserId = (function() {
      var userAgent = window.navigator.userAgent;
      if (userAgent.indexOf('Chrome') > 0)
        return 'chrome';
      if (userAgent.indexOf('Trident') > 0)
        return 'ie';
      if (userAgent.indexOf('Firefox') > 0)
        return 'firefox';
      return 'unknown';
  })();

  /**
   * @param {string} name
   * @param {*} value
   */
  function define(name, value) {
    Object.defineProperty(testing, name, {value: value});
  }

  Object.defineProperties(testing, {
    browserId: {get: function() { return browserId; }},
    define: {value: define},
  });
})();

/// TODO(yosin) We should add more end tag omissible tag names.
testing.define('END_TAG_OMISSIBLE', (function() {
  var omissibleTagNames = new Set();
  ['br', 'hr', 'img', 'wbr'].forEach(function(tagName) {
    omissibleTagNames.add(tagName.toUpperCase());
    omissibleTagNames.add(tagName);
  });
  return omissibleTagNames;
})());

function NOTREACHED() {
  throw new Error('NOTREACHED');
}
