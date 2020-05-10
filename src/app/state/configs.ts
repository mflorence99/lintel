import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { deduplicateArray } from '../../utils';
import { isObjectEmpty } from '../../utils';

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
      const configFile = this.snapshot[this.selection.fileName];
      const config = configFile.config;
      // NOTE: plugins are cascaded
      // TODO: generalize this? what about extends?
      let declared = [...(config.plugins || [])];
      let parent = this.snapshot[configFile.parent];
      while (parent) {
        declared = declared.concat(parent.config.plugins || []);
        parent = this.snapshot[parent.parent];
      }
      // now go ahead and develop the plugin view
      const plugins = ['eslint', ...deduplicateArray(declared)];
      return plugins
        .map(pluginName => {
          const rules = Object.keys(config.rules)
            .filter(ruleName => {
              const parts = ruleName.split('/');
              return (pluginName === 'eslint' && parts.length === 1)
                || (parts.length === 2 && parts[0] === pluginName);
            })
            .sort()
            .reduce((acc, ruleName) => {
              acc[ruleName] = config.rules[ruleName];
              return acc;
            }, { });
          return { pluginName, rules };
        })
        .filter(pluginView => !isObjectEmpty(pluginView.rules));
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

