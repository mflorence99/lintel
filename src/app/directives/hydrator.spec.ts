import { HydratorDirective } from './hydrator';

describe('HydratorDirective', () => {

  let mockElementRef: any;
  let mockEntry: any;
  let mockHydrated: any;

  beforeEach(() => {

    mockElementRef = {
      nativeElement: document.body
    };

    mockEntry = {
      isIntersecting: false,
      target: document.body
    };

    mockHydrated = {
      element: mockElementRef,
      isHydrated: true,
      lintelHydrated: 'xxx'
    };

    // link hydrated as in real directive
    document.body.setAttribute('lintelHydrated', 'xxx');

    window.IntersectionObserver = jest.fn((cb, options) => {
      this.cb = cb;
      return {
        disconnect: jest.fn(),
        observe: jest.fn(),
        root: options.root,
        rootMargin: options.rootMargin,
        takeRecords: jest.fn(),
        thresholds: options.threshold as any,
        unobserve: jest.fn()
      };
    });

  });

  test('Directive is created', () => {
    const hydrator = new HydratorDirective(mockElementRef);
    expect(hydrator).toBeTruthy();
  });

  test('ngOnInit', () => {
    const hydrator = new HydratorDirective(mockElementRef);
    hydrator.hydratorMargin = '1rem';
    hydrator.ngOnInit();
    expect(hydrator['observer'].root).toBe(document.body);
    expect(hydrator['observer'].rootMargin).toBe('1rem');
  });

  test('registerHydrateable', () => {
    const hydrator = new HydratorDirective(mockElementRef);
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toEqual(mockHydrated);
    /* eslint-disable @typescript-eslint/unbound-method */
    expect(hydrator['observer'].observe).toHaveBeenCalled();
  });

  test('unregisterHydrateable', () => {
    const hydrator = new HydratorDirective(mockElementRef);
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toEqual(mockHydrated);
    hydrator.unregisterHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toBeUndefined();
    /* eslint-disable @typescript-eslint/unbound-method */
    expect(hydrator['observer'].unobserve).toHaveBeenCalled();
  });

  test('callback', () => {
    const hydrator = new HydratorDirective(mockElementRef);
    hydrator.hydratorTrace = true;
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toBe(mockHydrated);
    expect(mockHydrated.isHydrated).toBe(true);
    expect(mockEntry.isIntersecting).toBe(false);
    hydrator['callback']([mockEntry], null);
    expect(mockHydrated.isHydrated).toBe(false);
  });

});
