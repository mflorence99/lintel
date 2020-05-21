import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
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

  opts = ['browser', 'node', 'commonjs', 'jest', 'es6', 'es2017', 'es2020', 'worker'];
  testForm: FormGroup;

  private notifier = new Subject<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              private formBuilder: FormBuilder) {
    // TODO: all crap
    this.testForm = this.formBuilder.group({
      env: this.configs.configuration.env,
      kv: this.configs.configuration.parserOptions
    });
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.testForm.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe(testForm => this.configs.changeConfiguration(testForm));
  }

}
