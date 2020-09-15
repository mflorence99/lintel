import '../../assets/eslint-extensions.js';
import '../../assets/eslint-files/unit-tests.js';
import '../../assets/eslint-rules.js';
import '../../assets/eslint-schema.js';
import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

import { ConfigsState } from './configs';
import { ExtensionsState } from './extensions';
import { FilesState } from './files';
import { FilterState } from './filter';
import { LintelState } from './lintel';
import { Params } from '../services/params';
import { RulesState } from './rules';
import { SchemaState } from './schema';
import { SelectionState } from './selection';
import { Utils } from '../services/utils';

import { states } from './app';

import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

declare let lintelSearchParams;
declare let lintelVSCodeAPI;

export interface Bundle {
  configs?: ConfigsState;
  extensions?: ExtensionsState;
  files?: FilesState;
  filter?: FilterState;
  lintel?: LintelState;
  params?: Params;
  rules?: RulesState;
  schema?: SchemaState;
  selection?: SelectionState;
  utils?: Utils;
}

export function prepare(): Bundle {
  const bundle: Bundle = {};

  TestBed.configureTestingModule({
    imports: [
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN])
    ]
  });

  // mock the API
  lintelSearchParams = '?freshStart=true';

  lintelVSCodeAPI = {
    getState: jest.fn(),
    postMessage: jest.fn(),
    setState: jest.fn()
  };

  bundle.configs = TestBed.inject(ConfigsState);
  bundle.extensions = TestBed.inject(ExtensionsState);
  bundle.files = TestBed.inject(FilesState);
  bundle.filter = TestBed.inject(FilterState);
  bundle.lintel = TestBed.inject(LintelState);
  bundle.params = TestBed.inject(Params);
  bundle.rules = TestBed.inject(RulesState);
  bundle.schema = TestBed.inject(SchemaState);
  bundle.selection = TestBed.inject(SelectionState);
  bundle.utils = TestBed.inject(Utils);

  // NOTE: must do files first
  bundle.files.initialize();
  bundle.configs.initialize();
  bundle.rules.initialize();
  bundle.extensions.initialize();
  bundle.schema.initialize();

  return bundle;
}

describe('State tests helpers', () => {
  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });
});
