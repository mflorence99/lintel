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

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export type CategoryView = Record<string, Record<string, Rule>>;

export interface ConfigFile {
  config: Configuration;
}

export interface Configuration {
  // TODO: more analysis
  plugins?: string[];
  rules?: Record<string, Settings>;
}

export type ConfigsStateModel = Record<string, ConfigFile>;

export interface Digest {
  description: string;
  level: 'off' | 'warn' | 'error' | null;
  recommended: 'error' | 'warn' | 'off' | boolean;
  rule: Rule;
  ruleName: string;
  settings: Settings;
  url: string;
}

export interface Settings {
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

  // actions

  @DataAction({ insideZone: true }) 
  initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  // accessors

  @Computed() get activeView(): Record<string, Rule> {
    const active = this.snapshot[this.selection.fileName]?.config?.rules || { };
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .filter(ruleName => active[ruleName])
      .reduce((acc, ruleName) => {
        acc[ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView).sort();
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category;
        if (!acc[category])
          acc[category] = { };
        acc[category][ruleName] = rules[ruleName];
        return acc;
      }, { });
  }

  @Computed() get fileNames(): string [] {
    return Object.keys(this.snapshot);
  }

  @Computed() get hasRules(): boolean {
    const rules = this.schemas.snapshot[this.selection.pluginName]?.rules || { };
    return Object.keys(rules)
      .some(ruleName => this.filter.isRuleNameFiltered(ruleName));
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

  @Computed() get unknownView(): Record<string, Rule> {
    // NOTE: settings that have no corresponmding rule in the schema
    // and so cannot be handled by Lintel
    const settings = this.snapshot[this.selection.fileName]?.config?.rules || { };
    return Object.keys(settings)
      .filter(ruleName => this.filter.isRuleNameFiltered(ruleName))
      .map(ruleName => {
        const parts = ruleName.split('/');
        return (parts.length === 2) ? [parts[0], ruleName] : [config.basePluginName, ruleName];
      })
      .filter(([pluginName, ruleName]) => !this.schemas.snapshot[pluginName]?.rules?.[ruleName])
      .reduce((acc, [_, ruleName]) => {
        acc[ruleName] = settings[ruleName];
        return acc;
      }, { });
  }

  // public mdethods

  makeRuleDigest(ruleName: string, rule?: Rule, settings?: Settings): Digest {
    rule = rule || 
      this.schemas.snapshot?.[this.selection.pluginName]?.rules?.[ruleName] as Rule;
    settings = settings || 
      this.snapshot?.[this.selection.fileName]?.config?.rules?.[ruleName] as Settings;
    let level;
    if (!settings || settings === 'off')
      level = 'off';
    else level = Array.isArray(settings) ? settings[0] : settings;
    return {
      description: rule?.meta?.docs?.description,
      level: level,
      recommended: rule?.meta?.docs?.recommended,
      rule: rule,
      ruleName: ruleName,
      settings: settings,
      url: rule?.meta?.docs?.url
    };
  }

}

