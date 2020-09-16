import { FilterComponent } from './filter';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('clearRuleNameFilter', () => {
    component.filter.filterRuleName('xxx');
    expect(component.filter.snapshot.ruleNameFilter).toBe('xxx');
    component.clearRuleNameFilter();
    expect(component.filter.snapshot.ruleNameFilter).toBeNull();
  });

  test('ngOnInit', () => {
    component.ngOnInit();
    component.filterForm.setValue({ filter: 'yyy' });
    expect(component.filter.snapshot.ruleNameFilter).toBe('yyy');
  });

  test('toggleInheritedRules', () => {
    component.filter.showInheritedRules(true);
    expect(component.filter.snapshot.showInheritedRules).toBeTrue();
    component.toggleInheritedRules();
    expect(component.filter.snapshot.showInheritedRules).toBeFalse();
  });
});
