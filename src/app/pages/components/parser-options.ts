import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { ExtensionsState } from '../../state/extensions';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';
import { SingleselectorOptions } from '../../components/singleselector';

import { filter } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { takeUntil } from 'rxjs/operators';

/**
 * Parser options is complicated, so separate it from general.ts
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DestroyService],
  selector: 'lintel-parser-options',
  templateUrl: 'parser-options.html',
  styleUrls: ['parser-options.scss']
})

export class ParserOptionsComponent implements OnInit {

  parserOptionsForm: FormGroup;

  private emitEvent = true;

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              public extensions: ExtensionsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState,
              public selection: SelectionState) {
    this.parserOptionsForm = this.formBuilder.group({
      ecmaVersion: null,
      sourceType: null
    });
    // rebuild form on selection changes
    this.handleSelectionState$();
  }

  /** Options from enum */
  makeOptionsForSingleselector(nm: string): SingleselectorOptions {
    const options = eval(`this.schema.properties.${nm}.enum`);
    return options.map(option => [option, option]);
  }

  /** When we're ready */
  ngOnInit(): void {
    this.parserOptionsForm.valueChanges
      .pipe(
        filter(_ => this.emitEvent),
        takeUntil(this.destroy$)
      ).subscribe(changes => 
        // NOTE: we're patching these changes because each parser can define its own
        // set of parserOptions and we can't be sure we've built the UI for all of them 
        this.configs.changeConfiguration({ parserOptions: patch(changes) }));
  }

  // private methods

  private handleSelectionState$(): void {
    this.selection.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.emitEvent = false;
        this.parserOptionsForm.patchValue({
          ecmaVersion: this.configs.configuration.parserOptions?.ecmaVersion ?? null,
          sourceType: this.configs.configuration.parserOptions?.sourceType ?? null
          // TODO: we don't know why { emitEvent: false } doesn't work
        }, { emitEvent: false });
        this.emitEvent = true;
      });
  }

}
