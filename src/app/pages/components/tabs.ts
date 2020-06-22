import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { EventEmitter } from '@angular/core';
import { FilterState } from '../../state/filter';
import { Output } from '@angular/core';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { SingleselectorComponent } from '../../components/singleselector';
import { ViewChild } from '@angular/core';

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

  @ViewChild(SingleselectorComponent) 
  set more(m: SingleselectorComponent) {
    m?.registerOnChange(this.selectPluginName.bind(this));
  }

  @Output() pluginSelected = new EventEmitter<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              public filter: FilterState,
              public params: Params,
              public selection: SelectionState) { }

  /** Select a plugin */
  selectPluginName(pluginName: string): void {
    if (pluginName !== this.selection.pluginName) {
      this.selection.select({ pluginName });
      this.pluginSelected.emit();
    }
  }

  /** Which plugins go in the tabs, which in the overflow "more..." dropdown? */
  whichPlugins(): any {
    const pluginNames = this.configs.pluginNames
      .filter(pluginName => this.configs.isPluginFiltered(pluginName));
    const inTab = pluginNames.slice(0, this.params.maxNumTabs);
    const inMore = pluginNames.slice(this.params.maxNumTabs);
    return { inTab, inMore };
  }

}
