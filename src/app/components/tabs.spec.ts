import { TabsComponent } from './tabs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { config } from '../config';
import { prepare } from './component.spec';

describe('TabsComponent', () => {

  beforeEach(async(() => prepare([TabsComponent])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Plugin can be selected and category is reset', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    // NOTE: need to fake setting of file
    component.selection.select({ fileName: 'package.json' });
    component.selectPluginName(new Event('click'), config.basePluginName);
    expect(component.selection.pluginName).toEqual(config.basePluginName);
    expect(component.selection.category).toEqual(config.activeCategory);
    expect(component.tabIndex).toEqual(0);
    component.onTabSelect(1);
    expect(component.selection.pluginName).toEqual('@typescript-eslint');
  });

  test('If plugin is already selected, category is not reset', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    // set something arbitrary
    component.selection.select({
      category: 'Arbitrary Category',
      fileName: 'package.json',
      pluginName: config.basePluginName
    });
    component.selectPluginName(new Event('click'), config.basePluginName);
    expect(component.selection.category).toEqual('Arbitrary Category');
  });

});
