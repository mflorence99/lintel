import { normalizeExtensionName } from './resolve-extends';
import { requireExtension } from './resolve-extends';
import { resolveExtension } from './resolve-extends';

describe('resolve-extends', () => {
  test('Extension names are normalized', () => {
    expect(normalizeExtensionName('/this/that.js')).toEqual({
      moduleName: '/this/that.js'
    });
    expect(normalizeExtensionName('./that.js')).toEqual({
      moduleName: './that.js'
    });
    expect(normalizeExtensionName('eslint:all')).toEqual({
      moduleName: 'eslint:all'
    });
    expect(normalizeExtensionName('plugin:compat/recommended')).toEqual({
      configName: 'recommended',
      moduleName: 'eslint-plugin-compat'
    });
    expect(
      normalizeExtensionName(
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      )
    ).toEqual({
      configName: 'recommended-requiring-type-checking',
      moduleName: '@typescript-eslint/eslint-plugin'
    });
    expect(normalizeExtensionName('plugin:@foo/bar/a-environment')).toEqual({
      configName: 'a-environment',
      moduleName: '@foo/eslint-plugin-bar'
    });
    expect(normalizeExtensionName('eslint-config-google')).toEqual({
      moduleName: 'eslint-config-google'
    });
    expect(normalizeExtensionName('google')).toEqual({
      moduleName: 'eslint-config-google'
    });
    expect(normalizeExtensionName('@google')).toEqual({
      moduleName: '@google/eslint-config'
    });
    expect(normalizeExtensionName('@google/eslint-config-special')).toEqual({
      moduleName: '@google/eslint-config-special'
    });
  });

  test('Extension can be required', () => {
    let result = requireExtension('eslint:recommended', __filename);
    expect(result.extension).toBeTruthy();
    expect(result.modulePath).toEqual(__filename);
    result = requireExtension('plugin:jest/recommended', __filename);
    expect(result.extension).toBeTruthy();
    expect(
      result.modulePath.endsWith('node_modules/eslint-plugin-jest/lib/index.js')
    ).toBe(true);
    result = requireExtension('google', __filename);
    expect(result.extension.rules).toBeTruthy();
    result = requireExtension('eslint', __filename);
    expect(result.extension.extends).toBeTruthy();
  });

  test('Extension can be fully resolved', () => {
    let extension = resolveExtension('plugin:vue/recommended', __filename);
    expect(extension.plugins).toEqual(['vue']);
    extension = resolveExtension(
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      __filename
    );
    expect(extension.plugins).toEqual(['@typescript-eslint']);
    extension = resolveExtension('eslint-config-eslint', __filename);
    expect(extension.rules).toBeTruthy();
  });
});
