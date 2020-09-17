import { InputArrayComponent } from './input-array';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('InputArrayComponent', () => {
  let component: InputArrayComponent;
  let fixture: ComponentFixture<InputArrayComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(InputArrayComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('registerOnChange', () => {
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    expect(component.registerOnTouched()).toBeFalsy();
  });

  test('writeValue of number', () => {
    component.type = 'number';
    expect(component.value).toEqual([]);
    component.writeValue([1, 2, 3]);
    expect(component.value).toEqual([1, 2, 3]);
  });

  test('writeValue of string', () => {
    component.type = 'text';
    expect(component.value).toEqual([]);
    component.writeValue(['London', 'Paris', 'Rome']);
    expect(component.value).toEqual(['London', 'Paris', 'Rome']);
  });

  test('addInput', () => {
    component.type = 'text';
    component.value = ['London', 'Paris', 'Rome'];
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toBe(
      4
    );
    component.addInput();
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toBe(
      5
    );
  });

  test('removeInput', () => {
    component.type = 'number';
    component.value = [1, 2, 3];
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toBe(
      4
    );
    component.removeInput(1);
    expect((component.inputArrayForm.controls.inputs as FormArray).length).toBe(
      3
    );
  });

  test('ngOnInit', (done) => {
    component.type = 'text';
    component.uniqueItems = true;
    component.value = ['London', 'Paris', 'Paris', 'Rome'];
    component.registerOnChange((value) => {
      expect(value).toEqual(['London', 'Paris', 'Rome']);
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.inputArrayForm.updateValueAndValidity({ emitEvent: true });
  });

  test('snapshot', () => {
    component.type = 'text';
    component.uniqueItems = true;
    component.value = ['London', 'Paris', 'Paris', 'Rome'];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
