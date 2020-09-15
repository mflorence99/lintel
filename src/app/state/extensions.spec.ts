import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('ExtensionsState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('ExtensionsState is initialized', () => {
    expect(bundle.extensions.snapshot['eslint:recommended']).toBeTruthy();
  });

  test('Extensions can be changed via events', () => {
    const newExtensions = bundle.utils.deepCopy(
      bundle.extensions.snapshot['plugin:jest/recommended']
    );
    const message: any = new Event('message');
    message.data = {
      command: 'extensions',
      extensions: { xxx: newExtensions }
    };
    window.dispatchEvent(message);
    expect(
      bundle.extensions.snapshot['xxx'].rules['jest/expect-expect']
    ).toBeTruthy();
  });
});
