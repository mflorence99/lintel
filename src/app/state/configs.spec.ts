import '../../assets/eslintrc-files.js';

import { ConfigsState } from '../state/configs';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';

import { states } from '../state/app';

describe('ConfigsState', () => {

  let configs: ConfigsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(states),
        NgxsDataPluginModule.forRoot(),
      ]
    });
    configs = TestBed.inject(ConfigsState);
  });

  test('Config state is initialized', () => {
    expect(configs.snapshot['package.json']).toBeFalsy();
    configs.initialize();
    expect(configs.snapshot['package.json']).toBeTruthy();
  });

  test('TreeView is properly constructed', () => {
    configs.initialize();
    expect(configs.treeView.fileName).toEqual('package.json');
    expect(configs.treeView.children[0].fileName).toEqual('ext/.eslintrc.json');
    expect(configs.treeView.children[1].fileName).toEqual('src/.eslintrc.yml');
    expect(configs.treeView.children[1].children[0].fileName).toEqual('src/app/.eslintrc.js');
  });

});
