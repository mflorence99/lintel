import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { ElementRef } from '@angular/core';
import { FilterCallback } from '../../state/filter';
import { FilterState } from '../../state/filter';
import { OnInit } from '@angular/core';
import { SelectionState } from '../../state/selection';
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

export class FilterComponent implements OnInit {

  @ViewChild('input', { static: true }) input: ElementRef;

  /** ctor */
  constructor(public configs: ConfigsState,
              public filter: FilterState,
              public selection: SelectionState) { }

  /** Clear the rule name filter */
  clearRuleNameFilter(): void {
    this.filter.filterRuleName(null);
    this.input.nativeElement.value = null;
  }

  /** Filter rule names */
  filterRuleName(ruleNameFilter: string, done?: FilterCallback): void {
    this.filter.filterRuleName(ruleNameFilter, () => {
      // NOTE: this facilitates testing
      done?.();
    });
  }

  /** When we're readt */
  ngOnInit(): void {
    this.input.nativeElement.value = this.filter.ruleNameFilter || '';
  }

  /** Show or hide inherited rules */
  toggleInheritedRules(done?: FilterCallback): void {
    this.filter.toggleInheritedRules(() => {
      // NOTE: this facilitates testing
      done?.();
    });
  }

}
