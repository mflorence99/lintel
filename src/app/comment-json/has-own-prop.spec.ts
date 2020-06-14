import { hasOwnProperty } from './has-own-prop';

test('hasOwnProperty', () => {
  expect(hasOwnProperty({ a: 42 }, 'a')).toBeTruthy();
  expect(hasOwnProperty({ a: 42 }, 'b')).toBeFalsy();
});
