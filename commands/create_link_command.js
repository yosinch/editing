// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

editing.defineCommand('createLink', (function() {
  'use strict';

  /** @const */ var isAnchorElement =
      editing.LinkCommandContextBase.isAnchorElement;
  /** @const */ var isDescendantOf = editing.dom.isDescendantOf;
  /** @const */ var isEditable = editing.dom.isEditable;
  /** @const */ var isElement = editing.dom.isElement;
  /** @const */ var isPhrasing = editing.dom.isPhrasing;

  /**
   * @param {Node} node
   * @param {string} url
   * @return {boolean}
   */
  function canMergeAnchor(node, url){
    console.assert(url !== '');
    if (!node || node.nodeName !== 'A')
      return false;
    var element = /** @type {!Element} */(node);
    return getAnchorUrl(element) === url && element.attributes.length === 1;
  }

  /**
   * @param {!Element} anchorElement
   * @return {string}
   */
  function getAnchorUrl(anchorElement) {
    console.assert(isAnchorElement(anchorElement));
    return anchorElement.getAttribute('href');
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {string} url
   * @param {!Node} anchorPhraseNode
   */
  function insertNewAnchorElement(context, url, anchorPhraseNode) {
    if (editing.dom.isWhitespaceNode(anchorPhraseNode))
      return null;
    var anchorElement = context.createElement('a');
    setAnchorUrl(context, anchorElement, url);
    var parentNode = anchorPhraseNode.parentNode;
    if (!parentNode) {
      throw new Error('anchorPhraseNode ' + anchorPhraseNode +
                      ' should not be in tree.');
    }
    context.replaceChild(parentNode, anchorElement, anchorPhraseNode);
    context.appendChild(anchorElement, anchorPhraseNode);
    return anchorElement;
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   */
  function isEffectiveNode(node) {
    return isEditable(node) && !isAnchorElement(node);
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
   * @param {!Element} anchorElement
   * @param {string} url
   */
  function setAnchorUrl(context, anchorElement, url) {
    console.assert(isAnchorElement(anchorElement));
    if (!url) {
      context.removeAttribute(anchorElement, 'href');
      return;
    }
    context.setAttribute(anchorElement, 'href', url);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   * @param {!Node} refNode
   * @return {!Element}
   */
  function splitAnchorElement(context, anchorElement, refNode) {
    console.assert(isAnchorElement(anchorElement));
    console.assert(isDescendantOf(refNode, anchorElement));
    var newAnchorElement = context.splitTree(anchorElement, refNode);
    // TODO(yosin) We should remove this code fragment once |splitNode|
    // doesn't copy "name" attribute. See http://crbug.com/411785
    // Note: We should remove NAME attribute from existing A element.
    // Otherwise, following tests are failed: createLink.w3c.46,
    // createLink.w3c.46r createLink.w3c.47 createLink.w3c.47r
    context.removeAttribute(anchorElement, 'name');
    return newAnchorElement;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {string} url
   * @return {boolean}
   * If selection is caret, we insert |url| before caret and select it,
   * then apply "createLink" command.
   */
  function createLinkForCaret(context, url) {
    console.assert(url !== '');
    var selection = context.normalizeSelection(context.startingSelection);
    var textNode = context.createTextNode(url);
    var refChild = selection.anchorNode.childNodes[selection.anchorOffset];
    if (refChild)
      context.insertBefore(selection.anchorNode, textNode, refChild);
    else
      context.appendChild(selection.anchorNode, textNode);

    var endingSelection = new editing.ImmutableSelection(
        selection.anchorNode, selection.anchorOffset,
        selection.anchorNode, selection.anchorOffset + 1,
        editing.SelectionDirection.ANCHOR_IS_START);

    var anchorElement = context.createElement('A');
    setAnchorUrl(context, anchorElement, url);
    context.insertBefore(textNode.parentNode, anchorElement, textNode);
    context.appendChild(anchorElement, textNode);
    context.setEndingSelection(endingSelection);
    return true;
  }

  /**
   * @constructor
   * @extends {editing.LinkCommandContextBase}
   * @final
   * @struct
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   */
  function CreateLinkCommandContext(context, userInterface, commandValue) {
    editing.LinkCommandContextBase.call(this, context, userInterface,
                                        commandValue);
  }

  /**
   * @this {!CreateLinkCommandContext}
   * @return {boolean}
   */
  function execute() {
    /** @const */ var commandContext = this;
    /** @const */ var context = this.context;
    /** @const */ var urlValue = this.commandValue;
    /** @type {Element} */var currentAnchorElement = null;

    function endAnchorElement() {
      if (!currentAnchorElement)
        return;
      commandContext.unwrapAnchorContents(currentAnchorElement);
      currentAnchorElement = null;
    }

    var pendingContainers = [];
    var pendingContents = [];

    function moveLastContainerToContents() {
      // All descendant of |lastPendingContainer| can be contents of anchor.
      var lastContainer = pendingContainers.pop();
      while (pendingContents.length &&
             lastOf(pendingContents).parentNode === lastContainer) {
        pendingContents.pop();
      }
      if (pendingContainers.length) {
        pendingContents.push(lastContainer);
        return;
      }
      wrapByAnchor(lastContainer);
    }

    function processPendingContents() {
      pendingContents.forEach(wrapByAnchor);
      endAnchorElement();
      pendingContainers = [];
      pendingContents = [];
    }

    /**
     * @this {!editing.EditingContext}
     * @param {!Element} element
     * @param {!Node} refNode
     * @return {!Element}
     */
    function splitTreeForCreateLink(element, refNode) {
      if (!isAnchorElement(element))
        return element;
      if (getAnchorUrl(element) == urlValue)
        return element;
      commandContext.expandInlineStyle(element);
      // Note: We keep NAME attribute here, otherwise following tests are
      // failed: createLink.w3c.46, createLink.w3c.46r createLink.w3c.47,
      // createLink.w3c.47r
      return this.splitTree(element, refNode);
    }

    /**
     * @param {!Node} node
     * Wraps |node| by A element.
     */
    function wrapByAnchor(node) {
      if (!currentAnchorElement) {
        if (!editing.dom.isVisibleNode(node)) {
          // We don't want to have leading whitespaces in anchor element.
          return;
        }
        var nextSibling = node.nextSibling;
        if (canMergeAnchor(nextSibling, urlValue)) {
          // See w3c.26, w3c.30
          currentAnchorElement = /** @type {!Element} */(nextSibling);
          context.insertBefore(currentAnchorElement, node,
                               currentAnchorElement.firstChild);
          return;
        }
        var previousSibling = node.previousSibling;
        if (canMergeAnchor(previousSibling, urlValue)) {
          // See w3c.27
          currentAnchorElement = /** @type {!Element} */(previousSibling);
          context.appendChild(currentAnchorElement, node);
          return;
        }
        currentAnchorElement = insertNewAnchorElement(context, urlValue, node);
        return;
      }

      if (isDescendantOf(node, currentAnchorElement)) {
        // See w3c.44
        return;
      }

      if (node.parentNode === currentAnchorElement.parentNode) {
        context.appendChild(currentAnchorElement, node);
        return;
      }

      endAnchorElement();
      wrapByAnchor(node);
    }

    //
    // Main part of createLinkForRange
    //
    var selection = context.normalizeSelection(context.startingSelection);
    // TODO(yosin) We should not use |computeSelectedNodes()| to check
    // whether selection contains nodes or not. See createLink.EndTag.
    var selectedNodes = editing.dom.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return createLinkForCaret(context, urlValue);
    // TODO(yosin) We should reorder content elements for caret, once Chrome
    // does so.
    selection = this.normalizeSelectedStartNode(selection);

    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = context.setUpEffectiveNodesWithSplitter(
        selection, isEffectiveNode, splitTreeForCreateLink);
    if (!effectiveNodes[0] || !isPhrasing(effectiveNodes[0]))
      effectiveNodes.shift();
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return true;
    }

    var firstNode = effectiveNodes[0];
    var lastNode = lastOf(effectiveNodes);
    while (effectiveNodes.length > 1 && firstNode !== selectedNodes[0] &&
           firstNode.nodeName !== 'A' &&
           isDescendantOf(lastNode, firstNode)) {
      effectiveNodes.shift();
      firstNode = effectiveNodes[0];
    }

    /** @const @type {Node} */
    var endNode = editing.dom.nextNodeSkippingChildren(lastNode);
    var atomicElements = [];
    // TODO(yosin) Once closure compiler support |break| in |for-of|, we
    // should use |for-of| instead of |Array.prototype.every()|.
    effectiveNodes.every(function(currentNode) {
      if (currentNode === currentAnchorElement)
        return true;

      while (atomicElements.length &&
             !isDescendantOf(currentNode, lastOf(atomicElements))) {
        atomicElements.shift();
      }
      if (atomicElements.length) {
        if (pendingContainers.length) {
          pendingContents.push(currentNode);
          if (!currentNode.nextSibling)
            moveLastContainerToContents();
        }
        return true;
      }

      var lastPendingContainer = lastOf(pendingContainers);
      if (lastPendingContainer &&
          lastPendingContainer === currentNode.previousSibling) {
        moveLastContainerToContents();
      }

      if (!isEditable(currentNode)) {
        processPendingContents();
        return true;
      }

      if (!isPhrasing(currentNode)) {
        var savedCurrentAnchorElement = currentAnchorElement;
        processPendingContents();
        if (savedCurrentAnchorElement !== currentNode.parentNode)
          return true;

        var anchorElement = /** @type {!Element} */(savedCurrentAnchorElement);

        // <a>012<div>345</div>678</a>
        // => <a>012</a><div><a>345</a></div><a>678</a>
        if (currentNode.previousSibling) {
          anchorElement = /** @type {!Element} */ (context.splitNodeLeft(
              anchorElement, currentNode));
          context.removeAttribute(anchorElement, 'name');
        }

        if (currentNode.nextSibling) {
          context.splitNode(anchorElement, currentNode.nextSibling);
          context.removeAttribute(anchorElement, 'name');
        }

        this.swapParentAndChild(anchorElement);

        currentAnchorElement = anchorElement;
        return true;
      }

      if (isAnchorElement(currentNode)) {
        var anchorElement = /** @type {!Element} */(currentNode);
        var handleLastNode = endNode &&
            isDescendantOf(endNode, anchorElement) &&
            (getAnchorUrl(anchorElement) !== urlValue ||
             anchorElement.hasAttribute('style'));
        if (handleLastNode) {
          // Selection contains partial anchor contents. We split this
          // anchor element. e.g. <a>^foo|bar</a>, see createLink.style.4.
          // Note: We should unwrap anchor content before splitting for
          // createLink.Range.42.3:
          //   <a><b><i>^foo|bar</i></b></a> =>
          //   <b><i><a>foo</a><a>bar</a></i></b>
          commandContext.unwrapAnchorContents(anchorElement);

          // Expand style for createLink.style.6.css
          // But not for see createLink.style.4
          /** @const */ var shouldExpandInlineStyleAfterSplit =
              lastNode.parentNode !== anchorElement &&
              isPhrasing(/** @type {!Element} */(lastNode.parentNode));

          // Note: when we expand inline style before splitting tree, following
          // tests are failed: createLink.style.4, createLink.style.4.css,
          // createLink.style.5.css, createLink.style.7
          var newAnchorElement = splitAnchorElement(
              context, anchorElement, /** @type {!Node} */(endNode));
          commandContext.expandInlineStyle(anchorElement);
          if (shouldExpandInlineStyleAfterSplit)
            commandContext.expandInlineStyle(newAnchorElement);
        } else {
          commandContext.expandInlineStyle(anchorElement);
        }
        setAnchorUrl(context, anchorElement, urlValue);
        if (currentAnchorElement && canMergeAnchor(anchorElement, urlValue)) {
          // Merge |anchorElement| into |currentAnchorElement|.
          // See createLink.abc.3, createLink.w3c.20
          mergeElements(context, currentAnchorElement, anchorElement,
                        selectionTracker);
          console.assert(!anchorElement.parentNode);
          return !handleLastNode;
        }
        processPendingContents();
        currentAnchorElement = anchorElement;
        return !handleLastNode;
      }

      if (editing.dom.isInteractive(currentNode)) {
        processPendingContents();
        return true;
      }

      if (currentNode.hasChildNodes()) {
        if (editing.dom.canContainRangeEndPoint(currentNode)) {
          pendingContainers.push(currentNode);
        } else {
          if (currentAnchorElement)
            pendingContainers.push(currentNode);
          atomicElements.push(currentNode);
        }
        return true;
      }

      if (pendingContainers.length) {
        pendingContents.push(currentNode);
        if (!currentNode.nextSibling)
          moveLastContainerToContents();
        return true;
      }

      wrapByAnchor(currentNode);
      return true;
    }, this);

    // The last effective node is descendant of pending container.
    // Example: foo<b>^bar<i>baz quux</i></b>|mox
    // where the last effective node is "baz quux".
    // See createLink.w3c.11, createLink.w3c.12.
    processPendingContents();

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  CreateLinkCommandContext.prototype = /** @type {!CreateLinkCommandContext} */
    (Object.create(editing.LinkCommandContextBase.prototype, {
      execute: {value: execute}
  }));
  Object.freeze(CreateLinkCommandContext.prototype);

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   * @return {boolean}
   */
  function createLinkCommand(context, userInterface, commandValue) {
    var selection = context.startingSelection;
    if (commandValue === '' || !selection.isEditable) {
      context.setEndingSelection(selection);
      return false;
    }

    if (selection.isCaret)
      return createLinkForCaret(context, commandValue);

    var commandContext = new CreateLinkCommandContext(context, userInterface,
                                                  commandValue);
    return commandContext.execute();
  }

  return createLinkCommand;
})());
