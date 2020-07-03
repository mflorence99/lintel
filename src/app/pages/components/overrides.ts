import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { DestroyService } from '../../services/destroy';
import { ExtensionsState } from '../../state/extensions';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LintelState } from '../../state/lintel';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';
import { ViewChild } from '@angular/core';

import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

declare const lintelVSCodeAPI;

/**
 * Overrides is complicated, so separate it from general.ts
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DestroyService],
  selector: 'lintel-overrides',
  templateUrl: 'overrides.html',
  styleUrls: ['overrides.scss']
})

export class OverridesComponent implements OnInit {

  @ViewChild(ContextMenuComponent, { static: true }) contextMenu: ContextMenuComponent;

  overridesForm: FormGroup;

  private underConstruction: boolean;

  /** ctor */
  constructor(private actions$: Actions,
              public configs: ConfigsState,
              private contextMenuService: ContextMenuService,
              private destroy$: DestroyService,
              public extensions: ExtensionsState,
              private formBuilder: FormBuilder,
              public lintel: LintelState,
              public schema: SchemaState,
              public selection: SelectionState) {
    this.overridesForm = this.formBuilder.group({
      files: new FormArray([])
    });
    // rebuild form on selection changes
    this.handleActions$();
  }

  /** Execute context menu command */
  execute(ix: number, command: string): void {
    switch (command) {

      case 'add':
        this.configs.addOverride();
        break;

      case 'delete':
        if (!this.configs.isOverrideEmpty(ix))
          lintelVSCodeAPI.postMessage({ command: 'deleteOverride', override: ix, text: 'This override contains rules and other settings. Are you sure you want to delete it?' });
        else this.configs.deleteOverride({ ix });
        break;

    }
  }

  /** When we're ready */
  ngOnInit(): void {
    this.overridesForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.destroy$)
      ).subscribe(changes => this.configs.changeOverrideFiles(changes));
    this.rebuildControls();
  }

  /** Show the context menu manually (on left click) */
  showContextMenu(event: MouseEvent, ix: number): void {
    // @see https://www.npmjs.com/package/ngx-contextmenu
    this.contextMenuService.show.next({ event, item: ix });
    event.preventDefault();
    event.stopPropagation();
  }

  // private methods

  private handleActions$(): void {
    this.actions$
      .pipe(
        filter(({ action, status }) => action.override && (status === 'SUCCESSFUL')),
        takeUntil(this.destroy$)
      )
      // NOTE: deferring the rebuild until the action is complete (add or delete)
      // is necessary becausse delete may be asynchonous if a confirm is required
      .subscribe(_ => this.rebuildControls());
  }

  private rebuildControls(): void {
    this.underConstruction = true;
    const values = this.configs.configuration.overrides?.map(override => override.files) ?? [];
    const files = this.overridesForm.controls.files as FormArray;
    while (files.length > values.length)
      files.removeAt(files.length - 1);
    while (files.length < values.length)
      files.push(new FormControl(null));
    // TODO: we don't know why { emitEvent: false } doesn't work
    files.patchValue([...values], { emitEvent: false });
    this.underConstruction = false;
  }

}
