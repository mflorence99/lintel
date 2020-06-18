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
    component.selection.select({ fileName: 'package.json' });
    expect(component.canDoSettings()).toBe(true);
    component.selection.select({ fileName: 'ext/.eslintrc.js' });
    expect(component.canDoSettings()).toBe(false);
  });

  test('editFile', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.editFile('package.json');
    const calls = lintelVSCodeAPI.postMessage.mock.calls;
    expect(calls.length).toBe(1);
    const message = calls[0][0];
    expect(message).toEqual({
      command: 'editFile',
      fileName: 'package.json'
    });
  });

  test('isConfigured', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: 'package.json' });
    expect(component.isConfigured('ecmaFeatures')).toBe(false);
    component.selection.select({ fileName: 'src/app/.eslintrc.yaml' });
    expect(component.isConfigured('ecmaFeatures')).toBe(true);
    component.selection.select({ fileName: 'ext/.eslintrc.js' });
    expect(component.isConfigured('plugins')).toBe(true);
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(GeneralComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: 'package.json' });
    component.ngOnInit();
    let changes: any = { browser: false };
    component.generalForm.patchValue({ env: changes });
    expect(component.configs.configuration.env).toEqual(changes);
    changes = { globalReturn: true };
    component.generalForm.patchValue({ ecmaFeatures: changes });
    expect(component.configs.configuration.parserOptions.ecmaFeatures).toEqual(changes);
    changes = { ecmaVersion: 6 };
    component.generalForm.patchValue({ parserOptions: changes });
    expect(component.configs.configuration.parserOptions).toEqual(expect.objectContaining(changes));
    changes = ['node', 'react'];
    component.generalForm.patchValue({ plugins: changes });
    expect(component.configs.configuration.plugins).toEqual(changes);
  });

});
