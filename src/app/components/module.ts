import { BarrelModule } from '../barrel';
import { CheckboxComponent } from './checkbox';
import { InputComponent } from './input';
import { KeyValueComponent } from './key-value';
import { MultiselectorComponent } from './multiselector';
import { NgModule } from '@angular/core';
import { SingleselectorComponent } from './singleselector';

/**
 * All our components
 */

const COMPONENTS = [
  CheckboxComponent,
  InputComponent,
  KeyValueComponent,
  MultiselectorComponent,
  SingleselectorComponent
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
