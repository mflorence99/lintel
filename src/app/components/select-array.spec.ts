import { FormArray } from '@angular/forms';
import { SelectArrayComponent } from './select-array';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('SelectArrayComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue of number', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    expect(component.value).toEqual([]);
    component.writeValue([1, 2, 3]);
    expect(component.value).toEqual([1, 2, 3]);
  });

  test('writeValue of string', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    expect(component.value).toEqual([]);
    component.writeValue(['London', 'Paris', 'Rome']);
    expect(component.value).toEqual(['London', 'Paris', 'Rome']);
  });

  test('addSelector', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'text';
    component.value = ['London', 'Paris', 'Rome'];
    expect((component.selectArrayForm.controls.selects as FormArray).length).toEqual(4);
    component.addSelector();
    expect((component.selectArrayForm.controls.selects as FormArray).length).toEqual(5);
  });

  test('removeSelector', () => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
    const component = fixture.componentInstance;
    component.type = 'number';
    component.value = [1, 2, 3];
    expect((component.selectArrayForm.controls.selects as FormArray).length).toEqual(4);
    component.removeSelector(1);
    expect((component.selectArrayForm.controls.selects as FormArray).length).toEqual(3);
  });

  test('ngOnInit', done => {
    const fixture = TestBed.createComponent(SelectArrayComponent);
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
    component.addSelector();
  });

});
