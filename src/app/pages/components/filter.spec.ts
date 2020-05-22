import { FilterComponent } from './filter';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('FilterComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(FilterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
