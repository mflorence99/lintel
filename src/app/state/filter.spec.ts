import { Bundle } from './state.spec';

import { config } from '../config';
import { isObjectEmpty } from '../utils';
import { prepare } from './state.spec';

describe('FilterState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Rule name filter can be set', () => {
    states.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    states.filter.filterRuleName('style');
    expect(states.filter.ruleNameFilter).toEqual('style');
    expect(states.configs.pluginView[config.basePluginName]['brace-style']).toBeTruthy();
    expect(states.configs.pluginView[config.basePluginName]['comma-spacing']).toBeFalsy();
  });

  test('Empty data returned for non-matching filter', () => {
    states.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    states.filter.filterRuleName('xxx');
    expect(states.filter.ruleNameFilter).toEqual('xxx');
    expect(states.configs.pluginNames.length).toEqual(0);
    expect(isObjectEmpty(states.configs.pluginView)).toBeTruthy();
    expect(states.schemas.categories.length).toEqual(0);
    expect(isObjectEmpty(states.schemas.categoryView)).toBeTruthy();
  });

});
