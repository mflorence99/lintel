import { ConfigsComponent } from './configs';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

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
    expect(
      component.colorForFile('/home/mflorence99/lintel/package.json')
    ).toBe('var(--mat-light-green-a700)');
    expect(component.colorForFile('a/b/c.js')).toBe(
      'var(--mat-light-blue-a700)'
    );
    expect(component.colorForFile('xxx.cjs')).toBe('var(--mat-pink-a700)');
    expect(component.colorForFile('ext/.eslintrc.yml')).toBe(
      'var(--mat-yellow-a700)'
    );
    expect(component.colorForFile('ext/.eslintrc.yaml')).toBe(
      'var(--mat-yellow-a700)'
    );
    expect(component.colorForFile('anything.json')).toBe(
      'var(--mat-teal-a700)'
    );
  });

  test('iconForFile', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(
      component.iconForFile('/home/mflorence99/lintel/package.json')
    ).toEqual(['fab', 'node-js']);
    expect(component.iconForFile('a/b/c.js')).toEqual(['fab', 'js']);
    expect(component.iconForFile('xxx.cjs')).toEqual(['far', 'file-code']);
    expect(component.iconForFile('ext/.eslintrc.yml')).toEqual([
      'far',
      'file-code'
    ]);
    expect(component.iconForFile('ext/.eslintrc.yaml')).toEqual([
      'far',
      'file-code'
    ]);
    expect(component.iconForFile('anything.json')).toEqual([
      'far',
      'file-code'
    ]);
  });

  test('Categories are filtered', (done) => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: component.params.basePluginName,
      category: 'Best Practices'
    });
    component.filter.filterRuleName('no-label-var');
    component.utils.nextTick(() => {
      expect(component.selection.snapshot.category).toBe(
        component.params.activeCategory
      );
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

  test('selectOverride', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ override: null });
    component.selectOverride(new Event('click'), 0);
    expect(component.selection.override).toBe(0);
    expect(component.selection.overrideFiles).toEqual(['*.md']);
    expect(component.lintel.isEnabled).toBe(true);
    // now one that is inherited
    component.selectOverride(new Event('click'), 4);
    expect(component.selection.override).toBe(4);
    expect(component.selection.overrideFiles).toEqual(['*.cjs', '.*.cjs']);
    expect(component.lintel.isEnabled).toBe(false);
  });

  test('selectFileName', (done) => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: 'xxx' });
    component.selectFileName(
      new Event('click'),
      '/home/mflorence99/lintel/package.json'
    );
    component.utils.nextTick(() => {
      expect(component.selection.fileName).toEqual(
        '/home/mflorence99/lintel/package.json'
      );
      done();
    });
  });

  test('shortenFileName', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(
      component.shortenFileName('/home/mflorence99/lintel/package.json')
    ).toEqual('lintel/\u200bpackage.json');
  });
});
