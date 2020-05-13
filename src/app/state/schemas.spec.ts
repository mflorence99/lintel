import { Bundle } from './state.spec';

import { config } from '../config';
import { prepare } from './state.spec';

describe('SchemasState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Schema state is initialized', () => {
    expect(states.schemas.snapshot[config.basePluginName]).toBeTruthy();
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

});
