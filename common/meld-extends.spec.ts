import { meldExtends } from './';

describe('extends mind meld', () => {

  test('smoke test', () => {
    expect(meldExtends(null, { })).toEqual({ });
  });

});
