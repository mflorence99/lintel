import { KeyValueComponent } from './key-value';

import { prepare } from './component.spec';

import { FormArray } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('KeyValueComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    expect(component.value).toEqual({ });
    const value = { a: 1, b: 2, c: '3' };
    component.writeValue(value);
    expect(component.value).toEqual(value);
  });

  test('addKeyValue', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    component.value = { a: 1, b: 2, c: '3' };
    expect((component.keyValueForm.controls.keyValues as FormArray).length).toEqual(4);
    component.addKeyValue();
    expect((component.keyValueForm.controls.keyValues as FormArray).length).toEqual(5);
  });

  test('removeKeyValue', () => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    component.value = { a: 1, b: 2, c: '3' };
    expect((component.keyValueForm.controls.keyValues as FormArray).length).toEqual(4);
    component.removeKeyValue(1);
    expect((component.keyValueForm.controls.keyValues as FormArray).length).toEqual(3);
  });

  test('ngOnInit for numbers', done => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    component.value = { a: 1, b: 2, c: '3' };
    component.registerOnChange(value => {
      expect(value).toEqual({ a: 1, b: 2, c: 3 });
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.keyValueForm.updateValueAndValidity({ emitEvent: true });
  });

  test('ngOnInit for text', done => {
    const fixture = TestBed.createComponent(KeyValueComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    component.value = { a: 'true', b: 'false', c: '3' };
    component.registerOnChange(value => {
      expect(value).toEqual({ a: true, b: false, c: 3 });
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.keyValueForm.updateValueAndValidity({ emitEvent: true });
  });

});
