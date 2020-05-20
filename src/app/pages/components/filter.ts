import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FilterState } from '../../state/filter';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SelectionState } from '../../state/selection';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

/**
 * Filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})

export class FilterComponent implements OnDestroy, OnInit {

  filterForm: FormGroup;

  private notifier = new Subject<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              public filter: FilterState,
              private formBuilder: FormBuilder,
              public selection: SelectionState) { 
    // create the filter form
    this.filterForm = this.formBuilder.group({
      filter: this.filter.snapshot.ruleNameFilter
    });
  }

  /** Clear the rule name filter */
  clearRuleNameFilter(): void {
    this.filter.filterRuleName(null);
    this.filterForm.setValue({ filter: null });
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe(filterForm => this.filter.filterRuleName(filterForm.filter));
  }

  /** Show or hide inherited rules */
  toggleInheritedRules(): void {
    this.filter.toggleInheritedRules();
  }

}
