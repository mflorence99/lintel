import { assign } from './';
import { isFunction } from './core-util-is';
import { isString } from './core-util-is';
import { parse } from './';
import { stringify } from './';

import * as fs from 'fs';
import * as path from 'path';

const is = (received, expected): void => expect(received).toEqual(expected);

const SUBJECTS = [
  'abc',
  1,
  true,
  false,
  null,
  undefined,
  [],
  {},
  { a: 1, b: null },
  ['abc', 1, { a: 1, b: undefined }],
  [undefined, 1, 'abc'],
  {
    a: undefined,
    b: false,
    c: [1, '1'],
    d: 'bar'
  },
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  {
    toJSON(): any {
      return {
        foo: 1
      };
    }
  },
  '"',
  {
    foo: '"',
    bar: '\b'
  }
];

const REPLACERS = [
  null,
  (key, value): any => {
    if (typeof value === 'string') {
      return undefined;
    }

    return value;
  }
];

const SPACES = [
  1,
  2,
  '  ',
  '1'
];

const each = (subjects, replacers, spaces, iterator): void => {
  subjects.forEach((subject, i) => {
    replacers.forEach((replacer, ii) => {
      spaces.forEach((space, iii) => {
        const desc = [subject, replacer, space]
          .map(s =>
            isFunction(s)
              ? 'replacer'
              : JSON.stringify(s)
          )
          .join(', ');

        iterator(subject, replacer, space, desc,
          // prevent title duplication
          `${i}+${ii}+${iii}`);
      });
    });
  });
};

each(SUBJECTS, REPLACERS, SPACES, (subject, replacer, space, desc, i) => {
  test(`${i}: stringify: ${desc}`, () => {
    const compare = [
      JSON.stringify(subject, replacer, space),
      stringify(subject, replacer, space)
    ];

    is(compare[0], compare[1]);
  });
});

const OLD_CASES = [
  'deep',
  'duplex',
  'indent',
  'simple',
  'single-right',
  'single-top'
];

OLD_CASES.forEach(name => {
  [
    '  ',
    2,
    3,
    null
  ].forEach((space: any) => {
    const s = isString(space)
      ? space.length
      : space;

    const fixture = path.join(__dirname, `fixtures/${name}-null-${s}.json`);

    test(`${name}, space: ${s} (${space}): ${fixture}`, () => {
      const content = fs.readFileSync(fixture).toString().trim();
      const parsed = parse(content);
      const str = stringify(parsed, null, space);

      is(str, content);
    });
  });
});

test('#17: has trailing comma and comment after comma', () => {
  const str = `{
  "b": [
    1,
  ],
  "a": 1, // a
}`;

  is(stringify(parse(str), null, 2), `{
  "b": [
    1
  ],
  "a": 1 // a
}`);
});

test('#17: insert key between a and b', () => {
  const str = `{
  "a": 1, // a
  "b": 2, // b
}`;
  const parsed = parse(str);
  const obj = {};
  assign(obj, parsed, ['a']);
  obj['c'] = 3;
  assign(obj, parsed, ['b']);

  is(stringify(obj, null, 2), `{
  "a": 1, // a
  "c": 3,
  "b": 2 // b
}`);
});

test('#18: MEF extensions', () => {
  const str = `{
  a: 1, // a
  b: 2 // b
}`;
  const parsed = parse(str);

  is(stringify(parsed, null, 2, '\'', false), str);
});
