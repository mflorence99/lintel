import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('ConfigsState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Config state is initialized', () => {
    expect(bundle.configs.snapshot['package.json']).toBeTruthy();
    expect(bundle.configs.fileNames.length).toEqual(4);
    expect(bundle.configs.fileNames[0]).toEqual('package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(bundle.configs.fileNames.length).toEqual(4);
    expect(bundle.configs.fileNames[0]).toEqual('package.json');
  });

  test('pluginNames are properly constructed', () => {
    expect(bundle.configs.pluginNames.length).toEqual(2);
    expect(bundle.configs.pluginNames[0]).toEqual(bundle.params.basePluginName);
    expect(bundle.configs.pluginNames[1]).toEqual('@typescript-eslint');
  });

  test('categories are properly constructed', () => {
    bundle.selection.select({ fileName: 'package.json', pluginName: bundle.params.basePluginName });
    expect(bundle.configs.categories.length).toEqual(7);
    expect(bundle.configs.categories[0]).toEqual('Best Practices');
    expect(bundle.configs.categories[1]).toEqual('ECMAScript 6');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    expect(bundle.configs.categories.length).toEqual(0);
  });

  test('activeView is properly constructed', () => {
    bundle.selection.select({ fileName: 'package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.activeView;
    expect(view['space-infix-ops']).toBeTruthy();
  });

  test('categoryView is properly constructed', () => {
    bundle.selection.select({ fileName: 'package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.categoryView;
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

  test('unknownView is properly constructed', () => {
    bundle.selection.select({ fileName: 'package.json', pluginName: bundle.params.basePluginName });
    const view = bundle.configs.unknownView;
    expect(view['jest/no-existential-angst']).toBeTruthy();
    expect(view['prefer-shaken-not-stirred']).toBeTruthy();
  });

  test('Rule digest is properly constructed', () => {
    bundle.selection.select({ fileName: 'package.json', pluginName: bundle.params.basePluginName });
    const ruleName = 'brace-style';
    const rule = bundle.schemas.snapshot[bundle.params.basePluginName]?.rules?.[ruleName];
    const settings = bundle.configs.snapshot['package.json']?.rules?.[ruleName];
    const digest = bundle.configs.makeRuleDigest(ruleName, rule, settings);
    expect(digest.description).toEqual('enforce consistent brace style for blocks');
    expect(digest.level).toEqual('error');
    expect(digest.ruleName).toEqual('brace-style');
  });

});
