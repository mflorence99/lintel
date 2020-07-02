import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { Persistence } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { StorageService } from '../services/storage';

import { patch } from '@ngxs/store/operators';

export interface SelectionStateModel {
  category?: string;
  fileName?: string;
  override?: number;
  overrideFiles?: string[];
  pluginName?: string;
}

@Injectable({ providedIn: 'root' })
@Persistence({ useClass: StorageService })
@StateRepository()
@State<SelectionStateModel>({
  name: 'selection',
  defaults: { }
})

export class SelectionState extends NgxsDataRepository<SelectionStateModel> {

  // actions

  @DataAction({ insideZone: true }) 
  select(@Payload('selection') selection: SelectionStateModel): void {
    this.ctx.setState(patch(selection));
  }

  // accessors

  @Computed() get category(): string {
    return this.snapshot.category;
  }

  @Computed() get fileName(): string {
    return this.snapshot.fileName;
  }

  @Computed() get override(): number {
    return this.snapshot.override;
  }

  @Computed() get overrideFiles(): string[] {
    return this.snapshot.overrideFiles;
  }

  @Computed() get pluginName(): string {
    return this.snapshot.pluginName;
  }

}
