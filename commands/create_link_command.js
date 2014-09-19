// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('createLink', (function() {
  /** @const */ var isDescendantOf = editing.nodes.isDescendantOf;
  /** @const */ var isEditable = editing.nodes.isEditable;
  /** @const */ var isElement = editing.nodes.isElement;
  /** @const */ var isPhrasing = editing.nodes.isPhrasing;

  /**
   * @param {?Node} node
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
      moveAllChildren(context, styleElement, element);
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
          if (editing.nodes.isWhitespaceNode(child)) {
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
        moveAllChildren(context, styleElement, element);
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
   * @param {!Element} anchorElement
   * @return {?string}
   */
  function getAnchorUrl(anchorElement) {
    console.assert(anchorElement.nodeName === 'A');
    return anchorElement.getAttribute('href');
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {string} url
   * @param {!Node} anchorPhraseNode
   */
  function insertNewAnchorElement(context, url, anchorPhraseNode) {
    if (editing.nodes.isWhitespaceNode(anchorPhraseNode))
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
   * @param {?Node} node
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
    return isEditable(node) && node.nodeName !== 'A';
  }

  /**
   * @template T
   * @param {!Array.<T>} array
   * @return {?T}
   */
  function lastOf(array) {
    return array.length ? array[array.length - 1] : null;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} newElement
   * @param {!Element} oldElement
   */
  // TODO(yosin) We should move |moveAllChildren()| to |EditingContext| to
  // share with other commands.
  function moveAllChildren(context, newElement, oldElement) {
    while (oldElement.firstChild)
      context.appendChild(newElement, oldElement.firstChild);
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
    while (oldParent.firstChild)
      context.appendChild(newParent, oldParent.firstChild);
    selectionTracker.willRemoveNode(oldParent);
    context.removeChild(oldParent.parentNode, oldParent);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!editing.ReadOnlySelection} selection
   * @return {!editing.ReadOnlySelection}
   *
   * Reorder A element which contents is phrasing elements.
   * Example: <a><b><i>foo</i></a> => <b><i><a>foo</a></i></b>
   */
  function normalizeSelectedStartNode(context, selection) {
    console.assert(selection.isNormalized);
    var startContainer = selection.startContainer;
    var anchorElement = null;
    var elements = [];
    for (var runner = startContainer;
         runner && runner.parentNode && isPhrasing(runner);
         runner = runner.parentNode) {
      if (isAnchorElement(runner)) {
        anchorElement = runner;
        break;
      }
      if (runner.previousSibling || runner.nextSibling)
        break;
      elements.push(runner);
    }

    if (!anchorElement || !elements.length)
      return selection;

    // Move lowest anchor contents to anchor element.
    while (startContainer.firstChild)
      context.appendChild(anchorElement, startContainer.firstChild);

    // Move highest content node before anchor element
    context.insertBefore(anchorElement.parentNode, lastOf(elements),
                         anchorElement);

    // Move anchor element to lowest
    context.appendChild(startContainer, anchorElement);

    // Adjust selection
    var newEndContainer = selection.endContainer === startContainer ?
        anchorElement : selection.endContainer;
    if (selection.direction === editing.SelectionDirection.ANCHOR_IS_START) {
      return new editing.ReadOnlySelection(
          anchorElement, selection.startOffset,
          newEndContainer, selection.endOffset,
          selection.direction);
    }
    return new editing.ReadOnlySelection(
        newEndContainer, selection.endOffset,
        anchorElement, selection.startOffset,
        selection.direction);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   * @param {?string} url
   */
  function setAnchorUrl(context, anchorElement, url) {
    console.assert(anchorElement.nodeName === 'A');
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
    console.assert(anchorElement.nodeName === 'A');
    console.assert(isDescendantOf(refNode, anchorElement));
    var newAnchorElement = context.splitTree(anchorElement, refNode);
    // TODO(yosin) We should remove this code fragment once |splitNode|
    // doesn't copy "name" attribute. See http://crbug.com/411785
    context.removeAttribute(anchorElement, 'name');
    return newAnchorElement;
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
    while (child.firstChild)
      context.appendChild(element, child.firstChild);
    context.insertBefore(element.parentNode, child, element);
    context.appendChild(child, element);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   */
  function unwrapAnchorContents(context, anchorElement) {
    while (canUnwrapContents(anchorElement))
      swapParentAndChild(context, anchorElement);
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

    var endingSelection = new editing.ReadOnlySelection(
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
   * @param {!editing.EditingContext} context
   * @param {string} urlValue
   * @return {boolean}
   */
  function createLinkForRange(context, urlValue) {
    console.assert(urlValue !== '');

    /** @type {?Element} */var currentAnchorElement = null;

    function endAnchorElement() {
      if (!currentAnchorElement)
        return;
      unwrapAnchorContents(context, currentAnchorElement);
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
      if (element.nodeName !== 'A')
        //return this.splitTree(element, refNode);
        return element;
      if (getAnchorUrl(element) == urlValue)
        return element;
      expandInlineStyle(this, element);
      return this.splitTree(element, refNode);
    }

    /**
     * @param {!Node} node
     * Wraps |node| by A element.
     */
    function wrapByAnchor(node) {
      if (!currentAnchorElement) {
        if (!editing.nodes.isVisibleNode(node)) {
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
    var selectedNodes = editing.nodes.computeSelectedNodes(selection);
    if (!selectedNodes.length)
      return createLinkForCaret(context, urlValue);
    // TODO(yosin) We should reorder content elements for caret, once Chrome
    // does so.
    selection = normalizeSelectedStartNode(context, selection);

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

    /** @const @type {?Node} */
    var endNode = editing.nodes.nextNodeSkippingChildren(lastNode);
    var atomicElements = [];
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

        swapParentAndChild(context, anchorElement);

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
          unwrapAnchorContents(context, anchorElement);

          // Expand style for createLink.style.6.css
          // But not for see createLink.style.4
          /** @const */ var shouldExpandInlineStyleAfterSplit =
              lastNode.parentNode !== anchorElement &&
              isPhrasing(/** @type {!Element} */(lastNode.parentNode));

          var newAnchorElement = splitAnchorElement(
              context, anchorElement, /** @type {!Node} */(endNode));
          expandInlineStyle(context, anchorElement);
          if (shouldExpandInlineStyleAfterSplit)
            expandInlineStyle(context, newAnchorElement);
        } else {
          expandInlineStyle(context, anchorElement);
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

      if (editing.nodes.isInteractive(currentNode)) {
        processPendingContents();
        return true;
      }

      if (currentNode.hasChildNodes()) {
        if (editing.nodes.canContainRangeEndPoint(currentNode)) {
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
    });

    // The last effective node is descendant of pending container.
    // Example: foo<b>^bar<i>baz quux</i></b>|mox
    // where the last effective node is "baz quux".
    // See createLink.w3c.11, createLink.w3c.12.
    processPendingContents();

    selectionTracker.finishWithStartAsAnchor();
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {boolean} userInterface
   * @param {string} url
   * @return {boolean}
   */
  function createLinkCommand(context, userInterface, url) {
    var selection = context.startingSelection;
    if (url === '' || !selection.isEditable) {
      context.setEndingSelection(selection);
      return false;
    }

    if (selection.isCaret)
      return createLinkForCaret(context,url);

    return createLinkForRange(context, url);
  }

  return createLinkCommand;
})());
