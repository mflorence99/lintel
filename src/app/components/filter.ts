import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FilterState } from '../state/filter';
import { ViewChild } from '@angular/core';

/**
 * Filter component
 */

@Component({
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})

export class FilterComponent {

  @ViewChild('input', { static: true }) input: ElementRef;

  /** ctor */
  constructor(public filter: FilterState) { }

  /** Clear the rule name filter */
  clearRuleNameFilter(): void {
    this.filter.clearRuleNameFilter();
    this.input.nativeElement.value = null;
  }

  /** Filter rule names */
  filterRuleName(ruleNameFilter: string): void {
    this.filter.filterRuleName(ruleNameFilter);
  }

}
