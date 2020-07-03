import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('ConfigsState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('ConfigsState is initialized', () => {
    expect(bundle.configs.snapshot['/home/mflorence99/lintel/package.json']).toBeTruthy();
    expect(bundle.configs.fileNames.length).toBeGreaterThanOrEqual(7);
    expect(bundle.configs.fileNames[0]).toEqual('/home/mflorence99/lintel/package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(bundle.configs.fileNames.length).toBeGreaterThanOrEqual(7);
    expect(bundle.configs.fileNames[0]).toEqual('/home/mflorence99/lintel/package.json');
    expect(bundle.configs.fileNames[1]).toEqual('/home/mflorence99/el-3270/.eslintrc.js');
  });

  test('shortFileNames are properly constructed', () => {
    expect(bundle.configs.shortFileNames.length).toBeGreaterThanOrEqual(7);
    expect(bundle.configs.shortFileNames[0]).toEqual('lintel/package.json');
    expect(bundle.configs.shortFileNames[1]).toEqual('el-3270/.eslintrc.js');
  });

  test('shortFileName', () => {
    expect(bundle.configs.shortFileName('/home/mflorence99/el-3270/.eslintrc.js')).toEqual('el-3270/.eslintrc.js');
  });

  test('pluginNames are properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(bundle.configs.pluginNames.length).toBeGreaterThanOrEqual(5);
    expect(bundle.configs.pluginNames[0]).toEqual(bundle.params.basePluginName);
    expect(bundle.configs.pluginNames[1]).toEqual('@angular-eslint');
  });

  test('categories are properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    expect(bundle.configs.categories.length).toEqual(7);
    expect(bundle.configs.categories[0]).toEqual('Best Practices');
    expect(bundle.configs.categories[1]).toEqual('ECMAScript 6');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    bundle.selection.select({ fileName: null, pluginName: null });
    expect(bundle.configs.categories.length).toEqual(0);
  });

  test('activeView is properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.activeView;
    expect(view['space-infix-ops']).toBeTruthy();
  });

  test('activeView is really unknownView if unknownPluginName is selected', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.unknownPluginName });
    const view = bundle.configs.activeView;
    expect(view['space-infix-ops']).toBeFalsy();
    expect(view['jest/no-existential-angst']).toBeTruthy();
    expect(view['prefer-shaken-not-stirred']).toBeTruthy();
  });

  test('categoryView is properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.categoryView;
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

  test('unknownView is properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.unknownView;
    expect(view['jest/no-existential-angst']).toBeTruthy();
    expect(view['prefer-shaken-not-stirred']).toBeTruthy();
  });

  test('Extensions are properly merged', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const extension = bundle.configs.extension;
    expect(extension.plugins).toContain('compat');
    expect(extension.plugins).toContain('jest');
    expect(extension.plugins).toContain('lodash-fp');
    expect(extension.plugins).toContain('node');
  });

  test('Overrides are properly merged', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const overrides = bundle.configs.overrides;
    expect(overrides[0].files).toEqual(bundle.configs.configuration.overrides[0].files);
    expect(overrides.length).toBeGreaterThan(bundle.configs.configuration.overrides.length);
  });

  test('Rule digest is properly constructed', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    const ruleName = 'brace-style';
    const rule = bundle.rules.snapshot[bundle.params.basePluginName][ruleName];
    const settings = bundle.configs.snapshot['/home/mflorence99/lintel/package.json']?.rules?.[ruleName];
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
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(bundle.configs.isOverrideInherited(null)).toBe(false);
    expect(bundle.configs.isOverrideInherited(3)).toBe(false);
    expect(bundle.configs.isOverrideInherited(4)).toBe(true);
    bundle.selection.select({ fileName: 'home/mflorence99/el-3270/.eslintrc.js' });
    expect(bundle.configs.isOverrideInherited(0)).toBe(false);
  });

  test('isPluginFiltered', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json', pluginName: bundle.params.basePluginName });
    bundle.filter.filterRuleName('class');
    expect(bundle.configs.isPluginFiltered('eslint')).toBe(true);
    expect(bundle.configs.isPluginFiltered('@angular-eslint')).toBe(true);
    expect(bundle.configs.isPluginFiltered('jest')).toBe(false);
  });

  test('addOverride', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(bundle.configs.configuration.overrides.length).toBe(4);
    bundle.configs.addOverride();
    expect(bundle.configs.configuration.overrides.length).toBe(5);
  });
  
  test('changeConfiguration', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const changes = { browser: false };
    bundle.configs.changeConfiguration({ env: changes });
    expect(bundle.configs.configuration.env).toEqual(changes);
  });

  test('changeRule', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const changes = ['warn', { after: false, before: false }];
    const ruleName = 'brace-style';
    bundle.configs.changeRule({ changes, ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toEqual(changes);
  });

  test('deleteOverride', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(bundle.configs.configuration.overrides.length).toBe(4);
    bundle.configs.deleteOverride({ ix: 0 });
    expect(bundle.configs.configuration.overrides.length).toBe(3);
  });

  test('deleteRule', () => {
    bundle.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const ruleName = 'spaced-comment';
    expect(bundle.configs.configuration.rules[ruleName]).toBeTruthy();
    bundle.configs.deleteRule({ ruleName });
    expect(bundle.configs.configuration.rules[ruleName]).toBeFalsy();
  });

});
