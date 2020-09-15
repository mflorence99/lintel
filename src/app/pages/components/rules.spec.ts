import { RuleDigest } from '../../state/configs';
import { RulesComponent } from './rules';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

declare const lintelVSCodeAPI;

describe('RulesComponent', () => {
  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('canExportRule - in config', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: '@typescript-eslint'
    });
    expect(
      component.canExportRule({
        ruleName: '@typescript-eslint/member-ordering'
      } as RuleDigest)
    ).toBe(true);
  });

  test('canExportRule - in extension', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: 'vue'
    });
    expect(
      component.canExportRule({
        ruleName: 'vue/attributes-order'
      } as RuleDigest)
    ).toBe(true);
  });

  test('execute deletes rule', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: '@typescript-eslint'
    });
    const ruleName = '@typescript-eslint/member-ordering';
    expect(component.configs.configuration.rules[ruleName]).toBeTruthy();
    component.execute({ ruleName } as RuleDigest, 'delete');
    expect(component.configs.configuration.rules[ruleName]).toBeFalsy();
  });

  test('execute exports rule', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: '@typescript-eslint'
    });
    const ruleName = '@typescript-eslint/member-ordering';
    component.execute({ ruleName } as RuleDigest, 'export');
    const calls = lintelVSCodeAPI.postMessage.mock.calls;
    expect(calls.length).toBeGreaterThanOrEqual(1);
    const message = calls[calls.length - 1][0];
    expect(message.command).toEqual('clipboardCopy');
  });

  test('isRuleDefined', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    expect(component.isRuleDefined({ defined: true } as RuleDigest)).toBe(true);
    expect(component.isRuleDefined({ defined: false } as RuleDigest)).toBe(
      false
    );
  });

  test('trackByRule', () => {
    const fixture = TestBed.createComponent(RulesComponent);
    const component = fixture.componentInstance;
    expect(component.trackByRule(null, { key: 'brace-style' })).toEqual(
      'brace-style'
    );
  });
});
