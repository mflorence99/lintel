import { BarrelModule } from '../../barrel';
import { ComponentsModule as CommonComponentsModule } from '../../components/module';
import { ConfigsComponent } from './configs';
import { FilterComponent } from './filter';
import { GeneralComponent } from './general';
import { NgModule } from '@angular/core';
import { RuleComponent } from './rule';
import { RulesComponent } from './rules';
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
    BarrelModule,
    CommonComponentsModule
  ]

})

export class ComponentsModule { }
