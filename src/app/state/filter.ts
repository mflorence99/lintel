import { StorageService } from '../services/storage';

import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { Persistence } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

export interface FilterStateModel {
  ruleNameFilter?: string;
  showInheritedRules?: boolean;
}

@Injectable({ providedIn: 'root' })
@Persistence({ useClass: StorageService })
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
  filterRuleName(
    @Payload('FilterState.filterRuleName') ruleNameFilter: string
  ): void {
    this.ctx.patchState({ ruleNameFilter });
  }

  @DataAction({ insideZone: true })
  showInheritedRules(
    @Payload('FilterState.showInheritedRules') state: boolean
  ): void {
    this.ctx.patchState({ showInheritedRules: state });
  }

  // public methods

  toggleInheritedRules(): void {
    const state = this.snapshot.showInheritedRules;
    this.showInheritedRules(!state);
  }
}
