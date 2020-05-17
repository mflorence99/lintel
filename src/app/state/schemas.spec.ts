import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('SchemasState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Schema state is initialized', () => {
    expect(bundle.schemas.snapshot[bundle.params.basePluginName]).toBeTruthy();
    expect(bundle.schemas.snapshot['@typescript-eslint']).toBeTruthy();
  });

});
