import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

/**
 * Settings component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})

export class SettingsComponent { }
