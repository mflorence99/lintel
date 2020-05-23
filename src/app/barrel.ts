import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * A barrel of all the modules we use everywhere
 */

const MODULES = [
  BrowserAnimationsModule,
  BrowserModule,
  FontAwesomeModule,
  FormsModule,
  MatTabsModule,
  ReactiveFormsModule
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
