import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { Params } from '../services/params';
import { SelectionState } from '../state/selection';
import { View } from '../state/configs';

import { isObjectEmpty } from '../utils';

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
              public selection: SelectionState) { 
    this.selection.select({ fileName: this.configs.fileNames[0] });
    this.selection.select({ pluginName: this.configs.pluginNames[0] });
    this.selection.select({ category: this.params.generalSettings });
  }

  /** Does the view have any rules? */
  hasRules(view: View): boolean {
    return !isObjectEmpty(view);
  }

  /** Select a category */
  selectCategory(event: Event, category: string): void {
    if (category !== this.selection.category)
      this.selection.select({ category });
    event.stopPropagation();
  }

  /** Select a file name */
  selectFileName(event: Event, fileName: string): void {
    if (fileName !== this.selection.fileName) 
      this.selection.select({ fileName });
    event.stopPropagation();
  }

}
