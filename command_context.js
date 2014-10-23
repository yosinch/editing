// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.CommandContext = (function() {
  'use strict';

  /** @const */ var isElement = editing.dom.isElement;

  /**
   * @constructor
   * @struct
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   */
  function CommandContext(context, userInterface, commandValue) {
    /** @private  @type {!editing.EditingContext} */
    this.context_ = context;
    /** @private  @type {boolean} */
    this.userInterface_ = userInterface;
    /** @private  @type {string} */
    this.commandValue_ = commandValue;
  }

  /**
   * @param {!Element} element
   */
  // TODO(yosin) We should move |expandInlineStyle()| to library to share
  // with other commands.
  function expandInlineStyle(element) {
    var context = this.context;

    /**
     * @param {!editing.EditingContext} context
     * @param {!Element} element
     */
    function expandInlineStyleWithCSS(context, element) {
      var style = new editing.EditingStyle(element);
      if (!style.hasStyle)
        return;
      var styledElement = context.createElement('span');
      for (var property of style.properties) {
        context.setStyle(styledElement, property.name, property.value);
        context.removeStyle(element, property.name);
      }
      context.moveAllChildren(styledElement, element);
      context.appendChild(element, styledElement);
    }

    /**
     * @param {!editing.EditingContext} context
     * @param {!Element} element
     */
    function expandInlineStyleWithoutCSS(context, element) {
      var style = new editing.EditingStyle(element);
      if (!style.hasStyle)
        return;
      if (element.childElementCount) {
        // Apply inline style to text child element.
        var lastElement = null;
        // TODO(yosin) We should use |for-of| once closure-compiler #643 fixed.
        Array.prototype.forEach.call(element.childNodes, function(child) {
          if (isElement(child)) {
            style.applyInheritedStyle(context, /** @type {!Element} */(child));
            lastElement = null;
            return;
          }
          if (lastElement) {
            context.appendChild(lastElement, child);
            return;
          }
          if (editing.dom.isWhitespaceNode(child)) {
            // We don't need to wrap whitespaces with style element.
            // See createLink.style.7
            return;
          }
          style.createElements(context,
              function(context, property, styledElement) {
                if (!lastElement)
                  context.replaceChild(element, styledElement, child);
                context.appendChild(styledElement, child);
                lastElement = styledElement;
              });
        });
        context.removeAttribute(element, 'style');
        return;
      }
      // Introduce text-level elements for inline style.
      style.createElements(context, function(context, property, styledElement) {
        context.moveAllChildren(styledElement, element);
        context.appendChild(element, styledElement);
        context.removeStyle(element, property.name);
      });
    }

    if (context.shouldUseCSS) {
      expandInlineStyleWithCSS(context, element);
      return;
    }
    expandInlineStyleWithoutCSS(context, element);
  }

  CommandContext.prototype = /** @struct */ {
    get commandValue() { return this.commandValue_; },
    get context() { return this.context_; },
    get userInterface() { return this.userInterface_; },
    execute: function() { throw new Error('UNREACHABLE'); },
    expandInlineStyle: expandInlineStyle,
  };
  Object.freeze(CommandContext.prototype);

  return CommandContext;
})();
