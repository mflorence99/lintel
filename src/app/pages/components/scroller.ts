import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

/**
 * Scroller component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-scroller',
  templateUrl: 'scroller.html',
  styleUrls: ['scroller.scss']
})
export class ScrollerComponent {}
