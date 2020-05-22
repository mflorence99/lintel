import { KeyValueComponent } from './key-value';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('KeyValueComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
