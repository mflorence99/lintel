import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { Subject } from 'rxjs';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * General settings component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-general',
  templateUrl: 'general.html',
  styleUrls: ['general.scss']
})

export class GeneralComponent implements OnInit, OnDestroy { 

  // TODO: temporary hack

  generalForm: FormGroup;

  options = {
    ecmaFeatures: this.makeOptions('ecmaFeatures'),
    env: this.makeOptions('env')
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

  private notifier = new Subject<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState) {
    this.generalForm = this.formBuilder.group({
      ecmaFeatures: [this.configs.configuration.ecmaFeatures],
      env: [this.configs.configuration.env],
      extends: [this.configs.configuration.extends],
      ignorePatterns: [this.configs.configuration.ignorePatterns],
      noInlineConfig: [this.configs.configuration.noInlineConfig],
      parser: [this.configs.configuration.parser],
      plugins: [this.configs.configuration.plugins],
      reportUnusedDisableDirectives: [this.configs.configuration.reportUnusedDisableDirectives],
      root: [this.configs.configuration.root]
    });
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    // NOTE: subscribe to each individually  so we change only minimum config
    const changes = [
      this.makeValueChanges('ecmaFeatures'),
      this.makeValueChanges('env'),
      this.makeValueChanges('extends'),
      this.makeValueChanges('ignorePatterns'),
      this.makeValueChanges('noInlineConfig'),
      this.makeValueChanges('parser'),
      this.makeValueChanges('plugins'),
      this.makeValueChanges('reportUnusedDisableDirectives'),
      this.makeValueChanges('root')
    ];
    merge(...changes)
      .pipe(
        map(([changes, key]) => ({ [key]: changes })),
        takeUntil(this.notifier)
      ).subscribe(changes => this.configs.changeConfiguration(changes));
  }

  // private methods

  private makeOptions(key: string): string[][] {
    const properties = this.schema.properties[key].properties;
    return Object.keys(properties)
      .sort()
      .map(property => [property, property, properties[property].description]);
  }

  private makeValueChanges(key: string): Observable<[any, string]> {
    return combineLatest([this.generalForm.controls[key].valueChanges, of(key)]);
  }

}
