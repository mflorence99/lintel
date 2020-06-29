import '../../assets/eslint-rules.js';

import { RulesStateModel } from '../state/rules';
import { Utils } from './utils';

import { prepare } from './service.spec';

declare const eslintRules: RulesStateModel;
declare let lintelSearchParams;

describe('Utils', () => {

  let services;

  beforeEach(() => services = prepare([Utils]));

  test('Object can be deep copied', () => {
    const utils: Utils = services[0];
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = utils.deepCopy(obj1);
    expect(obj1.b.c).toEqual(obj2.b.c);
  });

  test('Object can be deep searched', () => {
    const utils: Utils = services[0];
    utils.deepSearch(eslintRules, '$ref', (obj, _) => {
      expect(obj['$ref']).toBeTruthy();
    });
  });

  test('Object can be deep searched', () => {
    const utils: Utils = services[0];
    utils.deepSearch(eslintRules, 'name=allowSingleLine', (_, obj) => {
      expect(obj.type).toEqual('boolean');
    });
  });

  test('two arrays can be diffed', () => {
    const a = [1, 2, 3];
    const b = [4, 3, 2, 0];
    const utils: Utils = services[0];
    expect(utils.diff(a, b)).toEqual([1]);
  });

  test('Object exists', () => {
    const utils: Utils = services[0];
    expect(utils.exists({ })).toBe(false);
    expect(utils.exists({ x: 1 })).toBe(true);
    expect(utils.exists(null)).toBe(false);
    expect(utils.exists(undefined)).toBe(false);
    expect(utils.exists('')).toBe(false);
    expect(utils.exists('x')).toBe(true);
    expect(utils.exists([])).toBe(false);
    expect(utils.exists([0])).toBe(true);
    expect(utils.exists(0)).toBe(true);
    expect(utils.exists(false)).toBe(true);
  });

  test('Object is empty', () => {
    const utils: Utils = services[0];
    expect(utils.isEmptyObject({ })).toBe(true);
    expect(utils.isEmptyObject({ x: 1 })).toBe(false);
  });

  test('longestCommonPrefix', () => {
    const strings = [];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      'c:/users/project/.eslintrc.json'
    ];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('c:/users/project/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      'c:/users/project/.eslintrc.json',
      'c:/users/project/.eslintrc.yaml'
    ];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('c:/users/project/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      '/home/mflorence99/el-3270/.eslintrc.json',
      '/home/mflorence99/lintel/package.json',
      '/home/mflorence99/lintel/src/.eslintrc.js'
    ];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('/home/mflorence99/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      '/home/experiments/el-3270/.eslintrc.json',
      '/home/mflorence99/lintel/package.json',
      '/home/mflorence99/lintel/src/.eslintrc.js'
    ];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('/home/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      '/home/experiments/el-3270/.eslintrc.json'
    ];
    const utils: Utils = services[0];
    expect(utils.longestCommonPrefix(strings)).toBe('/home/experiments/el-3270/');
  });

  test('nextTick works asynchronously', done => {
    const num = 42;
    const utils: Utils = services[0];
    utils.nextTick(() => {
      expect(num).toEqual(42);
      done();
    });
  });

  test('parseInitialSearchParams analyzes normal query string', () => {
    lintelSearchParams = '?w=hello&x=false&y=true&z=42';
    const utils: Utils = services[0];
    const searchParams = utils.parseInitialSearchParams();
    expect(searchParams.w).toBe('hello');
    expect(searchParams.x).toBe(false);
    expect(searchParams.y).toBe(true);
    expect(searchParams.z).toBe(42);
  });

  test('parseInitialSearchParams analyzes empty query string', () => {
    lintelSearchParams = undefined;
    const utils: Utils = services[0];
    const searchParams = utils.parseInitialSearchParams();
    expect(utils.isEmptyObject(searchParams)).toBeTruthy();
  });

  test('safeEval', () => {
    const utils: Utils = services[0];
    expect(utils.safeEval(utils, 'safeEval')).toBeTruthy();
    expect(utils.safeEval(this, 'xxx', [])).toEqual([]);
    expect(utils.safeEval(this, 'xxx.yyy', { })).toEqual({ });
  });

});
