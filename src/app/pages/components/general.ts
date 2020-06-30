import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { ExtensionsState } from '../../state/extensions';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MultiselectorOptions } from '../../components/multiselector';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';
import { SingleselectorOptions } from '../../components/singleselector';
import { Utils } from '../../services/utils';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const lintelVSCodeAPI;

/**
 * General settings component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DestroyService],
  selector: 'lintel-general',
  templateUrl: 'general.html',
  styleUrls: ['general.scss']
})

export class GeneralComponent implements OnInit { 

  generalForm: FormGroup;

  properties = [
    ['ecmaFeatures', 'specifying-parser-options'],
    ['env', 'specifying-environments'], 
    ['extends', 'extending-configuration-files'],
    ['globals', 'specifying-globals'],
    ['ignorePatterns', 'ignoring-files-and-directories'],
    ['noInlineConfig', 'disabling-rules-with-inline-comments'],
    ['overrides', 'configuration-based-on-glob-patterns'],
    ['parser', 'specifying-parser'], 
    ['parserOptions', 'specifying-parser-options'], 
    ['plugins', 'configuring-plugins'],
    ['reportUnusedDisableDirectives', 'configuring-inline-comment-behaviors'],
    ['root', 'configuration-cascading-and-hierarchy'], 
    ['settings', 'adding-shared-settings']
  ];

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              public extensions: ExtensionsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState,
              public selection: SelectionState,
              public utils: Utils) {
    this.generalForm = this.formBuilder.group({
      // NOTE: ecmaFeatures moved from the top level into parseOptions
      ecmaFeatures: [this.configs.configuration.parserOptions?.ecmaFeatures ?? { }],
      env: [this.configs.configuration.env ?? { }],
      extends: [this.configs.configuration.extends],
      globals: [this.configs.configuration.globals],
      ignorePatterns: [this.configs.configuration.ignorePatterns],
      noInlineConfig: [this.configs.configuration.noInlineConfig],
      parser: [this.configs.configuration.parser],
      plugins: [this.configs.configuration.plugins],
      reportUnusedDisableDirectives: [this.configs.configuration.reportUnusedDisableDirectives],
      root: [this.configs.configuration.root],
      settings: [this.configs.configuration.settings]
    });
  }

  /** We can only process if all values are string, number or boolean */
  canDoSettings(): boolean {
    const settings = this.configs.configuration.settings ?? { };
    return Object.values(settings).every(setting => {
      return typeof setting === 'string'
          || typeof setting === 'number'
          || typeof setting === 'boolean';
    });
  }

  /** Edit a file */
  editFile(fileName: string): void {
    lintelVSCodeAPI.postMessage({ command: 'editFile', fileName });
  }

  /** Has this section been configured? */
  isConfigured(key: string): boolean {
    // NOTE: ecmaFeatures moved from the top level into parseOptions
    if (key === 'ecmaFeatures')
      return this.utils.exists(this.configs.configuration.parserOptions?.ecmaFeatures);
    // ... but still consider parserOptions separately
    else if (key === 'parserOptions') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ecmaFeatures, ...rest } = this.configs.configuration.parserOptions ?? { };
      return this.utils.exists(rest);
    } else return this.utils.exists(this.configs.configuration[key]);
  }

  /** Has this section been inherited? */
  isInherited(key: string): boolean {
    // NOTE: ecmaFeatures moved from the top level into parseOptions
    if (key === 'ecmaFeatures')
      return this.utils.exists(this.configs.extension.parserOptions?.ecmaFeatures);
    else if (key === 'overrides')
      return false;
    // ... but still consider parserOptions separately
    else if (key === 'parserOptions') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ecmaFeatures, ...rest } = this.configs.extension.parserOptions ?? { };
      return this.utils.exists(rest);
    } else return this.utils.exists(this.configs.extension[key]);
  }

  /** Merge extension into options */
  makeOptionsForMultiselector(nm: string, ext: string): MultiselectorOptions {
    const properties = eval(`this.schema.properties.${nm}.properties`);
    const inherited = Object.keys(this.utils.safeEval(this, `configs.extension.${ext}`, { }));
    return Array.from(new Set([...Object.keys(properties), ...inherited]))
      .sort()
      .map(property => [property, property, properties[property]?.description]);
  }

  /** Options from enum */
  makeOptionsForSingleselector(nm: string): SingleselectorOptions {
    const options = eval(`this.schema.properties.${nm}.enum`);
    return options.map(option => [option, option]);
  }

  /** When we're ready */
  ngOnInit(): void {
    // NOTE: subscribe to each individually so we change only minimum config
    const changes = [
      this.makeValueChanges('ecmaFeatures'),
      this.makeValueChanges('env'),
      this.makeValueChanges('extends'),
      this.makeValueChanges('globals'),
      this.makeValueChanges('ignorePatterns'),
      this.makeValueChanges('noInlineConfig'),
      this.makeValueChanges('parser'),
      this.makeValueChanges('plugins'),
      this.makeValueChanges('reportUnusedDisableDirectives'),
      this.makeValueChanges('root'),
      this.makeValueChanges('settings')
    ];
    merge(...changes)
      .pipe(
        map(([changes, key]) => {
          // NOTE: ecmaFeatures moved from the top level into parseOptions
          if (key === 'ecmaFeatures')
            return { parserOptions: { ...this.configs.configuration.parserOptions, ecmaFeatures: changes }};
          return { [key]: changes };
        }),
        takeUntil(this.destroy$)
      ).subscribe(changes => this.configs.changeConfiguration(changes));
  }

  // private methods

  private makeValueChanges(key: string): Observable<[any, string]> {
    return combineLatest([this.generalForm.controls[key].valueChanges, of(key)]);
  }

}
