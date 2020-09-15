import { IconsModule } from './icons';

import { BrowserModule } from '@angular/platform-browser';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * A barrel of all the modules we use everywhere
 */

const MODULES = [
  BrowserModule,
  ContextMenuModule,
  FontAwesomeModule,
  FormsModule,
  IconsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [...MODULES],

  exports: [...MODULES]
})
export class BarrelModule {}
