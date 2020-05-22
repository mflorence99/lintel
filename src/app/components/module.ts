import { BarrelModule } from '../barrel';
import { CheckboxComponent } from './checkbox';
import { InputComponent } from './input';
import { KeyValueComponent } from './key-value';
import { MultiselectorComponent } from './multiselector';
import { NgModule } from '@angular/core';

/**
 * All our components
 */

const COMPONENTS = [
  CheckboxComponent,
  InputComponent,
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
