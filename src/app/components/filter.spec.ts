import { FilterComponent } from './filter';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { config } from '../config';
import { prepare } from './component.spec';

describe('FilterComponent', () => {

  beforeEach(async(() => prepare([FilterComponent])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Rule name filter can be set', done => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.filterRuleName('super');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      expect(component.filter.ruleNameFilter).toEqual('super');
      done();
    }, config.waitForDebounce);
  });

  test('Rule name filter can be cleared', done => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.filterRuleName('super');
    // NOTE: filterRuleName is debounced
    setTimeout(() => {
      component.clearRuleNameFilter();
      expect(component.filter.ruleNameFilter).toEqual(null);
      done();
    }, config.waitForDebounce);
  });

});
