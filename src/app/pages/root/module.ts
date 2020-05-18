import { BarrelModule } from '../../barrel';
import { ComponentsModule } from '../components/module';
import { ComponentsModule as CommonComponentsModule } from '../../components/module';
import { NgModule } from '@angular/core';
import { RootPageComponent } from './page';

/**
 * Root page module
 */

const COMPONENTS = [
  RootPageComponent
];

const MODULES = [
  BarrelModule,
  CommonComponentsModule,
  ComponentsModule
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
