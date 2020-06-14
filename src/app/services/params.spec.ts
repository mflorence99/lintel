import { Params } from './params';

import { prepare } from './service.spec';

window['lintelSearchParams'] = '?x=y';

describe('Params', () => {

  let services;

  beforeEach(() => services = prepare([Params]));

  test('Params are set as expected', () => {
    const params: Params = services[0];
    expect(params.basePluginName).toEqual('eslint');
  });

  test('searchParams are initialized correctly', () => {
    const params: Params = services[0];
    expect(params.searchParams['x']).toEqual('y');
  });

});
