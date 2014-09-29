// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//////////////////////////////////////////////////////////////////////
//
// Map
//

/**
 * @template KEY, VALUE
 * @constructor
 * @final
 */
function Map() {}

/**
 * @this {Map.<KEY,VALUE>}
 * @param {KEY} key
 * @return {(VALUE|undefined)}
 */
Map.prototype.get = function(key) {};

/**
 * @this {Map.<KEY,VALUE>}
 * @param {KEY} key
 * @param {VALUE} value
 */
Map.prototype.set = function(key, value) {};

/** @type {number} */
Map.prototype.size;

//////////////////////////////////////////////////////////////////////
//
// Set
//

/**
 * @template KEY
 * @constructor
 * @final
 * @param {Array.<KEY>=} opt_members
 */
function Set(opt_members) {}

/**
 * @this {Set.<KEY>}
 * @param {KEY} key
 */
Set.prototype.add = function(key) {};

/**
 * @this {Set.<KEY>}
 * @param {KEY} key
 * @return {boolean}
 */
Set.prototype.has = function(key) {};

/** @type {number} */
Set.prototype.size;

//////////////////////////////////////////////////////////////////////
//
// String
//

/**
 * @param {string} searchString
 * @param {number=} opt_position
 * @return {boolean}
 */
String.prototype.endsWith = function(searchString, opt_position) {};

/**
 * @param {string} searchString
 * @param {number=} opt_position
 * @return {boolean}
 */
String.prototype.startsWith = function(searchString, opt_position) {};

//////////////////////////////////////////////////////////////////////
//
// Symbol
//
/** @constructor */
function Symbol(string) {}

Symbol.iterator;
