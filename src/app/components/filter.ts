import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { ElementRef } from '@angular/core';
import { FilterCallback } from '../state/filter';
import { FilterState } from '../state/filter';
import { SelectionState } from '../state/selection';
import { ViewChild } from '@angular/core';

/**
 * Filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})

export class FilterComponent {

  @ViewChild('input', { static: true }) input: ElementRef;

  /** ctor */
  constructor(public configs: ConfigsState,
              public filter: FilterState,
              public selection: SelectionState) { }

  /** Clear the rule name filter */
  clearRuleNameFilter(): void {
    this.filter.clearRuleNameFilter();
    this.input.nativeElement.value = null;
  }

  /** Filter rule names */
  filterRuleName(ruleNameFilter: string, done?: FilterCallback): void {
    this.filter.filterRuleName(ruleNameFilter, () => {
      // if the currently-selected category is now empty, reset selection
      if (!this.configs.categories.includes(this.selection.category))
        this.selection.select({ category: this.configs.categories[0] });
      done?.();
    });
  }

}
