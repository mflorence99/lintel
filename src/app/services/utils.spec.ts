import { Utils } from './utils';

import { prepare } from './service.spec';

describe('Utils', () => {

  let services;

  beforeEach(() => services = prepare([Utils]));

  test('Array can be deduplicated', () => {
    const utils: Utils = services[0];
    expect(utils.deduplicateArray(['a', 'c', 'e', 'c', 'a'])).toEqual(['a', 'c', 'e']);
  });

  test('Object is empty', () => {
    const utils: Utils = services[0];
    expect(utils.isObjectEmpty({ })).toBeTruthy();
    expect(utils.isObjectEmpty({ x: 1 })).toBeFalsy();
  });

  test('nextTick works asynchronously', done => {
    const num = 42;
    const utils: Utils = services[0];
    utils.nextTick(() => {
      expect(num).toEqual(42);
      done();
    });
  });

});
