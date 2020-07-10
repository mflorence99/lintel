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
  filterRuleName(@Payload('filterRuleName') ruleNameFilter: string): void {
    this.ctx.patchState({ ruleNameFilter });
  }

  @DataAction({ insideZone: true })
  hideInheritedRules(): void {
    this.ctx.patchState({ showInheritedRules: false });
  }

  @DataAction({ insideZone: true })
  showInheritedRules(): void {
    this.ctx.patchState({ showInheritedRules: true });
  }

  @DataAction({ insideZone: true })
  toggleInheritedRules(): void {
    const state = this.ctx.getState();
    this.ctx.patchState({ showInheritedRules: !state.showInheritedRules });
  }

}
