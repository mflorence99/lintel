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

  test('Plugin can be selected', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    component.selectPluginName(new Event('click'), config.basePluginName);
    expect(component.selection.pluginName).toEqual(config.basePluginName);

  });


});
