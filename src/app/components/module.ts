import { BarrelModule } from '../barrel';
import { ConfigsComponent } from './configs';
import { FilterComponent } from './filter';
import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs';

/**
 * All our components
 */

const COMPONENTS = [
  ConfigsComponent,
  FilterComponent,
  TabsComponent
];

@NgModule({

  declarations: [
    ...COMPONENTS
  ],

  exports: [
    ...COMPONENTS
  ],

  imports: [
    BarrelModule
  ]

})

export class ComponentsModule { }
