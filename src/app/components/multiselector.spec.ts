import { MultiselectorComponent } from './multiselector';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('MultiselectorComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue of array', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    component.writeValue(['london', 'paris', 'paris', 'london']);
    expect(component.value).toEqual(['london', 'paris']);
  });

  test('writeValue of object', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    component.writeValue({ london: true, paris: false, rome: true});
    expect(component.value).toEqual({ london: true, rome: true});
  });

  test('test options as encoded array', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    const options = ['london', 'paris', 'rome'];
    component.options = options;
    expect(component.options).toEqual(options);
    expect(component.getOptionDecoded(1)).toBe('paris');
    expect(component.getOptionEncoded(1)).toBe('paris');
    expect(component.getOptionDescription(1)).toBeFalsy();
  });

  test('test options as encoded/decoded array', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
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
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
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

  test('a null value is interpreted as all values false', () => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    component.options = ['london', 'paris', 'rome'];
    component.value = null;
    expect(component.value).toEqual({
      london: false,
      paris: false,
      rome: false
    });
  });

  test('ngOnInit', done => {
    const fixture = TestBed.createComponent(MultiselectorComponent);
    const component = fixture.componentInstance;
    component.options = ['london', 'paris', 'rome'];
    const value = { london: true, paris: false, rome: true };
    component.value = value;
    component.registerOnChange(value => {
      expect(value).toEqual(value);
      done();
    });
    component.ngOnInit();
    // NOTE: trips valueChanges
    component.multiSelectorForm.controls.checkboxes.updateValueAndValidity({ emitEvent: true });
  });

});
