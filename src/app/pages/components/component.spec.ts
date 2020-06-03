import '../../../assets/eslint-files/unit-tests.js';
import '../../../assets/eslint-rules.js';
import '../../../assets/eslint-schema.js';

import { BarrelModule } from '../../barrel';
import { ComponentsModule } from './module';
import { ComponentsModule as CommonComponents } from '../../components/module';
import { ConfigsState } from '../../state/configs';
import { FilesState } from '../../state/files';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { Params } from '../../services/params';
import { RulesState } from '../../state/rules';
import { SchemaState } from '../../state/schema';
import { TestBed } from '@angular/core/testing';

import { states } from '../../state/app';

export function prepare(): void {

  TestBed.configureTestingModule({
    imports: [
      BarrelModule,
      CommonComponents,
      ComponentsModule,
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    ]
  }).compileComponents();

  window['__SEARCH_PARAMS'] = '?freshStart=true';

  // TODO: must do files first
  TestBed.inject(FilesState).initialize();
  TestBed.inject(ConfigsState).initialize();
  TestBed.inject(RulesState).initialize();
  TestBed.inject(SchemaState).initialize();

  TestBed.inject(Params);

}

describe('Components tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
