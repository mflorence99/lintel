import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { EventEmitter } from '@angular/core';
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

  inMore: string[] = [];
  inTab: string[] = [];

  @ViewChild(SingleselectorComponent) 
  set more(m: SingleselectorComponent) {
    m?.registerOnChange(this.selectPluginName.bind(this));
  }

  @Output() pluginSelected = new EventEmitter<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              public params: Params,
              public selection: SelectionState) { 
    this.inTab = this.configs.pluginNames.slice(0, this.params.maxNumTabs);
    this.inMore = this.configs.pluginNames.slice(this.params.maxNumTabs);
  }

  /** Select a plugin */
  selectPluginName(pluginName: string): void {
    if (pluginName !== this.selection.pluginName) {
      this.selection.select({ pluginName });
      this.pluginSelected.emit();
    }
  }

}
