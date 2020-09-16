import { HydratedDirective } from './hydrated';

import 'jest-extended';

describe('HydratedDirective', () => {
  let hydrated: HydratedDirective;
  let mockElementRef: any;
  let mockHydrator: any;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: document.body
    };
    mockHydrator = {
      registerHydrateable: jest.fn(),
      unregisterHydrateable: jest.fn()
    };
    hydrated = new HydratedDirective(mockElementRef, mockHydrator);
    hydrated.ngOnInit();
  });

  test('Directive is created', () => {
    expect(hydrated).toBeTruthy();
  });

  test('isHydrated', (done) => {
    hydrated.hydrated.subscribe((state) => {
      expect(state).toBeTrue();
      done();
    });
    hydrated.isHydrated = true;
    expect(hydrated.isHydrated).toBeTrue();
  });

  test('ngOnDestroy', () => {
    hydrated.ngOnDestroy();
    expect(mockHydrator.unregisterHydrateable).toHaveBeenCalled();
  });

  test('ngOnInit', () => {
    hydrated.lintelHydrated = 'xxx';
    hydrated.ngOnInit();
    expect(mockHydrator.registerHydrateable).toHaveBeenCalled();
    expect(document.body.getAttribute('lintelHydrated')).toBe('xxx');
  });
});
