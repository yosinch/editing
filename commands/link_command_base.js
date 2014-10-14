// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.LinkCommandContextBase = (function() {
  'use strict';

  /** @const */ var isDescendantOf = editing.dom.isDescendantOf;
  /** @const */ var isEditable = editing.dom.isEditable;
  /** @const */ var isElement = editing.dom.isElement;
  /** @const */ var isPhrasing = editing.dom.isPhrasing;

  /**
   * @param {Node} node
   * @return {boolean}
   */
  function isAnchorElement(node) {
    return Boolean(node) && node.nodeName === 'A';
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
   * @param {!Element} newParent
   * @param {!Element} oldParent
   * @param {!editing.SelectionTracker} selectionTracker
   *
   * TODO(yosin) We should make |context.unwrapElement| to use |mergeElements|.
   */
  function mergeElements(context, newParent, oldParent, selectionTracker) {
    console.assert(newParent !== oldParent,
                   'Should not move children to itself');
    context.moveAllChildren(newParent, oldParent);
    selectionTracker.willRemoveNode(oldParent);
    context.removeChild(oldParent.parentNode, oldParent);
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
   * @constructor
   * @extends {editing.CommandContext}
   * @struct
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   */
  function LinkCommandContextBase(context, userInterface, commandValue) {
    editing.CommandContext.call(this, context, userInterface, commandValue);
  }

  LinkCommandContextBase.isAnchorElement = isAnchorElement;
  LinkCommandContextBase.swapParentAndChild = swapParentAndChild;

  /**
   * @this {!LinkCommandContextBase}
   * @param {!editing.ImmutableSelection} selection
   * @return {!editing.ImmutableSelection}
   *
   * Reorder A element which contents is phrasing elements.
   * Example: <a><b><i>foo</i></a> => <b><i><a>foo</a></i></b>
   */
  function normalizeSelectedStartNode(selection) {
    console.assert(selection.isNormalized);
    var context = this.context;
    var startContainer = /** @type {!Element} */(selection.startContainer);
    /** @type {Element} */
    var anchorElement = null;
    var elements = [];
    for (var runner = startContainer;
         runner && runner.parentNode && isPhrasing(runner);
         runner = runner.parentNode) {
      if (isAnchorElement(runner)) {
        anchorElement = /** @type {!Element} */(runner);
        break;
      }
      if (runner.previousSibling || runner.nextSibling)
        break;
      elements.push(runner);
    }

    if (!anchorElement || !elements.length)
      return selection;

    // Move lowest anchor contents to anchor element.
    context.moveAllChildren(anchorElement, startContainer);

    // Move highest content node before anchor element
    context.insertBefore(anchorElement.parentNode, lastOf(elements),
                         anchorElement);

    // Move anchor element to lowest
    context.appendChild(startContainer, anchorElement);

    // Adjust selection
    var newEndContainer = selection.endContainer === startContainer ?
        anchorElement : selection.endContainer;
    if (selection.direction === editing.SelectionDirection.ANCHOR_IS_START) {
      return new editing.ImmutableSelection(
          anchorElement, selection.startOffset,
          newEndContainer, selection.endOffset,
          selection.direction);
    }
    return new editing.ImmutableSelection(
        newEndContainer, selection.endOffset,
        anchorElement, selection.startOffset,
        selection.direction);
  }

  /**
   * @this {!LinkCommandContextBase}
   * @param {!Element} anchorElement
   */
  function unwrapAnchorContents(anchorElement) {
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
      return Array.prototype.every.call(element.childNodes, function(child) {
        return isElement(child) && isPhrasing(child) &&
               child.nodeName === firstChild.nodeName &&
               child.firstChild;
      });
    }

    while (canUnwrapContents(anchorElement))
      swapParentAndChild(this.context, anchorElement);
  }

  LinkCommandContextBase.prototype = /** @type {LinkCommandContextBase} */
    (Object.create(editing.CommandContext.prototype, {
      normalizeSelectedStartNode: {value: normalizeSelectedStartNode},
      swapParentAndChild: {value: swapParentAndChild},
      unwrapAnchorContents: {value: unwrapAnchorContents}
    }));
  Object.freeze(LinkCommandContextBase.prototype);

  return LinkCommandContextBase;
})();
