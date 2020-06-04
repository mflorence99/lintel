import { ScrollerComponent } from './scroller';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('ScrollerComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(ScrollerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
