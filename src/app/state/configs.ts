import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Debounce } from '@ngxs-labs/data/decorators';
import { FilterState } from './filter';
import { Injectable } from '@angular/core';
import { Level } from './rules';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Params } from '../services/params';
import { Payload } from '@ngxs-labs/data/decorators';
import { Rule } from './rules';
import { RulesState } from './rules';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

import { patch } from '@ngxs/store/operators';

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export type View = Record<string, [Rule, Settings]>;

export type CategoryView = Record<string, View>;

export interface Configuration {
  ecmaFeatures?: Record<string, boolean>;
  env?: Record<string, boolean>;
  extends?: string[];
  globals?: Record<string, boolean>;
  ignorePatterns?: string[];
  noInlineConfig?: boolean;
  parserOptions?: any;
  plugins?: string[];
  root?: boolean;
  rules?: Record<string, Settings>;
}

export type ConfigsStateModel = Record<string, Configuration>;

export interface Digest {
  deprecated: boolean;
  description: string;
  inherited: boolean;
  level: Level | null;
  recommended: Level | boolean;
  replacedBy: string[];
  rule: Rule;
  ruleName: string;
  settings: Settings;
  url: string;
}

// TODO: much more analysis
export type Settings = [Level, any];

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
}) 

export class ConfigsState extends NgxsDataRepository<ConfigsStateModel> {

  /** ctor */
  constructor(private filter: FilterState,
              private params: Params,
              private rules: RulesState, 
              private selection: SelectionState,
              private utils: Utils) { 
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  @Debounce(Params.debounceTimeout)
  changeConfiguration(@Payload('changes') changes: any): void {
    this.ctx.setState(patch({ [this.selection.fileName]: patch(changes) }));
  }

  @DataAction({ insideZone: true })
  @Debounce(Params.debounceTimeout)
  changeRule(@Payload('changes') changes: any, rule: string): void {
    this.ctx.setState(patch({ [this.selection.fileName]: patch({ rules : patch({ [rule]: changes }) }) }));
  }

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(this.normalize(eslintrcFiles));
  }

  // accessors

  @Computed() get activeView(): View {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules || { };
    const settings = this.snapshot[this.selection.fileName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => settings[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        acc[ruleName] = [rules[ruleName], settings[ruleName]];
        return acc;
      }, this.filter.snapshot.showInheritedRules ? this.inheritedView : { });
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView)
      .sort();
  }

  @Computed() get configuration(): Configuration {
    return this.snapshot[this.selection.fileName] || { };
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules || { };
    const settings = this.snapshot[this.selection.fileName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category;
        if (!acc[category])
          acc[category] = { };
        if (!acc[category][ruleName] || settings[ruleName])
          acc[category][ruleName] = [rules[ruleName], settings[ruleName]];
        return acc;
      }, this.filter.snapshot.showInheritedRules ? this.inheritedCategoryView : { });
  }

  @Computed() get fileNames(): string [] {
    return Object.keys(this.snapshot);
  }

  @Computed() get inheritedView(): View {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => this.isRuleInherited(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        // TODO: fabricate settings from recommended, type
        acc[ruleName] = [rules[ruleName], this.settingsForInherited(rules[ruleName])];
        return acc;
      }, { });
  }

  @Computed() get inheritedCategoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => this.isRuleInherited(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category;
        if (!acc[category])
          acc[category] = { };
        // TODO: fabricate settings from recommended, type
        acc[category][ruleName] = [rules[ruleName], this.settingsForInherited(rules[ruleName])];
        return acc;
      }, { });
  }

  @Computed() get pluginNames(): string[] {
    const raw = Object.keys(this.snapshot)
      .reduce((acc, fileName) => {
        acc.push(...(this.snapshot[fileName].plugins || []));
        return acc;
      }, [])
      .filter(pluginName => this.rules.snapshot[pluginName]);
    return [this.params.basePluginName, ...this.utils.deduplicateArray(raw)];
  }

  @Computed() get unknownView(): View {
    // NOTE: settings that have no corresponding rule in the schema
    // and so cannot be handled by Lintel
    const settings = this.snapshot[this.selection.fileName]?.rules || { };
    return Object.keys(settings)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .sort()
      .map(ruleName => {
        const parts = ruleName.split('/');
        return (parts.length === 2) ? 
          [parts[0], ruleName] : [this.params.basePluginName, ruleName];
      })
      .filter(([pluginName, ruleName]) => !this.rules.snapshot[pluginName]?.rules?.[ruleName])
      .reduce((acc, [_, ruleName]) => {
        acc[ruleName] = [null, settings[ruleName]];
        return acc;
      }, { });
  }

  // public methods

  makeRuleDigest(ruleName: string, rule: Rule, settings: Settings): Digest {
    return {
      deprecated: !!rule?.meta?.deprecated,
      description: rule?.meta?.docs?.description,
      inherited: settings?.[1]?.inherited,
      level: settings?.[0] || 'off',
      recommended: rule?.meta?.docs?.recommended,
      replacedBy: rule?.meta?.replacedBy || [],
      rule: rule,
      ruleName: ruleName,
      settings: settings,
      url: rule?.meta?.docs?.url
    };
  }

  // private methods

  private isRuleFiltered(ruleName: string): boolean {
    return !this.filter.snapshot.ruleNameFilter || ruleName.includes(this.filter.snapshot.ruleNameFilter);
  }

  private isRuleInherited(ruleName: string): boolean {
    const extensions = this.snapshot[this.selection.fileName]?.extends || [];
    const inherits = this.rules.snapshot[this.selection.pluginName]?.lintel?.inherits || { };
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(inherits)
      .filter(extension => extensions.includes(extension))
      .some(extension => {
        return Object.keys(inherits[extension])
          .every(flag => {
            const state = rules[ruleName]?.meta?.docs?.[flag];
            const test = inherits[extension][flag];
            return (test === 'truthy') ? !!state : !state;
          });
      });
  }

  private normalize(eslintrcFiles: ConfigsStateModel): ConfigsStateModel {
    const model = this.utils.deepCopy(eslintrcFiles);
    // NOTE: is is very convenient to normalize eslintrcFiles before use
    Object.entries(eslintrcFiles)
      .forEach(([fileName, configuration]) => {
        configuration.rules = configuration.rules || { };
        Object.entries(configuration.rules)
          .forEach(([ruleName, rule]) => {
            let normalized: any = rule;
            if (typeof rule === 'string' || Number.isInteger(rule as any))
              normalized = [rule];
            if (Number.isInteger(normalized[0]))
              normalized[0] = ['off', 'warn', 'error'][normalized[0]];
            model[fileName].rules[ruleName] = normalized;
          });
      });
    return model;
  }

  private settingsForInherited(rule: Rule): Settings {
    let level;
    const recommended = rule?.meta?.docs?.recommended;
    const type = rule?.meta?.type;
    if (!recommended || recommended === true)
      level = (type === 'problem') ? 'error' : 'warn';
    else level = recommended;
    return [level, { inherited: true }];
  }

}

