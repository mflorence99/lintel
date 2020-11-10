import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { ExtensionsState } from '../../state/extensions';
import { LintelState } from '../../state/lintel';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';
import { SingleselectorOptions } from '../../components/singleselector';
import { Utils } from '../../services/utils';

import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

/**
 * Parser options is complicated, so separate it from general.ts
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  selector: 'lintel-parser-options',
  templateUrl: 'parser-options.html',
  styleUrls: ['parser-options.scss']
})
export class ParserOptionsComponent implements OnInit {
  parserOptionsForm: FormGroup;

  private underConstruction = true;

  /** ctor */
  constructor(
    private actions$: Actions,
    private cdf: ChangeDetectorRef,
    public configs: ConfigsState,
    private destroy$: DestroyService,
    public extensions: ExtensionsState,
    private formBuilder: FormBuilder,
    public lintel: LintelState,
    public schema: SchemaState,
    public selection: SelectionState,
    private utils: Utils
  ) {
    this.parserOptionsForm = this.formBuilder.group({
      ecmaVersion: null,
      sourceType: null
    });
  }

  /** Options from enum */
  makeOptionsForSingleselector(nm: string): SingleselectorOptions {
    const options = eval(`this.schema.properties.${nm}.enum`);
    return options.map((option) => [option, option]);
  }

  /** When we're ready */
  ngOnInit(): void {
    this.handleActions$();
    this.handleValueChanges$();
    this.rebuildControls();
  }

  // private methods

  private handleActions$(): void {
    this.actions$
      .pipe(
        filter(({ action, status }) => {
          return (
            this.utils.hasProperty(action, /^SelectionState\./) &&
            status === 'SUCCESSFUL'
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.rebuildControls();
        this.cdf.markForCheck();
      });
  }

  private handleValueChanges$(): void {
    this.parserOptionsForm.valueChanges
      .pipe(
        filter(() => this.underConstruction),
        takeUntil(this.destroy$)
      )
      .subscribe((changes) => {
        this.configs.changeConfiguration({ parserOptions: changes });
      });
  }

  private rebuildControls(): void {
    this.underConstruction = false;
    this.parserOptionsForm.patchValue(
      {
        ecmaVersion:
          this.configs.configuration.parserOptions?.ecmaVersion ?? null,
        sourceType: this.configs.configuration.parserOptions?.sourceType ?? null
        // TODO: we don't know why { emitEvent: false } doesn't work
      },
      { emitEvent: false }
    );
    this.underConstruction = true;
  }
}
