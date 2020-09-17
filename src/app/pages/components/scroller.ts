import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

/**
 * Scroller component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lintel-scroller',
  templateUrl: 'scroller.html',
  styleUrls: ['scroller.scss']
})
export class ScrollerComponent {}
