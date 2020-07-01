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

});
