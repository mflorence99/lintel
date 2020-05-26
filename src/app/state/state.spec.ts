import '../../assets/eslint-rules.js';
import '../../assets/eslint-schema.js';
import '../../assets/eslintrc-files.js';

import { ConfigsState } from '../state/configs';
import { FilterState } from '../state/filter';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { Params } from '../services/params';
import { RulesState } from '../state/rules';
import { SchemaState } from '../state/schema';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';
import { Utils } from '../services/utils';

import { states } from './app';

export interface Bundle {
  configs?: ConfigsState;
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
      NgxsDataPluginModule.forRoot(),
    ]
  });

  bundle.configs = TestBed.inject(ConfigsState);
  bundle.filter = TestBed.inject(FilterState);
  bundle.params = TestBed.inject(Params);
  bundle.rules = TestBed.inject(RulesState);
  bundle.schema = TestBed.inject(SchemaState);
  bundle.selection = TestBed.inject(SelectionState);
  bundle.utils = TestBed.inject(Utils);

  bundle.configs.initialize();
  bundle.rules.initialize();
  bundle.schema.initialize();

  // NOTE: minimize any debounce timeout
  Params.debounceTimeout = 0;

  return bundle;

}

describe('State tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
