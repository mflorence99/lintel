import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { SelectionState } from '../state/selection';

/**
 * Tabs component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.scss']
})

export class TabsComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              public selection: SelectionState) { }

  /** Bridge from tab to select a plugin */
  get tabIndex(): number {
    return this.configs.pluginNames
      .findIndex(pluginName => pluginName === this.selection.pluginName);
  }

  /** Bridge from tab to select a plugin */
  onTabSelect(ix: number): void {
    this.selectPluginName(new Event('click'), this.configs.pluginNames[ix]);
  }

  /** Select a plugin */
  selectPluginName(event: Event, pluginName: string): void {
    if (pluginName !== this.selection.pluginName) {
      this.selection.select({ pluginName });
      this.selection.select({ category: this.configs.categories[0] });
    }
    event.stopPropagation();
  }

}
