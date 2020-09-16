import { BarrelModule } from './barrel';
import { RootPageComponent } from './pages/root';
import { RootPageModule } from './pages/module';

import { environment } from '../environments/environment';
import { states } from './state/app';

import { ContextMenuModule } from 'ngx-contextmenu';
import { NgModule } from '@angular/core';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

/**
 * lintel module definition
 */

const COMPONENTS = [];

const MODULES = [BarrelModule, RootPageModule];

@NgModule({
  bootstrap: [RootPageComponent],

  declarations: [...COMPONENTS],

  imports: [
    ...MODULES,
    ContextMenuModule.forRoot({
      autoFocus: true
    }),
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production
    }),
    NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      logger: console
    })
  ]
})
export class LintelModule {}
