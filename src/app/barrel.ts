import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * A barrel of all the modules we use everywhere
 */

const MODULES = [
  BrowserModule
];

@NgModule({

  imports: [
    ...MODULES
  ],

  exports: [
    ...MODULES
  ],

})

export class BarrelModule { }
