import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { FilterState } from './filter';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { config } from '../config';

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export interface ConfigFile {
  children?: string[];
  config: Configuration;
  parent?: string;
  root?: boolean;
}

export interface Configuration {
  // TODO: more analysis
  plugins?: string[];
  rules?: Record<string, Rule>;
}

export type ConfigsStateModel = Record<string, ConfigFile>;

export type PluginView = Record<string, Record<string, Rule>>;

export interface Rule {
  // TODO: more analysis
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
})

export class ConfigsState extends NgxsImmutableDataRepository<ConfigsStateModel> {

  constructor(private filter: FilterState,
              private selection: SelectionState) { 
    super();
  }

  @DataAction() initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  @Computed() get fileNames(): string [] {
    return Object.keys(this.snapshot);
  }

  @Computed() get pluginNames(): string[] {
    return Object.keys(this.pluginView)
      .sort((p, q): number => {
        if (p === config.basePluginName)
          return -1;
        else if (q === config.basePluginName)
          return +1;
        else return p.toLowerCase().localeCompare(q.toLowerCase()); 
      });
  }

  @Computed() get pluginView(): PluginView {
    const rules = this.snapshot[this.selection.fileName]?.config?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .reduce((acc, ruleName) => {
        const parts = ruleName.split('/');
        const pluginName = (parts.length === 2) ? parts[0] : config.basePluginName;
        if (!acc[pluginName])
          acc[pluginName] = { };
        acc[pluginName][ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

}

