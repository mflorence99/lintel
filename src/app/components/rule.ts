import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Digest } from '../state/configs';
import { Input } from '@angular/core';
import { Settings } from '../state/configs';

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

  @Input() digest: Digest;

  /** ctor */
  constructor(public configs: ConfigsState) { }

}
