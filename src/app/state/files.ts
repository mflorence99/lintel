import * as CommentJSON from '../comment-json';
import * as jsyaml from 'js-yaml';

import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

import { patch } from '@ngxs/store/operators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;

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

  private fileType: 'js' | 'json' | 'package' | 'yaml';

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeConfiguration(@Payload('replacements') { fileName, replacement }): void {
    switch (this.fileType) {
      case 'js':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch(replacement) }) }));
        // TODO: need to update AST
        break;
      case 'json':
        // TODO: need to preserve comments
        console.log('%cchangeConfiguration()', 'color: red', { fileName, replacement });
        break;
      case 'package':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch(replacement) }) }) }));
        break;
      case 'yaml':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch(replacement) }) }));
        break;
    }
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeRule(@Payload('replacements') { fileName, ruleName, replacement }): void {
    switch (this.fileType) {
      case 'js':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: patch({ [ruleName]: replacement }) }) }) }));
        // TODO: need to update AST
        break;
      case 'json':
        // TODO: need to preserve comments
        console.log('%cchangeRule()', 'color: red', { fileName, ruleName, replacement });
        break;
      case 'package':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch({ rules: patch({ [ruleName]: replacement }) }) }) }) }));
        break;
      case 'yaml':
        this.ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: patch({ [ruleName]: replacement }) }) }) }));
        break;
    }
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    this.ctx.setState({
      files: eslintFiles,
      objects: this.parse(eslintFiles)
    });
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.snapshot.objects);
  }

  // public methods

  load(fileName: string): any {
    switch (this.fileType) {
      case 'package':
        return this.utils.deepCopy(this.snapshot.objects[fileName]['eslintConfig']);
      default:
        return this.utils.deepCopy(this.snapshot.objects[fileName]);
    }
  }

  save(fileName: string): void {
    console.log('%csave()', 'color: blue', { fileName });
  }

  // private methods

  private parse(files: Record<string, string>): Record<string, any> {
    return Object.keys(files)
      .reduce((objects, fileName) => {
        objects[fileName] = this.parseImpl(fileName, eslintFiles[fileName]);
        return objects;
      }, { });
  }

  private parseImpl(fileName: string, source: string): any {
    if (fileName === 'package.json') {
      this.fileType = 'package';
      return JSON.parse(source);
    } else if (fileName.endsWith('.js')) {
      this.fileType = 'js';
      const module: any = { };
      eval(source);
      return module.exports;
    } else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml')) {
      this.fileType = 'yaml';
      return jsyaml.safeLoad(source); 
    } else {
      this.fileType = 'json';
      return CommentJSON.parse(source);
    }
  }

}
