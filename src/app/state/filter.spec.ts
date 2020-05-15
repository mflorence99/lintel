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
    states.filter.filterRuleName('style', () => {
      expect(states.filter.ruleNameFilter).toEqual('style');
      expect(states.configs.categoryView[config.activeCategory]['brace-style']).toBeTruthy();
      expect(states.configs.categoryView[config.activeCategory]['comma-spacing']).toBeFalsy();
      done();
    });
  });

  test('Rule name filter can be cleared', done => {
    states.filter.filterRuleName('style', () => {
      expect(states.filter.ruleNameFilter).toEqual('style');
      states.filter.clearRuleNameFilter();
      expect(states.filter.ruleNameFilter).toBeNull();
      done();
    });
  });

  test('Empty data returned for non-matching filter', done => {
    states.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    states.filter.filterRuleName('xxx', () => {
      expect(states.filter.ruleNameFilter).toEqual('xxx');
      expect(states.configs.categories.length).toEqual(0);
      expect(isObjectEmpty(states.configs.categoryView)).toBeTruthy();
      done();
    });
  });

  test('A rule name can be filtered', done => {
    states.filter.filterRuleName('style', () => {
      expect(states.filter.isRuleNameFiltered('brace-style')).toBeTruthy();
      expect(states.filter.isRuleNameFiltered('comma-spacing')).toBeFalsy();
      done();
    });
  });

  test('Callback invoked after rule name filter', done => {
    states.filter.filterRuleName('style', () => {
      expect(states.filter.isRuleNameFiltered('brace-style')).toBeTruthy();
      expect(states.filter.isRuleNameFiltered('comma-spacing')).toBeFalsy();
      done();
    });
  });

});
