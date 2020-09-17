import { InputComponent } from './input';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  test('registerOnChange', () => {
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    expect(component.registerOnTouched()).toBeFalsy();
  });

  test('writeValue', () => {
    expect(component.value).toBeUndefined();
    component.writeValue(42);
    expect(component.value).toBe(42);
  });

  test('set number value', () => {
    component.type = 'number';
    expect(component.value).toBeFalsy();
    component.registerOnChange((value) => expect(value).toBe(42));
    component.value = 42;
    expect(component.value).toBe(42);
  });

  test('set string value', () => {
    component.type = 'text';
    expect(component.value).toBeFalsy();
    component.registerOnChange((value) => expect(value).toBe('xxx'));
    component.value = 'xxx';
    expect(component.value).toBe('xxx');
  });

  test('snapshot', () => {
    component.type = 'text';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
