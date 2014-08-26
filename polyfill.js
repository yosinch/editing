// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// IE11 incompatibilities:
// - document.implementation.createHTMLDocument(opt_title), opt_title is
//   required parameter.
// - Selection.extend(node, offset) is missing.
// - |window.getComputedStyle| throws an exception for Node.TEXT_NODE, Chrome
//   returns null.
// - IE11 puts ";" for end of "style" attribute.
// - IE11 Map supports only: clear, delete, forEach, get, has, set, size.
// - IE11 Set supports only: add, clear, delete, frEach, has, size.

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
      }
      return undefined;
    }
  });
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return i;
          }
        }
      }
      return -1;
    }
  });
}

if (!Math.sign) {
  Math.sign = function(x) {
    if (isNaN(x))
      return NaN;
    if (x === 0)
      return x;
    return x > 0 ? 1 : -1;
  }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(text) {
    return !this.indexOf(text);
  }
}

if (!('Set' in this)) {
  this.Set = (function() {
    // Support string only
    function Set(iterable) {
      this.members_ = {};
      if (Array.isArray(iterable)) {
        iterable.forEach(function(member) {
          this.members_[member] = true;
        }, this);
      }
    }

    function setAdd(newMember) {
      this.members_[newMember] = true;
    }

    function setHas(member) {
      return Boolean(this.members_[member]);
    }

    function setSize() {
      return Object.keys(this.members_).length;
    }
    Object.defineProperties(Set.prototype, {
      add: {value: setAdd},
      has: {value: setHas},
      size: {get: setSize}
    });
    return Set;
  })();
}
