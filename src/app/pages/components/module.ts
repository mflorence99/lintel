import { BarrelModule } from '../../barrel';
import { ConfigsComponent } from './configs';
import { FilterComponent } from './filter';
import { GeneralComponent } from './general';
import { NgModule } from '@angular/core';
import { RuleComponent } from './rule';
import { RulesComponent } from './rules';
import { SettingsComponent } from './settings';
import { TabsComponent } from './tabs';

/**
 * All our components
 */

const COMPONENTS = [
  ConfigsComponent,
  FilterComponent,
  GeneralComponent,
  RuleComponent,
  RulesComponent,
  SettingsComponent,
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
