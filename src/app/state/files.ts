import * as json5 from 'json5';
import * as jsyaml from 'js-yaml';

import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;

declare const JSON5: typeof json5;

export interface FilesStateModel {
  files: Record<string, string>;
  objects: Record<string, any>;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilesStateModel>({
  name: 'files',
  defaults: { 
    files: { },
    objects: { }
  }
})

export class FilesState extends NgxsDataRepository<FilesStateModel> {

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeConfiguration(@Payload('changes') { changes, fileName }): void {
    // TODO: what we do here will vary by JSON, YAML or JS
    console.log({ changes, fileName });
  }

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeRule(@Payload('changes') { changes, fileName, ruleName }): void {
    // TODO: what we do here will vary by JSON, YAML or JS
    console.log({ changes, fileName, ruleName });
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    this.ctx.setState({
      files: eslintFiles,
      objects: this.parseFiles(eslintFiles)
    });
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.snapshot.objects);
  }

  // public methods

  parse(fileName: string): any {
    return this.utils.deepCopy(this.snapshot.objects[fileName]);
  }

  // private methods

  private parseFiles(files: Record<string, string>): Record<string, any> {
    return Object.keys(files)
      .reduce((objects, fileName) => {
        objects[fileName] = this.parseFilesImpl(fileName, eslintFiles[fileName]);
        return objects;
      }, { });
  }

  private parseFilesImpl(fileName: string, source: string): any {
    if (fileName === 'package.json')
      return JSON.parse(source)['eslintConfig'];
    else if (fileName.endsWith('.js')) {
      const module: any = { };
      eval(source);
      return module.exports;
    } else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml')) {
      return jsyaml.load(source); 
    } else return JSON5.parse(source);
  }

}
