import { Params } from './params';

import { prepare } from './service.spec';

describe('Params', () => {

  let services;

  beforeEach(() => services = prepare([Params]));

  test('Params are set as expected', () => {
    expect(services[0].debounceTimeout).toEqual(250);
    expect(globalThis.debounceTimeout).toEqual(250);
  });

});
