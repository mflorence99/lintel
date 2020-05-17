import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { FilterState } from './filter';
import { Injectable } from '@angular/core';
import { Level } from './schemas';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Params } from '../services/params';
import { Rule } from './schemas';
import { SchemasState } from './schemas';
import { SelectionState } from './selection';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { deduplicateArray } from '../utils';

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export type View = Record<string, [Rule, Settings]>;

export type CategoryView = Record<string, View>;

export interface ConfigFile {
  config: Configuration;
}

export interface Configuration {
  // TODO: more analysis
  extends?: string[];
  plugins?: string[];
  rules?: Record<string, Settings>;
}

export type ConfigsStateModel = Record<string, ConfigFile>;

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

// TODO: much mor analysis
export type Settings = Level | [Level, any];

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
}) 

export class ConfigsState extends NgxsDataRepository<ConfigsStateModel> {

  constructor(private filter: FilterState,
              private params: Params,
              private schemas: SchemasState, 
              private selection: SelectionState) { 
    super();
  }

  // actions

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  // accessors

  @Computed() get activeView(): View {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
    const settings = this.snapshot[this.selection.fileName]?.config?.rules || { };
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

  @Computed() get categoryView(): CategoryView {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
    const settings = this.snapshot[this.selection.fileName]?.config?.rules || {};
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
      }, this.filter.snapshot.showInheritedRules ? this.inheritedCategoryView : {});
  }

  @Computed() get fileNames(): string [] {
    return Object.keys(this.snapshot);
  }

  @Computed() get inheritedView(): View {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
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
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
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
        acc.push(...(this.snapshot[fileName].config?.plugins || []));
        return acc;
      }, [])
      .filter(pluginName => this.schemas.snapshot[pluginName]);
    return [this.params.basePluginName, ...deduplicateArray(raw)];
  }

  @Computed() get unknownView(): View {
    // NOTE: settings that have no corresponding rule in the schema
    // and so cannot be handled by Lintel
    const settings = this.snapshot[this.selection.fileName]?.config?.rules || { };
    return Object.keys(settings)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .sort()
      .map(ruleName => {
        const parts = ruleName.split('/');
        return (parts.length === 2) ? 
          [parts[0], ruleName] : [this.params.basePluginName, ruleName];
      })
      .filter(([pluginName, ruleName]) => !this.schemas.snapshot[pluginName]?.rules?.[ruleName])
      .reduce((acc, [_, ruleName]) => {
        acc[ruleName] = [null, settings[ruleName]];
        return acc;
      }, { });
  }

  // public mdethods

  makeRuleDigest(ruleName: string, rule: Rule, settings: Settings): Digest {
    return {
      deprecated: !!rule?.meta?.deprecated,
      description: rule?.meta?.docs?.description,
      inherited: settings && (settings.length === 2) && settings[1].inherited,
      level: (!settings || settings === 'off') ? 'off'
        : (Array.isArray(settings) ? settings[0] : settings),
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
    return !this.filter.ruleNameFilter || ruleName.includes(this.filter.ruleNameFilter);
  }

  private isRuleInherited(ruleName: string): boolean {
    const extensions = this.snapshot[this.selection.fileName]?.config?.extends || [];
    const inherits = this.schemas.snapshot[this.selection.pluginName]?.lintel?.inherits || { };
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || {};
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

