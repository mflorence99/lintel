import { SettingsComponent } from './settings';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('SettingsComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
