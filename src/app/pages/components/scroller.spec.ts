import { ScrollerComponent } from './scroller';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('ScrollerComponent', () => {
  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(ScrollerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
