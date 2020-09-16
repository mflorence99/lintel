import { GeneralComponent } from './general';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

declare const lintelVSCodeAPI;

describe('GeneralComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<GeneralComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(GeneralComponent);
    component = fixture.componentInstance;
  });

  test('canDoSettings', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(component.canDoSettings()).toBeTrue();
    component.selection.select({
      fileName: '/home/mflorence99/el-3270/.eslintrc.js'
    });
    expect(component.canDoSettings()).toBeFalse();
  });

  test('editFile', () => {
    component.editFile('/home/mflorence99/lintel/package.json');
    expect(lintelVSCodeAPI.postMessage).toHaveBeenCalledWith({
      command: 'editFile',
      fileName: '/home/mflorence99/lintel/package.json'
    });
  });

  test('isConfigured', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(component.isConfigured('parserOptions')).toBeTrue();
    expect(component.isConfigured('ecmaFeatures')).toBeTrue();
    expect(component.isConfigured('env')).toBeFalse();
    component.selection.select({
      fileName: '/home/mflorence99/lintel/src/app/.eslintrc.yaml'
    });
    expect(component.isConfigured('parserOptions')).toBeFalse();
    expect(component.isConfigured('ecmaFeatures')).toBeTrue();
    component.selection.select({
      fileName: '/home/mflorence99/el-3270/.eslintrc.js'
    });
    expect(component.isConfigured('plugins')).toBeTrue();
  });

  test('isInherited', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(component.isInherited('parserOptions')).toBeTrue();
    expect(component.isInherited('ecmaFeatures')).toBeTrue();
    expect(component.isInherited('env')).toBeTrue();
    expect(component.isInherited('parser')).toBeTrue();
  });

  test('makeOptionsForMultiselector', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const options = component.makeOptionsForMultiselector('env', 'env');
    expect(options.find((option) => option[0] === 'jest/globals')).toBeTruthy();
  });

  test('makeOptionsForSingleselector', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const options = component.makeOptionsForSingleselector(
      'globals.additionalProperties.oneOf[0]'
    );
    expect(options.find((option) => option[0] === 'readonly')).toBeTruthy();
  });

  test('makeProperties', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      override: null
    });
    let properties = component.makeProperties();
    expect(
      properties.find((property) => property[0] === 'overrides')
    ).toBeTruthy();
    component.selection.select({ override: 0 });
    properties = component.makeProperties();
    expect(
      properties.find((property) => property[0] === 'overrides')
    ).toBeFalsy();
  });

  test('ngOnInit', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    component.ngOnInit();
    let changes: any = { browser: false };
    component.generalForm.patchValue({ env: changes });
    expect(component.configs.configuration.env).toEqual(changes);
    changes = { globalReturn: true };
    component.generalForm.patchValue({ ecmaFeatures: changes });
    expect(component.configs.configuration.parserOptions.ecmaFeatures).toEqual(
      changes
    );
    changes = ['node', 'react'];
    component.generalForm.patchValue({ plugins: changes });
    expect(component.configs.configuration.plugins).toEqual(changes);
  });
});
