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
    component.filterRuleName('super', () => {
      expect(component.filter.ruleNameFilter).toEqual('super');
      done();
    });
  });

  test('Rule name filter can be cleared', done => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.filterRuleName('super', () => {
      component.clearRuleNameFilter();
      expect(component.filter.ruleNameFilter).toEqual(null);
      done();
    });
  });

  test('If filter eliminates selected category, selection is reset', done => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      category: config.activeCategory,
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    component.filterRuleName('pairs', () => {
      expect(component.selection.category).toEqual('Best Practices');
      done();
    });
  });

});
