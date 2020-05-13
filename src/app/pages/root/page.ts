import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { SchemasState } from '../../state/schemas';
import { SelectionState } from '../../state/selection';

/**
 * Lintel Root
 */

@Component({
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState,
              public selection: SelectionState) {
    this.configs.initialize();
    this.schemas.initialize();
  }

}
