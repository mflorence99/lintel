import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { Params } from '../../services/params';
import { SchemasState } from '../../state/schemas';
import { SelectionState } from '../../state/selection';

/**
 * Lintel Root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public params: Params,
              public schemas: SchemasState,
              public selection: SelectionState) {
    this.configs.initialize();
    this.schemas.initialize();
  }

}
