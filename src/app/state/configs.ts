import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { FilterState } from './filter';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Rule } from './schemas';
import { SchemasState } from './schemas';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { config } from '../config';
import { deduplicateArray } from '../utils';
import { isObjectEmpty } from '../utils';

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export type ActiveView = Record<string, Rule>;
export type CategoryView = Record<string, Record<string, Rule>>;
export type RecommendedView = Record<string, Rule>;

export interface ConfigFile {
  config: Configuration;
}

export interface Configuration {
  // TODO: more analysis
  plugins?: string[];
  rules?: Record<string, Setting>;
}

export type ConfigsStateModel = Record<string, ConfigFile>;

export type PluginView = Record<string, Record<string, Setting>>;

export interface Setting {
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
              private schemas: SchemasState, 
              private selection: SelectionState) { 
    super();
  }

  @Computed() get hasRules(): boolean {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || {};
    return Object.keys(rules)
      .some(ruleName => this.filter.isRuleNameFiltered(ruleName));
  }

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  @Computed() get activeView(): ActiveView {
    const active = this.snapshot[this.selection.fileName]?.config?.rules || {};
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || {};
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .filter(ruleName => active[ruleName])
      .reduce((acc, ruleName) => {
        acc[ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView)
      .sort((p, q): number => {
        if (p === config.activeCategory)
          return -1;
        else if (q === config.activeCategory)
          return +1;
        else return p.toLowerCase().localeCompare(q.toLowerCase());
      });
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || {};
    // NOTE: initialize with currently active, recommended categories
    const byCategory = { };
    if (!isObjectEmpty(this.activeView))
      byCategory[config.activeCategory] = this.activeView;
    if (!isObjectEmpty(this.recommendedView))
      byCategory[config.recommendedCategory] = this.recommendedView;
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category || config.unknownCategory;
        if (!acc[category])
          acc[category] = {};
        acc[category][ruleName] = rules[ruleName];
        return acc;
      }, byCategory);
  }

  @Computed() get fileNames(): string [] {
    return Object.keys(this.snapshot);
  }

  @Computed() get pluginNames(): string[] {
    const raw = Object.keys(this.snapshot)
      .reduce((acc, fileName) => {
        acc.push(...(this.snapshot[fileName].config?.plugins || []));
        return acc;
      }, [])
      .filter(pluginName => this.schemas.snapshot[pluginName]);
    return [config.basePluginName, ...deduplicateArray(raw)];
  }

  @Computed() get recommendedView(): RecommendedView {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || {};
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .filter(ruleName => rules[ruleName].meta?.docs?.recommended)
      .reduce((acc, ruleName) => {
        acc[ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

}

