import { CheckboxComponent } from './checkbox';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('CheckboxComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
