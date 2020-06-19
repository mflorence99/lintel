import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('ConfigsState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('ConfigsState is initialized', () => {
    expect(bundle.configs.snapshot['/home/mflorence99/lintel/package.json']).toBeTruthy();
    expect(bundle.configs.fileNames.length).toEqual(7);
    expect(bundle.configs.fileNames[0]).toEqual('/home/mflorence99/lintel/package.json');
  });

  test('pluginNames are properly constructed', () => {
    expect(bundle.configs.pluginNames.length).toEqual(8);
    expect(bundle.configs.pluginNames[0]).toEqual(bundle.params.basePluginName);
    expect(bundle.configs.pluginNames[1]).toEqual('@typescript-eslint');
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

});
