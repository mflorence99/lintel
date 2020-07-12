import { FilterComponent } from './filter';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('FilterComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('clearRuleNameFilter', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.filter.filterRuleName('xxx');
    expect(component.filter.snapshot.ruleNameFilter).toBe('xxx');
    component.clearRuleNameFilter();
    expect(component.filter.snapshot.ruleNameFilter).toBeNull();
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.filterForm.setValue({ filter: 'yyy' });
    expect(component.filter.snapshot.ruleNameFilter).toBe('yyy');
  });

  test('toggleInheritedRules', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.filter.showInheritedRules();
    expect(component.filter.snapshot.showInheritedRules).toBe(true);
    component.toggleInheritedRules();
    expect(component.filter.snapshot.showInheritedRules).toBe(false);
  });

});
