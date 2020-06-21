import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('ExtensionsState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('ExtensionsState is initialized', () => {
    expect(bundle.extensions.snapshot['eslint:recommended']).toBeTruthy();
  });

});
