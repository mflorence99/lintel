import { ConfigsComponent } from './configs';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
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
    component.selectCategory(new Event('click'), 'Best Practices');
    expect(component.selection.category).toEqual('Best Practices');
    // selecting category again is harmless
    component.selectCategory(new Event('click'), 'Best Practices');
    expect(component.selection.category).toEqual('Best Practices');
  });

  test('Filename can be selected', () => {
    const fixture = TestBed.createComponent(ConfigsComponent);
    const component = fixture.componentInstance;
    component.selectFileName(new Event('click'), 'package.json');
    expect(component.selection.fileName).toEqual('package.json');
  });

});
