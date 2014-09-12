// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('createLink', (function() {
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
   * @param {?Node} node1
   * @param {?Node} node2
   * @return {boolean}
   */
  function canMergeElements(node1, node2) {
    if (!node1 || !node2 || node1.tagName !== node2.tagName ||
        !editing.nodes.isElement(node1)) {
      return false;
    }
    var element1 = /** @type {!Element} */(node1);
    var element2 = /** @type {!Element} */(node2);
    return [].every.call(element1.attributes, function(attr1) {
      return attr1.value === element2.getAttribute(attr1.name);
    });
  }

  /**
   * @param {!Node} node
   * @return {boolean}
   * Returns true if all child element is identical phrasing element.
   */
  function canUnwrapContents(node) {
    if (!editing.nodes.isElement(node))
      return false;
    var element = /** @type {!Element} */(node);
    var firstChild = element.firstChild;
    if (!firstChild)
      return false;
    return [].every.call(element.childNodes, function(child) {
      return editing.nodes.isElement(child) &&
             editing.nodes.isPhrasing(child) &&
             child.nodeName === firstChild.nodeName &&
             !!child.firstChild;
    });
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  function expandInlineStyle(context, element) {
    if (context.shouldUseCSS) {
      expandInlineStyleWithCSS(context, element);
      return;
    }
    expandInlineStyleWithoutCSS(context, element);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  function expandInlineStyleWithCSS(context, element) {
    var style = new editing.EditingStyle(element.style);
    if (!style.hasStyle)
      return;
    var styleElemnt = context.createElement('span');
    style.properties.forEach(function(property) {
      context.setStyle(styleElemnt, property.name, property.value);
      context.removeStyle(element, property.name);
    });
    while (element.firstChild)
      context.appendChild(styleElemnt, element.firstChild);
    context.appendChild(element, styleElemnt);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} element
   */
  function expandInlineStyleWithoutCSS(context, element) {
    var style = new editing.EditingStyle(element.style);
    if (!style.hasStyle)
      return;
    style.properties.forEach(function(property) {
      var tagName = editing.EditingStyle.computeTagName(property);
      if (!tagName)
        return;
      var styleElemnt = context.createElement(tagName);
      while (element.firstChild)
        context.appendChild(styleElemnt, element.firstChild);
      context.appendChild(element, styleElemnt);
console.log('expandInlineStyleWithoutCSS', element.parentNode.outerHTML);
      context.removeStyle(element, property.name);
    });
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
    return editing.nodes.isPhrasing(node);
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
   * @param {?Node} newNode
   * @param {?Node} oldNode
   * @param {?Node} stopNode
   * @param {?editing.SelectionTracker} selectionTracker
   *
   * TODO(yosin) We should make |context.unwrapElement| to use |moveChildren|.
   */
  function moveChildren(context, newNode, oldNode, stopNode,
                        selectionTracker) {
    console.assert(newNode && editing.nodes.isElement(newNode));
    console.assert(oldNode && editing.nodes.isElement(oldNode));
    var newParent = /** @type {!Element} */(newNode);
    var oldParent = /** @type {!Element} */(oldNode);
    console.assert(!stopNode || stopNode.parentNode === oldParent,
                   'stopNode', stopNode, 'must be child of', oldParent);
    var child = oldParent.firstChild;
    while (child && child !== stopNode) {
      var next = child.nextSibling;
      context.appendChild(newParent, child);
      child = next;
    }
    if (child)
      return;
    if (selectionTracker)
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
         runner && runner.parentNode && editing.nodes.isPhrasing(runner);
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
    while (startContainer.firstChild) {
      context.appendChild(anchorElement, startContainer.firstChild);
    }

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
   * @param {string} url
   */
  function setAnchorUrl(context, anchorElement, url) {
    console.assert(anchorElement.nodeName === 'A');
    context.setAttribute(anchorElement, 'href', url);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   */
  function unwrapAnchorContent(context, anchorElement) {
    var firstContent = /** @type {!Element} */(anchorElement.firstChild);
    console.assert(editing.nodes.isElement(firstContent));
    context.insertBefore(anchorElement.parentNode, firstContent,
                         anchorElement);
    while (firstContent.firstChild) {
      context.appendChild(anchorElement, firstContent.firstChild);
    }
    context.appendChild(firstContent, anchorElement);
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {!Element} anchorElement
   */
  function unwrapAnchorContents(context, anchorElement) {
    while (canUnwrapContents(anchorElement)) {
      unwrapAnchorContent(context, anchorElement);
    }
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
    selection = new editing.ReadOnlySelection(
      selection.anchorNode, selection.anchorOffset,
      selection.anchorNode, selection.anchorOffset + 1,
      editing.SelectionDirection.ANCHOR_IS_START);
    var anchorElement = context.createElement('A');
    setAnchorUrl(context, anchorElement, url);
    context.insertBefore(textNode.parentNode, anchorElement, textNode);
    context.appendChild(anchorElement, textNode);
    context.setEndingSelection(selection);
    return true;
  }

  /**
   * @param {!editing.EditingContext} context
   * @param {string} url
   * @return {boolean}
   */
  function createLinkForRange(context, url) {
    console.assert(url !== '');

    var anchorElement = null;
    /**
     * @param {!Node} node
     * Wraps |node| by A element.
     */
    function wrapByAnchor(node) {
      if (!anchorElement) {
        if (!editing.nodes.isVisibleNode(node)) {
          // We don't want to have leading whitespaces in anchor element.
          return;
        }
        var nextSibling = node.nextSibling;
        if (canMergeAnchor(nextSibling, url)) {
          // See w3c.26, w3c.30
          anchorElement = nextSibling;
          context.insertBefore(anchorElement, node, anchorElement.firstChild);
          return;
        }
        var previousSibling = node.previousSibling;
        if (canMergeAnchor(previousSibling, url)) {
          // See w3c.27
          anchorElement = /** @type {!Element} */(previousSibling);
          context.appendChild(anchorElement, node);
          return;
        }
        anchorElement = insertNewAnchorElement(context, url, node);
        return;
      }

      if (editing.nodes.isDescendantOf(node, anchorElement)) {
        // See w3c.44
        return;
      }

      if (node.parentNode === anchorElement.parentNode) {
        context.appendChild(anchorElement, node);
        return;
      }

      endAnchorElement();
      wrapByAnchor(node);
    }

    function endAnchorElement() {
      if (!anchorElement)
        return;
      unwrapAnchorContents(context, anchorElement);
      anchorElement = null;
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

    // Wrap pending contents which are sibling of |stopNode|
    function processPendingContents() {
      pendingContents.forEach(wrapByAnchor);
      endAnchorElement();
      pendingContainers = [];
      pendingContents = [];
    }

    var selection = context.normalizeSelection(context.startingSelection);
    // TODO(yosin) We should not use |computeSelectedNodes()| to check
    // whether selection contains nodes or not. See createLink.EndTag.
    if (!editing.nodes.computeSelectedNodes(selection).length)
      return createLinkForCaret(context, url);

    // TODO(yosin) We should reorder content elements for caret, since Chrome
    // does so.
    selection = normalizeSelectedStartNode(context, selection);

    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = context.setUpEffectiveNodes(selection,
                                                     isEffectiveNode);
    if (!effectiveNodes[0] || !editing.nodes.isPhrasing(effectiveNodes[0]))
      effectiveNodes.shift();
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return true;
    }

    var startNode = effectiveNodes[0];
    var endNode = lastOf(effectiveNodes);
    {
      var previous = startNode.previousSibling;
      if (isAnchorElement(previous)) {
        if (canMergeAnchor(previous, url)) {
          // Merge into previous A, see w3c.20
          anchorElement = previous;
        }
      } else if (canMergeElements(previous, startNode)) {
        // This also cancels split tree by |setUpEffectiveNodes()|.
        moveChildren(context, previous, startNode, null, selectionTracker);
      }
    }

    /** @type {?Element} */ var lastAnchorElement = null;
    /** @type {?string} */ var lastUrl = null;
    effectiveNodes.forEach(function(currentNode) {
console.log('forEach', currentNode);
      if (currentNode === anchorElement)
        return;

      var lastPendingContainer = lastOf(pendingContainers);
      if (lastPendingContainer &&
          lastPendingContainer === currentNode.previousSibling) {
        moveLastContainerToContents();
      }

      if (!editing.nodes.isEditable(currentNode) ||
          !editing.nodes.isPhrasing(currentNode)) {
        processPendingContents();
        return;
      }

      var currentElement = /** @type {!Element} */(currentNode);
      if (isAnchorElement(currentElement)) {
        expandInlineStyle(context, currentElement);
        lastAnchorElement = /** @type {!Element} */(currentElement);
        lastUrl = getAnchorUrl(currentElement);
        if (!anchorElement) {
          processPendingContents();
          anchorElement = currentElement;
          setAnchorUrl(context, anchorElement, url);
          return;
        }
        console.assert(getAnchorUrl(anchorElement) === url);
        setAnchorUrl(context, currentElement, url);
        if (canMergeAnchor(currentElement, url)) {
          // Unwrap A element.
          moveChildren(context, currentElement.parentNode, currentElement,
                       endNode.nextSibling, selectionTracker);
          return;
        }
        processPendingContents();
        anchorElement = currentElement;
      }

      if (editing.nodes.isInteractive(currentElement)) {
        processPendingContents();
        return;
      }

      if (currentElement.hasChildNodes()) {
        pendingContainers.push(currentElement);
        return;
      }

      if (pendingContainers.length) {
        pendingContents.push(currentElement);
        if (!currentElement.nextSibling)
          moveLastContainerToContents();
        return;
      }
      wrapByAnchor(currentElement);
    });

    if (endNode.parentNode === anchorElement &&
        canMergeAnchor(anchorElement.nextSibling, url)) {
      // Merge nodes after selection. See w3c.20
      moveChildren(context, anchorElement, anchorElement.nextSibling, null,
                   selectionTracker);
    }

    // The last effective node is descendant of pending container.
    // Example: foo<b>^bar<i>baz quux</i></b>|mox
    // where the last effective node is "baz quux".
    processPendingContents();

    // In case of we select anchor element partially, we need to split it,
    // e.g. <a>^foo|bar</a>
    if (lastAnchorElement && lastUrl !== url) {
      var element = /** @type {!Element} */(lastAnchorElement);
      var nextNode = editing.nodes.nextNode(endNode);
      if (nextNode &&
          editing.nodes.isDescendantOf(nextNode, element)) {
        var newAnchorElement = context.splitTree(element, nextNode);
        // TODO(yosin) We should remove this code fragment once |splitNode|
        // doesn't copy "name" attribute. See http://crbug.com/411785
        context.removeAttribute(element, 'name');
        if (lastUrl) {
          setAnchorUrl(context, newAnchorElement,
                       /** @type {string} */(lastUrl));
        } else {
          context.removeAttribute(newAnchorElement, 'href');
        }
      }
      unwrapAnchorContents(context, element);
    }

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
