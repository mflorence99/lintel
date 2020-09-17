import { MultiselectorComponent } from './multiselector';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('MultiselectorComponent', () => {
  let component: MultiselectorComponent;
  let fixture: ComponentFixture<MultiselectorComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(MultiselectorComponent);
    component = fixture.componentInstance;
  });

  test('registerOnChange', () => {
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    expect(component.registerOnTouched()).toBeFalsy();
  });

  test('writeValue of array', () => {
    component.writeValue(['london', 'paris', 'paris', 'london']);
    expect(component.value).toEqual(['london', 'paris']);
  });

  test('writeValue of object', () => {
    component.writeValue({ london: true, paris: false, rome: true });
    expect(component.value).toEqual({ london: true, rome: true });
  });

  test('test options as encoded array', () => {
    const options = ['london', 'paris', 'rome'];
    component.options = options;
    expect(component.options).toEqual(options);
    expect(component.getOptionDecoded(1)).toBe('paris');
    expect(component.getOptionEncoded(1)).toBe('paris');
    expect(component.getOptionDescription(1)).toBeFalsy();
  });

  test('test options as encoded/decoded array', () => {
    component.options = [
      ['london', 'London'],
      ['paris', 'Paris', 'City of Light'],
      ['rome', 'Rome']
    ];
    expect(component.getOptionDecoded(1)).toBe('Paris');
    expect(component.getOptionEncoded(1)).toBe('paris');
    expect(component.getOptionDescription(1)).toBe('City of Light');
    expect(component.getOptionDescription(2)).toBeFalsy();
  });

  test('test options as array of objects', () => {
    component.options = [
      { id: 'london', value: 'London' },
      { id: 'paris', value: 'Paris', description: 'City of Light' },
      { id: 'rome', value: 'Rome' }
    ];
    expect(component.getOptionDecoded(1)).toBe('Paris');
    expect(component.getOptionEncoded(1)).toBe('paris');
    expect(component.getOptionDescription(1)).toBe('City of Light');
    expect(component.getOptionDescription(2)).toBeFalsy();
  });

  test('a null value is interpreted as all values missing', () => {
    component.options = ['london', 'paris', 'rome'];
    component.value = null;
    expect(component.value).toEqual({});
  });

  test('ngOnInit', (done) => {
    component.options = ['london', 'paris', 'rome'];
    const value = { london: true, paris: false, rome: true };
    component.value = value;
    component.registerOnChange((value) => {
      expect(value).toEqual(value);
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.multiSelectorForm.controls.checkboxes.updateValueAndValidity({
      emitEvent: true
    });
  });

  test('snapshot', () => {
    component.options = [
      { id: 'london', value: 'London' },
      { id: 'paris', value: 'Paris', description: 'City of Light' },
      { id: 'rome', value: 'Rome' }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
