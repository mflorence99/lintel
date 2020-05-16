import { Bundle } from './state.spec';
import { Rule } from '../state/schemas';
import { Settings } from '../state/configs';

import { config } from '../config';
import { prepare } from './state.spec';

describe('ConfigsState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Config state is initialized', () => {
    expect(states.configs.snapshot['package.json']).toBeTruthy();
    expect(states.configs.fileNames.length).toEqual(4);
    expect(states.configs.fileNames[0]).toEqual('package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(states.configs.fileNames.length).toEqual(4);
    expect(states.configs.fileNames[0]).toEqual('package.json');
  });

  test('pluginNames are properly constructed', () => {
    expect(states.configs.pluginNames.length).toEqual(2);
    expect(states.configs.pluginNames[0]).toEqual(config.basePluginName);
    expect(states.configs.pluginNames[1]).toEqual('@typescript-eslint');
  });

  test('categories are properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    expect(states.configs.categories.length).toEqual(7);
    expect(states.configs.categories[0]).toEqual('Best Practices');
    expect(states.configs.categories[1]).toEqual('ECMAScript 6');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    expect(states.configs.categories.length).toEqual(0);
  });

  test('activeView is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const view = states.configs.activeView;
    expect(view['space-infix-ops']).toBeTruthy();
  });

  test('categoryView is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const view = states.configs.categoryView;
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

  test('unknownView is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const view = states.configs.unknownView;
    expect(view['jest/no-existential-angst']).toBeTruthy();
    expect(view['prefer-shaken-not-stirred']).toBeTruthy();
  });

  test('Rule digest is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const ruleName = 'brace-style';
    const rule = states.schemas.snapshot[config.basePluginName]?.rules?.[ruleName] as Rule;
    const settings = states.configs.snapshot['package.json']?.config?.rules?.[ruleName] as Settings;
    const digest = states.configs.makeRuleDigest(ruleName, rule, settings);
    expect(digest.description).toEqual('enforce consistent brace style for blocks');
    expect(digest.level).toEqual('error');
    expect(digest.ruleName).toEqual('brace-style');
  });

});
