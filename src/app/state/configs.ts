import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { FilesState } from './files';
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
import { updateItems } from './operators';

export type View = Record<string, [Rule, Settings]>;

export type CategoryView = Record<string, View>;

export interface Configuration {
  ecmaFeatures?: Record<string, boolean>;
  env?: Record<string, boolean>;
  extends?: string[];
  globals?: Record<string, boolean | string>;
  ignorePatterns?: string[];
  noInlineConfig?: boolean;
  parser?: string;
  parserOptions?: ParserOptions;
  plugins?: string[];
  reportUnusedDisableDirectives?: boolean;
  root?: boolean;
  rules?: Record<string, Settings>;
  settings?: Record<string, any>;
}

export type ConfigsStateModel = Record<string, Configuration>;

export interface ParserOptions {
  ecmaFeatures?: Record<string, boolean>;
  ecmaVersion?: number;
  extraFileExtensions?: string[];
  project?: string | string[];
  projectFolderIgnoreList?: (string | RegExp)[];
  sourceType?: string;
  tsconfigRootDir?: string;
  warnOnUnsupportedTypeScriptVersion?: boolean;  
}

export interface RuleDigest {
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

export type Settings = [Level, ...any[]];

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
}) 

export class ConfigsState extends NgxsDataRepository<ConfigsStateModel> {

  /** ctor */
  constructor(private files: FilesState,
              private filter: FilterState,
              private params: Params,
              private rules: RulesState, 
              private selection: SelectionState,
              private utils: Utils) { 
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  changeConfiguration(@Payload('changes') changes: any): void {
    const fileName = this.selection.fileName;
    this.ctx.setState(patch({ [fileName]: patch(changes) }));
    // now patch source file by resolving changes to a full replacement
    const state = this.ctx.getState();
    const replacement = Object.keys(changes)
      .reduce((acc, key) => {
        acc[key] = state[fileName][key];
        return acc;
      }, { });
    this.files.changeConfiguration({ fileName, replacement });
  }

  @DataAction({ insideZone: true })
  changeRule(@Payload('changes') { changes, ruleName }): void {
    const fileName = this.selection.fileName;
    this.ctx.setState(patch({ [fileName]: patch({ rules : patch({ [ruleName]: updateItems(changes) }) }) }));
    // now patch source file by resolving rule changes to a full replacement
    const state = this.ctx.getState();
    const replacement = state[fileName].rules[ruleName];
    this.files.changeRule({ fileName, ruleName, replacement });
  }

  @DataAction({ insideZone: true }) 
  initialize(): void {
    // initialize from parsed files
    const configs = this.files.fileNames
      .reduce((acc, fileName) => {
        acc[fileName] = this.files.load(fileName);
        return acc;
      }, { });
    this.ctx.setState(this.normalize(configs));
    // only override saved selection on a fresh start
    if (this.params.searchParams.freshStart 
      || !this.selection.fileName
      || !this.fileNames.includes(this.selection.fileName)) {
      this.utils.nextTick(() => {
        this.selection.select({ fileName: this.fileNames[0] });
        this.selection.select({ pluginName: this.pluginNames[0] });
        this.selection.select({ category: this.params.generalSettings });
        this.filter.filterRuleName(null);
        this.filter.showInheritedRules();
      });
    }
  }

  // accessors

  @Computed() get activeView(): View {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules ?? { };
    const settings = this.snapshot[this.selection.fileName]?.rules ?? { };
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
    return this.snapshot[this.selection.fileName] ?? { };
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules ?? { };
    const settings = this.snapshot[this.selection.fileName]?.rules ?? { };
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
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => this.isRuleInherited(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        acc[ruleName] = [rules[ruleName], this.settingsForInherited(rules[ruleName])];
        return acc;
      }, { });
  }

  @Computed() get inheritedCategoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => this.isRuleInherited(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        const category = rules[ruleName].meta?.docs?.category;
        if (!acc[category])
          acc[category] = { };
        acc[category][ruleName] = [rules[ruleName], this.settingsForInherited(rules[ruleName])];
        return acc;
      }, { });
  }

  @Computed() get pluginNames(): string[] {
    const raw = Object.keys(this.snapshot)
      .reduce((acc, fileName) => {
        acc.push(...(this.snapshot[fileName].plugins ?? []));
        return acc;
      }, [])
      .filter(pluginName => this.rules.snapshot[pluginName]);
    return [this.params.basePluginName, ...this.utils.deduplicateArray(raw)];
  }

  @Computed() get unknownView(): View {
    // NOTE: settings that have no corresponding rule in the schema
    // and so cannot be handled by Lintel
    const settings = this.snapshot[this.selection.fileName]?.rules ?? { };
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

  makeRuleDigest(ruleName: string, rule: Rule, settings: Settings): RuleDigest {
    return {
      deprecated: !!rule?.meta?.deprecated,
      description: rule?.meta?.docs?.description,
      // @see settingsForInherited below
      inherited: settings?.['_inherited'],
      level: settings?.[0] || 'off',
      recommended: rule?.meta?.docs?.recommended,
      replacedBy: rule?.meta?.replacedBy ?? [],
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
    const extensions = this.snapshot[this.selection.fileName]?.extends ?? [];
    const inherits = this.rules.snapshot[this.selection.pluginName]?.lintel?.inherits ?? { };
    const rules = this.rules.snapshot[this.selection.pluginName]?.rules ?? { };
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

  private normalize(configs: ConfigsStateModel): ConfigsStateModel {
    const model = this.utils.deepCopy(configs);
    Object.entries(configs)
      .forEach(([fileName, configuration]) => {
        // NOTE: is is very convenient to normalize configs before use
        configuration.rules = configuration.rules ?? { };
        Object.entries(configuration.rules)
          .forEach(([ruleName, rule]) => {
            let normalized: any = rule;
            if (typeof rule === 'string' || Number.isInteger(rule as any))
              normalized = [rule];
            if (Number.isInteger(normalized[0]))
              normalized[0] = ['off', 'warn', 'error'][normalized[0]];
            model[fileName].rules[ruleName] = normalized;
          });
        // also very convenient to normalize parserOptions.project to a string[]
        const project = configuration.parserOptions?.project;
        if (typeof project === 'string')
          model[fileName].parserOptions.project = [project];
        // also very convenient to normalize global values
        if (configuration.globals) 
          model[fileName].globals = Object.keys(configuration.globals)
            .reduce((acc, key) => {
              if ((configuration.globals[key] === true) 
              || (configuration.globals[key] === 'writeable'))
                acc[key] = 'writable';
              else if ((configuration.globals[key] === false) 
              || (configuration.globals[key] === 'readable'))
                acc[key] = 'readonly';
              else acc[key] = configuration.globals[key];
              return acc;
            }, { });
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
    const settings: Settings = [level];
    // fake inherited property
    settings['_inherited'] = true;
    return settings;
  }

}

