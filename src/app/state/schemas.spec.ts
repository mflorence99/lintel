import '../../assets/eslint-schema.js';

import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SchemasState } from '../state/schemas';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

describe('SchemasState', () => {

  let schemas: SchemasState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    schemas = TestBed.inject(SchemasState);
  });

  test('Schema state is initialized', () => {
    expect(schemas.snapshot['eslint']).toBeFalsy();
    schemas.initialize();
    expect(schemas.snapshot['eslint']).toBeTruthy();
  });

});
