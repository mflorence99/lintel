import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: FilesStateModel;

export type FilesStateModel = Record<string, string>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilesStateModel>({
  name: 'files',
  defaults: { }
})

export class FilesState extends NgxsDataRepository<FilesStateModel> {

  // actions

  @DataAction({ insideZone: true })
  initialize(): void {
    this.ctx.setState(eslintFiles);
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.snapshot);
  }

  // public methods

  parse(fileName: string): any {
    // TODO: more to come, obviously
    if (fileName === 'package.json')
      return JSON.parse(this.snapshot[fileName])['eslintConfig'];
    else if (fileName.endsWith('.js')) {
      const module: any = { };
      eval(this.snapshot[fileName]);
      return module.exports;
    } else return JSON.parse(this.snapshot[fileName]);
  }

}
