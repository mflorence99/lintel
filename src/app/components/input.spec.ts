import { InputComponent } from './input';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('InputComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    expect(component.value).toBeUndefined();
    component.writeValue(42);
    expect(component.value).toBe(42);
  });

  test('set number value', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    expect(component.value).toBeFalsy();
    component.registerOnChange(value => expect(value).toBe(42));
    component.value = 42;
    expect(component.value).toBe(42);
  });

  test('set string value', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    expect(component.value).toBeFalsy();
    component.registerOnChange(value => expect(value).toBe('xxx'));
    component.value = 'xxx';
    expect(component.value).toBe('xxx');
  });

});
