// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.CommandContext = (function() {
  'use strict';

  /** @const */ var isElement = editing.dom.isElement;


  /**
   * @param {!Element} element
   * @return {boolean}
   */
  function hasNoAttributeOrOnlyStyleAttribute(element) {
    var attributes = element.attributes;
    if (!attributes.length)
      return true;
    var matchedAttributes = 0;
    // TODO(yosin) We should remove 'Apple-style-span', once UMA counter
    // shows it isn't used.
    if (element.getAttribute('class') == 'Apple-style-span')
      ++matchedAttributes;
    if (element.getAttribute('style') === '')
      ++matchedAttributes;
    return attributes.length <= matchedAttributes;
  }

  /**
   * @param {Node} node
   * @return {boolean}
   */
  function isSpanWithoutAttributesOrUnstyledStyleSpan(node) {
    if (!node || node.nodeName !== 'SPAN')
      return false;
    var element = /** @type {!Element} */(node);
    return hasNoAttributeOrOnlyStyleAttribute(element);
  }

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
   * @this {!CommandContext}
   * @param {!Element} element
   */
  function expandInlineStyle(element) {
    var parentElement = /** @type {!Element} */(element.parentNode);
    console.assert(parentElement &&
                   parentElement.nodeType == Node.ELEMENT_NODE);
    /** @const */
    var commandContext = this;
    /** @const */
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
        /** @type {Element} */
        var lastElement = null;
        for (var child of Array.prototype.slice.call(element.childNodes)) {
          if (isElement(child)) {
            style.applyInheritedStyle(context, /** @type {!Element} */(child));
            lastElement = null;
            continue;
          }
          if (lastElement) {
            context.appendChild(/** @type {!Element} */(lastElement), child);
            continue;
          }
          if (editing.dom.isWhitespaceNode(child)) {
            // We don't need to wrap whitespaces with style element.
            // See createLink.style.7
            continue;
          }
          style.createElements(context,
              function(context, property, styledElement) {
                if (!lastElement)
                  context.replaceChild(element, styledElement, child);
                context.appendChild(styledElement, child);
                lastElement = styledElement;
              });
        }
        context.removeAttribute(element, 'style');
      }
      // Introduce text-level elements for inline style.
      style.createElements(context, function(context, property, styledElement) {
        context.moveAllChildren(styledElement, element);
        context.appendChild(element, styledElement);
        context.removeStyle(element, property.name);
      });

      if (!isSpanWithoutAttributesOrUnstyledStyleSpan(element))
        return;
      context.removeNodePreservingChildren(element);
    }

    if (context.shouldUseCSS) {
      expandInlineStyleWithCSS(context, element);
      return;
    }
    expandInlineStyleWithoutCSS(context, element);
  }

  CommandContext.hasNoAttributeOrOnlyStyleAttribute =
      hasNoAttributeOrOnlyStyleAttribute;

  CommandContext.isSpanWithoutAttributesOrUnstyledStyleSpan =
      isSpanWithoutAttributesOrUnstyledStyleSpan;

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
