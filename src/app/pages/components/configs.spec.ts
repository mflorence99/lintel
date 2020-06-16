import { ConfigsComponent } from './configs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('ConfigsComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('colorForFile', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(component.colorForFile('package.json')).toBe('var(--mat-green-a400)');
    expect(component.colorForFile('a/b/c.js')).toBe('var(--mat-blue-a400)');
    expect(component.colorForFile('xxx.cjs')).toBe('var(--mat-red-a400)');
    expect(component.colorForFile('ext/.eslintrc.yml')).toBe('var(--mat-yellow-a400)');
    expect(component.colorForFile('ext/.eslintrc.yaml')).toBe('var(--mat-yellow-a400)');
    expect(component.colorForFile('anything.json')).toBe('var(--mat-orange-a400)');
  });

  test('iconForFile', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(component.iconForFile('package.json')).toEqual(['fab', 'node-js']);
    expect(component.iconForFile('a/b/c.js')).toEqual(['fab', 'js']);
    expect(component.iconForFile('xxx.cjs')).toEqual(['far', 'file-code']);
    expect(component.iconForFile('ext/.eslintrc.yml')).toEqual(['far', 'file-code']);
    expect(component.iconForFile('ext/.eslintrc.yaml')).toEqual(['far', 'file-code']);
    expect(component.iconForFile('anything.json')).toEqual(['far', 'file-code']);
  });

  test('ngAfterViewChecked', done => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: 'package.json', pluginName: component.params.basePluginName, category: 'Best Practices' });
    component.filter.filterRuleName('no-label-var');
    component.ngAfterViewChecked();
    component.utils.nextTick(() => {
      expect(component.selection.snapshot.category).toBe('Variables');
      done();
    });
  });

  test('selectCategory', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ category: 'xxx' });
    component.selectCategory(new Event('click'), 'Best Practices');
    expect(component.selection.category).toEqual('Best Practices');
    // selecting category again is harmless
    component.selectCategory(new Event('click'), 'Best Practices');
    expect(component.selection.category).toEqual('Best Practices');
  });

  test('selectFileName', done => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: 'xxx' });
    component.selectFileName(new Event('click'), 'package.json');
    component.utils.nextTick(() => {
      expect(component.selection.fileName).toEqual('package.json');
      done();
    });
  });

});
