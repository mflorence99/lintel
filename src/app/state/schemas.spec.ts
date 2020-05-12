import '../../assets/eslint-schema.js';
import '../../assets/eslintrc-files.js';

import { ConfigsState } from '../state/configs';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SchemasState } from '../state/schemas';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';

import { config } from '../config';
import { states } from './app';

describe('SchemasState', () => {

  let configs: ConfigsState;
  let schemas: SchemasState;
  let selection: SelectionState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    configs = TestBed.inject(ConfigsState);
    schemas = TestBed.inject(SchemasState);
    selection = TestBed.inject(SelectionState);
    configs.initialize();
    schemas.initialize();
  });

  test('Schema state is initialized', () => {
    expect(schemas.snapshot[config.basePluginName]).toBeTruthy();
  });

  test('categories are properly constructed', () => {
    selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    expect(schemas.categories.length).toEqual(8);
    expect(schemas.categories[0]).toEqual(config.activeCategory);
    expect(schemas.categories[1]).toEqual('Best Practices');
  });

  test('No categories can be determined unless a pluginName is selected first', () => {
    expect(schemas.categories.length).toEqual(0);
  });

  test('CategoryView is properly constructed', () => {
    selection.select({ fileName: 'package.json', pluginName: config.basePluginName });
    const view = schemas.categoryView;
    expect(view[config.activeCategory]['space-infix-ops']).toBeTruthy();
    expect(view['Best Practices']['accessor-pairs']).toBeTruthy();
    expect(view['Variables']['init-declarations']).toBeTruthy();
  });

});
