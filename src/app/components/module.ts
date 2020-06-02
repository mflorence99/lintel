import { BarrelModule } from '../barrel';
import { CheckboxComponent } from './checkbox';
import { InputArrayComponent } from './input-array';
import { InputComponent } from './input';
import { KeyValueComponent } from './key-value';
import { MultiselectorComponent } from './multiselector';
import { NgModule } from '@angular/core';
import { SelectArrayComponent } from './select-array';
import { SingleselectorComponent } from './singleselector';

/**
 * All our components
 */

const COMPONENTS = [
  CheckboxComponent,
  InputArrayComponent,
  InputComponent,
  KeyValueComponent,
  MultiselectorComponent,
  SelectArrayComponent,
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
