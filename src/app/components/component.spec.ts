import { BarrelModule } from '../barrel';
import { ComponentsModule } from './module';

import { TestBed } from '@angular/core/testing';

// NOTE: correct for dynamically-generated <fa-icon> ids
expect.addSnapshotSerializer({
  test: (val) => typeof val === 'string',
  print: (val: string): string => {
    val = val.replace(/^svg-inline--fa-title-.*$/, 'svg-inline--fa-title-xxx');
    return `"${val}"`;
  }
});

export function prepare(): void {
  TestBed.configureTestingModule({
    imports: [BarrelModule, ComponentsModule]
  }).compileComponents();
}

describe('Components tests helpers', () => {
  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });
});
