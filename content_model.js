// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.contentModel = (function() {
  'use strict';
  // Note: We don't have following information in Blink C++ code base.
  // We should update them by referencing WAHTWG HTML5 specification[1].
  // [1] http://www.whatwg.org/specs/web-apps/current-work/multipage/dom.html#content-models

  // Taken from override functions of Node::canContainRangeEndPoint()
  var canNotContainRangeEndPointTagNames = new Set(
    'APPLET BR BUTTON EMBED FRAME HR IMG INPUT METER OBJECT OUTPUT PROGRESS'
    .split(' '));

  var interactiveTagNames = new Set(
    'A AUDIO BUTTON DETAILS INPUT TEXTAREA VIDEO'.split(' '));

  var nonPhrasingTagNames = new Set(
    ('HTML HEAD TITLE BASE LINK META STYLE' +
     ' FRAME FRAMESET' +
     // Grouping
     ' P HR PRE BLOCKQUOTE OL UL LI DL DT DD FIGURE MAIN DIV' +
     // Sections
     ' BODY ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HGROUP' +
     ' HEADER FOOTER ADDRESS' +
     // Embedded content
     ' PARAM SOURCE TRACK' +
     // Tabular data
     ' TABLE CAPTION COLGROUP COL TBODY TEHAD TFOOT TR TD TH' +
     // Forms
     ' FORM OPTION OPTGROUP FIELDSET LEGEND' +
     // Interactive elements
     ' DETAILS SUMMARY MENU MENUITEM DIALOG' +
     // Scripting
     ' SCRIPT NOSCRIPT TEMPLATE CANVAS')
    .split(' '));

  /**
   * @param {string} tagName
   * @return {boolean}
   */
  function canContainRangeEndPoint(tagName) {
    return !canNotContainRangeEndPointTagNames.has(tagName);
  }

  /**
   * @param {string} tagName
   * @return {boolean}
   */
  function isInteractive(tagName) {
    return interactiveTagNames.has(tagName);
  }

  /**
   * @param {string} tagName
   * @return {boolean}
   */
  function isPhrasing(tagName) {
    return !nonPhrasingTagNames.has(tagName);
  }

  return {
    canContainRangeEndPoint: canContainRangeEndPoint,
    isInteractive: isInteractive,
    isPhrasing: isPhrasing
  };
})();
