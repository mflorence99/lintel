import { BarrelModule } from '../barrel';
import { ComponentsModule } from './module';
import { Params } from '../services/params';
import { TestBed } from '@angular/core/testing';

export function prepare(): void {

  TestBed.configureTestingModule({
    imports: [
      BarrelModule,
      ComponentsModule
    ]
  }).compileComponents();

  TestBed.inject(Params);

}

describe('Components tests helpers', () => {

  test('Dummy test', () => {
    expect(true).toBeTruthy();
  });

});
