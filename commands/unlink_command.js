// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('Unlink', (function() {

  'use strict';

  /** @const */ var isElement = editing.dom.isElement;
  /** @const */ var isPhrasing = editing.dom.isPhrasing;

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  // TODO(yosin) We should move |expandInlineStyle()| to library to share
  // with other commands.
  function expandInlineStyle(context, element) {
    /**
     * @param {!editing.EditingContext} context
     * @param {!Element} element
     */
    function expandInlineStyleWithCSS(context, element) {
      var style = new editing.EditingStyle(element);
      if (!style.hasStyle)
        return;
      var styleElement = context.createElement('span');
      style.properties.forEach(function(property) {
        context.setStyle(styleElement, property.name, property.value);
        context.removeStyle(element, property.name);
      });
      context.moveAllChildren(styleElement, element);
      context.appendChild(element, styleElement);
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
        [].forEach.call(element.childNodes, function(child) {
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
              function(context, property, styleElement) {
                if (!lastElement)
                  context.replaceChild(element, styleElement, child);
                context.appendChild(styleElement, child);
                lastElement = styleElement;
              });
        });
        context.removeAttribute(element, 'style');
        return;
      }
      // Introduce text-level elements for inline style.
      style.createElements(context, function(context, property, styleElement) {
        context.moveAllChildren(styleElement, element);
        context.appendChild(element, styleElement);
        context.removeStyle(element, property.name);
      });
    }

    if (context.shouldUseCSS) {
      expandInlineStyleWithCSS(context, element);
      return;
    }
    expandInlineStyleWithoutCSS(context, element);
  }

  /**
   * @param {Node} node
   * @return {boolean}
   */
  function isAnchorElement(node) {
    return Boolean(node) && node.nodeName === 'A';
  }


  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isEffectiveNode(node) {
    return !isAnchorElement(node);
  }

  /**
   * @template T
   * @param {!Array.<T>} array
   * @return {T}
   */
  function lastOf(array) {
    return array.length ? array[array.length - 1] : null;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  function swapParentAndChild(context, element) {
    console.assert(element.firstChild &&
                   isElement(element.firstChild));
    var child = /** @type {!Element} */(element.firstChild);
    console.assert(child === element.lastChild);
    context.removeChild(element, child);
    context.moveAllChildren(element, child);
    context.insertBefore(element.parentNode, child, element);
    context.appendChild(child, element);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   */
  function unwrapAnchorContents(context, anchorElement) {
    /**
     * @param {!Node} node
     * @return {boolean}
     * Returns true if all child element is identical phrasing element.
     */
    function canUnwrapContents(node) {
      if (!isElement(node))
        return false;
      var element = /** @type {!Element} */(node);
      var firstChild = element.firstChild;
      if (!firstChild)
        return false;
      return [].every.call(element.childNodes, function(child) {
        return isElement(child) && isPhrasing(child) &&
               child.nodeName === firstChild.nodeName &&
               !!child.firstChild;
      });
    }

    while (canUnwrapContents(anchorElement))
      swapParentAndChild(context, anchorElement);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface Not used.
   * @param {string} value Not used.
   * @return {boolean}
   */
  function unlinkCommand(context, userInterface, value) {
    /** @const */ var selection = context.normalizeSelection(
        context.startingSelection);
    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = context.setUpEffectiveNodes(selection,
                                                     isEffectiveNode);
    if (!effectiveNodes[0])
      effectiveNodes.shift();
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    // We'll remove nested anchor elements event if nested anchor elements
    // aren't valid HTML5.
    /** @const @type {!Array.<!Element>} */
    var anchorElements = [];
    effectiveNodes.forEach(function(currentNode) {
      var lastAnchorElement = lastOf(anchorElements);
      if (lastAnchorElement &&
          lastAnchorElement === currentNode.previousSibling) {
        selectionTracker.willUnwrapElement(lastAnchorElement, null);
        context.unwrapElement(lastAnchorElement, null);
        anchorElements.pop();
      }

      if (!currentNode.hasChildNodes()) {
        if (isAnchorElement(currentNode)) {
          selectionTracker.willRemoveNode(currentNode);
          var parentNode = /** @type {!Node} */(currentNode.parentNode);
          context.removeChild(parentNode, currentNode);
        }
        return;
      }

      if (!isAnchorElement(currentNode))
        return;

      var anchorElement = /** @type {!Element} */(currentNode);
      unwrapAnchorContents(context, anchorElement);
      expandInlineStyle(context, anchorElement);
      anchorElements.push(anchorElement);
    });

    while (anchorElements.length) {
      var endNode = lastOf(effectiveNodes);
      var anchorElement = anchorElements.pop();
      var stopChild = endNode.parentNode == anchorElement ?
          endNode.nextSibling : null;
      selectionTracker.willUnwrapElement(anchorElement, stopChild);
      context.unwrapElement(anchorElement, stopChild);
    }

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  return unlinkCommand;
})());
