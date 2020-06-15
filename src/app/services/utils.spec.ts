import '../../assets/eslint-rules.js';

import { RulesStateModel } from '../state/rules';
import { Utils } from './utils';

import { prepare } from './service.spec';

declare const eslintRules: RulesStateModel;
declare let lintelSearchParams;

describe('Utils', () => {

  let services;

  beforeEach(() => services = prepare([Utils]));

  test('Array can be deduplicated', () => {
    const utils: Utils = services[0];
    expect(utils.deduplicateArray(['a', 'c', 'e', 'c', 'a'])).toEqual(['a', 'c', 'e']);
  });

  test('Object can be deep copied', () => {
    const utils: Utils = services[0];
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = utils.deepCopy(obj1);
    expect(obj1.b.c).toEqual(obj2.b.c);
  });

  test('Object can be deep searched', done => {
    const utils: Utils = services[0];
    utils.deepSearch(eslintRules, '$ref', (container, _) => {
      expect(container['$ref']).toBeTruthy();
      done();
    });
  });

  test('Object is empty', () => {
    const utils: Utils = services[0];
    expect(utils.isEmptyObject({ })).toBeTruthy();
    expect(utils.isEmptyObject({ x: 1 })).toBeFalsy();
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

});
