import { BarrelModule } from './barrel';
import { NgModule } from '@angular/core';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { RootPageComponent } from './pages/root/page';
import { RootPageModule } from './pages/root/module';

import { states } from './state/app';

/**
 * lintel module definition
 */

const COMPONENTS = [];

const MODULES = [
  BarrelModule,
  RootPageModule
];

@NgModule({

  bootstrap: [RootPageComponent],

  declarations: [
    ...COMPONENTS
  ],

  imports: [
    ...MODULES,
    NgxsModule.forRoot(states),
    NgxsDataPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      logger: console
    })
  ]

})

export class LintelModule { }
