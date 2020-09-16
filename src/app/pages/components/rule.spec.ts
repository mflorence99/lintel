import { RuleComponent } from './rule';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

declare const lintelVSCodeAPI;

describe('RuleComponent', () => {
  let component: RuleComponent;
  let fixture: ComponentFixture<RuleComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(RuleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('breakable', () => {
    expect(component.breakable('unbreakable')).toBe('unbreakable');
    expect(component.breakable('camelCase')).toBe('camel\u200bCase');
  });

  test('editFile', () => {
    component.editFile('/home/mflorence99/lintel/package.json');
    expect(lintelVSCodeAPI.postMessage).toHaveBeenCalledWith({
      command: 'editFile',
      fileName: '/home/mflorence99/lintel/package.json'
    });
  });

  test('formGroupControls', () => {
    expect(component.formGroupControls(component.ruleForm)).toBeTruthy();
  });

  test('ngOnInit', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const rule = component.rules.snapshot['eslint']['brace-style'];
    let settings =
      component.configs.snapshot['/home/mflorence99/lintel/package.json'].rules[
        'brace-style'
      ];
    component.ruleDigest = component.configs.makeRuleDigest(
      'brace-style',
      rule,
      settings
    );
    component.schemaDigest = component.rules.makeSchemaDigest(
      'brace-style',
      rule
    );
    component.ngOnInit();
    component.ruleForm.patchValue({
      level: 'warn',
      root: { elements: ['stroustrup', { allowSingleLine: true }] }
    });
    settings =
      component.configs.snapshot['/home/mflorence99/lintel/package.json'].rules[
        'brace-style'
      ];
    expect(settings).toEqual(['warn', 'stroustrup', { allowSingleLine: true }]);
  });

  test('openFile', () => {
    component.openURL('www.google.com');
    expect(lintelVSCodeAPI.postMessage).toHaveBeenCalledWith({
      command: 'openFile',
      url: 'www.google.com'
    });
  });
});
