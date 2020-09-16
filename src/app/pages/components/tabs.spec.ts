import { TabsComponent } from './tabs';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('Plugins are filtered', (done) => {
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
    // NOTE: need to fake setting of file
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    component.selectPluginName('@typescript-eslint');
    expect(component.selection.pluginName).toBe('@typescript-eslint');
  });

  test('Plugins are partitioned into tabs and overflow dropdown', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
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
