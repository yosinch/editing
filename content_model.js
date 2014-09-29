// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// See http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#content-models
editing.define('CONTENT_CATEGORY', {
  EMBEDDED: 'EMBEDDED',
  FLOW: 'FLOW',
  HEADING: 'HEADING',
  INTERACTIVE: 'INTERACTIVE',
  PALPABLE: 'PALPABLE',
  PHRASING: 'PHRASING',
  SECTIONING_ROOT: 'SECTIONING_ROOT',
  TRANSPARENT: 'TRANSPARENT',
});

editing.define('contentModel', (function() {
  'use strict';

  /**
   * @param {*} scalarOrArray
   * @return {!Array}
   */
  function toArray(scalarOrArray) {
    if (scalarOrArray === undefined)
      throw new Error('Unexpected undefined');
    if (Array.isArray(scalarOrArray))
      return /** @type {!Array} */(scalarOrArray);
     return [scalarOrArray];
  }

  /**
   * @param {!Array} members
   * @return {!Object}
   */
  function toSet(members) {
    var set = {};
    for (var member of members)
      set[member] = member;
    return set;
  }

  var contentModel = {};
  function defineContentModel(nameOrNames, categoryOrCategories,
                              usableContextIn, contextModelIn) {
    var names = nameOrNames.toUpperCase().split(' ');
    var categories = toSet(toArray(categoryOrCategories));
    var usableContexts = typeof(usableContextIn) == 'string' ?
        usableContextIn.split(' ') : toSet(toArray(usableContextIn));
    var contextModel = typeof(contextModelIn) == 'string' ?
        contextModelIn.split(' ') : toSet(contextModelIn);
    for (var name of names) {
      contentModel[name] = {
        canContainRangeEndPoint: true,
        categories: categories,
        usableContexts: usableContexts,
        contextModel: contextModel
      };
    }
  }

  /** @const */ var EMBEDDED = editing.CONTENT_CATEGORY.EMBEDDED;
  /** @const */ var FLOW = editing.CONTENT_CATEGORY.FLOW;
  /** @const */ var HEADING = editing.CONTENT_CATEGORY.HEADING;
  /** @const */ var INTERACTIVE = editing.CONTENT_CATEGORY.INTERACTIVE;
  /** @const */ var PALPABLE = editing.CONTENT_CATEGORY.PALPABLE;
  /** @const */ var PHRASING = editing.CONTENT_CATEGORY.PHRASING;
  /** @const */ var SECTIONING_ROOT = editing.CONTENT_CATEGORY.SECTIONING_ROOT;
  /** @const */ var TRANSPARENT = editing.CONTENT_CATEGORY.TRANSPARENT;

  // Text-level elements
  defineContentModel('a', [FLOW, PHRASING, PALPABLE, INTERACTIVE], PHRASING,
                     TRANSPARENT);
  defineContentModel('br wbr', [FLOW, PHRASING, PALPABLE], PHRASING, []);
  var NON_HTML5_PHRASING_TAGS = 'acronym big blink font kbd nobr strike tt';
  defineContentModel(
    'abbr b bdi bdo cite code data dfn em i ins kbd mark q ruby s samp small' +
    ' span strong sub sup time u var ' + NON_HTML5_PHRASING_TAGS,
    [FLOW, PHRASING, PALPABLE], PHRASING, PHRASING);

  // Forms
  defineContentModel('input', [FLOW, PHRASING], PHRASING, []);
  defineContentModel('button', [FLOW, PHRASING, PALPABLE], PHRASING, PHRASING);
  defineContentModel('select', [FLOW, PHRASING, PALPABLE], PHRASING,
                     'option optgroup');
  defineContentModel('datalist', [FLOW, PHRASING], PHRASING, PHRASING);
  defineContentModel('textarea', [FLOW, PHRASING, PALPABLE], PHRASING, '');
  defineContentModel('keygen', [FLOW, PHRASING, PALPABLE], PHRASING, []);
  defineContentModel('output', [FLOW, PHRASING, PALPABLE], PHRASING, PHRASING);
  defineContentModel('progress', [FLOW, PHRASING, PALPABLE], PHRASING, PHRASING);
  defineContentModel('meter', [FLOW, PHRASING, PALPABLE], PHRASING, PHRASING);
  defineContentModel('fieldset', [FLOW, PHRASING, PALPABLE], FLOW, PHRASING);

  // Grouping content
  defineContentModel('p', [FLOW, PALPABLE], FLOW, PHRASING);
  defineContentModel('blockquote div p', [FLOW, PALPABLE], FLOW, FLOW);

  // Palpable if it has at least one LI element.
  defineContentModel('ol ul', [FLOW, PALPABLE], FLOW, 'li');
  defineContentModel('li', [], 'ol ul menu', FLOW);

  // Embedded content
  defineContentModel('embed', [FLOW, PHRASING, EMBEDDED, PALPABLE], FLOW, []);
  defineContentModel('iframe', [FLOW, PHRASING, EMBEDDED, PALPABLE], FLOW, []);
  defineContentModel('img', [FLOW, PHRASING, EMBEDDED, PALPABLE], FLOW, []);

  // Sections
  defineContentModel('h1 h2 h3 h4 h5 h6', [FLOW, HEADING, PALPABLE],
                     ['hgroup', FLOW], PHRASING);

  // Tabular data
  defineContentModel('table', [FLOW, PALPABLE], FLOW,
                     'caption colgroup thead tfoot tbody');

  defineContentModel('caption', [], 'table', FLOW);
  defineContentModel('colgrop', [], 'table', FLOW);
  defineContentModel('col', [], 'colgrpup', FLOW);
  defineContentModel('tbody', [], 'table', 'tr');
  defineContentModel('thead', [], 'table', 'tr');
  defineContentModel('tr', [], 'thead tbody tfoot table', FLOW);
  defineContentModel('td th', [], 'tr', FLOW);

  // Taken from override functions of Node::canContainRangeEndPoint()
  var tagNames =
    'applet br button embed frame hr img input meter object output progress'
    .split(' ')
  tagNames.forEach(function(tagName) {
    var model = contentModel[tagName.toUpperCase()];
    if (!model)
      return;
    model.canContainRangeEndPoint = false;
  });

  return contentModel;
})());
