// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.define('EditingStyle', (function() {
  /** @const */ var STYLE_DESCRIPTIONS = {
    'font-style': {
      propertyValue: 'italic',
      tagName: 'i'
    },
    'font-weight': {
      propertyValue: 'bold',
      tagName: 'b'
    }
  };

  /**
   * @constructor
   * @final
   * @param {!CSSStyleDeclaration} domStyle
   */
  function EditingStyle(domStyle) {
    this.domStyle_ = domStyle;
    Object.seal(this);
  }

  /**
   * @param {{name: string, value: string}} property
   * @return {string}
   */
  EditingStyle.computeTagName = function(property) {
    var description = STYLE_DESCRIPTIONS[property.name];
    if (!description)
      return '';
    return description.propertyValue === property.value ? description.tagName :
                                                         '';
  };

  /**
   * @param {string} propertyName
   * @return {boolean}
   */
  function isKnownProperty(propertyName) {
    return propertyName in STYLE_DESCRIPTIONS;
  };

  /**
   * @this {!EditingStyle}
   * @return {boolean}
   */
  function hasStyle() {
    return this.domStyle_.length >= 1;
  }

  /**
   * @this {!EditingStyle}
   * @return {!Array.<{name: string, value: string}>}
   */
  function properties() {
    var domStyle = this.domStyle_;
    return [].map.call(domStyle, function(propertyName) {
      var description = STYLE_DESCRIPTIONS[propertyName];
      if (!description)
        return undefined;
      var propertyValue = domStyle[propertyName];
      if (propertyValue !== description.propertyValue)
        return undefined;
      return {name: propertyName, value: propertyValue}
    }).filter(function(property) {
      return property;
    });
  }

  Object.defineProperties(EditingStyle.prototype, {
    constructor: {value: EditingStyle},
    hasStyle: {get: hasStyle},
    properties: {get: properties}
  });
  return EditingStyle;
})());
