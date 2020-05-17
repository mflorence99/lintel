import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Debounce } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

export type FilterCallback = () => void;

export interface FilterStateModel {
  ruleNameFilter?: string;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilterStateModel>({
  name: 'filter',
  defaults: { }
})

export class FilterState extends NgxsImmutableDataRepository<FilterStateModel> {

  // actions

  @DataAction({ insideZone: true })
  @Debounce(globalThis.debounceTimeout)
  filterRuleName(@Payload('filterRuleName') ruleNameFilter: string, done?: FilterCallback): void {
    this.ctx.patchState({ ruleNameFilter });
    done?.();
  }

  // accessors

  @Computed() get ruleNameFilter(): string {
    return this.snapshot.ruleNameFilter;
  }

  // public methods

  isRuleNameFiltered(ruleName: string): boolean {
    return !this.ruleNameFilter || ruleName.includes(this.ruleNameFilter);
  }

}
