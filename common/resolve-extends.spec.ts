import { normalizeExtensionName } from './';

describe('extends can be resolved', () => {

  test('Extension names are normalized', () => {
    expect(normalizeExtensionName('plugin:compat/recommended')).toEqual({ configName: 'recommended', moduleName: 'eslint-plugin-compat' });
    expect(normalizeExtensionName('plugin:@typescript-eslint/recommended-requiring-type-checking')).toEqual({ configName: 'recommended-requiring-type-checking', moduleName: '@typescript-eslint/eslint-plugin' });
    expect(normalizeExtensionName('plugin:@foo/bar/a-environment')).toEqual({ configName: 'a-environment', moduleName: '@foo/eslint-plugin-bar' });
  });

});
