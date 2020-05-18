import { BarrelModule } from '../barrel';
import { MultiselectorComponent } from './multiselector';
import { NgModule } from '@angular/core';

/**
 * All our components
 */

const COMPONENTS = [
  MultiselectorComponent
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  exports: [
    ...COMPONENTS
  ],

  imports: [
    BarrelModule
  ]

})

export class ComponentsModule { }
