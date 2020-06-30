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

  controls: FormControl[] = [];

  overridesForm: FormGroup;

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              public extensions: ExtensionsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState,
              public selection: SelectionState) {
    // TODO: temporary
    this.controls = this.configs.configuration.overrides?.map(override => new FormControl([...override.files])) ?? [];

    this.overridesForm = this.formBuilder.group({
      files: new FormArray(this.controls)
    });
  }

  /** When we're ready */
  ngOnInit(): void {
    this.overridesForm.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(changes => this.configs.changeOverrides(changes));
  }


}
