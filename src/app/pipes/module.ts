import { BarrelModule } from '../barrel';
import { LinkifyPipe } from './linkify';
import { MarkedPipe } from './marked';

import { NgModule } from '@angular/core';

/**
 * All our pipes
 */

const PIPES = [
  LinkifyPipe,
  MarkedPipe
];

@NgModule({

  declarations: [
    ...PIPES
  ],

  exports: [
    ...PIPES
  ],

  imports: [
    BarrelModule
  ]

})

export class PipesModule { }
