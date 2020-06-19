import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('SelectionState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Selections can be made', () => {
    bundle.selection.select({ 
      category: bundle.params.activeCategory, 
      fileName: '/home/mflorence99/lintel/package.json', 
      pluginName: bundle.params.basePluginName 
    });
    expect(bundle.selection.category).toEqual(bundle.params.activeCategory);
    expect(bundle.selection.fileName).toEqual('/home/mflorence99/lintel/package.json');
    expect(bundle.selection.pluginName).toEqual(bundle.params.basePluginName);
  });

});
