import { Bundle } from './state.spec';

import { prepare } from './state.spec';

describe('LintelState', () => {

  let bundle: Bundle;

  beforeEach(() => bundle = prepare());

  test('Lintel can be enabled and disabled', () => {
    expect(bundle.lintel.isEnabled).toBe(true);
    expect(bundle.lintel.message).toBe(null);
    bundle.lintel.enable({ enabled: false, message: 'out to lunch' });
    expect(bundle.lintel.isEnabled).toBe(false);
    expect(bundle.lintel.message).toBe('out to lunch');
  });

  test('Lintel can compute a locally unique number', () => {
    const unique1 = bundle.lintel.unique();
    const unique2 = bundle.lintel.unique();
    expect(unique2 - unique1).toBe(1);
  });

});
