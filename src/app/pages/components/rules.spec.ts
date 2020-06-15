import { RulesComponent } from './rules';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('RulesComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('trackByRule', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    expect(component.trackByRule(null, { key: 'brace-style' })).toEqual('brace-style');
  });

});
