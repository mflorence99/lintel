import '../../assets/eslint-rules.js';

import { RulesStateModel } from '../state/rules';
import { Utils } from './utils';

import { prepare } from './service.spec';

import 'jest-extended';

import { TestBed } from '@angular/core/testing';

declare const eslintRules: RulesStateModel;
declare let lintelSearchParams;

describe('Utils', () => {
  beforeEach(() => prepare());

  test('two arrays can be compared for equality', () => {
    const utils: Utils = TestBed.inject(Utils);
    const a = [1, 2, 3];
    const b = [3, 2, 1];
    expect(utils.arraysEqual(a, b)).toBeTrue();
    const p = [1, 2, 3];
    const q = [3, 'two', 1];
    expect(utils.arraysEqual(p, q)).toBeFalse();
  });

  test('Object can be deep copied', () => {
    const utils: Utils = TestBed.inject(Utils);
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = utils.deepCopy(obj1);
    expect(obj1.b.c).toEqual(obj2.b.c);
  });

  test('hasProperty (string)', () => {
    const utils: Utils = TestBed.inject(Utils);
    const obj = { a: 1, b: { c: 2 } };
    expect(utils.hasProperty(obj, 'a')).toBeTrue();
    expect(utils.hasProperty(obj, 'c')).toBeFalse();
  });

  test('hasProperty (regex)', () => {
    const utils: Utils = TestBed.inject(Utils);
    const obj = { alpha: 1, aLPHA: { gamma: 2 } };
    expect(utils.hasProperty(obj, /^[a-z]*$/)).toBeTrue();
    expect(utils.hasProperty(obj, /^[A-Z]*$/)).toBeFalse();
  });

  test('Object can be deep searched', () => {
    const utils: Utils = TestBed.inject(Utils);
    utils.deepSearch(eslintRules, '$ref', (obj, _) => {
      expect(obj['$ref']).toBeTruthy();
    });
  });

  test('Object can be deep searched', () => {
    const utils: Utils = TestBed.inject(Utils);
    utils.deepSearch(eslintRules, 'name=allowSingleLine', (_, obj) => {
      expect(obj.type).toEqual('boolean');
    });
  });

  test('two arrays can be diffed', () => {
    const a = [1, 2, 3];
    const b = [4, 3, 2, 0];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.diffArrays(a, b)).toEqual([1]);
  });

  test('Object exists', () => {
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.exists({})).toBeFalse();
    expect(utils.exists({ x: 1 })).toBeTrue();
    expect(utils.exists(null)).toBeFalse();
    expect(utils.exists(undefined)).toBeFalse();
    expect(utils.exists('')).toBeFalse();
    expect(utils.exists('x')).toBeTrue();
    expect(utils.exists([])).toBeFalse();
    expect(utils.exists([0])).toBeTrue();
    expect(utils.exists(0)).toBeTrue();
    expect(utils.exists(false)).toBeTrue();
  });

  test('Object is empty', () => {
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.isEmptyObject({})).toBeTrue();
    expect(utils.isEmptyObject({ x: 1 })).toBeFalse();
  });

  test('longestCommonPrefix', () => {
    const strings = [];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe('');
  });

  test('longestCommonPrefix', () => {
    const strings = ['c:/users/project/.eslintrc.json'];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe('c:/users/project/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      'c:/users/project/.eslintrc.json',
      'c:/users/project/.eslintrc.yaml'
    ];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe('c:/users/project/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      '/home/mflorence99/el-3270/.eslintrc.json',
      '/home/mflorence99/lintel/package.json',
      '/home/mflorence99/lintel/src/.eslintrc.js'
    ];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe('/home/mflorence99/');
  });

  test('longestCommonPrefix', () => {
    const strings = [
      '/home/experiments/el-3270/.eslintrc.json',
      '/home/mflorence99/lintel/package.json',
      '/home/mflorence99/lintel/src/.eslintrc.js'
    ];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe('/home/');
  });

  test('longestCommonPrefix', () => {
    const strings = ['/home/experiments/el-3270/.eslintrc.json'];
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.longestCommonPrefix(strings)).toBe(
      '/home/experiments/el-3270/'
    );
  });

  test('nextTick works asynchronously', (done) => {
    const num = 42;
    const utils: Utils = TestBed.inject(Utils);
    utils.nextTick(() => {
      expect(num).toEqual(42);
      done();
    });
  });

  test('parseInitialSearchParams analyzes normal query string', () => {
    lintelSearchParams = '?w=hello&x=false&y=true&z=42';
    const utils: Utils = TestBed.inject(Utils);
    const searchParams = utils.parseInitialSearchParams();
    expect(searchParams.w).toBe('hello');
    expect(searchParams.x).toBeFalse();
    expect(searchParams.y).toBeTrue();
    expect(searchParams.z).toBe(42);
  });

  test('parseInitialSearchParams analyzes empty query string', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lintelSearchParams = undefined;
    const utils: Utils = TestBed.inject(Utils);
    const searchParams = utils.parseInitialSearchParams();
    expect(utils.isEmptyObject(searchParams)).toBeTruthy();
  });

  test('safeEval', () => {
    const utils: Utils = TestBed.inject(Utils);
    expect(utils.safeEval(utils, 'safeEval')).toBeTruthy();
    expect(utils.safeEval(this, 'xxx', [])).toEqual([]);
    expect(utils.safeEval(this, 'xxx.yyy', {})).toEqual({});
  });
});
