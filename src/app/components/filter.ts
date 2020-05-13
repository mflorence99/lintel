import { Component } from '@angular/core';
import { FilterState } from '../state/filter';

/**
 * Filter component
 */

@Component({
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})

export class FilterComponent {

  /** ctor */
  constructor(public filter: FilterState) { }

  /** Filter rule names */
  filterRuleName(event: any): void {
    this.filter.filterRuleName(event.target.value);
  }

}
