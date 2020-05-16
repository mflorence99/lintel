import { FilterComponent } from './filter';
import { RuleComponent } from './rule';
import { RulesComponent } from './rules';
import { SettingsComponent } from './settings';
import { TabsComponent } from './tabs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('SettingsComponent', () => {

  beforeEach(async(() => prepare([
    FilterComponent, 
    TabsComponent, 
    RuleComponent,
    RulesComponent,
    SettingsComponent
  ])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
