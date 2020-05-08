import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemasStateModel;

export interface Scheme {
  [rule: string]: { meta: any };
}

export interface Schema {
  schema: Schema;
  version: string;
}

export interface SchemasStateModel {
  [extension: string]: Schema;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SchemasStateModel>({
  name: 'schemas',
  defaults: { }
}) 

export class SchemasState extends NgxsImmutableDataRepository<SchemasStateModel> {

  @DataAction() initialize(): void {
    this.ctx.setState(eslintSchema);
  }

}
