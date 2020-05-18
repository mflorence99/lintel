import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { Digest } from '../../state/configs';
import { Input } from '@angular/core';

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

  /** Clean up the descripton to make it look like a sentence */
  sentence(description: string): string {
    if (!description)
      return null;
    const tweaked = description.substring(0, 1).toUpperCase() + description.substring(1);
    return tweaked.endsWith('.') ? tweaked : `${tweaked}.`;
  }

}
