// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Instead of |var testing = {}| to make closure compiler happy.
window['testing']= {};

(function() {
  'use strict';

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

// TODO(yosin) We should add more end tag omissible tag names.
testing.define('END_TAG_OMISSIBLE', (function() {
  'use strict';

  var omissibleTagNames = new Set();
  for (var tagName of ['br', 'hr', 'img', 'input', 'wbr']) {
    omissibleTagNames.add(tagName.toUpperCase());
    omissibleTagNames.add(tagName);
  }
  return omissibleTagNames;
})());

testing.define('serializeNode', (function() {
  'use strict';

  /**
   * @param {!Node} node
   * @param {Object=} opt_options
   *    selection: editing.ImmutableSelection
   *    visibleTextNode: boolean
   * @return {string}
   */
  function serializeNode(node, opt_options) {
    //console.assert(node instanceof Node);
    /** @const */ var options = arguments.length >= 2 ?
        /** @type {Object} */(opt_options) : {};
    /** @const */ var selection = options.selection || null;
    /** @const */ var visibleTextNode = Boolean(options['visibleTextNode']);

    function marker(node, offset) {
      if (!selection)
        return '';
      if (selection.focusNode === node && selection.focusOffset == offset)
        return '|';
      if (selection.anchorNode === node && selection.anchorOffset == offset)
        return '^';
      return '';
    }

    function orderByAttributeName(attrNode1, attrNode2) {
      return attrNode1.name.localeCompare(attrNode2.name);
    }

    function visit(node) {
      if (editing.dom.isText(node)) {
        var text = node.nodeValue;
        if (!selection)
          return text;
        if (selection.anchorNode === node && selection.focusNode === node) {
          var start = selection.startOffset;
          var end = selection.endOffset;
          var anchorIsStart = selection.anchorOffset < selection.focusOffset;
          var startMarker = anchorIsStart ? '^' : '|';
          var endMarker = anchorIsStart ? '|' : '^';
          if (start == end)
            return text.substr(0, start) + '|' + text.substr(start);
          return text.substr(0, start) + startMarker +
                 text.substring(start, end) + endMarker + text.substr(end);
        }
        if (selection.focusNode === node) {
          return text.substr(0, selection.focusOffset) + '|' +
                 text.substr(selection.focusOffset);
        }
        if (selection.anchorNode === node) {
          return text.substr(0, selection.anchorOffset) + '^' +
                 text.substr(selection.anchorOffset);
        }
        return text;
      }
      if (!editing.dom.isElement(node)) {
        // To support |Document| node, we iterate over child nodes.
        var sink = '';
        for (var child = node.firstChild; child; child = child.nextSibling) {
          sink += visit(child);
        }
        return sink.length ? sink : node.nodeValue;
      }
      var tagName = node.nodeName.toLowerCase();
      var sink = '<' + tagName;
      for (var attrNode of Array.prototype.slice.call(node.attributes)
           .sort(orderByAttributeName)) {
        var attrName = attrNode.name;
        var attrValue = attrNode.value;
        if (attrValue){
          // IE11 append ";" for end of CSS property list.
          if (attrName == 'style')
            attrValue = attrValue.replace(/;$/, '');
          attrValue = attrValue.replace(/&/g, '&amp;')
            .replace(/\u0022/g, '&quot;');
          sink += ' ' + attrName + '="' + attrValue + '"';
        } else {
          sink += ' ' + attrName;
        }
      }
      sink += '>';
      var child = node.firstChild;
      var offset = 0;
      while (child) {
        sink += marker(node, offset);
        sink += visit(child);
        var nextSibling = child.nextSibling;
        if (visibleTextNode && editing.dom.isText(child) && nextSibling &&
            editing.dom.isText(nextSibling)) {
            sink += '_';
        }
        child = nextSibling;
        ++offset;
      }
      sink += marker(node, offset);
      if (!testing.END_TAG_OMISSIBLE.has(tagName))
        sink += '</' + tagName + '>';
      return sink;
    };
    return visit(node);
  }

  return serializeNode;
})());
