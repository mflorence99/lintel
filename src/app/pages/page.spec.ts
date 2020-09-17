import '../../assets/eslint-extensions.js';
import '../../assets/eslint-files/unit-tests.js';
import '../../assets/eslint-rules.js';
import '../../assets/eslint-schema.js';
import '../../assets/vscode-scripts.js';
import '../../assets/vscode-startup.js';

import { BarrelModule } from '../barrel';
import { ComponentsModule } from './components/module';
import { ComponentsModule as CommonComponents } from '../components/module';
import { ConfigsState } from '../state/configs';
import { ExtensionsState } from '../state/extensions';
import { FilesState } from '../state/files';
import { LintelState } from '../state/lintel';
import { PipesModule } from '../pipes/module';
import { RulesState } from '../state/rules';
import { SchemaState } from '../state/schema';

import { states } from '../state/app';

import { ContextMenuService } from 'ngx-contextmenu';
import { ElementRef } from '@angular/core';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

declare let lintelVSCodeAPI;

// @see https://stackoverflow.com/questions/38623065
export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

export function prepare(): void {
  TestBed.configureTestingModule({
    imports: [
      BarrelModule,
      CommonComponents,
      ComponentsModule,
      NgxsModule.forRoot(states),
      NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
      PipesModule
    ],
    providers: [
      ContextMenuService,
      { provide: ElementRef, useValue: new MockElementRef() }
    ]
  }).compileComponents();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lintelVSCodeAPI = {
    getState: jest.fn(),
    postMessage: jest.fn(),
    setState: jest.fn()
  };

  // NOTE: must do files first
  TestBed.inject(FilesState).initialize();
  TestBed.inject(ConfigsState).initialize();
  TestBed.inject(ExtensionsState).initialize();
  TestBed.inject(RulesState).initialize();
  TestBed.inject(SchemaState).initialize();

  TestBed.inject(LintelState);
}

describe('Components tests helpers', () => {
  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });
});
