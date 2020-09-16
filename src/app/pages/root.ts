import { ConfigsState } from '../state/configs';
import { DestroyService } from '../services/destroy';
import { ExtensionsState } from '../state/extensions';
import { FilesState } from '../state/files';
import { FilterState } from '../state/filter';
import { Params } from '../services/params';
import { RulesState } from '../state/rules';
import { SchemaState } from '../state/schema';
import { SelectionState } from '../state/selection';

import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

declare const lintelVSCodeAPI;

/**
 * Lintel Root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  selector: 'lintel-root',
  templateUrl: 'root.html',
  styleUrls: ['root.scss']
})
export class RootPageComponent implements OnInit {
  /** ctor */
  constructor(
    private actions$: Actions,
    private cdf: ChangeDetectorRef,
    public configs: ConfigsState,
    private destroy$: DestroyService,
    public extensions: ExtensionsState,
    public files: FilesState,
    public filter: FilterState,
    private host: ElementRef,
    public params: Params,
    public rules: RulesState,
    public schema: SchemaState,
    public selection: SelectionState
  ) {
    // NOTE: must do files first
    this.files.initialize();
    this.configs.initialize();
    this.extensions.initialize();
    this.rules.initialize();
    this.schema.initialize();
  }

  /** Edit a file */
  editFile(fileName: string): void {
    lintelVSCodeAPI.postMessage({ command: 'editFile', fileName });
  }

  ngOnInit(): void {
    this.handleActions$();
    this.handleSelectionState$();
  }

  // private methods

  private handleActions$(): void {
    // NOTE: trigger change detection on any action
    this.actions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdf.markForCheck();
    });
  }

  private handleSelectionState$(): void {
    this.selection.state$.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      const theScroller = this.host.nativeElement.querySelector('#theScroller');
      theScroller?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }
}
