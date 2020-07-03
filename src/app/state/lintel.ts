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

export interface LintelStateModel {
  enabled: boolean;
  message: string;
  unique: number;
}

@Injectable({ providedIn: 'root' })
@Persistence({ useClass: StorageService })
@StateRepository()
@State<LintelStateModel>({
  name: 'lintel',
  defaults: {
    enabled: true,
    message: null,
    unique: 1
  }
})

export class LintelState extends NgxsDataRepository<LintelStateModel> {

  // actions

  @DataAction({ insideZone: true })
  enable(@Payload('enable') { enabled, message }): void {
    this.ctx.setState(patch({ enabled, message }));
  }

  // accessors

  @Computed() get isEnabled(): boolean {
    return this.snapshot.enabled;
  }

  @Computed() get message(): string {
    return this.snapshot.message;
  }

  @Computed() get unique(): number {
    const unique = this.ctx.getState().unique;
    this.ctx.setState(patch({ unique: unique + 1 }));
    return unique;
  }

}
