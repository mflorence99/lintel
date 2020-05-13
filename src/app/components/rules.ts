import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { SchemasState } from '../state/schemas';
import { SelectionState } from '../state/selection';

/**
 * Rules component
 */

@Component({
  selector: 'lintel-rules',
  templateUrl: 'rules.html',
  styleUrls: ['rules.scss']
})

export class RulesComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState,
              public selection: SelectionState) { }

}
