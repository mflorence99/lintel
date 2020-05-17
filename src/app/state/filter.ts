import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Debounce } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

export type FilterCallback = () => void;

export interface FilterStateModel {
  ruleNameFilter?: string;
  showInheritedRules?: boolean;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilterStateModel>({
  name: 'filter',
  defaults: { 
    showInheritedRules: true
  }
})

export class FilterState extends NgxsDataRepository<FilterStateModel> {

  // actions

  @DataAction({ insideZone: true })
  @Debounce(globalThis.debounceTimeout)
  filterRuleName(@Payload('filterRuleName') ruleNameFilter: string, done?: FilterCallback): void {
    this.ctx.patchState({ ruleNameFilter });
    done?.();
  }

  @DataAction({ insideZone: true })
  @Debounce(globalThis.debounceTimeout)
  toggleInheritedRules(done?: FilterCallback): void {
    const state = this.ctx.getState();
    this.ctx.patchState({ showInheritedRules: !state.showInheritedRules });
    done?.();
  }

  // accessors

  @Computed() get ruleNameFilter(): string {
    return this.snapshot.ruleNameFilter;
  }

}
