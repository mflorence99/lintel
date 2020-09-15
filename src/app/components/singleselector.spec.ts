import { SingleselectorComponent } from './singleselector';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('SingleselectorComponent', () => {
  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('registerOnChange', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    expect(component.registerOnTouched(null)).toBeFalsy();
  });

  test('writeValue', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    expect(component.value).toBeUndefined();
    component.writeValue(42);
    expect(component.value).toBe(42);
  });

  test('number options, not decoded, no placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = [1, 2, 3];
    expect(component.getOptionDecoded(1)).toBe(2);
    expect(component.getOptionDecoded(-1)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe(2);
    expect(component.getOptionEncoded(-1)).toBe(null);
    expect(component.getOptionIndex(2)).toBe(1);
    component.selectByIndex(1);
    expect(component.value).toBe(2);
  });

  test('number options, decoded, no placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = [
      [1, 'London'],
      [2, 'Paris'],
      [3, 'Rome']
    ];
    expect(component.getOptionDecoded(1)).toBe('Paris');
    expect(component.getOptionDecoded(-1)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe(2);
    expect(component.getOptionEncoded(-1)).toBe(null);
    expect(component.getOptionIndex(2)).toBe(1);
    component.selectByIndex(1);
    expect(component.value).toBe(2);
  });

  test('number options, not decoded, with placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = [1, 2, 3];
    component.placeholder = 'xxx';
    expect(component.getOptionDecoded(1)).toBe(1);
    expect(component.getOptionDecoded(0)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe(1);
    expect(component.getOptionEncoded(0)).toBe(null);
    expect(component.getOptionIndex(2)).toBe(2);
    component.selectByIndex(1);
    expect(component.value).toBe(1);
  });

  test('string options, not decoded, no placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = ['London', 'Paris', 'Rome'];
    expect(component.getOptionDecoded(1)).toBe('Paris');
    expect(component.getOptionDecoded(-1)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe('Paris');
    expect(component.getOptionEncoded(-1)).toBe(null);
    expect(component.getOptionIndex('Paris')).toBe(1);
    component.selectByIndex(1);
    expect(component.value).toBe('Paris');
  });

  test('string options, decoded, no placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = [
      ['l', 'London'],
      ['p', 'Paris'],
      ['r', 'Rome']
    ];
    expect(component.getOptionDecoded(1)).toBe('Paris');
    expect(component.getOptionDecoded(-1)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe('p');
    expect(component.getOptionEncoded(-1)).toBe(null);
    expect(component.getOptionIndex('p')).toBe(1);
    component.selectByIndex(1);
    expect(component.value).toBe('p');
  });

  test('string options, not decoded, with placeholder', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = ['London', 'Paris', 'Rome'];
    component.placeholder = 'xxx';
    expect(component.getOptionDecoded(1)).toBe('London');
    expect(component.getOptionDecoded(0)).toBe(null);
    expect(component.getOptionEncoded(1)).toBe('London');
    expect(component.getOptionEncoded(0)).toBe(null);
    expect(component.getOptionIndex('London')).toBe(1);
    component.selectByIndex(1);
    expect(component.value).toBe('London');
  });

  test('set number value', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = [1, 2, 3];
    expect(component.value).toBeFalsy();
    component.registerOnChange((value) => expect(value).toBe(2));
    component.value = 2;
    expect(component.value).toBe(2);
  });

  test('set string value', () => {
    const fixture = TestBed.createComponent(SingleselectorComponent);
    const component = fixture.componentInstance;
    component.options = ['London', 'Paris', 'Rome'];
    expect(component.value).toBeFalsy();
    component.registerOnChange((value) => expect(value).toBe('Paris'));
    component.value = 'Paris';
    expect(component.value).toBe('Paris');
  });
});
