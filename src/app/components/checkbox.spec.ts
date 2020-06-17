import { CheckboxComponent } from './checkbox';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('CheckboxComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () =>{
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('toggleChecked', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component.value).toBeFalsy();
    component.toggleChecked();
    expect(component.value).toBe(true);
  });

  test('writeValue', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component.value).toBeFalsy();
    component.writeValue(true);
    expect(component.value).toBe(true);
  });

  test('set value', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const component = fixture.componentInstance;
    expect(component.value).toBeFalsy();
    component.registerOnChange(value => expect(value).toBe(true));
    component.value = true;
    expect(component.value).toBe(true);
  });

});
