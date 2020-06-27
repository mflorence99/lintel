import { LinkifyPipe } from './linkify';

const before = `Blah blah
https://www.google.com blah blah
www.google.com/error blah blah
mflo999@gmail.com blah blah`;

const after = `Blah blah
<a href="https://www.google.com" target="_blank">https://www.google.com</a> blah blah
<a href="http://www.google.com/error" target="_blank">www.google.com/error</a> blah blah
<a href="mailto:mflo999@gmail.com">mflo999@gmail.com</a> blah blah`;

describe('LinkifyPipe', () => {

  test('null returns default', () => {
    const linkify = new LinkifyPipe();
    expect(linkify.transform(null, 'default')).toEqual('default');
  });

  test('links are not transformed again', () => {
    const linkify = new LinkifyPipe();
    expect(linkify.transform(after)).toEqual(after);
  });

  test('links are transformed', () => {
    const linkify = new LinkifyPipe();
    expect(linkify.transform(before)).toEqual(after);
  });

});
