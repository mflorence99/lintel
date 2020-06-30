import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { ExtensionsState } from '../../state/extensions';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';

import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

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

  overridesForm: FormGroup;

  private underConstruction: boolean;

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              public extensions: ExtensionsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState,
              public selection: SelectionState) {
    this.overridesForm = this.formBuilder.group({
      files: new FormArray([])
    });
    // rebuild form on selection changes
    this.handleSelectionState$();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.overridesForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.destroy$)
      ).subscribe(changes => this.configs.changeOverrides(changes));
  }

  // private methods

  private handleSelectionState$(): void {
    this.selection.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.underConstruction = true;
        // TODO: temporary
        const values = this.configs.configuration.overrides?.map(override => override.files) ?? [];
        const files = this.overridesForm.controls.files as FormArray;
        while (files.length > values.length)
          files.removeAt(files.length - 1);
        while (files.length < values.length)
          files.push(new FormControl(null));
        // TODO: we don't know why { emitEvent: false } doesn't work
        files.patchValue([...values], { emitEvent: false });
        this.underConstruction = false;
      });
  }

}
