import { BarrelModule } from '../barrel';
import { ComponentsModule } from './module';

import { TestBed } from '@angular/core/testing';

export function prepare(): void {

  TestBed.configureTestingModule({
    imports: [
      BarrelModule,
      ComponentsModule
    ]
  }).compileComponents();

}

describe('Components tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
