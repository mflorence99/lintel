import { GeneralComponent } from './general';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

declare const lintelVSCodeAPI;

describe('GeneralComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('canDoSettings', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(component.canDoSettings()).toBe(true);
    component.selection.select({ fileName: '/home/mflorence99/el-3270/.eslintrc.js' });
    expect(component.canDoSettings()).toBe(false);
  });

  test('editFile', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.editFile('/home/mflorence99/lintel/package.json');
    const calls = lintelVSCodeAPI.postMessage.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    const message = calls[calls.length - 1][0];
    expect(message).toEqual({
      command: 'editFile',
      fileName: '/home/mflorence99/lintel/package.json'
    });
  });

  test('isConfigured', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(component.isConfigured('parserOptions')).toBe(true);
    expect(component.isConfigured('ecmaFeatures')).toBe(true);
    expect(component.isConfigured('env')).toBe(false);
    component.selection.select({ fileName: '/home/mflorence99/lintel/src/app/.eslintrc.yaml' });
    expect(component.isConfigured('parserOptions')).toBe(false);
    expect(component.isConfigured('ecmaFeatures')).toBe(true);
    component.selection.select({ fileName: '/home/mflorence99/el-3270/.eslintrc.js' });
    expect(component.isConfigured('plugins')).toBe(true);
  });

  test('isInherited', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(component.isInherited('parserOptions')).toBe(true);
    expect(component.isInherited('ecmaFeatures')).toBe(true);
    expect(component.isInherited('env')).toBe(true);
    expect(component.isInherited('parser')).toBe(true);
  });

  test('makeOptionsForMultiselector', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const options = component.makeOptionsForMultiselector('env', 'env');
    expect(options.find(option => option[0] === 'jest/globals')).toBeTruthy();
  });

  test('makeOptionsForSingleselector', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const options = component.makeOptionsForSingleselector('globals.additionalProperties.oneOf[0]');
    expect(options.find(option => option[0] === 'readonly')).toBeTruthy();
  });

  test('makeProperties', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json', override: null });
    let properties = component.makeProperties();
    expect(properties.find(property => property[0] === 'overrides')).toBeTruthy();
    component.selection.select({ override: 0 });
    properties = component.makeProperties();
    expect(properties.find(property => property[0] === 'overrides')).toBeFalsy();
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    component.ngOnInit();
    let changes: any = { browser: false };
    component.generalForm.patchValue({ env: changes });
    expect(component.configs.configuration.env).toEqual(changes);
    changes = { globalReturn: true };
    component.generalForm.patchValue({ ecmaFeatures: changes });
    expect(component.configs.configuration.parserOptions.ecmaFeatures).toEqual(changes);
    changes = ['node', 'react'];
    component.generalForm.patchValue({ plugins: changes });
    expect(component.configs.configuration.plugins).toEqual(changes);
  });

});
