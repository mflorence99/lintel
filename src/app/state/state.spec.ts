import '../../assets/eslint-schema.js';
import '../../assets/eslintrc-files.js';

import { ConfigsState } from '../state/configs';
import { FilterState } from '../state/filter';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SchemasState } from '../state/schemas';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';

import { config } from '../config';
import { states } from './app';

export interface Bundle {
  configs?: ConfigsState;
  filter?: FilterState;
  schemas?: SchemasState;
  selection?: SelectionState;
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
  bundle.schemas = TestBed.inject(SchemasState);
  bundle.selection = TestBed.inject(SelectionState);

  bundle.configs.initialize();
  bundle.schemas.initialize();

  // NOTE: minimize any debounce timeout
  config.debounceTimeout = 0;

  return bundle;

}

describe('State tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
