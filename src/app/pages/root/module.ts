import { BarrelModule } from '../../barrel';
import { BrowserModule } from '@angular/platform-browser';
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
  BrowserModule
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
