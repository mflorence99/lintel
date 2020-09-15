import { CommentArray } from './array';

import { assign } from './array';
import { isArray } from './core-util-is';
import { isFunction } from './core-util-is';
import { isObject } from './core-util-is';
import { isString } from './core-util-is';
import { parse } from './parse';
import { stringify } from './stringify';

const is = (received, expected): void => expect(received).toEqual(expected);
const deepEqual = (received, expected): void =>
  expect(received).toEqual(expected);
const throws = (received, expected): void => expect(received).toThrow(expected);

const st = (o): string => stringify(o, null, 2);

const a1 = `[
  // 0
  0,
  // 1
  1,
  // 2
  2
]`;

const a2 = `[
  // 1
  1,
  // 2
  2
]`;

const a3 = `[
  // 0
  0
]`;

// ret: return value to expect
const texpect = (ret, str, r, rr): void => {
  if (isObject(ret)) {
    deepEqual(r, ret);
  } else {
    is(r, ret);
  }

  if (isString(rr)) {
    is(rr, str);
  } else {
    is(st(rr), str);
  }
};

const slice = (ret, str) => (r, _x, _y, rr): void => texpect(ret, str, r, rr);

const unshift = (ret, str) => (r, s): void => texpect(ret, str, r, s);

const CASES = [
  [
    // title
    'splice(0, 1)',
    // input array
    a1,
    // run
    (array): any => array.splice(0, 1),
    // expect function or expected value of the result array
    [0],
    // expected stringified string
    a2
  ],
  ['splice(0)', a1, (array): any => array.splice(0), [0, 1, 2], '[]'],
  ['splice(- 3, 1)', a1, (array): any => array.splice(-3, 1), [0], a2],
  [
    '#16: splice(1, 0, 3)',
    a1,
    (array): any => array.splice(1, 0, 3),
    [],
    `[
  // 0
  0,
  3,
  // 1
  1,
  // 2
  2
]`
  ],
  [
    'invalid: splice(0, undefined)',
    a1,
    (array): any => array.splice(0, undefined),
    [],
    a1
  ],
  ['slice(0)', a1, (array): any => array.slice(0), [0, 1, 2], a1],
  [
    'slice(-1)',
    a1,
    (array): any => array.slice(-1),
    slice(
      [2],
      `[
  // 2
  2
]`
    )
  ],
  ['slice(3)', a1, (array): any => array.slice(3), slice([], '[]')],
  [
    'slice(undefined, undefined)',
    a1,
    (array): any => array.slice(),
    slice([0, 1, 2], a1)
  ],
  ['slice(0, - 2)', a1, (array): any => array.slice(0, -2), slice([0], a3)],
  ['slice(0, 1)', a1, (array): any => array.slice(0, 1), slice([0], a3)],
  ['unshift()', a1, (array): any => array.unshift(), unshift(3, a1)],
  [
    'unshift(- 1)',
    a1,
    (array): any => array.unshift(-1),
    unshift(
      4,
      `[
  -1,
  // 0
  0,
  // 1
  1,
  // 2
  2
]`
    )
  ],
  [
    'shift',
    a1,
    (array): any => array.shift(),
    unshift(
      0,
      `[
  // 1
  1,
  // 2
  2
]`
    )
  ],
  [
    'reverse',
    a1,
    (array): any => array.reverse(),
    unshift(
      [2, 1, 0],
      `[
  // 2
  2,
  // 1
  1,
  // 0
  0
]`
    )
  ],
  [
    'pop',
    a1,
    (array): any => array.pop(),
    unshift(
      2,
      `[
  // 0
  0,
  // 1
  1
]`
    )
  ]
];

CASES.forEach(([d, a, run, e, s]: [any, any, any, any, any]) => {
  test(d, () => {
    const parsed = parse(a);
    const ret = run(parsed);

    const expect = isFunction(e)
      ? e
      : (r, str): void => {
          deepEqual(r, e);
          is(str, s);
        };

    expect(
      isArray(ret)
        ? // clean ret
          [...ret]
        : ret,
      st(parsed),
      parsed,
      ret
    );
  });
});

test('assign', () => {
  const str = `{
  // a
  "a": 1,
  // b
  "b": 2
}`;

  const parsed = parse(str);

  is(st(assign({}, parsed)), str);
  is(st(assign({})), '{}');

  is(
    st(assign({}, parsed, ['a', 'c'])),
    `{
  // a
  "a": 1
}`
  );

  throws(() => assign({}, parsed, false), /keys/);
  throws(() => assign(), /convert/);
});

test('assign -- MEF extensions', () => {
  const str = `{
  // a
  "a": 1,
  "b": {
    // b
    "x": 3, // x
    "y": 4 // y
  }
}`;

  const parsed = parse(str);

  is(st(assign({}, parsed)), str);
});

test('concat', () => {
  const parsed = parse(`[
  // bar
  "bar",
  // baz,
  "baz"
]`);

  const concated = new CommentArray('quux' as any).concat('qux', parsed);

  is(
    stringify(concated, null, 2),
    `[
  "quux",
  "qux",
  // bar
  "bar",
  // baz,
  "baz"
]`
  );

  is(stringify(new CommentArray().concat()), '[]');
});
