import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';

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

  defaults =  {
    ecmaVersion: this.schema.properties.parserOptions.properties.ecmaVersion.default,
    sourceType: this.schema.properties.parserOptions.properties.sourceType.default
  };

  descriptions = {
    ecmaVersion: this.schema.properties.parserOptions.properties.ecmaVersion.description,
    sourceType: this.schema.properties.parserOptions.properties.sourceType.description
  };

  generalForm: FormGroup;

  options = {
    ecmaFeatures: this.makeOptionsFromProperties('properties.ecmaFeatures.properties'),
    ecmaVersion: this.makeOptionsFromEnum('properties.parserOptions.properties.ecmaVersion.enum'),
    env: this.makeOptionsFromProperties('properties.env.properties'),
    globals: this.makeOptionsFromEnum('properties.globals.additionalProperties.oneOf[0].enum'),
    sourceType: this.makeOptionsFromEnum('properties.parserOptions.properties.sourceType.enum')
  }; 

  properties = [
    ['extends', 'extending-configuration-files'],
    ['parserOptions', 'specifying-parser-options'], 
    ['ecmaFeatures', 'specifying-parser-options'],
    ['parser', 'specifying-parser'], 
    ['env', 'specifying-environments'], 
    ['globals', 'specifying-globals'],
    ['plugins', 'configuring-plugins'],
    ['root', 'configuration-cascading-and-hierarchy'], 
    ['noInlineConfig', 'disabling-rules-with-inline-comments'], 
    ['ignorePatterns', 'ignoring-files-and-directories'],
    ['settings', 'adding-shared-settings'],
    ['reportUnusedDisableDirectives', 'configuring-inline-comment-behaviors']
  ];

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              private formBuilder: FormBuilder,
              public schema: SchemaState,
              public selection: SelectionState) {
    this.generalForm = this.formBuilder.group({
      // NOTE: ecmaFeatures moved from the top level into parseOptions
      ecmaFeatures: [this.configs.configuration.parserOptions?.ecmaFeatures ?? { }],
      env: [this.configs.configuration.env ?? { }],
      extends: [this.configs.configuration.extends],
      globals: [this.configs.configuration.globals],
      ignorePatterns: [this.configs.configuration.ignorePatterns],
      noInlineConfig: [this.configs.configuration.noInlineConfig],
      parser: [this.configs.configuration.parser],
      parserOptions: this.formBuilder.group({ 
        ecmaVersion: [this.configs.configuration.parserOptions?.ecmaVersion],
        extraFileExtensions: [this.configs.configuration.parserOptions?.extraFileExtensions],
        project: [this.configs.configuration.parserOptions?.project],
        projectFolderIgnoreList: [this.configs.configuration.parserOptions?.projectFolderIgnoreList],
        sourceType: [this.configs.configuration.parserOptions?.sourceType],
        tsconfigRootDir: [this.configs.configuration.parserOptions?.tsconfigRootDir],
        warnOnUnsupportedTypeScriptVersion: [this.configs.configuration.parserOptions?.warnOnUnsupportedTypeScriptVersion]
      }),
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
      return this.configs.configuration.parserOptions?.hasOwnProperty(key);
    else return this.configs.configuration.hasOwnProperty(key);
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
      this.makeValueChanges('parserOptions'),
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
          // NOTE: we can't know that parserOptions is complete, because each parser
          // defines its own superset
          else if (key === 'parserOptions')
            return { parserOptions: { ...this.configs.configuration.parserOptions, ...changes } };
          return { [key]: changes };
        }),
        takeUntil(this.destroy$)
      ).subscribe(changes => this.configs.changeConfiguration(changes));
  }

  // private methods

  private makeOptionsFromEnum(path: string): string[][] {
    const options = eval(`this.schema.${path}`);
    return options.map(option => [option, option]);
  }

  private makeOptionsFromProperties(path: string): string[][] {
    const properties = eval(`this.schema.${path}`);
    return Object.keys(properties)
      .sort()
      .map(property => [property, property, properties[property].description]);
  }

  private makeValueChanges(key: string): Observable<[any, string]> {
    return combineLatest([this.generalForm.controls[key].valueChanges, of(key)]);
  }

}
