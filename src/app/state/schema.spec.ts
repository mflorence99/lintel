import { Bundle } from './state.spec';

import { prepare } from './state.spec';

import 'jest-extended';

describe('SchemaState', () => {
  let bundle: Bundle;

  beforeEach(() => (bundle = prepare()));

  test('SchemaState is initialized', () => {
    expect(bundle.schema.snapshot.definitions).toEqual(expect.any(Object));
    expect(bundle.schema.snapshot.properties).toEqual(expect.any(Object));
  });
});
