import { SelectArrayComponent } from './select-array';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

describe('SelectArrayComponent', () => {
  let component: SelectArrayComponent;
  let fixture: ComponentFixture<SelectArrayComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(SelectArrayComponent);
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

  test('addSelector', () => {
    component.type = 'text';
    component.value = ['London', 'Paris', 'Rome'];
    expect(
      (component.selectArrayForm.controls.selects as FormArray).length
    ).toBe(4);
    component.addSelector();
    expect(
      (component.selectArrayForm.controls.selects as FormArray).length
    ).toBe(5);
  });

  test('removeSelector', () => {
    component.type = 'number';
    component.value = [1, 2, 3];
    expect(
      (component.selectArrayForm.controls.selects as FormArray).length
    ).toBe(4);
    component.removeSelector(1);
    expect(
      (component.selectArrayForm.controls.selects as FormArray).length
    ).toBe(3);
  });

  test('ngOnInit', (done) => {
    component.type = 'text';
    component.uniqueItems = true;
    component.value = ['London', 'Paris', 'Paris', 'Rome'];
    component.registerOnChange((value) => {
      expect(value).toEqual(['London', 'Paris', 'Rome']);
      done();
    });
    // NOTE: trips valueChanges
    component.addSelector();
  });

  test('snapshot', () => {
    component.type = 'text';
    component.uniqueItems = true;
    component.value = ['London', 'Paris', 'Paris', 'Rome'];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
