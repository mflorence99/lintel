import '../../assets/eslint-schema.js';

import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SchemasState } from '../state/schemas';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

describe('SchemasState', () => {

  let schemas: SchemasState;
  let selection: SelectionState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    schemas = TestBed.inject(SchemasState);
    selection = TestBed.inject(SelectionState);
  });

  test('Schema state is initialized', () => {
    expect(schemas.snapshot['eslint']).toBeFalsy();
    schemas.initialize();
    expect(schemas.snapshot['eslint']).toBeTruthy();
  });

  test('categories are properly constructed', () => {
    schemas.initialize();
    selection.select({ pluginName: 'eslint' });
    expect(schemas.categories.length).toEqual(7);
    expect(schemas.categories[0]).toEqual('Best Practices');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    schemas.initialize();
    expect(schemas.categories.length).toEqual(0);
  });

  test('CategoryView is properly constructed', () => {
    schemas.initialize();
    selection.select({ pluginName: 'eslint' });
    const view = schemas.categoryView;
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

});
