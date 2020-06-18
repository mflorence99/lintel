import { RuleComponent } from './rule';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

declare const lintelVSCodeAPI;

describe('RuleComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('breakable', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    expect(component.breakable('unbreakable')).toBe('unbreakable');
    expect(component.breakable('camelCase')).toBe('camel\u200bCase');
  });

  test('editFile', () => {
    const fixture = TestBed.createComponent(RuleComponent);
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

  test('formGroupControls', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    expect(component.formGroupControls(component.ruleForm)).toBeTruthy();
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    const rule = component.rules.snapshot['eslint']['brace-style'];
    let settings = component.configs.snapshot['package.json'].rules['brace-style'];
    component.ruleDigest = component.configs.makeRuleDigest('brace-style', rule, settings);
    component.schemaDigest = component.rules.makeSchemaDigest('brace-style', rule);
    component.ngOnInit();
    component.ruleForm.patchValue({ level: 'warn', root: { elements: ['stroustrup', { allowSingleLine: true }] } });
    settings = component.configs.snapshot['package.json'].rules['brace-style'];
    expect(settings).toEqual(['warn', 'stroustrup', { allowSingleLine: true }]);
  });

  test('openFile', () => {
    const fixture = TestBed.createComponent(RuleComponent);
    const component = fixture.componentInstance;
    component.openURL('www.google.com');
    const calls = lintelVSCodeAPI.postMessage.mock.calls;
    expect(calls.length).toBe(1);
    const message = calls[0][0];
    expect(message).toEqual({
      command: 'openFile',
      url: 'www.google.com'
    });
  });

});
