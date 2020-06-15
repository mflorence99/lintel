import '../../assets/eslint-files/unit-tests.js';
import '../../assets/eslint-rules.js';
import '../../assets/eslint-schema.js';
import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

import { ConfigsState } from '../state/configs';
import { FilesState } from '../state/files';
import { FilterState } from '../state/filter';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { Params } from '../services/params';
import { RulesState } from '../state/rules';
import { SchemaState } from '../state/schema';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';
import { Utils } from '../services/utils';

import { states } from './app';

declare let lintelSearchParams;
declare let lintelVSCodeAPI;

export interface Bundle {
  configs?: ConfigsState;
  files?: FilesState;
  filter?: FilterState;
  params?: Params;
  rules?: RulesState;
  schema?: SchemaState;
  selection?: SelectionState;
  utils?: Utils;
}

export function prepare(): Bundle {

  const bundle: Bundle = { };

  TestBed.configureTestingModule({
    imports: [
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    ]
  });

  // mock the API
  lintelSearchParams = '?freshStart=true';

  lintelVSCodeAPI = {
    getState: jest.fn(() => ({ })),
    postMessage: jest.fn(message => message),
    setState: jest.fn(state => state),
  };

  bundle.configs = TestBed.inject(ConfigsState);
  bundle.files = TestBed.inject(FilesState);
  bundle.filter = TestBed.inject(FilterState);
  bundle.params = TestBed.inject(Params);
  bundle.rules = TestBed.inject(RulesState);
  bundle.schema = TestBed.inject(SchemaState);
  bundle.selection = TestBed.inject(SelectionState);
  bundle.utils = TestBed.inject(Utils);

  // TODO: must do files first
  bundle.files.initialize();
  bundle.configs.initialize();
  bundle.rules.initialize();
  bundle.schema.initialize();

  return bundle;

}

describe('State tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
