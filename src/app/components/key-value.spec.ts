import { KeyValueComponent } from './key-value';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('KeyValueComponent', () => {
  let component: KeyValueComponent;
  let fixture: ComponentFixture<KeyValueComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(KeyValueComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('registerOnChange', () => {
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue', () => {
    expect(component.value).toEqual({});
    const value = { a: 1, b: 2, c: '3' };
    component.writeValue(value);
    expect(component.value).toEqual(value);
  });

  test('addKeyValue', () => {
    component.value = { a: 1, b: 2, c: '3' };
    expect(
      (component.keyValueForm.controls.keyValues as FormArray).length
    ).toBe(4);
    component.addKeyValue();
    expect(
      (component.keyValueForm.controls.keyValues as FormArray).length
    ).toBe(5);
  });

  test('removeKeyValue', () => {
    component.value = { a: 1, b: 2, c: '3' };
    expect(
      (component.keyValueForm.controls.keyValues as FormArray).length
    ).toBe(4);
    component.removeKeyValue(1);
    expect(
      (component.keyValueForm.controls.keyValues as FormArray).length
    ).toBe(3);
  });

  test('ngOnInit for numbers', (done) => {
    component.type = 'number';
    component.value = { a: 1, b: 2, c: '3' };
    component.registerOnChange((value) => {
      expect(value).toEqual({ a: 1, b: 2, c: 3 });
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.keyValueForm.updateValueAndValidity({ emitEvent: true });
  });

  test('ngOnInit for text', (done) => {
    component.type = 'text';
    component.value = { a: 'true', b: 'false', c: '3' };
    component.registerOnChange((value) => {
      expect(value).toEqual({ a: true, b: false, c: 3 });
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.keyValueForm.updateValueAndValidity({ emitEvent: true });
  });

  test('snapshot', () => {
    component.type = 'text';
    component.value = { a: 'true', b: 'false', c: '3' };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
