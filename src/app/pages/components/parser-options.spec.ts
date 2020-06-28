import { ParserOptionsComponent } from './parser-options';
import { TestBed } from '@angular/core/testing';

import { async } from '@angular/core/testing';
import { prepare } from './component.spec';

declare const lintelVSCodeAPI;

describe('ParserOptionsComponent', () => {

  beforeEach(async(() => prepare()));

  test('Component is created', () => {
    const fixture = TestBed.createComponent(ParserOptionsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test('makeOptionsForSingleselector', () => {
    const fixture = TestBed.createComponent(ParserOptionsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    const options = component.makeOptionsForSingleselector('parserOptions.properties.ecmaVersion');
    expect(options.find(option => option[0] === 2020)).toBeTruthy();
  });

  test('ngOnInit', () => {
    const fixture = TestBed.createComponent(ParserOptionsComponent);
    const component = fixture.componentInstance;
    component.selection.select({ fileName: '/home/mflorence99/lintel/package.json' });
    component.ngOnInit();
    const changes = { ecmaVersion: 6 };
    component.parserOptionsForm.patchValue(changes);
    expect(component.configs.configuration.parserOptions).toEqual(expect.objectContaining(changes));
  });

});
