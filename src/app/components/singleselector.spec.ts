import { SingleselectorComponent } from './singleselector';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('SingleselectorComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
