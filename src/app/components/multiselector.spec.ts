import { MultiselectorComponent } from './multiselector';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('MultiselectorComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
