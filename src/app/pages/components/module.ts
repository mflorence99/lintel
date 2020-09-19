import { BarrelModule } from '../../barrel';
import { ComponentsModule as CommonComponentsModule } from '../../components/module';
import { ConfigsComponent } from './configs';
import { FilterComponent } from './filter';
import { GeneralComponent } from './general';
import { OverridesComponent } from './overrides';
import { ParserOptionsComponent } from './parser-options';
import { PipesModule } from '../../pipes/module';
import { RuleComponent } from './rule';
import { RulesComponent } from './rules';
import { TabsComponent } from './tabs';

import { NgModule } from '@angular/core';

/**
 * All our components
 */

const COMPONENTS = [
  ConfigsComponent,
  FilterComponent,
  GeneralComponent,
  OverridesComponent,
  ParserOptionsComponent,
  RuleComponent,
  RulesComponent,
  TabsComponent
];

@NgModule({
  declarations: [...COMPONENTS],

  exports: [...COMPONENTS],

  imports: [BarrelModule, CommonComponentsModule, PipesModule]
})
export class ComponentsModule {}
