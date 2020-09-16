import { Bundle } from './state.spec';

import { prepare } from './state.spec';

import 'jest-extended';

describe('SelectionState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('Selections can be made', () => {
    bundle.selection.select({
      category: bundle.params.activeCategory,
      fileName: '/home/mflorence99/lintel/package.json',
      override: 6,
      overrideFiles: ['*.tsx', '*.ts'],
      pluginName: bundle.params.basePluginName
    });
    expect(bundle.selection.category).toEqual(bundle.params.activeCategory);
    expect(bundle.selection.fileName).toBe(
      '/home/mflorence99/lintel/package.json'
    );
    expect(bundle.selection.override).toBe(6);
    expect(bundle.selection.overrideFiles).toEqual(['*.tsx', '*.ts']);
    expect(bundle.selection.pluginName).toEqual(bundle.params.basePluginName);
  });
});
