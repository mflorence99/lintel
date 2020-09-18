import { Extension } from './extensions';
import { ExtensionsState } from './extensions';
import { FilesState } from './files';
import { FilterState } from './filter';
import { Level } from './rules';
import { LintelState } from './lintel';
import { Params } from '../services/params';
import { Rule } from './rules';
import { RulesState } from './rules';
import { SelectionState } from './selection';
import { Utils } from '../services/utils';

import { meldConfigurations } from '../common/meld-configurations';
import { normalizeConfiguration } from '../common/meld-configurations';
import { scratch } from './operators';
import { updateItems } from './operators';

import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { append } from '@ngxs/store/operators';
import { patch } from '@ngxs/store/operators';
import { removeItem } from '@ngxs/store/operators';
import { updateItem } from '@ngxs/store/operators';

declare const lintelVSCodeAPI;

export type View = Record<string, [Rule, Settings]>;

export type CategoryView = Record<string, View>;

export interface Configuration {
  ecmaFeatures?: Record<string, boolean>;
  env?: Record<string, boolean>;
  extends?: string[];
  files?: string[];
  globals?: Record<string, boolean | number | string>;
  ignorePatterns?: string[];
  loading?: boolean;
  noInlineConfig?: boolean;
  overrides?: Configuration[];
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
  defaults: {}
})
export class ConfigsState extends NgxsDataRepository<ConfigsStateModel> {
  private debouncer = {};

  /** ctor */
  constructor(
    private extensions: ExtensionsState,
    private files: FilesState,
    private filter: FilterState,
    private lintel: LintelState,
    private params: Params,
    private rules: RulesState,
    private selection: SelectionState,
    private utils: Utils
  ) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  addOverride(): void {
    const fileName = this.selection.fileName;
    const override: Configuration = {
      files: [`*.temp.${this.lintel.unique()}`],
      rules: {}
    };
    this.ctx.setState(
      patch({ [fileName]: patch({ overrides: append([override]) }) })
    );
    this.files.addOverride({ fileName, override });
  }

  @DataAction({ insideZone: true })
  changeConfiguration(
    @Payload('ConfigsState.changeConfiguration') changes: any
  ): void {
    const fileName = this.selection.fileName;
    const ix = this.selection.override;
    let after, before;
    if (ix == null) {
      // patch in the changes to the base configuration
      before = this.ctx.getState()[fileName];
      this.ctx.setState(patch({ [fileName]: patch(changes) }));
      after = this.ctx.getState()[fileName];
    } else {
      // patch in the changes to an override
      before = this.ctx.getState()[fileName].overrides[ix];
      this.ctx.setState(
        patch({
          [fileName]: patch({ overrides: updateItem(ix, patch(changes)) })
        })
      );
      after = this.ctx.getState()[fileName].overrides[ix];
    }
    // load any extensions that are new
    const extensions = this.utils.diffArrays(
      after.extends ?? [],
      before.extends ?? []
    );
    if (extensions.length)
      this.debouncedPostMessage({
        command: 'getExtensions',
        fileName,
        extensions
      });
    // load any plugins that are new
    const plugins = this.utils.diffArrays(
      after.plugins ?? [],
      before.plugins ?? []
    );
    if (plugins.length)
      this.debouncedPostMessage({ command: 'getRules', fileName, plugins });
    // patch in the same changes to the source file
    this.files.changeConfiguration({ fileName, ix, replacement: changes });
  }

  @DataAction({ insideZone: true })
  changeOverrideFiles(
    @Payload('ConfigsState.changeOverrideFiles') { files }
  ): void {
    const fileName = this.selection.fileName;
    const overrides = this.ctx.getState()[fileName].overrides ?? [];
    overrides.forEach((_, ix) => {
      this.ctx.setState(
        patch({
          [fileName]: patch({
            overrides: updateItem(ix, patch({ files: files[ix] }))
          })
        })
      );
    });
    this.files.changeOverrideFiles({ fileName, files });
  }

  @DataAction({ insideZone: true })
  changeRule(@Payload('ConfigsState.changeRule') { changes, ruleName }): void {
    const fileName = this.selection.fileName;
    const ix = this.selection.override;
    let replacement;
    if (ix == null) {
      // patch in the changes to the base configuration
      this.ctx.setState(
        patch({
          [fileName]: patch({
            rules: patch({ [ruleName]: updateItems(changes) })
          })
        })
      );
      replacement = this.ctx.getState()[fileName].rules[ruleName];
    } else {
      // patch in the changes to an override
      this.ctx.setState(
        patch({
          [fileName]: patch({
            overrides: updateItem(
              ix,
              patch({ rules: patch({ [ruleName]: updateItems(changes) }) })
            )
          })
        })
      );
      replacement = this.ctx.getState()[fileName].overrides[ix].rules[ruleName];
    }
    // patch in the same changes to the source file
    // NOTE: we have resolved rule changes to a full replacement
    this.files.changeRule({ fileName, ix, ruleName, replacement });
  }

  @DataAction({ insideZone: true })
  deleteOverride(@Payload('ConfigsState.deleteOverride') { ix }): void {
    const fileName = this.selection.fileName;
    this.ctx.setState(
      patch({ [fileName]: patch({ overrides: removeItem(ix) }) })
    );
    this.files.deleteOverride({ fileName, ix });
  }

  @DataAction({ insideZone: true })
  deleteRule(@Payload('ConfigsState.deleteRule') { ruleName }): void {
    const fileName = this.selection.fileName;
    const ix = this.selection.override;
    if (ix == null)
      this.ctx.setState(
        patch({ [fileName]: patch({ rules: scratch(ruleName) }) })
      );
    else
      this.ctx.setState(
        patch({
          [fileName]: patch({
            overrides: updateItem(ix, patch({ rules: scratch(ruleName) }))
          })
        })
      );
    this.files.deleteRule({ fileName, ix, ruleName });
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    // initialize from parsed files
    const configs = this.files.fileNames.reduce((acc, fileName) => {
      acc[fileName] = this.files.load(fileName);
      return acc;
    }, {});
    this.ctx.setState(this.normalize(configs));
    // get the latest extensions & rules
    Object.entries(this.snapshot)
      .filter(([_, configuration]) => !!configuration)
      .forEach(([fileName, configuration]) => {
        const extensions = configuration.extends;
        if (extensions?.length)
          lintelVSCodeAPI.postMessage({
            command: 'getExtensions',
            fileName,
            extensions
          });
        const plugins = configuration.plugins;
        if (plugins?.length)
          lintelVSCodeAPI.postMessage({
            command: 'getRules',
            fileName,
            plugins
          });
      });
    // only override saved selection on a fresh start
    if (
      this.params.searchParams.freshStart ||
      !this.selection.fileName ||
      !this.fileNames.includes(this.selection.fileName)
    ) {
      this.selection.select({
        fileName: null,
        pluginName: this.pluginNames[0],
        category: this.params.generalSettings,
        override: null
      });
      // NOTE: this trick forces us to rebuild when fileName changes
      this.utils.nextTick(() => {
        this.selection.select({ fileName: this.fileNames[0] });
        this.filter.filterRuleName(null);
        this.filter.showInheritedRules(true);
      });
    }
    // listen for confirmations to remove an override
    window.addEventListener('message', (event) => {
      const message = event.data;
      switch (message.command) {
        case 'deleteOverride':
          this.deleteOverride({ ix: message.override });
          break;
      }
    });
  }

  // accessors

  @Computed() get activeView(): View {
    if (this.selection.pluginName === this.params.unknownPluginName)
      return this.unknownView;
    else {
      const rules = this.rules.rules;
      const settings = this.configuration.rules;
      return Object.keys(rules)
        .filter((ruleName) => this.isRuleFiltered(ruleName))
        .filter((ruleName) => settings[ruleName])
        .sort()
        .reduce(
          (acc, ruleName) => {
            acc[ruleName] = [rules[ruleName], settings[ruleName]];
            return acc;
          },
          this.filter.snapshot.showInheritedRules ? this.inheritedView : {}
        );
    }
  }

  @Computed() get baseConfiguration(): Configuration {
    return this.snapshot[this.selection.fileName] ?? this.emptyConfiguration;
  }

  @Computed() get categories(): string[] {
    return Object.keys(this.categoryView).sort();
  }

  @Computed() get categoryView(): CategoryView {
    const rules = this.rules.rules;
    const settings = this.configuration.rules;
    return Object.keys(rules)
      .filter((ruleName) => this.isRuleFiltered(ruleName))
      .filter(
        (ruleName) =>
          this.filter.snapshot.showInheritedRules || settings[ruleName]
      )
      .sort()
      .reduce(
        (acc, ruleName) => {
          const category = this.normalizeCategory(
            rules[ruleName].meta?.docs?.category
          );
          acc[category] = acc[category] ?? {};
          if (!acc[category][ruleName] || settings[ruleName])
            acc[category][ruleName] = [rules[ruleName], settings[ruleName]];
          return acc;
        },
        this.filter.snapshot.showInheritedRules
          ? this.inheritedCategoryView
          : {}
      );
  }

  @Computed() get configuration(): Configuration {
    if (this.selection.override != null)
      return this.overrides[this.selection.override];
    else return this.baseConfiguration;
  }

  @Computed() get extension(): Extension {
    const files = this.selection.overrideFiles;
    const ix = this.selection.override;
    // meld all the extensions of the base, in order
    // NOTE: the extends of every extension have already been
    // resolved at load time
    const extensionNames = this.baseConfiguration.extends ?? [];
    let extension = extensionNames
      .map((extensionName) => this.extensions.snapshot[extensionName])
      .filter((extension) => !!extension)
      .reduce((acc, extension) => {
        // meld the extension first
        acc = meldConfigurations(acc, extension);
        if (files && extension.overrides) {
          // if the extension has an override that matches the one we're
          // calculating for, meld that next
          const override = extension.overrides.find((override) =>
            this.utils.arraysEqual(files, override.files)
          );
          if (override) acc = meldConfigurations(acc, override);
        }
        return acc;
      }, {});
    // if calculating for an override, the last extension is the base itself
    if (ix != null && !this.isOverrideInherited(ix))
      extension = meldConfigurations(extension, this.baseConfiguration);
    return extension;
  }

  @Computed() get extensionSettings(): Record<string, Settings> {
    const filtered = Object.entries(this.extension.rules ?? {}).filter(
      ([ruleName, _]) => {
        if (this.selection.pluginName === this.params.basePluginName)
          return !ruleName.includes('/');
        else if (ruleName.includes('/')) {
          const [pluginName] = ruleName.split('/');
          return pluginName === this.selection.pluginName;
        }
      }
    );
    return Object.fromEntries(filtered);
  }

  @Computed() get emptyConfiguration(): Configuration {
    return { loading: true, rules: {} };
  }

  @Computed() get fileNames(): string[] {
    return Object.keys(this.snapshot);
  }

  @Computed() get inheritedView(): View {
    const rules = this.rules.rules;
    return Object.keys(rules)
      .filter((ruleName) => this.isRuleFiltered(ruleName))
      .filter((ruleName) => !!this.extensionSettings[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        acc[ruleName] = [rules[ruleName], this.extensionSettings[ruleName]];
        return acc;
      }, {});
  }

  @Computed() get inheritedCategoryView(): CategoryView {
    const rules = this.rules.rules;
    return Object.keys(rules)
      .filter((ruleName) => this.isRuleFiltered(ruleName))
      .filter((ruleName) => !!this.extensionSettings[ruleName])
      .sort()
      .reduce((acc, ruleName) => {
        const category = this.normalizeCategory(
          rules[ruleName].meta?.docs?.category
        );
        acc[category] = acc[category] ?? {};
        acc[category][ruleName] = [
          rules[ruleName],
          this.extensionSettings[ruleName]
        ];
        return acc;
      }, {});
  }

  @Computed() get isEmpty(): boolean {
    return this.utils.isEmptyObject(this.snapshot);
  }

  @Computed() get overrides(): Configuration[] {
    let overrides = [];
    if (this.baseConfiguration.overrides) {
      const fromConfiguration = this.baseConfiguration.overrides.map(
        (override) => override
      );
      overrides = overrides.concat(fromConfiguration);
    }
    if (this.extension.overrides) {
      const fromExtension = this.extension.overrides
        .filter(
          (override) =>
            !overrides.find((existing) =>
              this.utils.arraysEqual(existing.files, override.files)
            )
        )
        .map((override) => override);
      overrides = overrides.concat(fromExtension);
    }
    return overrides;
  }

  @Computed() get pluginNames(): string[] {
    const pluginNames = this.rawPluginNames;
    if (!this.utils.isEmptyObject(this.unknownView))
      pluginNames.push(this.params.unknownPluginName);
    return pluginNames;
  }

  @Computed() get rawPluginNames(): string[] {
    const uniqueNames = new Set([
      ...(this.configuration.plugins ?? []),
      ...(this.extension.plugins ?? [])
    ]);
    return [this.params.basePluginName, ...Array.from(uniqueNames).sort()];
  }

  @Computed() get shortFileNames(): string[] {
    const fileNames = this.fileNames.map((fileName) =>
      fileName.replace(/\\/g, '/')
    );
    const prefix = this.utils.longestCommonPrefix(fileNames);
    return fileNames.map((fileName) => fileName.substring(prefix.length));
  }

  @Computed() get unknownView(): View {
    // NOTE: settings that have no corresponding rule in the schema
    const settings = this.configuration.rules;
    return Object.keys(settings)
      .filter((ruleName) => this.isRuleFiltered(ruleName))
      .sort()
      .map((ruleName) => {
        const parts = ruleName.split('/');
        return parts.length === 2
          ? [parts[0], ruleName]
          : [this.params.basePluginName, ruleName];
      })
      .filter(
        ([pluginName, ruleName]) =>
          !(
            this.rawPluginNames.includes(pluginName) &&
            this.rules.snapshot[pluginName]?.[ruleName]
          )
      )
      .reduce((acc, [_, ruleName]) => {
        acc[ruleName] = [null, settings[ruleName]];
        return acc;
      }, {});
  }

  // public methods

  isOverrideEmpty(ix: number): boolean {
    if (ix !== null && ix < this.baseConfiguration.overrides?.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { files, rules, ...rest } = this.baseConfiguration.overrides[ix];
      if (!this.utils.isEmptyObject(rules) || !this.utils.isEmptyObject(rest))
        return false;
    }
    return true;
  }

  isOverrideInherited(ix: number): boolean {
    return ix >= this.baseConfiguration.overrides?.length;
  }

  isPluginFiltered(pluginName: string): boolean {
    const filtered = !!this.filter.snapshot.ruleNameFilter;
    const showInherited = this.filter.snapshot.showInheritedRules;
    // NOTE: quick exit
    if (!filtered && showInherited) return true;
    // NOTE: base plugin is always available
    else if (pluginName === this.params.basePluginName) return true;
    else {
      return Object.keys(this.rules.snapshot[pluginName] ?? {})
        .filter(
          (ruleName) => showInherited || this.configuration.rules[ruleName]
        )
        .some((ruleName) => this.isRuleFiltered(ruleName));
    }
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
      inherited:
        this.filter.snapshot.showInheritedRules &&
        this.extensionSettings[ruleName] &&
        !this.configuration.rules[ruleName],
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
    const ix = this.fileNames.findIndex((nm) => nm === fileName);
    return ix === -1 ? fileName : this.shortFileNames[ix];
  }

  // private methods

  private debouncedPostMessage(message: any): void {
    const key = `${message.fileName}-${message.command}`;
    clearTimeout(this.debouncer[key]);
    this.debouncer[key] = setTimeout(
      () => lintelVSCodeAPI.postMessage(message),
      this.params.debounceTimeout
    );
  }

  private normalize(configs: ConfigsStateModel): ConfigsStateModel {
    const model: ConfigsStateModel = this.utils.deepCopy(configs);
    Object.values(model)
      .filter((configuration) => !!configuration)
      .forEach((configuration) => normalizeConfiguration(configuration));
    return model;
  }

  private normalizeCategory(category: string): string {
    let normalized = category;
    if (!normalized || normalized.length === 0)
      normalized = this.params.catchAllCategory;
    return normalized
      .split(' ')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');
  }
}
