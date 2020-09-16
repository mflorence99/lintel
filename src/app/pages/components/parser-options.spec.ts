import { ParserOptionsComponent } from './parser-options';

import { prepare } from '../page.spec';

import 'jest-extended';

import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('ParserOptionsComponent', () => {
  let component: ParserOptionsComponent;
  let fixture: ComponentFixture<ParserOptionsComponent>;

  beforeEach(() => {
    prepare();
    fixture = TestBed.createComponent(ParserOptionsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  test('makeOptionsForSingleselector', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    const options = component.makeOptionsForSingleselector(
      'parserOptions.properties.ecmaVersion'
    );
    expect(options.find((option) => option[0] === 2020)).toBeTruthy();
  });

  test('ngOnInit', () => {
    component.selection.select({
      fileName: '/home/mflorence99/lintel/package.json'
    });
    component.ngOnInit();
    const changes = { ecmaVersion: 6 };
    component.parserOptionsForm.patchValue(changes);
    expect(component.configs.configuration.parserOptions).toEqual(
      expect.objectContaining(changes)
    );
  });
});
