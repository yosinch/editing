// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

editing.defineCommand('createLink', (function() {
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
   * @param {!Element} element
   * @return {boolean}
   * Returns true if all child element is identical phrasing element.
   */
  function canUnwrapContents(element) {
    var firstChild = element.firstChild;
    if (!firstChild)
      return false;
    return [].every.call(element.childNodes, function(child) {
      return editing.nodes.isElement(child) &&
             editing.nodes.isPhrasing(child) &&
             child.nodeName === firstChild.nodeName &&
             !child.attributes.length &&
             !!child.firstChild;
    });
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
    context.setAttribute(anchorElement, 'href', url);
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
      if (runner.nodeName === 'A') {
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
   */
  function unwrapAnchorContents(context, anchorElement) {
    while (canUnwrapContents(anchorElement)) {
      var wrapper = context.createElement(anchorElement.firstChild.nodeName);
      context.insertBefore(anchorElement.parentNode, wrapper, anchorElement);
      context.appendChild(wrapper, anchorElement);
      [].map.call(anchorElement.childNodes, function(child) {
        return child;
      }).forEach(function(child) {
        var childElement = /** @type {!Element} */(child);
        moveChildren(context, anchorElement, childElement, null, null);
      });
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
    var selection = editing.nodes.normalizeSelection(
        context, context.startingSelection);
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
    context.setAttribute(anchorElement, 'href', url);
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

    /**
     * @param {!Node} startNode
     * @param {!Node} endNode
     */
    function adjustEffectiveStartNode(context, startNode, endNode) {
      if (!editing.nodes.isElement(startNode))
        return;
      var startElement = /** @type {!Element} */(startNode);
      if (startElement.nodeName !== 'A')
        return;

      unwrapAnchorContents(context, startElement);
      if (startElement.getAttribute('href') === url)
        return;

      if (endNode.parentNode !== startElement || !endNode.nextSibling)
        return;

      // Split staring A element containing end node.
      // See createLink.Range.AnchorText.2
      context.splitNode(startElement, endNode.nextSibling);

      // TODO(yosin) We should remove this code fragment once |splitNode|
      // doesn't copy "name" attribute. See http://crbug.com/411785
      context.removeAttribute(startElement, 'name');
    }

    /**
     * @param {?Node} node
     * @return {boolean}
     */
    function canMergeAnchor(node){
      return Boolean(node) && node.nodeName === 'A' &&
             node.getAttribute('href') === url &&
             node.attributes.length === 1;
    }

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
        if (canMergeAnchor(nextSibling)) {
          // See w3c.26, w3c.30
          anchorElement = nextSibling;
          context.insertBefore(anchorElement, node, anchorElement.firstChild);
          return;
        }
        var previousSibling = node.previousSibling;
        if (canMergeAnchor(previousSibling)) {
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

    var selection = editing.nodes.normalizeSelection(
        context, context.startingSelection);
    // TODO(yosin) We should not use |computeSelectedNodes()| to check
    // whether selection contains nodes or not. See createLink.EndTag.
    if (!editing.nodes.computeSelectedNodes(selection).length)
      return createLinkForCaret(context, url);

    // TODO(yosin) We should reorder content elements for caret, once Chrome
    // does so.
    selection = normalizeSelectedStartNode(context, selection);

    var selectionTracker = new editing.SelectionTracker(context, selection);
    var effectiveNodes = editing.nodes.setUpEffectiveNodes(context, selection,
                                                           isEffectiveNode);
    if (!effectiveNodes[0] || !editing.nodes.isPhrasing(effectiveNodes[0]))
      effectiveNodes.shift();
    if (!effectiveNodes.length) {
      context.setEndingSelection(context.startingSelection);
      return true;
    }

    var startNode = effectiveNodes[0];
    var endNode = lastOf(effectiveNodes);
    adjustEffectiveStartNode(context, startNode, endNode);

    {
      var previous = startNode.previousSibling;
      if (previous && previous.nodeName === 'A') {
        if (canMergeAnchor(previous)) {
          // Merge into previous A, see w3c.20
          anchorElement = previous;
        }
      } else if (canMergeElements(previous, startNode)) {
        // This also cancels split tree by |setUpEffectiveNodes()|.
        moveChildren(context, previous, startNode, null, selectionTracker);
      }
    }

    effectiveNodes.forEach(function(currentNode) {
      if (!currentNode.parentNode || currentNode === anchorElement)
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

      if (currentElement.nodeName === 'A') {
        if (currentElement.getAttribute('url') !== url &&
            editing.nodes.isDescendantOf(endNode, currentElement) &&
            editing.nodes.lastWithIn(currentElement) !== endNode) {
          context.splitTree(currentElement, editing.nodes.nextNode(endNode));
          // TODO(yosin) We should remove this code fragment once |splitNode|
          // doesn't copy "name" attribute. See http://crbug.com/411785
          context.removeAttribute(currentElement, 'name');
        }
        if (!anchorElement) {
          processPendingContents();
          anchorElement = currentElement;
          context.setAttribute(anchorElement, 'href', url);
          return;
        }
        console.assert(anchorElement.getAttribute('href') === url);
        context.setAttribute(currentElement, 'href', url);
        if (canMergeAnchor(currentElement)) {
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

    // Merge nodes after selection. See w3c.20
    if (endNode.parentNode === anchorElement &&
        canMergeAnchor(anchorElement.nextSibling)) {
      moveChildren(context, anchorElement, anchorElement.nextSibling, null,
                   selectionTracker);
    }

    // The last effective node is descendant of pending container.
    // Example: foo<b>^bar<i>baz quux</i></b>|mox
    // where the last effective node is "baz quux".
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
    if (url === '' || context.startingSelection.isEmpty) {
      context.setEndingSelection(context.startingSelection);
      return false;
    }

    if (context.startingSelection.isCaret)
      return createLinkForCaret(context,url);

    return createLinkForRange(context, url);
  }

  return createLinkCommand;
})());
