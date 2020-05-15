import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Input } from '@angular/core';
import { Rule } from '../state/schemas';
import { Setting } from '../state/configs';

/**
 * Rule component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-rule',
  templateUrl: 'rule.html',
  styleUrls: ['rule.scss']
})

export class RuleComponent {

  @Input() rule: Rule;
  @Input() ruleName: string;
  @Input() setting: Setting;

  /** ctor */
  constructor(public configs: ConfigsState) { }

  // TODO: temporary
  get level(): string {
    if (!this.setting || this.setting === 'off')
      return 'off';
    else return Array.isArray(this.setting) ? this.setting[0] : this.setting;
  }

}
