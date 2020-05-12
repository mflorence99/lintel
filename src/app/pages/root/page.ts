import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { SchemasState } from '../../state/schemas';
import { SelectionState } from '../../state/selection';
import { SelectionStateModel } from '../../state/selection';

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
    // crap
    this.selection.select({ fileName: 'package.json' });
    this.selection.select({ pluginName: 'eslint' });
  }

  /** Select a file name */
  select(event: Event, state: SelectionStateModel): void {
    this.selection.select(state);
    // crap
    this.selection.select({ pluginName: this.configs.pluginNames[0] });
    event.stopPropagation();
  }

}
