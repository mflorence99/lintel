import { InputArrayComponent } from './input-array';

import { prepare } from './component.spec';

import { FormArray } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('InputArrayComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue of number', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    expect(component.value).toEqual([]);
    component.writeValue([1, 2, 3]);
    expect(component.value).toEqual([1, 2, 3]);
  });

  test('writeValue of string', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    expect(component.value).toEqual([]);
    component.writeValue(['London', 'Paris', 'Rome']);
    expect(component.value).toEqual(['London', 'Paris', 'Rome']);
  });

  test('addInput', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    component.value = ['London', 'Paris', 'Rome'];
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toEqual(4);
    component.addInput();
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toEqual(5);
  });

  test('removeInput', () => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    component.value = [1, 2, 3];
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toEqual(4);
    component.removeInput(1);
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toEqual(3);
  });

  test('ngOnInit', done => {
    const fixture = TestBed.createComponent(InputArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    component.uniqueItems = true;
    component.value = ['London', 'Paris', 'Paris', 'Rome'];
    component.registerOnChange(value => {
      expect(value).toEqual(['London', 'Paris', 'Rome']);
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.inputArrayForm.updateValueAndValidity({ emitEvent: true });
  });

});
