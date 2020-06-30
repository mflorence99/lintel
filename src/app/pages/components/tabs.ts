import { AfterViewChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FilterState } from '../../state/filter';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { SingleselectorComponent } from '../../components/singleselector';
import { Utils } from '../../services/utils';
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

export class TabsComponent implements AfterViewChecked {

  @ViewChild(SingleselectorComponent) 
  set more(m: SingleselectorComponent) {
    m?.registerOnChange(this.selectPluginName.bind(this));
  }

  /** ctor */
  constructor(public configs: ConfigsState,
              public filter: FilterState,
              public params: Params,
              public selection: SelectionState,
              public utils: Utils) { }

  /** On every change detection */
  ngAfterViewChecked(): void {
    // NOTE: the base plugin is always available
    if (this.selection.pluginName !== this.params.basePluginName) {
      const pluginNames = this.configs.pluginNames
        .filter(pluginName => this.configs.isPluginFiltered(pluginName));
      // if the selected plugin is no longer available, pick one that is
      if (!pluginNames.includes(this.selection.pluginName))
        this.utils.nextTick(() => this.selection.select({ pluginName: pluginNames[pluginNames.length - 1]}));
    }
  }

  /** Select a plugin */
  selectPluginName(pluginName: string): boolean {
    if (pluginName !== this.selection.pluginName) {
      this.selection.select({ pluginName });
      return true;
    } else return false;
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
