import { BarrelModule } from './barrel';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootPageComponent } from './pages/root/page';
import { RootPageModule } from './pages/root/module';

/**
 * lintel module definition
 */

const COMPONENTS = [];

const MODULES = [
  BarrelModule,
  BrowserModule,
  RootPageModule
];

@NgModule({

  bootstrap: [RootPageComponent],

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
  ]

})

export class LintelModule { }
