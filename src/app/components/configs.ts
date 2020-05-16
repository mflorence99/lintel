import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { SelectionState } from '../state/selection';
import { View } from '../state/configs';

import { config } from '../config';
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

  activeCategory = config.activeCategory;
  unknownCategory = config.unknownCategory;

  /** ctor */
  constructor(public configs: ConfigsState,
              public selection: SelectionState) { 
    this.selection.select({ fileName: this.configs.fileNames[0] });
    this.selection.select({ pluginName: this.configs.pluginNames[0] });
    this.selection.select({ category: config.activeCategory });
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
