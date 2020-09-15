import { HydratorDirective } from './hydrator';

import 'jest-extended';

describe('HydratorDirective', () => {
  let hydrator: HydratorDirective;
  let logger: any;
  let mockElementRef: any;
  let mockEntry: any;
  let mockHydrated: any;

  afterEach(() => {
    console.log = logger;
  });

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

    hydrator = new HydratorDirective(mockElementRef);

    // NOTE: we want to trigger logging for the coverage report
    // but we don't want to see the actual log lines rhemselves
    logger = console.log;
    console.log = jest.fn();

    // link hydrated as in real directive
    document.body.setAttribute('lintelHydrated', 'xxx');

    window.IntersectionObserver = jest.fn((cb, options) => {
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
    expect(hydrator).toBeTruthy();
  });

  test('ngOnInit', () => {
    hydrator.hydratorMargin = '1rem';
    hydrator.ngOnInit();
    expect(hydrator['observer'].root).toBe(document.body);
    expect(hydrator['observer'].rootMargin).toBe('1rem');
  });

  test('registerHydrateable', () => {
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toEqual(mockHydrated);
    /* eslint-disable @typescript-eslint/unbound-method */
    expect(hydrator['observer'].observe).toHaveBeenCalled();
  });

  test('unregisterHydrateable', () => {
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toEqual(mockHydrated);
    hydrator.unregisterHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toBeUndefined();
    /* eslint-disable @typescript-eslint/unbound-method */
    expect(hydrator['observer'].unobserve).toHaveBeenCalled();
  });

  test('callback', () => {
    hydrator.hydratorTrace = true;
    hydrator.ngOnInit();
    hydrator.registerHydrateable(mockHydrated);
    expect(hydrator['hydrateables']['xxx']).toBe(mockHydrated);
    expect(mockHydrated.isHydrated).toBeTrue();
    expect(mockEntry.isIntersecting).toBeFalse();
    hydrator['callback']([mockEntry], null);
    expect(mockHydrated.isHydrated).toBeFalse();
  });
});
