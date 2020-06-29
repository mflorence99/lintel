import { meldConfigurations } from './';

const config = {
  env: {
    amd: true,
    es6: false
  }
};

const extension = {
  env: {
    jest: true
  }
};

describe('extends mind meld', () => {

  test('smoke test', () => {
    expect(meldConfigurations({ }, { })).toEqual({ });
  });

  test('objects can be melded', () => {
    expect(meldConfigurations(config, extension)).toEqual(expect.objectContaining({
      amd: true,
      es6: false,
      jest: true
    }));
  });

});
