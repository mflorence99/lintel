import { BarrelModule } from '../barrel';
import { LinkifyPipe } from './linkify';
import { NgModule } from '@angular/core';

/**
 * All our pipes
 */

const PIPES = [
  LinkifyPipe
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
