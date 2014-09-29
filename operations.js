// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file./*

//////////////////////////////////////////////////////////////////////
//
// Operation
//
editing.Operation = (function() {
  /**
   * @constructor
   * @param {string} operationName
   */
  function Operation(operationName) {
    this.operationName_ = operationName;
  }

  /**
   * @this {!Operation}
   */
  function redo() {
    throw new Error('Abstract method Operation.prototype.redo called', this);
  }

  /**
   * @this {!Operation}
   */
  function undo() {
    throw new Error('Abstract method Operation.prototype.undo called', this);
  }

  Object.defineProperties(Operation.prototype, {
    constructor: Operation,
    execute: {value: function() { this.redo(); }},
    operationName: {get: function() { return this.operationName_; }},
    operationName_: {writable: true},
    redo: {value: redo },
    undo: {value: undo }
  });

  return Operation;
})();

//////////////////////////////////////////////////////////////////////
//
// AppendChild
//
editing.AppendChild = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   */
  function AppendChild(parentNode, newChild) {
    console.assert(!newChild.parentNode);
    editing.Operation.call(this, 'appendChild');
    this.parentNode_ = parentNode;
    this.newChild_ = newChild;
    Object.seal(this);
  }

  /**
   * @this {!AppendChild}
   */
  function redo() {
    this.parentNode_.appendChild(this.newChild_);
  }

  /**
   * @this {!AppendChild}
   */
  function undo() {
    this.parentNode_.removeChild(this.newChild_);
  }

  AppendChild.prototype = Object.create(editing.Operation.prototype, {
    constructor: AppendChild,
    newChild_: {writable: true},
    parentNode_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return AppendChild;
})();

//////////////////////////////////////////////////////////////////////
//
// InsertBefore
//
editing.InsertBefore = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {Node} refChild
   */
  function InsertBefore(parentNode, newChild, refChild) {
    console.assert(!newChild.parentNode);
    console.assert(parentNode === refChild.parentNode);
    editing.Operation.call(this, 'insertBefore');
    this.parentNode_ = parentNode;
    this.newChild_ = newChild;
    this.refChild_ = refChild;
    Object.seal(this);
  }

  /**
   * @this {!InsertBefore}
   */
  function redo() {
    this.parentNode_.insertBefore(this.newChild_, this.refChild_);
  }

  /**
   * @this {!InsertBefore}
   */
  function undo() {
    this.parentNode_.removeChild(this.newChild_);
  }

  InsertBefore.prototype = Object.create(editing.Operation.prototype, {
    constructor: InsertBefore,
    newChild_: {writable: true},
    parentNode_: {writable: true},
    refChild_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return InsertBefore;
})();

//////////////////////////////////////////////////////////////////////
//
// RemoveAttribute
//
editing.RemoveAttribute = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Element} element
   * @param {string} attrName
   */
  function RemoveAttribute(element, attrName) {
    editing.Operation.call(this, 'removeAttribute');
    this.element_ = element;
    this.attrName_ = attrName;
    this.oldValue_ = element.getAttribute(attrName);
    if (this.oldValue_ === null)
      throw new Error('You can not remove non-existing attribute ' + attrName);
    Object.seal(this);
  }

  /**
   * @this {!RemoveAttribute}
   */
  function redo() {
    this.element_.removeAttribute(this.attrName_);
  }

  /**
   * @this {!RemoveAttribute}
   */
  function undo() {
    this.element_.setAttribute(this.attrName_, this.oldValue_);
  }

  RemoveAttribute.prototype = Object.create(editing.Operation.prototype, {
    constructor: RemoveAttribute,
    attrName_: {writable: true},
    element_: {writable: true},
    oldValue_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return RemoveAttribute;
})();

//////////////////////////////////////////////////////////////////////
//
// RemoveChild
//
editing.RemoveChild = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Node} parentNode
   * @param {Node} oldChild
   */
  function RemoveChild(parentNode, oldChild) {
    editing.Operation.call(this, 'removeChild');
    this.parentNode_ = parentNode;
    this.oldChild_ = oldChild;
    this.refChild_ = oldChild.nextSibling;
    Object.seal(this);
  }

  /**
   * @this {!RemoveChild}
   */
  function redo() {
    this.parentNode_.removeChild(this.oldChild_);
  }

  /**
   * @this {!RemoveChild}
   */
  function undo() {
    this.parentNode_.insertBefore(this.oldChild_, this.refChild_);
  }

  RemoveChild.prototype = Object.create(editing.Operation.prototype, {
    constructor: RemoveChild,
    oldChild_: {writable: true},
    parentNode_: {writable: true},
    refChild_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return RemoveChild;
})();

//////////////////////////////////////////////////////////////////////
//
// ReplaceChild
//
editing.ReplaceChild = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Node} parentNode
   * @param {!Node} newChild
   * @param {Node} oldChild
   */
  function ReplaceChild(parentNode, newChild, oldChild) {
    console.assert(!newChild.parentNode);
    console.assert(parentNode === oldChild.parentNode);
    editing.Operation.call(this, 'replaceChild');
    this.parentNode_ = parentNode;
    this.newChild_ = newChild;
    this.oldChild_ = oldChild;
    Object.seal(this);
  }

  /**
   * @this {!ReplaceChild}
   */
  function redo() {
    this.parentNode_.replaceChild(this.newChild_, this.oldChild_);
  }

  /**
   * @this {!ReplaceChild}
   */
  function undo() {
    this.parentNode_.replaceChild(this.oldChild_, this.newChild_);
  }

  ReplaceChild.prototype = Object.create(editing.Operation.prototype, {
    constructor: ReplaceChild,
    newChild_: {writable: true},
    oldChild_: {writable: true},
    parentNode_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return ReplaceChild;
})();

//////////////////////////////////////////////////////////////////////
//
// SetAttribute
//
editing.SetAttribute = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Element} element
   * @param {string} attrName
   * @param {string} newValue
   */
  function SetAttribute(element, attrName, newValue) {
    if (newValue === null)
      throw new Error('You can not use null for attribute ' + attrName);
    editing.Operation.call(this, 'setAttribute');
    this.element_ = element;
    this.attrName_ = attrName;
    this.newValue_ = newValue;
    this.oldValue_ = element.getAttribute(attrName);
    Object.seal(this);
  }

  /**
   * @this {!SetAttribute}
   */
  function redo() {
    this.element_.setAttribute(this.attrName_, this.newValue_);
  }

  /**
   * @this {!SetAttribute}
   */
  function undo() {
    if (this.oldValue_ === null)
      this.element_.removeAttribute(this.attrName_);
    else
      this.element_.setAttribute(this.attrName_, this.oldValue_);
  }

  SetAttribute.prototype = Object.create(editing.Operation.prototype, {
    constructor: SetAttribute,
    attrName_: {writable: true},
    element_: {writable: true},
    newValue_: {writable: true},
    oldValue_: {writable: true},
    redo: {value: redo},
    undo: {value: undo}
  });

  return SetAttribute;
})();

//////////////////////////////////////////////////////////////////////
//
// SetStyle
// We consolidate inline style changes into one operation to keep ordering
// of STYLE attribute value.
//
editing.SetStyle = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Element} element
   */
  function SetStyle(element) {
    editing.Operation.call(this, 'setStyle');
    this.changes_ = [];
    this.element_ = element;
    this.oldStyleText_ = element.getAttribute('style');
    Object.seal(this);
  }

  /** @type {!Array.<{name: string, value: string}>} */
  SetStyle.prototype.changes_;

  /** @type {!Element} */
  SetStyle.prototype.element_;

  /** @type {string} */
  SetStyle.prototype.oldStyleText_;

  /**
   * @this {!SetStyle}
   */
  function redo() {
    // Restore to initial state.
    this.undo();
    // Apply changes.
    var style = this.element_.style;
    for (var property of this.changes_)
      style[property.name] = property.value;
  }

  /**
   * @this {!SetStyle}
   * @param {string} propertyName
   * @param {string} propertyValue
   */
  function setProperty(propertyName, propertyValue) {
    console.assert(propertyName in this.element_.style,
                   'Unknown CSS property name', propertyName);
    this.changes_.push({name: propertyName, value: propertyValue});
  }

  /**
   * @this {!SetStyle}
   */
  function undo() {
    if (this.oldStyleText_ === null) {
      this.element_.removeAttribute('style');
      return;
    }
    this.element_.setAttribute('style', this.oldStyleText_);
  }

  SetStyle.prototype = Object.create(editing.Operation.prototype, {
    constructor: SetStyle,
    changes_: {writable: true},
    element_: {writable: true},
    oldStyleText_: {writable: true},
    redo: {value: redo},
    setProperty: {value: setProperty},
    undo: {value: undo}
  });

  return SetStyle;
})();

//////////////////////////////////////////////////////////////////////
//
// SplitText
//
editing.SplitText = (function() {
  /**
   * @constructor @final @extends {editing.Operation}
   * @param {!Text} textNode
   * @param {!Text} newNode
   */
  function SplitText(textNode, newNode) {
    editing.Operation.call(this, 'splitText');
    this.newNode_ = newNode;
    this.textNode_ = textNode;
    Object.seal(this);
  }

  /**
   * @this {!SplitText}
   */
  function redo() {
    var text = this.textNode_.nodeValue;
    this.textNode_.nodeValue = text.substr(
        0, text.length - this.newNode_.nodeValue.length);
    this.textNode_.parentNode.insertBefore(this.newNode_,
                                           this.textNode_.nextSibling);
  }

  /**
   * @this {!SplitText}
   */
  function undo() {
    this.textNode_.nodeValue += this.newNode_.nodeValue;
    this.newNode_.parentNode.removeChild(this.newNode_);
  }

  SplitText.prototype = Object.create(editing.Operation.prototype, {
    constructor: SplitText,
    newNode_: {writable: true},
    redo: {value: redo},
    textNode_: {writable: true},
    undo: {value: undo}
  });

  return SplitText;
})();
