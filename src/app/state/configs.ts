import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Extension } from './extensions';
import { ExtensionsState } from './extensions';
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

declare const lintelVSCodeAPI;

export type View = Record<string, [Rule, Settings]>;

export type CategoryView = Record<string, View>;

export interface Configuration {
  ecmaFeatures?: Record<string, boolean>;
  env?: Record<string, boolean>;
  extends?: string[];
  globals?: Record<string, boolean | number | string>;
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
  constructor(private extensions: ExtensionsState,
              private files: FilesState,
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
    // get the latest extensions & rules
    Object.entries(this.snapshot)
      .forEach(([fileName, configuration]) => {
        const extensions = configuration?.extends;
        if (extensions?.length)
          lintelVSCodeAPI.postMessage({ command: 'getExtensions', fileName, extensions });
        const plugins = configuration?.plugins;
        if (plugins?.length)
          lintelVSCodeAPI.postMessage({ command: 'getRules', fileName, plugins });
      });
    // only override saved selection on a fresh start
    if (this.params.searchParams.freshStart 
      || !this.selection.fileName
      || !this.fileNames.includes(this.selection.fileName)) {
      this.selection.select({ fileName: null });
      // TODO: this trick forces us to rebuild when fileName changes
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
    if (this.selection.pluginName === this.params.unknownPluginName)
      return this.unknownView;
    else {
      const rules = this.rules.snapshot[this.selection.pluginName] ?? { };
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
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView)
      .sort();
  }

  @Computed() get configuration(): Configuration {
    // NOTE: a null configuration is an upstream signal
    return this.snapshot[this.selection.fileName];
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName] ?? { };
    const settings = this.snapshot[this.selection.fileName]?.rules ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .sort()
      .reduce((acc, ruleName) => {
        const category = this.normalizeCategory(rules[ruleName].meta?.docs?.category);
        if (!acc[category])
          acc[category] = { };
        if (!acc[category][ruleName] || settings[ruleName])
          acc[category][ruleName] = [rules[ruleName], settings[ruleName]];
        return acc;
      }, this.filter.snapshot.showInheritedRules ? this.inheritedCategoryView : { });
  }

  @Computed() get extension(): Extension {
    const extensionNames = this.configuration.extends ?? [];
    return extensionNames
      .map(extensionName => this.extensions.snapshot[extensionName])
      .filter(extension => !!extension)
      .reduce((acc, extension) => {
        acc.env = Object.assign(acc.env ?? { }, extension.env ?? { });
        acc.globals = Object.assign(acc.globals ?? { }, extension.globals ?? { });
        acc.plugins = Array.from(new Set([...acc.plugins ?? [], ...extension.plugins ?? []]));
        acc.rules = Object.assign(acc.rules ?? { }, extension.rules ?? { });
        return acc;
      }, {});
  }

  @Computed() get extensionRules(): Record<string, Settings> {
    const filtered = Object.entries(this.extension?.rules ?? { })
      .filter(([ruleName, _]) => {
        if (this.selection.pluginName === this.params.basePluginName)
          return !ruleName.includes('/');
        else if (ruleName.includes('/')) {
          const [pluginName] = ruleName.split('/');
          return pluginName === this.selection.pluginName;
        }
      });
    return Object.fromEntries(filtered);
  }

  @Computed() get fileNames(): string[] {
    return Object.keys(this.snapshot);
  }

  @Computed() get inheritedView(): View {
    const rules = this.rules.snapshot[this.selection.pluginName] ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => !!this.extensionRules[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        acc[ruleName] = [rules[ruleName], this.extensionRules[ruleName]];
        return acc;
      }, { });
  }

  @Computed() get inheritedCategoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName] ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => !!this.extensionRules[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        const category = this.normalizeCategory(rules[ruleName].meta?.docs?.category);
        if (!acc[category])
          acc[category] = { };
        acc[category][ruleName] = [rules[ruleName], this.extensionRules[ruleName]];
        return acc;
      }, { });
  }

  @Computed() get isEmpty(): boolean {
    return this.utils.isEmptyObject(this.snapshot);
  }

  @Computed() get pluginNames(): string[] {
    const pluginNames = [this.params.basePluginName, ...(this.configuration?.plugins?.slice().sort() ?? [])];
    if (!this.utils.isEmptyObject(this.unknownView))
      pluginNames.push(this.params.unknownPluginName);
    return pluginNames;
  }

  @Computed() get shortFileNames(): string[] {
    const prefix = this.utils.longestCommonPrefix(this.fileNames);
    return this.fileNames.map(fileName => fileName.substring(prefix.length));
  }

  @Computed() get unknownView(): View {
    // NOTE: settings that have no corresponding rule in the schema
    const settings = this.snapshot[this.selection.fileName]?.rules ?? { };
    return Object.keys(settings)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .sort()
      .map(ruleName => {
        const parts = ruleName.split('/');
        return (parts.length === 2) ? 
          [parts[0], ruleName] : [this.params.basePluginName, ruleName];
      })
      .filter(([pluginName, ruleName]) => !this.rules.snapshot[pluginName]?.[ruleName])
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
      inherited: this.extensionRules[ruleName] && !this.configuration.rules[ruleName],
      level: settings?.[0] || 'off',
      recommended: rule?.meta?.docs?.recommended,
      replacedBy: rule?.meta?.replacedBy ?? [],
      rule: rule,
      ruleName: ruleName,
      settings: settings,
      url: rule?.meta?.docs?.url
    };
  }

  shortFileName(fileName: string): string {
    const ix = this.fileNames.findIndex(nm => nm === fileName);
    return (ix === -1) ? fileName : this.shortFileNames[ix];
  }

  // private methods

  private isRuleFiltered(ruleName: string): boolean {
    return !this.filter.snapshot.ruleNameFilter || ruleName.includes(this.filter.snapshot.ruleNameFilter);
  }

  private isRuleInherited(_): boolean {
    // TODO: dummy
    return false;
  }

  private normalize(configs: ConfigsStateModel): ConfigsStateModel {
    const model = this.utils.deepCopy(configs);
    Object.entries(configs)
      .filter(([_, configuration]) => !!configuration)
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
        // also very convenient to normalize extends to a string[]
        if (typeof configuration.extends === 'string')
          model[fileName].extends = [configuration.extends];
        // also very convenient to normalize parserOptions.project to a string[]
        const project = configuration.parserOptions?.project;
        if (typeof project === 'string')
          model[fileName].parserOptions.project = [project];
        // also very convenient to normalize global values
        if (configuration.globals) {
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
        }
      });
    return model;
  }

  private normalizeCategory(category: string): string {
    let normalized = category;
    if (!normalized || (normalized.length === 0))
      normalized = this.params.catchAllCategory;
    // TODO: toLowerCase() turns out to be too heavy-handed as it reduces
    // ECMAScript to Ecmascript -- eliminate for now but revisit if we can't
    // properly correct enough categories
    return normalized/* .toLowerCase() */
      .split(' ')
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');
  }

}

