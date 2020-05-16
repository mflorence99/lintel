import { ConfigsComponent } from './configs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { config } from '../config';
import { prepare } from './component.spec';

describe('ConfigsComponent', () => {

  beforeEach(async(() => prepare([ConfigsComponent])));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Category can be selected', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selectCategory(new Event('click'), 'Best Practices', null);
    expect(component.selection.category).toEqual('Best Practices');
    // selecting category again is harmless
    component.selectCategory(new Event('click'), 'Best Practices', null);
    expect(component.selection.category).toEqual('Best Practices');
  });

  test('Filename can be selected and pluginName and category are reset', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selectFileName(new Event('click'), 'package.json');
    expect(component.selection.fileName).toEqual('package.json');
    expect(component.selection.pluginName).toEqual(config.basePluginName);
    expect(component.selection.category).toEqual(config.activeCategory);
  });

  test('If fileName is already selected, pluginName and category are not reset', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    // set something arbitrary
    component.selection.select({
      category: 'Arbitrary Category',
      fileName: 'package.json',
      pluginName: 'Arbitrary Plugin'
    });
    component.selectFileName(new Event('click'), 'package.json');
    expect(component.selection.pluginName).toEqual('Arbitrary Plugin');
    expect(component.selection.category).toEqual('Arbitrary Category');
  });

});
