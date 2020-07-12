import { OverridesComponent } from './overrides';

import { prepare } from './component.spec';

import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';

describe('OverridesComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(OverridesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('Override can be added', () => {
    const fixture = TestBed.createComponent(OverridesComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(component.configs.configuration.overrides.length).toBe(4);
    component.execute(null, 'add');
    expect(component.configs.configuration.overrides.length).toBe(5);
  });

  test('Override can be deleted', () => {
    const fixture = TestBed.createComponent(OverridesComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    expect(component.configs.configuration.overrides.length).toBe(4);
    component.execute(3, 'delete');
    expect(component.configs.configuration.overrides.length).toBe(3);
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(OverridesComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    component.overridesForm.patchValue({ files: [['*.md', '*.markdown']] });
    expect(component.configs.configuration.overrides[0].files).toEqual(['*.md', '*.markdown']);
  });

});
