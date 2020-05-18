import '../../../assets/eslint-schema.js';
import '../../../assets/eslintrc-files.js';

import { BarrelModule } from '../../barrel';
import { ConfigsState } from '../../state/configs';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { Params } from '../../services/params';
import { SchemasState } from '../../state/schemas';
import { TestBed } from '@angular/core/testing';

import { states } from '../../state/app';

export function prepare(components: any[]): void {

  TestBed.configureTestingModule({
    declarations: [
      ...components
    ],
    imports: [
      BarrelModule,
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot(),
    ]
  }).compileComponents();

  TestBed.inject(ConfigsState).initialize();
  TestBed.inject(SchemasState).initialize();

  TestBed.inject(Params);

}

describe('Components tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
