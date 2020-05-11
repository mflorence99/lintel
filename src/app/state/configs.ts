import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

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

export interface PluginView {
  pluginName: string;
  rules?: Record<string, Rule>;
}

export interface Rule {
  // TODO: more analysis
}

export interface TreeView {
  children?: TreeView[];
  fileName: string;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
})

export class ConfigsState extends NgxsImmutableDataRepository<ConfigsStateModel> {

  constructor(private selection: SelectionState) { 
    super();
  }

  @DataAction() initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  @Computed() get pluginView(): PluginView[] {
    if (this.selection.fileName) {
      const rules = this.snapshot[this.selection.fileName].config?.rules || { };
      const byPluginName = Object.keys(rules)
        .reduce((acc, ruleName) => {
          const parts = ruleName.split('/');
          const pluginName = (parts.length === 2) ? parts[0] : '';
          if (!acc[pluginName])
            acc[pluginName] = { };
          acc[pluginName][ruleName] = rules[ruleName];
          return acc;
        }, { });
      return Object.keys(byPluginName)
        .sort()
        .map(pluginName => ({ pluginName: pluginName || 'eslint', rules: byPluginName[pluginName] }));
    } else return [];
  }

  @Computed() get treeView(): TreeView[] {
    const makeTreeView = (fileName): TreeView => {
      return {
        children: (this.snapshot[fileName].children || []).map(makeTreeView),
        fileName: fileName
      };
    };
    return Object.keys(this.snapshot)
      .filter(fileName => this.snapshot[fileName].root)
      .map(makeTreeView);
  }

}

