import { Bundle } from './state.spec';

import { config } from '../config';
import { prepare } from './state.spec';

describe('SchemasState', () => {

  let states: Bundle;

  beforeEach(() => states = prepare());

  test('Schema state is initialized', () => {
    expect(states.schemas.snapshot[config.basePluginName]).toBeTruthy();
    expect(states.schemas.snapshot['@typescript-eslint']).toBeTruthy();
  });

});
