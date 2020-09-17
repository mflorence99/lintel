import { CheckboxComponent } from './checkbox';

import { prepare } from './component.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  test('registerOnChange', () => {
    component.registerOnChange(jest.fn());
    expect(component['onChange']).toBeTruthy();
  });

  test('registerOnTouched', () => {
    expect(component.registerOnTouched()).toBeFalsy();
  });

  test('toggleChecked', () => {
    expect(component.value).toBeFalsy();
    component.toggleChecked();
    expect(component.value).toBeTrue();
    component.enabled = false;
    component.toggleChecked();
    expect(component.value).toBeTrue();
  });

  test('writeValue', () => {
    expect(component.value).toBeFalsy();
    component.writeValue(true);
    expect(component.value).toBeTrue();
  });

  test('set value', () => {
    expect(component.value).toBeFalsy();
    component.registerOnChange((value) => expect(value).toBeTrue());
    component.value = true;
    expect(component.value).toBeTrue();
  });

  test('snapshot', () => {
    component.label = 'A message';
    component.value = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
