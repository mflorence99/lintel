import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

export interface SelectionStateModel {
  category?: string;
  fileName?: string;
  pluginName?: string;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SelectionStateModel>({
  name: 'selection',
  defaults: { }
})

export class SelectionState extends NgxsImmutableDataRepository<SelectionStateModel> {

  @Computed() get category(): string {
    return this.snapshot.category;
  }

  @Computed() get fileName(): string {
    return this.snapshot.fileName;
  }

  @Computed() get pluginName(): string {
    return this.snapshot.pluginName;
  }

  @DataAction({ insideZone: true }) 
  select(@Payload('selection') selection: SelectionStateModel): void {
    this.ctx.patchState(selection);
  }

}
