import { BarrelModule } from '../barrel';
import { ComponentsModule } from './components/module';
import { ComponentsModule as CommonComponentsModule } from '../components/module';
import { DirectivesModule } from '../directives/module';
import { PipesModule } from '../pipes/module';
import { RootPageComponent } from './root';

import { NgModule } from '@angular/core';

/**
 * Root page module
 */

const COMPONENTS = [RootPageComponent];

const MODULES = [
  BarrelModule,
  CommonComponentsModule,
  ComponentsModule,
  DirectivesModule,
  PipesModule
];

@NgModule({
  declarations: [...COMPONENTS],

  imports: [...MODULES]
})
export class RootPageModule {}
