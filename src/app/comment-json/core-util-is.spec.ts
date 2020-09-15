import * as isa from './core-util-is';

describe('core-util-is', () => {
  test('isArray', () => {
    expect(isa.isArray([])).toBeTruthy();
    expect(isa.isArray({})).toBeFalsy();
    expect(isa.isArray(42)).toBeFalsy();
    Array.isArray = undefined;
    expect(isa.isArray([])).toBeTruthy();
  });

  test('isBoolean', () => {
    expect(isa.isBoolean(true)).toBeTruthy();
    expect(isa.isBoolean(false)).toBeTruthy();
    expect(isa.isBoolean('true')).toBeFalsy();
    expect(isa.isBoolean('false')).toBeFalsy();
  });

  test('isNull', () => {
    expect(isa.isNull(null)).toBeTruthy();
    expect(isa.isNull(undefined)).toBeFalsy();
  });

  test('isNullOrUndefined', () => {
    expect(isa.isNullOrUndefined(null)).toBeTruthy();
    expect(isa.isNullOrUndefined(undefined)).toBeTruthy();
    expect(isa.isNullOrUndefined(42)).toBeFalsy();
  });

  test('isNumber', () => {
    expect(isa.isNumber(42)).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    expect(isa.isNumber(42 + '1')).toBeFalsy();
    expect(isa.isNumber('42')).toBeFalsy();
    expect(isa.isNumber([42])).toBeFalsy();
    expect(isa.isNumber([42].length)).toBeTruthy();
  });

  test('isString', () => {
    expect(isa.isString('42')).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    expect(isa.isString(42 + '1')).toBeTruthy();
    expect(isa.isString(42)).toBeFalsy();
  });

  test('isSymbol', () => {
    expect(isa.isSymbol(Symbol(42))).toBeTruthy();
    expect(isa.isSymbol(42)).toBeFalsy();
  });

  test('isUndefined', () => {
    expect(isa.isUndefined(undefined)).toBeTruthy();
    expect(isa.isUndefined(null)).toBeFalsy();
  });

  test('isRegExp', () => {
    expect(isa.isRegExp(/a/)).toBeTruthy();
    expect(isa.isRegExp(new RegExp('a'))).toBeTruthy();
    expect(isa.isRegExp('a')).toBeFalsy();
  });

  test('isObject', () => {
    expect(isa.isObject({})).toBeTruthy();
    // NOTE: don't think this should be true, but this is just a port
    expect(isa.isObject([])).toBeTruthy();
  });

  test('isDate', () => {
    expect(isa.isDate(new Date('6/13/2020'))).toBeTruthy();
    expect(isa.isDate(Date())).toBeFalsy();
    expect(isa.isDate('6/13/2020')).toBeFalsy();
  });

  test('isError', () => {
    expect(isa.isError(new Error('Oops'))).toBeTruthy();
    expect(isa.isError(new Error())).toBeTruthy();
    expect(isa.isError(Error())).toBeTruthy();
  });

  test('isFunction', () => {
    expect(isa.isFunction(isa.isFunction)).toBeTruthy();
    expect(isa.isFunction(() => 42)).toBeTruthy();
  });

  test('isPrimitive', () => {
    expect(isa.isPrimitive(null)).toBeTruthy();
    expect(isa.isPrimitive(undefined)).toBeTruthy();
    expect(isa.isPrimitive(true)).toBeTruthy();
    expect(isa.isPrimitive(42 === 6 * 7)).toBeTruthy();
    expect(isa.isPrimitive(42)).toBeTruthy();
    expect(isa.isPrimitive('42')).toBeTruthy();
    expect(isa.isPrimitive(Symbol('42'))).toBeTruthy();
    expect(isa.isPrimitive([null])).toBeFalsy();
  });
});
