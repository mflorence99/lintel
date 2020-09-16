import { Bundle } from './state.spec';

import { prepare } from './state.spec';

import 'jest-extended';

describe('ConfigsState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('ConfigsState is initialized', () => {
    expect(
      bundle.configs.snapshot['/home/mflorence99/lintel/package.json']
    ).toEqual(expect.any(Object));
    expect(bundle.configs.fileNames).toIncludeAnyMembers([
      '/home/mflorence99/lintel/package.json'
    ]);
  });

  test('fileNames are properly constructed', () => {
    expect(bundle.configs.fileNames).toIncludeAnyMembers([
      '/home/mflorence99/lintel/package.json',
      '/home/mflorence99/el-3270/.eslintrc.js'
    ]);
  });

  test('shortFileNames are properly constructed', () => {
    expect(bundle.configs.shortFileNames).toIncludeAnyMembers([
      'lintel/package.json',
      'el-3270/.eslintrc.js'
    ]);
  });

  test('shortFileName', () => {
    expect(
      bundle.configs.shortFileName('/home/mflorence99/el-3270/.eslintrc.js')
    ).toBe('el-3270/.eslintrc.js');
  });

  test('pluginNames are properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(bundle.configs.pluginNames).toIncludeAnyMembers([
      bundle.params.basePluginName,
      '@angular-eslint'
    ]);
  });

  test('categories are properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    expect(bundle.configs.categories).toIncludeAnyMembers([
      'Best Practices',
      'ECMAScript 6'
    ]);
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    bundle.selection.select({ fileName: null, pluginName: null });
    expect(bundle.configs.categories).toBeArrayOfSize(0);
  });

  test('activeView is properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    const view = bundle.configs.activeView;
    expect(view['space-infix-ops']).toEqual(expect.any(Object));
  });

  test('activeView is really unknownView if unknownPluginName is selected', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.unknownPluginName
    });
    const view = bundle.configs.activeView;
    expect(view['space-infix-ops']).toBeUndefined();
    expect(view['jest/no-existential-angst']).toEqual(expect.any(Object));
    expect(view['prefer-shaken-not-stirred']).toEqual(expect.any(Object));
  });

  test('categoryView is properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    const view = bundle.configs.categoryView;
    expect(view['Best Practices']['accessor-pairs']).toEqual(
      expect.any(Object)
    );
    expect(view['Variables']['init-declarations']).toEqual(expect.any(Object));
  });

  test('unknownView is properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    const view = bundle.configs.unknownView;
    expect(view['jest/no-existential-angst']).toEqual(expect.any(Object));
    expect(view['prefer-shaken-not-stirred']).toEqual(expect.any(Object));
  });

  test('Extensions are properly merged', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const extension = bundle.configs.extension;
    expect(extension.plugins).toIncludeAnyMembers([
      'compat',
      'jest',
      'lodash-fp',
      'node'
    ]);
  });

  test('Overrides are properly merged', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const overrides = bundle.configs.overrides;
    expect(overrides[0].files).toEqual(
      bundle.configs.configuration.overrides[0].files
    );
    expect(overrides.length).toBeGreaterThan(
      bundle.configs.configuration.overrides.length
    );
  });

  test('Rule digest is properly constructed', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    const ruleName = 'brace-style';
    const rule = bundle.rules.snapshot[bundle.params.basePluginName][ruleName];
    const settings =
      bundle.configs.snapshot['/home/mflorence99/lintel/package.json'].rules[
        ruleName
      ];
    const digest = bundle.configs.makeRuleDigest(ruleName, rule, settings);
    expect(digest).toEqual(
      expect.objectContaining({
        description: 'Enforce consistent brace style for blocks.',
        level: 'error',
        ruleName: 'brace-style'
      })
    );
  });

  test('isOverrideInherited', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(bundle.configs.isOverrideInherited(null)).toBeFalse();
    expect(bundle.configs.isOverrideInherited(3)).toBeFalse();
    expect(bundle.configs.isOverrideInherited(4)).toBeTrue();
    bundle.selection.select({
      fileName: 'home/mflorence99/el-3270/.eslintrc.js'
    });
    expect(bundle.configs.isOverrideInherited(0)).toBeFalse();
  });

  test('isPluginFiltered', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    bundle.filter.filterRuleName('class');
    expect(bundle.configs.isPluginFiltered('eslint')).toBeTrue();
    expect(bundle.configs.isPluginFiltered('@angular-eslint')).toBeTrue();
    expect(bundle.configs.isPluginFiltered('jest')).toBeFalse();
  });

  test('addOverride', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(bundle.configs.configuration.overrides.length).toBe(4);
    bundle.configs.addOverride();
    expect(bundle.configs.configuration.overrides.length).toBe(5);
  });

  test('changeConfiguration in base configutation', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: null
    });
    const changes = { browser: false };
    bundle.configs.changeConfiguration({ env: changes });
    expect(bundle.configs.configuration.env).toEqual(changes);
  });

  test('changeConfiguration in override', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: 0
    });
    const changes = { browser: true };
    bundle.configs.changeConfiguration({ env: changes });
    expect(bundle.configs.configuration.env).toEqual(changes);
  });

  test('changeRule in base configuration', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: null
    });
    const changes = ['warn', { after: false, before: false }];
    const ruleName = 'brace-style';
    bundle.configs.changeRule({ changes, ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toEqual(changes);
  });

  test('changeRule in override', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: 1
    });
    const changes = ['off'];
    const ruleName = 'node/exports-style';
    bundle.configs.changeRule({ changes, ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toEqual(changes);
  });

  test('deleteOverride', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(bundle.configs.configuration.overrides.length).toBe(4);
    bundle.configs.deleteOverride({ ix: 0 });
    expect(bundle.configs.configuration.overrides.length).toBe(3);
  });

  test('deleteRule in base configuration', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: null
    });
    const ruleName = 'spaced-comment';
    expect(bundle.configs.configuration.rules[ruleName]).toEqual(
      expect.any(Object)
    );
    bundle.configs.deleteRule({ ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toBeUndefined();
  });

  test('deleteRule in override', () => {
    bundle.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: 2
    });
    const ruleName = 'node/file-extension-in-import';
    expect(bundle.configs.configuration.rules[ruleName]).toEqual(
      expect.any(Object)
    );
    bundle.configs.deleteRule({ ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toBeUndefined();
  });
});
