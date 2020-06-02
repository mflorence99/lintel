import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('FilterState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Rule name filter can be set', () => {
    bundle.selection.select({
      category: 'Best Practices',
      fileName: 'package.json',
      pluginName: bundle.params.basePluginName
    });
    bundle.filter.filterRuleName('default');
    expect(bundle.filter.snapshot.ruleNameFilter).toEqual('default');
    expect(bundle.configs.categoryView['Best Practices']['default-case']).toBeTruthy();
    expect(bundle.configs.categoryView['Best Practices']['comma-spacing']).toBeFalsy();
  });

  test('Empty data returned for non-matching filter', () => {
    bundle.selection.select({
      category: bundle.params.activeCategory,
      fileName: 'package.json',
      pluginName: bundle.params.basePluginName
    });
    bundle.filter.filterRuleName('xxx');
    expect(bundle.filter.snapshot.ruleNameFilter).toEqual('xxx');
    expect(bundle.configs.categories.length).toEqual(0);
    expect(bundle.utils.isEmptyObject(bundle.configs.categoryView)).toBeTruthy();
  });

});
