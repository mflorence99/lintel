import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';

/**
 * Settings component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})

export class SettingsComponent { 

  /** ctor */
  constructor(public configs: ConfigsState,
              public params: Params,
              public selection: SelectionState) { }

}
