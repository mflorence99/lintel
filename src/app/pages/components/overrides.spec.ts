import { OverridesComponent } from './overrides';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('OverridesComponent', () => {
  let component: OverridesComponent;
  let fixture: ComponentFixture<OverridesComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(OverridesComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('Override can be added', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(component.configs.configuration.overrides.length).toBe(4);
    component.execute(null, 'add');
    expect(component.configs.configuration.overrides.length).toBe(5);
  });

  test('Override can be deleted', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    expect(component.configs.configuration.overrides.length).toBe(4);
    component.execute(3, 'delete');
    expect(component.configs.configuration.overrides.length).toBe(3);
  });

  test('ngOnInit', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    // NOTE: force controls to be rebuilt
    component.ngOnInit();
    component.overridesForm.patchValue({ files: [['*.md', '*.markdown']] });
    expect(component.configs.configuration.overrides[0].files).toEqual([
      '*.md',
      '*.markdown'
    ]);
  });
});
