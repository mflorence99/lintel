import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SchemaState } from '../../state/schema';
import { Subject } from 'rxjs';

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

  generalForm: FormGroup;

  properties = ['root', 'ignorePatterns'];

  private notifier = new Subject<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              private formBuilder: FormBuilder,
              public schema: SchemaState) {
    this.generalForm = this.formBuilder.group({
      root: this.configs.configuration.root
    });
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.generalForm.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe(generalForm => this.configs.changeConfiguration(generalForm));
  }

}
