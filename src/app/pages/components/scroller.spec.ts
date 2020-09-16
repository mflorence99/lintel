import { ScrollerComponent } from './scroller';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('ScrollerComponent', () => {
  let component: ScrollerComponent;
  let fixture: ComponentFixture<ScrollerComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(ScrollerComponent);
    component = fixture.componentInstance;
  });

  test('ctor', () => {
    expect(component).toBeTruthy();
  });
});
