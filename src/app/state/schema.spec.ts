import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('SchemaState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('SchemaState is initialized', () => {
    expect(bundle.schema.snapshot.definitions).toBeTruthy();
    expect(bundle.schema.snapshot.properties).toBeTruthy();
  });

});
