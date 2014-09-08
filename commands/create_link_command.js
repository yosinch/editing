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
             child.nodeName == firstChild.nodeName &&
             !!child.firstChild;
    });
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
   * @param {string} url
   * @return {boolean}
   */
  function createLinkForRange(context, url) {
    console.assert(url !== '');

    /**
     * @param {!Node} startNode
     * @param {!Node} endNode
     */
    function adjustStartNode(startNode, endNode) {
      if (!editing.nodes.isElement(startNode))
        return;
      var startElement = /** @type {!Element} */(startNode);
      if (startElement.nodeName != 'A' ||
          startElement.getAttribute('href') === url ||
          endNode.parentNode !== startElement || !endNode.nextSibling) {
        return;
      }

      // Split staring A element containing end node.
      // See createLink.Range.AnchorText.2
      context.splitNode(startElement, endNode.nextSibling);

      // TODO(yosin) We should remove this code fragment once |splitNode|
      // doesn't copy "name" attribute. See http://crbug.com/411785
      if (!startElement.hasAttribute('name'))
        return;
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

    /**
     * @param {!Node} anchorPhraseNode
     */
    function insertNewAnchorElement(anchorPhraseNode) {
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
     * @param {Node} node
     * @param {!Node} other
     * @return boolean
     */
    function isStartOf(node, other) {
      for (var runner = node; runner; runner = runner.parentNode) {
        if (runner.previousSibling)
          return false;
        if (runner === other)
          return true;
      }
      return false;
    }

    /**
     * @template T
     * @param {!Array.<T>} array
     * @return {?T}
     */
    function lastOf(array) {
      return array.length ? array[array.length - 1] : null;
    }

    var anchorElement = null;
    function wrapByAnchor(node) {
      if (!anchorElement) {
        if (!editing.nodes.isVisibleNode(node)) {
          // We don't have leading whitespaces in anchor element.
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
          anchorElement = previousSibling;
          context.appendChild(anchorElement, node);
          return;
        }
        anchorElement = insertNewAnchorElement(node);
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
    if (selection.isCaret) {
      // If selection is caret, we insert |url| before caret and select it,
      // then apply "createLink" command.
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
    }

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
    adjustStartNode(startNode, endNode);

    {
      var previous = startNode.previousSibling;
      if (previous && previous.nodeName == 'A') {
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

      if (currentElement.nodeName === 'A') {
        if (currentElement.getAttribute('url') !== url &&
            editing.nodes.isDescendantOf(endNode, currentElement) &&
            editing.nodes.lastWithIn(currentElement) !== endNode) {
          context.splitTree(currentElement, editing.nodes.nextNode(endNode));
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
    if (url === '') {
      context.setEndingSelection(context.startingSelection);
      return false;
    }
    if (context.startingSelection.isEmpty) {
      context.setEndingSelection(context.startingSelection);
      return true;
    }
    return createLinkForRange(context, url);
  }

  return createLinkCommand;
})());
