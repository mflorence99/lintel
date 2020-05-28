import { InputArrayComponent } from './input-array';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('InputArrayComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
