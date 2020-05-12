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

describe('ConfigsState', () => {

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

  test('Config state is initialized', () => {
    expect(configs.snapshot['package.json']).toBeTruthy();
    expect(configs.fileNames.length).toEqual(4);
    expect(configs.fileNames[0]).toEqual('package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(configs.fileNames.length).toEqual(4);
    expect(configs.fileNames[0]).toEqual('package.json');
  });

  test('pluginNames are properly constructed', () => {
    selection.select({ fileName: 'package.json' });
    expect(configs.pluginNames.length).toEqual(2);
    expect(configs.pluginNames[0]).toEqual(config.basePluginName);
  });

  test('No pluginNames can be determined unless a fileName is selected first', () => {
    expect(configs.pluginNames.length).toEqual(0);
  });

  test('PluginView is properly constructed', () => {
    selection.select({ fileName: 'package.json' });
    const view = configs.pluginView;
    expect(view[config.basePluginName]['brace-style']).toBeTruthy();
    expect(view['@typescript-eslint']['@typescript-eslint/no-empty-function']).toBeTruthy();
  });

  test('PluginView is properly constructed from partial cascaded file', () => {
    selection.select({ fileName: 'ext/.eslintrc.json' });
    const view = configs.pluginView;
    expect(view['@typescript-eslint']['@typescript-eslint/brace-style']).toEqual('warn');
  });

});
