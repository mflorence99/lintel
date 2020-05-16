import { Bundle } from './state.spec';

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

  test('hasRules determines if a plugin has any rules left in the schema after a filter is applied', done => {
    states.filter.filterRuleName('accessor-pairs', () => {
      states.selection.select({ pluginName: config.basePluginName });
      expect(states.configs.hasRules).toBeTruthy();
      states.selection.select({ pluginName: '@typescript-eslint' });
      expect(states.configs.hasRules).toBeFalsy();
      done();
    });
  });

  test('Rule digest is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const digest = states.configs.makeRuleDigest('brace-style');
    expect(digest.description).toEqual('enforce consistent brace style for blocks');
    expect(digest.level).toEqual('error');
    expect(digest.ruleName).toEqual('brace-style');
  });

});
