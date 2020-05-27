import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { Utils } from '../../services/utils';

/**
 * Configs component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-configs',
  templateUrl: 'configs.html',
  styleUrls: ['configs.scss']
})

export class ConfigsComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public params: Params,
              public selection: SelectionState,
              public utils: Utils) { 
    this.selection.select({ fileName: this.configs.fileNames[0] });
    this.selection.select({ pluginName: this.configs.pluginNames[0] });
    this.selection.select({ category: this.params.generalSettings });
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
      this.selection.select({ fileName: null });
      // TODO: this trick forces us to rebuild when fileName changes
      this.utils.nextTick(() => this.selection.select({ fileName }));
    }
    event.stopPropagation();
  }

}
