import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { FilterState } from '../../state/filter';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { Utils } from '../../services/utils';

import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

/**
 * Filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  /** ctor */
  constructor(
    private actions$: Actions,
    private cdf: ChangeDetectorRef,
    public configs: ConfigsState,
    private destroy$: DestroyService,
    public filter: FilterState,
    private formBuilder: FormBuilder,
    public params: Params,
    public selection: SelectionState,
    private utils: Utils
  ) {
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

  /** When we're ready */
  ngOnInit(): void {
    this.handleActions$();
    this.handleValueChanges$();
  }

  /** Show or hide inherited rules */
  toggleInheritedRules(): void {
    this.filter.toggleInheritedRules();
  }

  // private methods

  private handleActions$(): void {
    this.actions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // this.cdf.markForCheck();
    });
  }

  private handleValueChanges$(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterForm) => this.filter.filterRuleName(filterForm.filter));
  }
}
