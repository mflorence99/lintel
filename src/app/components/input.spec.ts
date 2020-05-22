import { InputComponent } from './input';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('InputComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
