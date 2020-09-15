import { DestroyService } from './destroy';

import 'jest-extended';

import { from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

describe('DestroyService', () => {
  let destroy$: DestroyService;

  // NOTE: we don't use prepare() because DestroyService is unique
  // to each component that uses it and not providedIn: roor
  beforeEach(() => (destroy$ = new DestroyService()));

  test('destroy$ will complete a stream', (done) => {
    let last = 0;

    from([100, 200, 300, 400, 500])
      .pipe(takeUntil(destroy$))
      .subscribe({
        complete: () => {
          expect(last).toBe(300);
          done();
        },

        next: (val) => {
          last += 100;
          expect(val).toBe(last);
          if (last === 300) destroy$.ngOnDestroy();
        }
      });
  });
});
