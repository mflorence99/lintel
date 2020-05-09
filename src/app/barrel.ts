import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';

/**
 * A barrel of all the modules we use everywhere
 */

const MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  MatIconModule,
  MatTreeModule
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
