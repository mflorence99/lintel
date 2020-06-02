import { SelectArrayComponent } from './select-array';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('SelectArrayComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
