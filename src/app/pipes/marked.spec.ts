import { MarkedPipe } from './marked';

import 'jest-extended';

const before = 'Blah blah [Google](https://www.google.com) blah blah';

const after =
  'Blah blah <cite><a target="_blank" href="https://www.google.com">Google</a></cite> blah blah';

describe('MarkedPipe', () => {
  test('null returns default', () => {
    const linkify = new MarkedPipe();
    expect(linkify.transform(null, 'default')).toBe('default');
  });

  test('links are transformed', () => {
    const linkify = new MarkedPipe();
    expect(linkify.transform(before)).toContain(after);
  });
});
