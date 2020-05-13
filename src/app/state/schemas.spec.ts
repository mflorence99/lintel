import { Bundle } from './state.spec';

import { config } from '../config';
import { prepare } from './state.spec';

describe('SchemasState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Schema state is initialized', () => {
    expect(states.schemas.snapshot[config.basePluginName]).toBeTruthy();
  });

  test('Active plugins is the deduplicated union of all plugins in the config for which we know the schema', () => {
    expect(states.schemas.activePluginNames.length).toEqual(2);
    expect(states.schemas.activePluginNames[0]).toEqual(config.basePluginName);
    expect(states.schemas.activePluginNames[1]).toEqual('@typescript-eslint');
  });

  test('categories are properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    expect(states.schemas.categories.length).toEqual(9);
    expect(states.schemas.categories[0]).toEqual(config.activeCategory);
    expect(states.schemas.categories[1]).toEqual('Best Practices');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    expect(states.schemas.categories.length).toEqual(0);
  });

  test('CategoryView is properly constructed', () => {
    states.selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const view = states.schemas.categoryView;
    expect(view[config.activeCategory]['space-infix-ops']).toBeTruthy();
    expect(view[config.recommendedCategory]['constructor-super']).toBeTruthy();
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

  test('hasRules determines if a plugin has any rules left in the schema after a filter is applied', done => {
    states.filter.filterRuleName('accessor-pairs');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      states.selection.select({ pluginName: config.basePluginName});
      expect(states.schemas.hasRules).toBeTruthy();
      states.selection.select({ pluginName: '@typescript-eslint' });
      expect(states.schemas.hasRules).toBeFalsy();
      done();
    }, config.waitForDebounce);
  });

});
