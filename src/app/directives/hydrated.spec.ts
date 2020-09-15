import { HydratedDirective } from './hydrated';

describe('HydratedDirective', () => {
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
  });

  test('Directive is created', () => {
    const hydrated = new HydratedDirective(mockElementRef, mockHydrator);
    expect(hydrated).toBeTruthy();
  });

  test('isHydrated', (done) => {
    const hydrated = new HydratedDirective(mockElementRef, mockHydrator);
    hydrated.hydrated.subscribe((state) => {
      expect(state).toBe(true);
      done();
    });
    hydrated.isHydrated = true;
    expect(hydrated.isHydrated).toBe(true);
  });

  test('ngOnDestroy', () => {
    const hydrated = new HydratedDirective(mockElementRef, mockHydrator);
    hydrated.ngOnDestroy();
    expect(mockHydrator.unregisterHydrateable).toHaveBeenCalled();
  });

  test('ngOnInit', () => {
    const hydrated = new HydratedDirective(mockElementRef, mockHydrator);
    hydrated.lintelHydrated = 'xxx';
    hydrated.ngOnInit();
    expect(mockHydrator.registerHydrateable).toHaveBeenCalled();
    expect(document.body.getAttribute('lintelHydrated')).toBe('xxx');
  });
});
