import { meldConfigurations } from './meld-configurations';
import { normalizeConfiguration } from './meld-configurations';

import 'jest-extended';

describe('meld-configurations', () => {
  let config, extension, normalized, unnormalized;

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

    normalized = {
      extends: ['x'],
      globals: {
        a: 'writable',
        b: 'readonly',
        c: 'readonly'
      },
      ignorePatterns: ['*.tsx'],
      plugins: ['p'],
      rules: {
        p: ['off'],
        q: ['warn'],
        r: ['error']
      }
    };

    unnormalized = {
      extends: 'x',
      globals: {
        a: true,
        b: false,
        c: 'readonly'
      },
      ignorePatterns: '*.tsx',
      plugins: 'p',
      rules: {
        p: 0,
        q: 1,
        r: 2
      }
    };
  });

  test('smoke test', () => {
    expect(meldConfigurations({}, {})).toEqual({});
  });

  test('configurations can be normalized', () => {
    expect(normalizeConfiguration(unnormalized)).toEqual(normalized);
  });

  test('objects can be melded', () => {
    expect(meldConfigurations(config, extension)).toEqual(
      expect.objectContaining({
        env: {
          amd: true,
          es6: false,
          jest: true
        }
      })
    );
  });

  // TODO: more work here
  test('overrides can be melded', () => {
    meldConfigurations(config, extension);
    expect(config.overrides.length).toBe(2);
    expect(config.overrides[1].parser).toBe('x');
  });

  test('plugins can be melded and deduplicated', () => {
    expect(meldConfigurations(config, extension)).toEqual(
      expect.objectContaining({
        plugins: ['a', 'b', 'c']
      })
    );
  });

  test('rules can be melded', () => {
    expect(meldConfigurations(config, extension)).toEqual(
      expect.objectContaining({
        rules: {
          p: [1],
          q: ['warn', 2, 3],
          r: ['error', 42, true],
          s: ['error', true]
        }
      })
    );
  });
});
