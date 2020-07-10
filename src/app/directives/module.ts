import { BarrelModule } from '../barrel';
import { HydratedDirective } from './hydrated';
import { HydratorDirective } from './hydrator';

import { NgModule } from '@angular/core';

/**
 * All our directives
 */

const DIRECTIVES = [
  HydratedDirective,
  HydratorDirective
];

@NgModule({

  declarations: [
    ...DIRECTIVES
  ],

  exports: [
    ...DIRECTIVES
  ],

  imports: [
    BarrelModule
  ]

})

export class DirectivesModule { }
