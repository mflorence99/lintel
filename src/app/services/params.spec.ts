import { Params } from './params';

import { prepare } from './service.spec';

describe('Params', () => {

  let services;

  beforeEach(() => services = prepare([Params]));

  test('Params are set as expected', () => {
    const params: Params = services[0];
    expect(params.basePluginName).toEqual('eslint');
    expect(Params.debounceTimeout).toEqual(250);
    expect(params.debounceTimeout).toEqual(250);
    params.debounceTimeout = 0;
    expect(params.debounceTimeout).toEqual(0);
  });

});
