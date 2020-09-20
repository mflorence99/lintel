import { RuleDigest } from '../../state/configs';
import { RulesComponent } from './rules';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

declare const lintelVSCodeAPI;

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
  });

  test('canCopyRule', () => {
    expect(component.canCopyRule({ defined: true } as RuleDigest)).toBeTrue();
    expect(component.canCopyRule({ defined: false } as RuleDigest)).toBeFalse();
  });

  test('canExportRule - in config', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: '@typescript-eslint'
    });
    expect(
      component.canExportRule({
        ruleName: '@typescript-eslint/member-ordering'
      } as RuleDigest)
    ).toBeTrue();
  });

  test('canExportRule - in extension', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: 'vue'
    });
    expect(
      component.canExportRule({
        ruleName: 'vue/attributes-order'
      } as RuleDigest)
    ).toBeTrue();
  });

  test('execute deletes rule', () => {
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

  test('trackByRule', () => {
    expect(component.trackByRule(null, { key: 'brace-style' })).toEqual(
      'brace-style'
    );
  });

  test('snapshot', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: component.params.basePluginName,
      category: component.params.activeCategory,
      override: null
    });
    component.view = component.configs.activeView;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
