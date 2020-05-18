import { GeneralComponent } from './general';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('GeneralComponent', () => {

  beforeEach(async(() => prepare([GeneralComponent])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
