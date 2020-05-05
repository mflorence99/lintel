import { BarrelModule } from '../../barrel';
import { NgModule } from '@angular/core';
import { RootPageComponent } from './page';

/**
 * Root page module
 */

const COMPONENTS = [
  RootPageComponent
];

const MODULES = [
  BarrelModule
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES
  ]
  
})

export class RootPageModule { }
