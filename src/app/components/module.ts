import { BarrelModule } from '../barrel';
import { KeyValueComponent } from './key-value';
import { MultiselectorComponent } from './multiselector';
import { NgModule } from '@angular/core';

/**
 * All our components
 */

const COMPONENTS = [
  KeyValueComponent,
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
