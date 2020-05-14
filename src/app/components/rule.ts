import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Input } from '@angular/core';
import { Rule } from '../state/schemas';
import { SchemasState } from '../state/schemas';

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

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState) { }

}
