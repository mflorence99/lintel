import { Bundle } from './state.spec';

import { prepare } from './state.spec';

import 'jest-extended';

describe('FilterState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('Rule name filter can be set', () => {
    bundle.selection.select({
      category: 'Best Practices',
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    bundle.filter.filterRuleName('default');
    expect(bundle.filter.snapshot.ruleNameFilter).toBe('default');
    expect(
      bundle.configs.categoryView['Best Practices']['default-case']
    ).toEqual(expect.any(Object));
    expect(
      bundle.configs.categoryView['Best Practices']['comma-spacing']
    ).toBeUndefined();
  });

  test('Empty data returned for non-matching filter', () => {
    bundle.selection.select({
      category: bundle.params.activeCategory,
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: bundle.params.basePluginName
    });
    bundle.filter.filterRuleName('xxx');
    expect(bundle.filter.snapshot.ruleNameFilter).toBe('xxx');
    expect(bundle.configs.categories).toBeArrayOfSize(0);
    expect(bundle.utils.isEmptyObject(bundle.configs.categoryView)).toBeTrue();
  });

  test('Inherited rules can be shown or hidden', () => {
    bundle.filter.toggleInheritedRules();
    expect(bundle.filter.snapshot.showInheritedRules).toBeFalse();
    bundle.filter.toggleInheritedRules();
    expect(bundle.filter.snapshot.showInheritedRules).toBeTrue();
  });
});
