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
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    component.selectPluginName('@typescript-eslint');
    expect(component.selection.pluginName).toEqual('@typescript-eslint');
  });

});
