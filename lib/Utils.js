"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipOverride = void 0;

// override component skipped only if 'null' (undefined by default)
var skipOverride = function skipOverride(component) {
  return component === null;
};

exports.skipOverride = skipOverride;