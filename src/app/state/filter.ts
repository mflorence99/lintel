import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Debounce } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

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

  @DataAction()
  clearRuleNameFilter(): void {
    this.ctx.patchState({ ruleNameFilter: null });
  }

  @DataAction()
  @Debounce()
  filterRuleName(@Payload('filterRuleName') ruleNameFilter: string): void {
    this.ctx.patchState({ ruleNameFilter });
  }

  @Computed() get ruleNameFilter(): string {
    return this.snapshot.ruleNameFilter;
  }

  isRuleNameFiltered(ruleName: string): boolean {
    return !this.ruleNameFilter || ruleName.includes(this.ruleNameFilter);
  }

}
