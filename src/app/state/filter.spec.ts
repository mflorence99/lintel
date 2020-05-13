import { Bundle } from './state.spec';

import { config } from '../config';
import { isObjectEmpty } from '../utils';
import { prepare } from './state.spec';

describe('FilterState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Rule name filter can be set', done => {
    states.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    states.filter.filterRuleName('style');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      expect(states.filter.ruleNameFilter).toEqual('style');
      expect(states.configs.pluginView[config.basePluginName]['brace-style']).toBeTruthy();
      expect(states.configs.pluginView[config.basePluginName]['comma-spacing']).toBeFalsy();
      done();
    }, 500);
  });

  test('Rule name filter can be cleared', done => {
    states.filter.filterRuleName('style');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      expect(states.filter.ruleNameFilter).toEqual('style');
      states.filter.clearRuleNameFilter();
      expect(states.filter.ruleNameFilter).toBeNull();
      done();
    }, 500);
  });

  test('Empty data returned for non-matching filter', done => {
    states.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    states.filter.filterRuleName('xxx');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      expect(states.filter.ruleNameFilter).toEqual('xxx');
      expect(states.configs.pluginNames.length).toEqual(0);
      expect(isObjectEmpty(states.configs.pluginView)).toBeTruthy();
      expect(states.schemas.categories.length).toEqual(0);
      expect(isObjectEmpty(states.schemas.categoryView)).toBeTruthy();
      done();
    }, 500);
  });

  test('A rule name can be filtered', done => {
    states.filter.filterRuleName('style');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      expect(states.filter.isRuleNameFiltered('brace-style')).toBeTruthy();
      expect(states.filter.isRuleNameFiltered('comma-spacing')).toBeFalsy();
      done();
    }, 500);
  });

});
