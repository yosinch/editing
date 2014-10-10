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
  /** @const */ var lastOf = editing.lastOf;

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
    /** @private @type {!Array.<!Element>} */
    this.atomicElements_ = [];
    /** @private @type {Element} */
    this.currentAnchorElement_ = null;
    /** @private @type {Node} */
    this.endNode_ = null;
    /** @private @type {Node} */
    this.lastNode_ = null;
    /** @private @type {!Array.<!Element>} */
    this.pendingContainers_ = [];
    /** @private @type {!Array.<!Node>} */
    this.pendingContents_ = [];
    /** @private @type {editing.SelectionTracker} */
    this.selectionTracker_ = null;
    Object.seal(this);
  }

  /** @param {!CreateLinkCommandContext} commandContext */
  function endAnchorElement(commandContext) {
    if (!commandContext.currentAnchorElement_)
      return;
    commandContext.unwrapAnchorContents(commandContext.currentAnchorElement_);
    commandContext.currentAnchorElement_ = null;
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Element} newParent
   * @param {!Element} oldParent
   */
  function mergeElements(commandContext, newParent, oldParent) {
    console.assert(!newParent.contains(oldParent),
                   'Should not move children to itself');
    commandContext.context.moveAllChildren(newParent, oldParent);
    commandContext.selectionTracker_.willRemoveNode(oldParent);
    commandContext.context.removeChild(oldParent.parentNode, oldParent);
  }

  /** @param {!CreateLinkCommandContext} commandContext */
  function moveLastContainerToContents(commandContext) {
    // All descendant of |lastPendingContainer| can be contents of anchor.
    var lastContainer = commandContext.pendingContainers_.pop();
    while (commandContext.pendingContents_.length &&
           lastOf(commandContext.pendingContents_).parentNode ===
              lastContainer) {
      commandContext.pendingContents_.pop();
    }
    if (commandContext.pendingContainers_.length) {
      commandContext.pendingContents_.push(lastContainer);
      return;
    }
    wrapByAnchor(commandContext, lastContainer);
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Element} anchorElement
   * @return {boolean}
   */
  function processAnchorElement(commandContext, anchorElement) {
    /** @const */ var context = commandContext.context;
    /** @const */ var urlValue = commandContext.commandValue;

    var handleLastNode = commandContext.endNode_ &&
        isDescendantOf(commandContext.endNode_, anchorElement) &&
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

      /** @type {Element} */
      var lastNodeParent = commandContext.lastNode_ ?
          /** @type {Element} */(commandContext.lastNode_.parentNode) : null;

      // Expand style for createLink.style.6.css
      // But not for see createLink.style.4
      /** @const */ var shouldExpandInlineStyleAfterSplit =
          lastNodeParent !== anchorElement && lastNodeParent &&
          isPhrasing(/** @type {!Element} */(lastNodeParent));

      // Note: when we expand inline style before splitting tree, following
      // tests are failed: createLink.style.4, createLink.style.4.css,
      // createLink.style.5.css, createLink.style.7
      var newAnchorElement = splitAnchorElement(
          context, anchorElement,
          /** @type {!Node} */(commandContext.endNode_));
      commandContext.expandInlineStyle(anchorElement);
      if (shouldExpandInlineStyleAfterSplit)
        commandContext.expandInlineStyle(newAnchorElement);
    } else {
      commandContext.expandInlineStyle(anchorElement);
    }
    setAnchorUrl(context, anchorElement, urlValue);
    if (commandContext.currentAnchorElement_ &&
        canMergeAnchor(anchorElement, urlValue)) {
      // Merge |anchorElement| into |currentAnchorElement|.
      // See createLink.abc.3, createLink.w3c.20
      mergeElements(commandContext, commandContext.currentAnchorElement_,
                    anchorElement);
      console.assert(!anchorElement.parentNode);
      return !handleLastNode;
    }
    processPendingContents(commandContext);
    commandContext.currentAnchorElement_ = anchorElement;
    return !handleLastNode;
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Node} currentNode
   */
  function processAtomicElementsIfNeeded(commandContext, currentNode) {
    while (commandContext.atomicElements_.length &&
         !isDescendantOf(currentNode, lastOf(commandContext.atomicElements_))) {
      commandContext.atomicElements_.shift();
    }

    if (!commandContext.atomicElements_.length)
      return false;

    if (commandContext.pendingContainers_.length) {
      commandContext.pendingContents_.push(currentNode);
      if (!currentNode.nextSibling)
        moveLastContainerToContents(commandContext);
    }
    return true;
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Element} element
   */
  function processContainer(commandContext, element) {
    if (editing.dom.canContainRangeEndPoint(element)) {
      commandContext.pendingContainers_.push(element);
      return;
    }
    if (commandContext.currentAnchorElement_)
      commandContext.pendingContainers_.push(element);
    commandContext.atomicElements_.push(element);
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Node} currentNode
   */
  function processNonPhrasingNode(commandContext, currentNode) {
    /** @const */ var context = commandContext.context;
    var savedCurrentAnchorElement = commandContext.currentAnchorElement_;
    processPendingContents(commandContext);
    if (savedCurrentAnchorElement !== currentNode.parentNode)
      return true;

    var anchorElement = /** @type {!Element} */(savedCurrentAnchorElement);

    // <a>012<div>345</div>678</a>
    // => <a>012</a><div><a>345</a></div><a>678</a>
    if (currentNode.previousSibling) {
      anchorElement = /** @type {!Element} */(context.splitNodeLeft(
          anchorElement, currentNode));
      context.removeAttribute(anchorElement, 'name');
    }

    if (currentNode.nextSibling) {
      context.splitNode(anchorElement, currentNode.nextSibling);
      context.removeAttribute(anchorElement, 'name');
    }

    commandContext.swapParentAndChild(anchorElement);
    commandContext.currentAnchorElement_ = anchorElement;
  }

  /** @param {!CreateLinkCommandContext} commandContext */
  function processPendingContents(commandContext) {
    commandContext.pendingContents_.forEach(function(node) {
      wrapByAnchor(commandContext, node);
    });
    endAnchorElement(commandContext);
    commandContext.pendingContainers_ = [];
    commandContext.pendingContents_ = [];
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @return {!Array.<!Node>}
   */
  function setUpEffectiveNodes(commandContext) {
    /** @const */ var context = commandContext.context;
    /** @const */ var urlValue = commandContext.commandValue;

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

    if (context.startingSelection.isCaret)
      return [];

    var selection = context.normalizeSelection(context.startingSelection);
    // TODO(yosin) We should not use |computeSelectedNodes()| to check
    // whether selection contains nodes or not. See createLink.EndTag.
    var selectedNodes = editing.dom.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return [];

    selection = commandContext.normalizeSelectedStartNode(selection);
    commandContext.selectionTracker_ = new editing.SelectionTracker(context,
                                                                    selection);

    var effectiveNodes = context.setUpEffectiveNodesWithSplitter(
        selection, isEffectiveNode, splitTreeForCreateLink);
    if (!effectiveNodes[0] || !isPhrasing(effectiveNodes[0]))
      effectiveNodes.shift();
    if (!effectiveNodes.length)
      return [];

    var firstNode = effectiveNodes[0];
    var lastNode = lastOf(effectiveNodes);
    while (effectiveNodes.length > 1 && firstNode !== selectedNodes[0] &&
           firstNode.nodeName !== 'A' &&
           isDescendantOf(lastNode, firstNode)) {
      effectiveNodes.shift();
      firstNode = effectiveNodes[0];
    }

    commandContext.endNode_ = editing.dom.nextNodeSkippingChildren(lastNode);
    commandContext.lastNode_ = lastNode;
    return effectiveNodes;
  }

  /**
   * @param {!CreateLinkCommandContext} commandContext
   * @param {!Node} node
   * Wraps |node| by A element.
   */
  function wrapByAnchor(commandContext, node) {
    /** @const */ var context = commandContext.context;
    /** @const */ var urlValue = commandContext.commandValue;

    if (!commandContext.currentAnchorElement_) {
      if (!editing.dom.isVisibleNode(node)) {
        // We don't want to have leading whitespaces in anchor element.
        return;
      }
      var nextSibling = node.nextSibling;
      if (canMergeAnchor(nextSibling, urlValue)) {
        // See w3c.26, w3c.30
        commandContext.currentAnchorElement_ =
            /** @type {!Element} */(nextSibling);
        context.insertBefore(commandContext.currentAnchorElement_, node,
                             commandContext.currentAnchorElement_.firstChild);
        return;
      }
      var previousSibling = node.previousSibling;
      if (canMergeAnchor(previousSibling, urlValue)) {
        // See w3c.27
        commandContext.currentAnchorElement_ =
          /** @type {!Element} */(previousSibling);
        context.appendChild(commandContext.currentAnchorElement_, node);
        return;
      }
      commandContext.currentAnchorElement_ = insertNewAnchorElement(
          context, urlValue, node);
      return;
    }

    if (isDescendantOf(node, commandContext.currentAnchorElement_)) {
      // See w3c.44
      return;
    }

    if (node.parentNode === commandContext.currentAnchorElement_.parentNode) {
      context.appendChild(commandContext.currentAnchorElement_, node);
      return;
    }

    endAnchorElement(commandContext);
    wrapByAnchor(commandContext, node);
  }

  /**
   * @this {!CreateLinkCommandContext}
   * @return {boolean}
   */
  function execute() {
    /** @const */ var commandContext = this;
    /** @const */ var context = this.context;
    /** @const */ var urlValue = this.commandValue;

    if (urlValue === '' || !context.startingSelection.isEditable) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    var effectiveNodes = setUpEffectiveNodes(this);
    if (!effectiveNodes.length)
      return createLinkForCaret(context, urlValue);

    // TODO(yosin) Once closure compiler support |continue| in |for-of|, we
    // should use |for-of| instead of |Array.prototype.every()|.
    effectiveNodes.every(function(currentNode) {
      if (currentNode === this.currentAnchorElement_)
        return true;

      if (processAtomicElementsIfNeeded(commandContext, currentNode))
        return true;

      var lastPendingContainer = lastOf(this.pendingContainers_);
      if (lastPendingContainer &&
          lastPendingContainer === currentNode.previousSibling) {
        moveLastContainerToContents(this);
      }

      if (!isEditable(currentNode)) {
        processPendingContents(this);
        return true;
      }

      if (isElement(currentNode)) {
        var element = /** @type {!Element} */(currentNode);
        if (!isPhrasing(element)) {
          processNonPhrasingNode(this, element);
          return true;
        }

        if (isAnchorElement(element))
          return processAnchorElement(this, element);

        if (editing.dom.isInteractive(element)) {
          processPendingContents(this);
          return true;
        }

        if (element.hasChildNodes()) {
          processContainer(commandContext, element);
          return true;
        }
      }

      if (this.pendingContainers_.length) {
        this.pendingContents_.push(currentNode);
        if (!currentNode.nextSibling)
          moveLastContainerToContents(this);
        return true;
      }

      wrapByAnchor(this, currentNode);
      return true;
    }, this);

    // The last effective node is descendant of pending container.
    // Example: foo<b>^bar<i>baz quux</i></b>|mox
    // where the last effective node is "baz quux".
    // See createLink.w3c.11, createLink.w3c.12.
    processPendingContents(this);

    this.selectionTracker_.finishWithStartAsAnchor();
    return true;
  }

  CreateLinkCommandContext.prototype = /** @type {!CreateLinkCommandContext} */
    (Object.create(editing.LinkCommandContextBase.prototype, {
      constructor: {value: CreateLinkCommandContext },
      execute: {value: execute},
  }));
  Object.freeze(CreateLinkCommandContext.prototype);

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} commandValue
   * @return {boolean}
   */
  function createLinkCommand(context, userInterface, commandValue) {
    var commandContext = new CreateLinkCommandContext(context, userInterface,
                                                      commandValue);
    return commandContext.execute();
  }

  return createLinkCommand;
})());
