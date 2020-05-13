import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Input } from '@angular/core';
import { SchemasState } from '../state/schemas';

/**
 * Rule component
 */

@Component({
  selector: 'lintel-rule',
  templateUrl: 'rule.html',
  styleUrls: ['rule.scss']
})

export class RuleComponent {

  @Input() ruleName: string;

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState) { }

}
