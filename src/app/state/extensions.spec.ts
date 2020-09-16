import { Bundle } from './state.spec';

import { prepare } from './state.spec';

import 'jest-extended';

describe('ExtensionsState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('ExtensionsState is initialized', () => {
    expect(bundle.extensions.snapshot['eslint:recommended']).toEqual(
      expect.any(Object)
    );
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
    ).toEqual(expect.any(Object));
  });
});
