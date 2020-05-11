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
  });

  test('PluginView is properly constructed', () => {
    configs.initialize();
    selection.select({ fileName: 'package.json' });
    const view = configs.pluginView;
    expect(view.length).toEqual(2);
    expect(view[0].pluginName).toEqual('eslint');
    expect(view[0].rules['brace-style']).toEqual('error');
    expect(view[1].pluginName).toEqual('@typescript-eslint');
    expect(view[1].rules['@typescript-eslint/no-empty-function']).toEqual('off');
  });

  test('PluginView is properly constructed from partial cascaded file', () => {
    configs.initialize();
    selection.select({ fileName: 'ext/.eslintrc.json' });
    const view = configs.pluginView;
    expect(view.length).toEqual(1);
    expect(view[0].pluginName).toEqual('@typescript-eslint');
    expect(view[0].rules['@typescript-eslint/brace-style']).toEqual('warn');
  });

  test('No PluginView can be determined unless a fileName is selected first', () => {
    configs.initialize();
    const view = configs.pluginView;
    expect(view.length).toEqual(0);
  });

  test('TreeView is properly constructed', () => {
    configs.initialize();
    const root = configs.treeView[0];
    expect(root.fileName).toEqual('package.json');
    expect(root.children[0].fileName).toEqual('ext/.eslintrc.json');
    expect(root.children[1].fileName).toEqual('src/.eslintrc.yml');
    expect(root.children[1].children[0].fileName).toEqual('src/app/.eslintrc.js');
  });

});
