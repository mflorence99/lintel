import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { Rule } from './schemas';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

export interface SelectionStateModel {
  category?: string;
  fileName?: string;
  pluginName?: string;
  view?: Record<string, Rule>;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SelectionStateModel>({
  name: 'selection',
  defaults: { }
})

export class SelectionState extends NgxsImmutableDataRepository<SelectionStateModel> {

  // actions

  @DataAction({ insideZone: true }) 
  select(@Payload('selection') selection: SelectionStateModel): void {
    this.ctx.patchState(selection);
  }

  // accessors

  @Computed() get category(): string {
    return this.snapshot.category;
  }

  @Computed() get fileName(): string {
    return this.snapshot.fileName;
  }

  @Computed() get pluginName(): string {
    return this.snapshot.pluginName;
  }

  @Computed() get view(): Record<string, Rule> {
    return this.snapshot.view as Record<string, Rule>;
  }

}
