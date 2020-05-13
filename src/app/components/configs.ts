import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { SchemasState } from '../state/schemas';
import { SelectionState } from '../state/selection';

/**
 * Configs component
 */

@Component({
  selector: 'lintel-configs',
  templateUrl: 'configs.html',
  styleUrls: ['configs.scss']
})

export class ConfigsComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState,
              public selection: SelectionState) { 
    this.selectFileName(new Event('click'), this.configs.fileNames[0]);
  }

  /** Select a category */
  selectCategory(event: Event, category: string): void {
    if (category !== this.selection.category)
      this.selection.select({ category });
    event.stopPropagation();
  }

  /** Select a file name */
  selectFileName(event: Event, fileName: string): void {
    if (fileName !== this.selection.fileName) {
      this.selection.select({ fileName });
      this.selection.select({ pluginName: this.configs.pluginNames[0] });
      this.selection.select({ category: this.schemas.categories[0] });
    }
    event.stopPropagation();
  }

}
