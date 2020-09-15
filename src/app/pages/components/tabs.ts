import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { FilterState } from '../../state/filter';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { SingleselectorComponent } from '../../components/singleselector';
import { Utils } from '../../services/utils';

import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

/**
 * Tabs component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DestroyService],
  selector: 'lintel-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.scss']
})
export class TabsComponent {
  @ViewChild(SingleselectorComponent)
  set more(m: SingleselectorComponent) {
    m?.registerOnChange(this.selectPluginName.bind(this));
  }

  /** ctor */
  constructor(
    private actions$: Actions,
    public configs: ConfigsState,
    private destroy$: DestroyService,
    public filter: FilterState,
    public params: Params,
    public selection: SelectionState,
    public utils: Utils
  ) {
    this.handleActions$();
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
    const pluginNames = this.configs.pluginNames.filter((pluginName) =>
      this.configs.isPluginFiltered(pluginName)
    );
    const inTab = pluginNames.slice(0, this.params.maxNumTabs);
    const inMore = pluginNames.slice(this.params.maxNumTabs);
    return { inTab, inMore };
  }

  // private methods

  private handleActions$(): void {
    this.actions$
      .pipe(
        filter(({ status }) => status === 'SUCCESSFUL'),
        takeUntil(this.destroy$)
      )
      .subscribe((_) => {
        // NOTE: the base plugin is always available
        if (this.selection.pluginName !== this.params.basePluginName) {
          const pluginNames = this.configs.pluginNames.filter((pluginName) =>
            this.configs.isPluginFiltered(pluginName)
          );
          // if the selected plugin is no longer available, pick one that is
          if (!pluginNames.includes(this.selection.pluginName))
            this.selection.select({ pluginName: this.params.basePluginName });
        }
      });
  }
}
