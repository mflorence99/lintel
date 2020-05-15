import { Bundle } from './state.spec';

import { config } from '../config';
import { prepare } from './state.spec';

describe('SelectionState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Selections can be made', () => {
    states.selection.select({ 
      category: config.activeCategory, 
      fileName: 'package.json', 
      pluginName: config.basePluginName 
    });
    expect(states.selection.category).toEqual(config.activeCategory);
    expect(states.selection.fileName).toEqual('package.json');
    expect(states.selection.pluginName).toEqual(config.basePluginName);
    expect(states.configs.pluginNames.length).toEqual(2);
    expect(states.configs.pluginNames[0]).toEqual(config.basePluginName);
    expect(states.configs.categories.length).toEqual(7);
    expect(states.configs.categories[0]).toEqual('Best Practices');
  });

});
