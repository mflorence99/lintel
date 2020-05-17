import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('SelectionState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Selections can be made', () => {
    bundle.selection.select({ 
      category: bundle.params.activeCategory, 
      fileName: 'package.json', 
      pluginName: bundle.params.basePluginName 
    });
    expect(bundle.selection.category).toEqual(bundle.params.activeCategory);
    expect(bundle.selection.fileName).toEqual('package.json');
    expect(bundle.selection.pluginName).toEqual(bundle.params.basePluginName);
  });

});
