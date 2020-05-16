import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Input } from '@angular/core';
import { SelectionState } from '../state/selection';
import { View } from '../state/configs';

import { isObjectEmpty } from '../utils';

/**
 * Rules component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-rules',
  templateUrl: 'rules.html',
  styleUrls: ['rules.scss']
})

export class RulesComponent {

  @Input() view: View;

  /** ctor */
  constructor(public configs: ConfigsState,
              public selection: SelectionState) { }

  /** Does the view have any rules? */
  hasRules(): boolean {
    return !isObjectEmpty(this.view);
  }

  /** Track ngFor by rule name */
  trackByRule(_, item): string {
    return item.key;
  }

}
