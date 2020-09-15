// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

/* eslint-disable */

export function isArray(arg): boolean {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}

export function isBoolean(arg): boolean {
  return typeof arg === 'boolean';
}

export function isNull(arg): boolean {
  return arg === null;
}

export function isNullOrUndefined(arg): boolean {
  return arg == null;
}

export function isNumber(arg): boolean {
  return typeof arg === 'number';
}

export function isString(arg): boolean {
  return typeof arg === 'string';
}

export function isSymbol(arg): boolean {
  return typeof arg === 'symbol';
}

export function isUndefined(arg): boolean {
  return arg === void 0;
}

export function isRegExp(re): boolean {
  return objectToString(re) === '[object RegExp]';
}

export function isObject(arg): boolean {
  //oh well, this is just a port
  return typeof arg === 'object' && arg !== null /* && !isArray(arg) ??? */;
}

export function isDate(d): boolean {
  return objectToString(d) === '[object Date]';
}

export function isError(e): boolean {
  // hey -- didn't we say we wouldn't use instanceof ??
  return objectToString(e) === '[object Error]' /* || e instanceof Error */;
}

export function isFunction(arg): boolean {
  return typeof arg === 'function';
}

export function isPrimitive(arg): boolean {
  return (
    arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined'
  );
}

// exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
