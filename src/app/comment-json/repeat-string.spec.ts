import { repeat } from './repeat-string';

const assert = {
  equal: (received, expected): void => expect(received).toEqual(expected),
  throws: (received, expected): void => expect(received).toThrow(expected)
};

describe('repeat', () => {
  test('should return an empty string when a number is not given:', () => {
    assert.equal(repeat('a'), '');
  });

  test('should return an empty string when zero or null is given as the number:', () => {
    assert.equal(repeat('', 0), '');
    assert.equal(repeat('a', 0), '');
    assert.equal(repeat('', null), '');
    assert.equal(repeat('a', null), '');
  });

  test('should repeat the given string n times', () => {
    assert.equal(repeat(' ', 0), '');
    assert.equal(repeat('a', 0), '');
    assert.equal(repeat('a', 1), 'a');
    assert.equal(repeat('a', 2), 'aa');
    assert.equal(repeat('a', 3), 'aaa');
    assert.equal(repeat('   ', 3), '         ');
    assert.equal(repeat('a ', 3), 'a a a ');
    assert.equal(repeat('a', 10), 'aaaaaaaaaa');
    assert.equal(repeat('b ', 10), 'b b b b b b b b b b ');
    assert.equal(repeat('a ', 10), 'a a a a a a a a a a ');
    assert.equal(
      repeat('abc ', 25),
      'abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc '
    );
  });

  test('should allow the multiplier to be a string:', () => {
    assert.equal(repeat('a', '0'), '');
    assert.equal(repeat('a', '1'), 'a');
    assert.equal(repeat('a', '2'), 'aa');
    assert.equal(repeat('a', '10'), 'aaaaaaaaaa');
    assert.equal(repeat('b ', '10'), 'b b b b b b b b b b ');
    assert.equal(repeat('a ', '10'), 'a a a a a a a a a a ');
  });

  test('should cache strings until the string changes:', () => {
    assert.equal(repeat('a', '5'), 'aaaaa');
    assert.equal(repeat('b ', '5'), 'b b b b b ');
    assert.equal(repeat('a ', '5'), 'a a a a a ');
    assert.equal(repeat('c ', '5'), 'c c c c c ');
    assert.equal(repeat('a ', '5'), 'a a a a a ');
    assert.equal(repeat('b ', '5'), 'b b b b b ');
  });

  test('should throw an error when no string is given:', () => {
    assert.throws(() => {
      repeat(10);
    }, /expected a string/);
    assert.throws(() => {
      repeat(null);
    }, /expected a string/);
  });
});
