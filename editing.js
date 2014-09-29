// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Instead of |var editing = {}| to make closure compiler happy.
window['editing']= {};

(function() {
  'use strict';

  /** @type {!Map.<string, !CommandFunction>} */
  var commandTable = new Map();

  /**
   * @param {string} name
   * @param {*} value
   */
  function define(name, value) {
    Object.defineProperty(editing, name, {value: value});
  }

  /**
   * @param {string} name
   * @param {!CommandFunction} commandFunction
   */
  function defineCommand(name, commandFunction) {
    var canonicalName = name.toLowerCase();
    commandTable.set(canonicalName, commandFunction);
    if (canonicalName == 'backcolor')
      defineCommand('hilitecolor', commandFunction);
  }

  // TODO(yosin) Once, Node.isContentEditable works for nodes without render
  // object, we dont' need to have |isContentEditablePollyfill|.
  // http://crbug.com/313082
  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isContentEditable(node) {
    if (window.document === node.ownerDocument &&
        node.style.display != 'none') {
      return node.isContentEditable;
    }
    if (node.isContentEditable)
      return true;
    if (node.nodeType != Node.ELEMENT_NODE)
      return false;
    var contentEditable = node.getAttribute('contenteditable');
    if (typeof(contentEditable) != 'string')
      return false;
    return contentEditable.toLowerCase() != 'false';
  }

  /**
   * @param {string} name
   * @return {CommandFunction}
   */
  function lookupCommand(name) {
    return commandTable.get(name.toLowerCase()) || null;
  }

  /**
   * @param {!Array.<string>} members
   * @return {!Set.<string>}
   * IE11 doesn't support |new Set(Array)|.
   */
  function newSet(members) {
    var set = new Set(members);
    if (!set.size) {
      for (var member of members)
        set.add(member);
    }
    return set;
  }

  Object.defineProperties(editing, {
    define: {value: define},
    defineCommand: {value: defineCommand},
    isContentEditable: {value: isContentEditable},
    lookupCommand: {value: lookupCommand},
    newSet: {value: newSet}
  });
})();
