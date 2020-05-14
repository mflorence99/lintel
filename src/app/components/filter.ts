import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FilterCallback } from '../state/filter';
import { FilterState } from '../state/filter';
import { SchemasState } from '../state/schemas';
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
  constructor(public filter: FilterState,
              public schemas: SchemasState,
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
      if (!this.schemas.categories.includes(this.selection.category))
        this.selection.select({ category: this.schemas.categories[0] });
      done?.();
    });
  }

}
