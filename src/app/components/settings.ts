import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { SelectionState } from '../state/selection';

import { config } from '../config';

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

  activeCategory = config.activeCategory;
  unknownCategory = config.unknownCategory;

  /** ctor */
  constructor(public configs: ConfigsState,
              public selection: SelectionState) { }

}
