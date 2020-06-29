import { meldConfigurations } from './';

describe('extends mind meld', () => {

  let config, extension;

  beforeEach(() => {

    config = {
      env: {
        amd: true,
        es6: false
      },
      overrides: [
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            p: 0,
            q: [1, 2, 3],
            r: 'warn'
          }
        }
      ],
      plugins: ['a', 'b'],
      rules: {
        p: 0,
        q: [1, 2, 3],
        r: 'warn'
      }
    };

    extension = {
      env: {
        jest: true
      },
      plugins: ['a', 'b', 'c'],
      overrides: [
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            p: 1,
            q: 'warn',
            r: ['error', 42, true],
            s: ['error', true]
          }
        },
        {
          files: ['*.html'],
          parser: 'x'
        }
      ],
      rules: {
        p: 1,
        q: 'warn',
        r: ['error', 42, true],
        s: ['error', true]
      }
    };

  });

  test('smoke test', () => {
    expect(meldConfigurations({ }, { })).toEqual({ });
  });

  test('objects can be melded', () => {
    expect(meldConfigurations(config, extension)).toEqual(expect.objectContaining({
      env: {
        amd: true,
        es6: false,
        jest: true
      }
    }));
  });

  // TODO: more work here
  test('overrides can be melded', () => {
    meldConfigurations(config, extension);
    expect(config.overrides.length).toBe(2);
    expect(config.overrides[1].parser).toBe('x');
  });

  test('plugins can be melded and deduplicated', () => {
    expect(meldConfigurations(config, extension)).toEqual(expect.objectContaining({
      plugins: ['a', 'b', 'c']
    }));
  });

  test('rules can be melded', () => {
    expect(meldConfigurations(config, extension)).toEqual(expect.objectContaining({
      rules: {
        p: [1],
        q: ['warn', 2, 3],
        r: ['error', 42, true],
        s: ['error', true]
      }
    }));
  });

});
