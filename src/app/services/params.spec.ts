import { Params } from './params';

import { prepare } from './service.spec';

describe('Params', () => {

  let services;

  beforeEach(() => services = prepare([Params]));

  test('Params are set as expected', () => {
    expect(services[0].basePluginName).toEqual('eslint');
    expect(Params.debounceTimeout).toEqual(250);
  });

});
