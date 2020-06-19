import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { FilterState } from '../../state/filter';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';

import { takeUntil } from 'rxjs/operators';

/**
 * Filter component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DestroyService],
  selector: 'lintel-filter',
  templateUrl: 'filter.html',
  styleUrls: ['filter.scss']
})

export class FilterComponent implements OnInit {

  filterForm: FormGroup;

  /** ctor */
  constructor(public configs: ConfigsState,
              private destroy$: DestroyService,
              public filter: FilterState,
              private formBuilder: FormBuilder,
              public params: Params,
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

  /** When we're ready */
  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(filterForm => this.filter.filterRuleName(filterForm.filter));
  }

  /** Show or hide inherited rules */
  toggleInheritedRules(): void {
    this.filter.toggleInheritedRules();
  }

}
