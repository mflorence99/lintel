import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { Persistence } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { StorageService } from '../services/storage';

export interface LintelStateModel {
  enabled: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
@Persistence({ useClass: StorageService })
@StateRepository()
@State<LintelStateModel>({
  name: 'kintel',
  defaults: {
    enabled: true,
    message: null
  }
})

export class LintelState extends NgxsDataRepository<LintelStateModel> {

  // actions

  @DataAction({ insideZone: true })
  enable(@Payload('enable') { enabled, message }): void {
    this.ctx.setState({ enabled, message });
  }

  // accessors

  @Computed() get isEnabled(): boolean {
    return this.snapshot.enabled;
  }

  @Computed() get message(): string {
    return this.snapshot.message;
  }

}
