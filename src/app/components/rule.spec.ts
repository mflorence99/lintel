import { RuleComponent } from './rule';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('RuleComponent', () => {

  beforeEach(async(() => prepare([RuleComponent])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Rule name can be set', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    component.ruleName = 'x';
    expect(component.ruleName).toEqual('x');
  });

});
