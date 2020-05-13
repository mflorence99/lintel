import { Computed } from '@ngxs-labs/data/decorators';
import { ConfigsState } from './configs';
import { DataAction } from '@ngxs-labs/data/decorators';
import { FilterState } from './filter';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { config } from '../config';
import { deduplicateArray } from '../utils';
import { isObjectEmpty } from '../utils';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemasStateModel;

export type ActiveView = Record<string, Rule>;
export type CategoryView = Record<string, Record<string, Rule>>;
export type RecommendedView = Record<string, Rule>;

export interface Rule {
  meta: {
    deprecated: boolean;
    docs: {
      category: string;
      descripotion: string;
      extendsBasicRule: boolean;
      recommended: 'error' | 'warn' | 'off' | boolean;
      requiresTypeChecking: boolean;
      url: string;
    };
    replacedBy: string[];
    schema: RuleOption | RuleOption[] | RuleOptions;
    type: 'problem' | 'suggestion' | 'layout';
  };
}

export type RuleOption = RuleOptionEnum | RuleOptionItems | RuleOptionObject;

export interface RuleOptionEnum {
  enum: string[];
}

export interface RuleOptionItems {
  // TODO: more analysis
}

export interface RuleOptionObject {
  // TODO: more analysis
}

export interface RuleOptions {
  anyOf?: RuleOption[];
  oneOf?: RuleOption[];
}

export interface Schema {
  rules: Record<string, Rule>;
  version: string;
}

export type SchemasStateModel = Record<string, Schema>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SchemasStateModel>({
  name: 'schemas',
  defaults: { }
}) 

export class SchemasState extends NgxsImmutableDataRepository<SchemasStateModel> {

  constructor(private configs: ConfigsState,
              private filter: FilterState,
              private selection: SelectionState) {
    super();
  }

  @DataAction() initialize(): void {
    this.ctx.setState(eslintSchema);
  }

  @Computed() get activePluginNames(): string[] {
    const raw = Object.keys(this.configs.snapshot)
      .reduce((acc, fileName) => {
        acc.push(...(this.configs.snapshot[fileName].config?.plugins || []));
        return acc;
      }, [])
      .filter(pluginName => this.snapshot[pluginName]);
    return [config.basePluginName, ...deduplicateArray(raw)];
  }

  @Computed() get activeView(): ActiveView {
    const active = this.configs.snapshot[this.selection.fileName]?.config?.rules || { };
    const rules = this.snapshot[this.selection.pluginName]?.rules || { };
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
    const rules = this.snapshot[this.selection.pluginName]?.rules || { };
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
          acc[category] = { };
        acc[category][ruleName] = rules[ruleName];
        return acc;
      }, byCategory);
  }

  @Computed() get hasRules(): boolean {
    const rules = this.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .some(ruleName => this.filter.isRuleNameFiltered(ruleName));
  }

  @Computed() get recommendedView(): RecommendedView {
    const rules = this.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .filter(ruleName => rules[ruleName].meta?.docs?.recommended)
      .reduce((acc, ruleName) => {
        acc[ruleName] = rules[ruleName];
        return acc;
      }, {});
  }

}
