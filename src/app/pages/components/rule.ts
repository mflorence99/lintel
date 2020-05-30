import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { RuleDigest } from '../../state/configs';
import { RulesState } from '../../state/rules';
import { Settings } from '../../state/configs';
import { Subject } from 'rxjs';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

/**
 * Rule component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-rule',
  templateUrl: 'rule.html',
  styleUrls: ['rule.scss']
})

export class RuleComponent implements OnInit, OnDestroy {

  @Input() 
  get ruleDigest(): RuleDigest {
    return this._ruleDigest;
  }
  set ruleDigest(ruleDigest: RuleDigest) {
    this._ruleDigest = ruleDigest;
    if (ruleDigest) {
      this.underConstruction = true;
      this.ruleForm.patchValue({ level: ruleDigest.level }, { emitEvent: false });
      this.underConstruction = false;
    }
  }

  ruleForm: FormGroup;

  private _ruleDigest: RuleDigest;
  private notifier = new Subject<void>();
  private underConstruction: boolean;

  /** ctor */
  constructor(public configs: ConfigsState,
              private formBuilder: FormBuilder,
              public rules: RulesState) { 
    this.ruleForm = this.formBuilder.group({
      level: null
    });
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.ruleForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        map(changes => [changes.level]),
        takeUntil(this.notifier)
      ).subscribe((changes: Settings) => this.configs.changeRule(changes, this.ruleDigest.ruleName));
  }

}
