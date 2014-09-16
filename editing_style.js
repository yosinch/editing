// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.define('EditingStyle', (function() {
  /** @const */ var CSS_PROPRTY_DATA = {
    'font-style': {
      priority: 2,
      tagNames: {'italic': 'i'}
    },
    'font-weight': {
      priority: 1,
      tagNames: {'bold': 'b'},
    },
    'text-decoration': {
      priority: 3,
      tagNames: {
        'line-through': 's',
        'underline': 'u'
      }
    }
  };
  Object.keys(CSS_PROPRTY_DATA).forEach(function(propertyName) {
    CSS_PROPRTY_DATA[propertyName].propertyName = propertyName;
  });

  /** @const */ var TAG_NAME_DATA = {
    'b': {
      propertyName: 'font-weight',
      propertyValue: 'bold'
    },
    'em': {
      propertyName: 'font-style',
      propertyValue: 'italic'
    },
    'i': {
      propertyName: 'font-style',
      propertyValue: 'italic'
    },
    's': {
      propertyName: 'text-decoration',
      propertyValue: 'line-through'
    },
    'strike': {
      propertyName: 'text-decoration',
      propertyValue: 'line-through'
    },
    'strong': {
      propertyName: 'font-weight',
      propertyValue: 'bold'
    },
    'u': {
      propertyName: 'text-decoration',
      propertyValue: 'underline'
    },
  };

  /**
   * @constructor
   * @final
   * @param {!Element}
   */
  function EditingStyle(element) {
    this.domStyle_ = element.style;
    Object.seal(this);
  }

  /**
   * @param {{name: string, value: string}} property
   * @return {?Element}
   */
  EditingStyle.createElement = function(context, property) {
    var data = CSS_PROPRTY_DATA[property.name];
    if (!data)
      return null;
    var tagName = data.tagNames[property.value];
    if (!tagName)
      return null;
    return context.createElement(tagName);
  };

  /**
   * @param {string} propertyName
   * @return {boolean}
   */
  function isKnownProperty(propertyName) {
    return propertyName in CSS_PROPRTY_DATA;
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
      return CSS_PROPRTY_DATA[propertyName];
    }).filter(function(data) {
      return data;
    }).sort(function(data1, data2) {
      return data2.priority - data1.priority;
    }).map(function(data) {
      var propertyValue = domStyle[data.propertyName];
      if (!(propertyValue in data.tagNames))
        return undefined;
      return {name: data.propertyName, value: propertyValue}
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
