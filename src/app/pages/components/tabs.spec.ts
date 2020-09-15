import { TabsComponent } from './tabs';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('TabsComponent', () => {
  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Plugins are filtered', (done) => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json',
      pluginName: 'vue',
      category: 'Best Practices'
    });
    component.filter.filterRuleName('tests');
    component.utils.nextTick(() => {
      expect(component.selection.snapshot.pluginName).toBe(
        component.params.basePluginName
      );
      done();
    });
  });

  test('Plugin can be selected', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    // NOTE: need to fake setting of file
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    component.selectPluginName('@typescript-eslint');
    expect(component.selection.pluginName).toEqual('@typescript-eslint');
  });

  test('Plugins are partitioned into tabs and overflow dropdown', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    component.filter.filterRuleName('class');
    const which = component.whichPlugins();
    expect(which.inTab).toEqual([
      component.params.basePluginName,
      '@angular-eslint',
      '@typescript-eslint',
      'react',
      'vue'
    ]);
    expect(which.inMore).toEqual([]);
  });
});
