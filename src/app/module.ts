import { BarrelModule } from './barrel';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { NGXS_DATA_STORAGE_PLUGIN } from '@ngxs-labs/data/storage';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { RootPageComponent } from './pages/root/page';
import { RootPageModule } from './pages/root/module';

import { environment } from '../environments/environment';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
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

export class LintelModule { 

  /** ctor */
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, far, fas);
  }

}
