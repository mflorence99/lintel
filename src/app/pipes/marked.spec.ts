import { MarkedPipe } from './marked';

const before = 'Blah blah [Google](https://www.google.com) blah blah';

const after = 'Blah blah <a target="_blank" href="https://www.google.com">Google</a> blah blah';

describe('MarkedPipe', () => {

  test('null returns default', () => {
    const linkify = new MarkedPipe();
    expect(linkify.transform(null, 'default')).toEqual('default');
  });

  test('links are transformed', () => {
    const linkify = new MarkedPipe();
    expect(linkify.transform(before)).toContain(after);
  });

});
