import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

// NOTE: schema content is provided statically in index.html
declare const eslintSchema: SchemaStateModel;

export interface SchemaStateModel {
  definitions: any;
  properties: any;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<SchemaStateModel>({
  name: 'schema',
  defaults: { 
    definitions: { },
    properties: { }
  }
})

export class SchemaState extends NgxsDataRepository<SchemaStateModel> {

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  initialize(): void {
    this.ctx.setState(this.resolve$refs(eslintSchema));
  }

  // private methods

  private resolve$refs(eslintSchema: SchemaStateModel): SchemaStateModel {
    const model = this.utils.deepCopy(eslintSchema);
    Object.entries(model)
      .forEach(([_, obj]) => {
        // resolve $ref with definitions within the model
        this.utils.deepSearch(obj, '$ref', (container, value: string) => {
          const path = value.replace(/#/g, 'model').replace(/\//g, '.');
          const resolved = eval(path);
          delete container['$ref'];
          Object.assign(container, resolved);
        });
      });
    return model;
  }

}
