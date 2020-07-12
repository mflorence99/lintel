import { detectIndent } from './detect-indent';

import * as fs from 'fs';
import * as path from 'path';

const getFile = (file): string => fs.readFileSync(path.join(__dirname, file), 'utf8');

const is = (received, expected): void => expect(received).toEqual(expected);
const deepEqual = (received, expected): void => expect(received).toEqual(expected);

test('detect the indent of a file with space indent', () => {
  is(detectIndent(getFile('fixtures/space')).indent, '    ');
});

test('return indentation stats for spaces', () => {
  const stats = detectIndent(getFile('fixtures/space'));
  deepEqual(stats, {
    amount: 4,
    indent: '    ',
    type: 'space',
    quotes: '\''
  });
});

test('return indentation stats for multiple tabs', () => {
  const stats = detectIndent(getFile('fixtures/tab-four'));
  deepEqual(stats, {
    amount: 4,
    indent: '\t\t\t\t',
    type: 'tab',
    quotes: '\''
  });
});

test('detect the indent of a file with tab indent', () => {
  is(detectIndent(getFile('fixtures/tab')).indent, '\t');
});

test('return indentation stats for tabs', () => {
  const stats = detectIndent(getFile('fixtures/tab'));
  deepEqual(stats, {
    amount: 1,
    indent: '\t',
    type: 'tab',
    quotes: '\''
  });
});

test('detect the indent of a file with equal tabs and spaces', () => {
  is(detectIndent(getFile('fixtures/mixed-tab')).indent, '\t');
});

test('return indentation stats for equal tabs and spaces', () => {
  const indent = detectIndent(getFile('fixtures/mixed-tab'));
  deepEqual(indent, {
    amount: 1,
    indent: '\t',
    type: 'tab',
    quotes: '\''
  });
});

test('detect the indent of a file with mostly spaces', () => {
  const stats = detectIndent(getFile('fixtures/mixed-space'));
  is(stats.indent, '    ');
});

test('return indentation stats for mostly spaces', () => {
  const stats = detectIndent(getFile('fixtures/mixed-space'));
  deepEqual(stats, {
    amount: 4,
    indent: '    ',
    type: 'space',
    quotes: '\''
  });
});

test('detect the indent of a weirdly indented vendor prefixed CSS', () => {
  const stats = detectIndent(getFile('fixtures/vendor-prefixed-css'));
  is(stats.indent, '    ');
});

test('return indentation stats for various spaces', () => {
  const stats = detectIndent(getFile('fixtures/vendor-prefixed-css'));
  deepEqual(stats, {
    amount: 4,
    indent: '    ',
    type: 'space',
    quotes: '\''
  });
});

test('return `0` when there is no indentation', () => {
  is(detectIndent('<ul></ul>').amount, 0);
});

test('return indentation stats for no indentation', () => {
  const stats = detectIndent('<ul></ul>');
  deepEqual(stats, {
    amount: 0,
    indent: '',
    type: undefined,
    quotes: '\''
  });
});

test('return indentation stats for fifty-fifty indented files with spaces first', () => {
  const stats = detectIndent(getFile('fixtures/fifty-fifty-space-first'));
  deepEqual(stats, {
    amount: 4,
    indent: '    ',
    type: 'space',
    quotes: '\''
  });
});

test('return indentation stats for fifty-fifty indented files with tabs first', () => {
  const stats = detectIndent(getFile('fixtures/fifty-fifty-tab-first'));
  deepEqual(stats, {
    amount: 1,
    indent: '\t',
    type: 'tab',
    quotes: '\''
  });
});

test('return indentation stats for indented files with spaces and tabs last', () => {
  const stats = detectIndent(getFile('fixtures/space-tab-last'));
  deepEqual(stats, {
    amount: 1,
    indent: '\t',
    type: 'tab',
    quotes: '\''
  });
});

// MEF 6/13/2020
test('throw TypeError if not passed a string', () => {
  expect(() => detectIndent(42)).toThrow('Expected a string');
});
