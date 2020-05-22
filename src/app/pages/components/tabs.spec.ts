import { TabsComponent } from './tabs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

describe('TabsComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Plugin can be selected', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    // NOTE: need to fake setting of file
    component.selection.select({ fileName: 'package.json' });
    component.selectPluginName(new Event('click'), component.params.basePluginName);
    expect(component.selection.pluginName).toEqual(component.params.basePluginName);
    expect(component.tabIndex).toEqual(0);
    component.onTabSelect(1);
    expect(component.selection.pluginName).toEqual('@typescript-eslint');
  });

});
