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
import { scratch } from './operators';
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
  sourceType?: string;
}

export interface RuleDigest {
  defined: boolean;
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

  private debouncer = { };

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
    const before = this.ctx.getState()[fileName];
    this.ctx.setState(patch({ [fileName]: patch(changes) }));
    const after = this.ctx.getState()[fileName];
    // load any extensions that are new
    const extensions = this.utils.diff(after.extends ?? [], before.extends ?? []);
    if (extensions.length)
      this.debouncedPostMessage({ command: 'getExtensions', fileName, extensions });
    // load any plugins that are new
    const plugins = this.utils.diff(after.plugins ?? [], before.plugins ?? []);
    if (plugins.length)
      this.debouncedPostMessage({ command: 'getRules', fileName, plugins });
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
  deleteRule(@Payload('ruleName') { ruleName }): void {
    const fileName = this.selection.fileName;
    this.ctx.setState(patch({ [fileName]: patch({ rules: scratch(ruleName) }) }));
    this.files.deleteRule({ fileName, ruleName });
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
        acc[category] = acc[category] ?? { };
        if (!acc[category][ruleName] || settings[ruleName])
          acc[category][ruleName] = [rules[ruleName], settings[ruleName]];
        return acc;
      }, this.filter.snapshot.showInheritedRules ? this.inheritedCategoryView : { });
  }

  @Computed() get extension(): Extension {
    const extensionNames = this.configuration?.extends ?? [];
    return extensionNames
      .map(extensionName => this.extensions.snapshot[extensionName])
      .filter(extension => !!extension)
      .reduce((acc, extension) => {
        Object.keys(extension)
          .filter(key => key !== 'extends')
          .forEach(key => {
            if (Array.isArray(extension[key]))
              acc[key] = Array.from(new Set([...acc[key] || [], ...extension[key]]));
            else if (typeof extension[key] === 'object')
              acc[key] = Object.assign(acc[key] || { }, extension[key]);
            else acc[key] = extension[key];
          });
        return acc;
      }, { });
  }

  @Computed() get extensionSettings(): Record<string, Settings> {
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
      .filter(ruleName => !!this.extensionSettings[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        acc[ruleName] = [rules[ruleName], this.extensionSettings[ruleName]];
        return acc;
      }, { });
  }

  @Computed() get inheritedCategoryView(): CategoryView {
    const rules = this.rules.snapshot[this.selection.pluginName] ?? { };
    return Object.keys(rules)
      .filter(ruleName => this.isRuleFiltered(ruleName))
      .filter(ruleName => !!this.extensionSettings[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        const category = this.normalizeCategory(rules[ruleName].meta?.docs?.category);
        acc[category] = acc[category] ?? { };
        acc[category][ruleName] = [rules[ruleName], this.extensionSettings[ruleName]];
        return acc;
      }, { });
  }

  @Computed() get isEmpty(): boolean {
    return this.utils.isEmptyObject(this.snapshot);
  }

  @Computed() get pluginNames(): string[] {
    const uniqueNames = new Set([...this.configuration?.plugins ?? [], ...this.extension?.plugins ?? []]); 
    const pluginNames = [this.params.basePluginName, ...Array.from(uniqueNames).sort()];
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

  isPluginFiltered(pluginName: string): boolean {
    const filter = this.filter.snapshot.ruleNameFilter;
    if (!filter || (pluginName === this.params.basePluginName))
      return true;
    else if (Object.keys(this.rules.snapshot[pluginName] ?? { })
      .some(this.isRuleFiltered.bind(this)))
      return true;
    else return false;
  }

  isRuleFiltered(ruleName: string): boolean {
    const filter = this.filter.snapshot.ruleNameFilter;
    return !filter || ruleName.includes(filter);
  }

  makeRuleDigest(ruleName: string, rule: Rule, settings: Settings): RuleDigest {
    return {
      defined: !!this.configuration.rules[ruleName],
      deprecated: !!rule?.meta?.deprecated,
      description: rule?.meta?.docs?.description,
      inherited: this.filter.snapshot.showInheritedRules && this.extensionSettings[ruleName] && !this.configuration.rules[ruleName],
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

  private debouncedPostMessage(message: any): void {
    const key = `${message.fileName}-${message.command}`;
    clearTimeout(this.debouncer[key]);
    this.debouncer[key] = setTimeout(() => lintelVSCodeAPI.postMessage(message), this.params.debounceTimeout);
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

