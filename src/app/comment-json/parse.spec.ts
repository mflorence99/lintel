import * as parser from './';

const is = (received, expected): void => expect(received).toEqual(expected);
const truthy = (received): void => expect(received).toBeTruthy();
const deepEqual = (received, expected): void =>
  expect(received).toEqual(expected);

const cases = [
  {
    d: '#17: after-comma comment, with trailing comma',
    s: `//top
{
  "foo": "bar", // after comma foo
  "bar": "baz", // after comma bar
}`,
    o: '{"foo":"bar","bar":"baz"}',
    e(obj): void {
      is(obj.foo, 'bar');
      is(obj[Symbol.for('after-comma:foo')][0].value, ' after comma foo');
      is(obj[Symbol.for('after-comma:bar')][0].value, ' after comma bar');
    }
  },
  {
    d: '#8: object with trailing comma',
    s: `//top
{
  "foo": "bar",
  // after
}`,
    o: '{"foo":"bar"}',
    e(obj): void {
      is(obj.foo, 'bar');
      is(obj[Symbol.for('after')][0].value, ' after');
    }
  },
  {
    d: '#8: array with trailing comma',
    s: `//top
[1,]`,
    o: '[1]',
    e(obj): void {
      is(Number(obj[0]), 1);
      is(obj[Symbol.for('before-all')][0].value, 'top');
    }
  },
  {
    d: 'comment at the top',
    s: '//top\n{"a":1}',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      is(obj[Symbol.for('before-all')][0].value, 'top');
    }
  },
  {
    d: 'multiple comments at the top, both line and block',
    s: '//top\n/*abc*/{"a":1}',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);

      const [c1, c2] = obj[Symbol.for('before-all')];
      is(c1.value, 'top');
      is(c1.type, 'LineComment');
      is(c2.value, 'abc');
      is(c2.type, 'BlockComment');
    }
  },
  {
    d: 'comment at the bottom',
    s: '{"a":1}\n//bot',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      const [c] = obj[Symbol.for('after-all')];
      is(c.value, 'bot');
    }
  },
  {
    d: 'multiple comments at the bottom, both line and block',
    s: '{"a":1}\n//top\n/*abc*/',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      const [c1, c2] = obj[Symbol.for('after-all')];
      is(c1.value, 'top');
      is(c2.value, 'abc');
    }
  },
  {
    d: 'comment for properties',
    s: '{//a\n"a":1}',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      const [c] = obj[Symbol.for('before:a')];
      is(c.value, 'a');
      is(c.inline, true);
    }
  },
  {
    d: 'comment for properties, multiple at the top',
    s: '{//a\n/*b*/"a":1}',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      const [c1, c2] = obj[Symbol.for('before:a')];
      is(c1.value, 'a');
      is(c1.inline, true);
      is(c2.value, 'b');
      is(c2.inline, false);
    }
  },
  {
    d: 'comment for properties, both top and right',
    s: '{//a\n"a":1//b\n}',
    o: '{"a":1}',
    e(obj): void {
      is(obj.a, 1);
      const [c] = obj[Symbol.for('after-value:a')];
      is(c.value, 'b');
      is(c.inline, true);
    }
  },
  {
    // #8
    d: 'support negative numbers',
    s: '{//a\n"a": -1}',
    o: '{"a": -1}',
    e(obj): void {
      is(obj.a, -1);
    }
  },
  {
    d: 'inline comment after prop',
    s: `{
"a" /* a */: 1
    }`,
    o: '{"a":1}',
    e(obj): void {
      const [c] = obj[Symbol.for('after-prop:a')];
      is(c.value, ' a ');
      is(c.inline, true);
    }
  },
  {
    d: 'inline comment after comma',
    s: `{
      "a": 1, // a
      "b": 2
    }`,
    o: '{"a":1,"b":2}',
    e(obj): void {
      is(obj.a, 1);
      is(obj.b, 2);
      const [c] = obj[Symbol.for('after-comma:a')];
      is(c.value, ' a');
      is(c.inline, true);
    }
  },
  {
    d: 'array',
    s: `{
      "a": /*a*/ [ // b
        //c
        1 /*m*/ , // d
        // e
        2
        // n
      ] /*
g*/ //g2
      //h
      ,
      "b" /*i*/
      // j
        :
        // k
        1
    } // f
    //l`,
    o: `{
      "a": [1, 2],
      "b": 1
    }`,
    e(obj): void {
      is(obj.a[0], 1);
      is(obj.a[1], 2);

      const [g, g2, h] = obj[Symbol.for('after-value:a')];

      deepEqual(g, {
        type: 'BlockComment',
        value: '\ng',
        inline: true,
        loc: {
          start: {
            line: 8,
            column: 8
          },
          end: {
            line: 9,
            column: 3
          }
        }
      });
      deepEqual(g2, {
        type: 'LineComment',
        value: 'g2',
        inline: true,
        loc: {
          start: {
            line: 9,
            column: 4
          },
          end: {
            line: 9,
            column: 8
          }
        }
      });
      deepEqual(h, {
        type: 'LineComment',
        value: 'h',
        inline: false,
        loc: {
          start: {
            line: 10,
            column: 6
          },
          end: {
            line: 10,
            column: 9
          }
        }
      });

      const [i, j] = obj[Symbol.for('after-prop:b')];
      is(i.value, 'i');
      is(i.inline, true);
      is(j.value, ' j');

      const [k] = obj[Symbol.for('after-colon:b')];
      is(k.value, ' k');

      const [b, c] = obj.a[Symbol.for('before:0')];
      is(b.value, ' b');
      is(c.value, 'c');

      const [d] = obj.a[Symbol.for('after-comma:0')];
      is(d.value, ' d');

      const [e] = obj.a[Symbol.for('before:1')];
      is(e.value, ' e');

      const [n] = obj.a[Symbol.for('after-value:1')];
      is(n.value, ' n');

      const [m] = obj.a[Symbol.for('after-value:0')];
      is(m.value, 'm');

      const [f, l] = obj[Symbol.for('after-all')];
      is(f.value, ' f');
      is(f.inline, true);
      is(l.value, 'l');
      is(l.inline, false);
    }
  }
];

cases.forEach((c) => {
  test(c.d, () => {
    c.e(parser.parse(c.s));
  });

  test(`${c.d}, removes comments`, () => {
    deepEqual(parser.parse(c.s, null, true), parser.parse(c.o));
  });
});

const invalid = [
  ['{', 1, 1],
  ['}', 1, 0],
  ['[', 1, 1],
  ['', 1, 0],
  // MEF 6/14/2020 -- actually, this is valid now
  // ['{a:1}', 1, 1],
  ['{"a":a}', 1, 5],
  ['{"a":undefined}', 1, 5]
];

const removesPosition = (s): string =>
  s.replace(/\s+in JSON at position.+$/, '');

// ECMA262 does not define the standard of error messages.
// However, we throw error messages the same as JSON.parse()
invalid.forEach(([i, line, col]) => {
  test(`error message:${i}`, () => {
    let error;
    let err;

    try {
      parser.parse(i);
    } catch (e) {
      error = e;
    }

    try {
      JSON.parse(i as string);
    } catch (e) {
      err = e;
    }

    is(!!(err && error), true);
    is(error.message, removesPosition(err.message));

    if (line !== undefined && col !== undefined) {
      is(error.line, line);
      is(error.column, col);
    }
  });
});

test('reviver', () => {
  is(
    parser.parse(
      '{"p": 5}',
      (key, value) =>
        typeof value === 'number'
          ? value * 2 // return value * 2 for numbers
          : value // return everything else unchanged
    ).p,
    10
  );
});

test('special: null', () => {
  is(parser.parse('// abc\nnull'), null);
});

test('special: 1', () => {
  const result = parser.parse('//abc\n1');

  is(Number(result), 1);
  is(result[Symbol.for('before-all')][0].value, 'abc');
});

test('special: "foo"', () => {
  const result = parser.parse('//abc\n"foo"');

  is(String(result), 'foo');
  is(result[Symbol.for('before-all')][0].value, 'abc');
});

test('special: true', () => {
  const result = parser.parse('//abc\ntrue');

  truthy(Boolean(result));
  is(result[Symbol.for('before-all')][0].value, 'abc');
});
