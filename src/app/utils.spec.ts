import { deduplicateArray } from './utils';
import { isObjectEmpty } from './utils';
import { nextTick } from './utils';

describe('Utility functions', () => {

  test('Array can be deduplicated', () => {
    expect(deduplicateArray(['a', 'c', 'e', 'c', 'a'])).toEqual(['a', 'c', 'e']);
  });

  test('Object is empty', () => {
    expect(isObjectEmpty({ })).toBeTruthy();
    expect(isObjectEmpty({ x: 1 })).toBeFalsy();
  });

  test('nextTick works asynchronously', done => {
    const num = 42;
    nextTick(() => {
      expect(num).toEqual(42);
      done();
    });
  });

});
