import { Bundle } from './state.spec';

import { config } from '../config';
import { prepare } from './state.spec';

describe('ConfigsState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Config state is initialized', () => {
    expect(states.configs.snapshot['package.json']).toBeTruthy();
    expect(states.configs.fileNames.length).toEqual(4);
    expect(states.configs.fileNames[0]).toEqual('package.json');
  });

  test('fileNames are properly constructed', () => {
    expect(states.configs.fileNames.length).toEqual(4);
    expect(states.configs.fileNames[0]).toEqual('package.json');
  });

  test('pluginNames are properly constructed', () => {
    states.selection.select({ fileName: 'package.json' });
    expect(states.configs.pluginNames.length).toEqual(2);
    expect(states.configs.pluginNames[0]).toEqual(config.basePluginName);
  });

  test('No pluginNames can be determined unless a fileName is selected first', () => {
    expect(states.configs.pluginNames.length).toEqual(0);
  });

  test('PluginView is properly constructed', () => {
    states.selection.select({ fileName: 'package.json' });
    const view = states.configs.pluginView;
    expect(view[config.basePluginName]['brace-style']).toBeTruthy();
    expect(view['@typescript-eslint']['@typescript-eslint/no-empty-function']).toBeTruthy();
  });

  test('PluginView is properly constructed from partial cascaded file', () => {
    states.selection.select({ fileName: 'ext/.eslintrc.json' });
    const view = states.configs.pluginView;
    expect(view['@typescript-eslint']['@typescript-eslint/brace-style']).toEqual('warn');
  });

});
