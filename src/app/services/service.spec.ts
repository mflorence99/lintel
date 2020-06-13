import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

export function prepare(services: any[]): any[] {

  TestBed.configureTestingModule({
    imports: [
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    ]
  });

  return services.map(service => TestBed.inject(service));

}

describe('Service tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
