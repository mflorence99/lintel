import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

/**
 * A barrel of all the modules we use everywhere
 */

const MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  FontAwesomeModule,
  MatTabsModule
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
