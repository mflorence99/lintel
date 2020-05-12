import '../../assets/eslintrc-files.js';

import { ConfigsState } from '../state/configs';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { SelectionState } from '../state/selection';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

describe('ConfigsState', () => {

  let configs: ConfigsState;
  let selection: SelectionState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    configs = TestBed.inject(ConfigsState);
    selection = TestBed.inject(SelectionState);
  });

  test('Config state is initialized', () => {
    expect(configs.snapshot['package.json']).toBeFalsy();
    configs.initialize();
    expect(configs.snapshot['package.json']).toBeTruthy();
    expect(configs.fileNames.length).toEqual(4);
    expect(configs.fileNames[0]).toEqual('package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(configs.snapshot['package.json']).toBeFalsy();
    configs.initialize();
    expect(configs.fileNames.length).toEqual(4);
    expect(configs.fileNames[0]).toEqual('package.json');
  });

  test('pluginNames are properly constructed', () => {
    configs.initialize();
    selection.select({ fileName: 'package.json' });
    expect(configs.pluginNames.length).toEqual(2);
    expect(configs.pluginNames[0]).toEqual('eslint');
  });

  test('No pluginNsames can be determined unless a fileName is selected first', () => {
    configs.initialize();
    expect(configs.pluginNames.length).toEqual(0);
  });

  test('PluginView is properly constructed', () => {
    configs.initialize();
    selection.select({ fileName: 'package.json' });
    const view = configs.pluginView;
    expect(view['eslint']['brace-style']).toBeTruthy();
    expect(view['@typescript-eslint']['@typescript-eslint/no-empty-function']).toBeTruthy();
  });

  test('PluginView is properly constructed from partial cascaded file', () => {
    configs.initialize();
    selection.select({ fileName: 'ext/.eslintrc.json' });
    const view = configs.pluginView;
    expect(view['@typescript-eslint']['@typescript-eslint/brace-style']).toEqual('warn');
  });

});
