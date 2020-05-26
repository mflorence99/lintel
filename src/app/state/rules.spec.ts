import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('RulesState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('RulesState is initialized', () => {
    expect(bundle.rules.snapshot[bundle.params.basePluginName]).toBeTruthy();
    expect(bundle.rules.snapshot['@typescript-eslint']).toBeTruthy();
  });

});
