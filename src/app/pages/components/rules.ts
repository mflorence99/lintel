import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { Input } from '@angular/core';
import { RulesState } from '../../state/rules';
import { SelectionState } from '../../state/selection';
import { Utils } from '../../services/utils';
import { View } from '../../state/configs';

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
              public rules: RulesState,
              public selection: SelectionState,
              public utils: Utils) { }

  /** Track ngFor by rule name */
  trackByRule(_, item): string {
    return item.key;
  }

}
