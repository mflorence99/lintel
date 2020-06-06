import * as CommentJSON from '../comment-json';
import * as jsyaml from 'js-yaml';

import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { DataStateContext } from '@ngxs-labs/data/typings';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

import { patch } from '@ngxs/store/operators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;
declare const lintelVSCodeAPI;

export interface FilesStateModel {
  files: Record<string, string>;
  implementations: Record<string, ESLintFile>;
  objects: Record<string, any>;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilesStateModel>({
  name: 'files',
  defaults: { 
    files: eslintFiles,
    implementations: { },
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
    this.snapshot.implementations[fileName].changeConfiguration(this.ctx, fileName, replacement);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeRule(@Payload('replacements') { fileName, ruleName, replacement }): void {
    this.snapshot.implementations[fileName].changeRule(this.ctx, fileName, ruleName, replacement);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    const implementations = Object.keys(eslintFiles)
      .reduce((impls, fileName) => {
        impls[fileName] = ESLintFile.createInstance(fileName, this.utils);
        return impls;
      }, { });
    this.ctx.patchState({ implementations });
    const objects = Object.keys(eslintFiles)
      .reduce((objs, fileName) => {
        objs[fileName] = this.parse(fileName, eslintFiles[fileName]);
        return objs;
      }, { });
    this.ctx.patchState({ objects  });
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.snapshot.objects);
  }

  // public methods

  load(fileName: string): any {
    return this.snapshot.implementations[fileName].load(this.snapshot, fileName);
  }

  parse(fileName: string, source: string): any {
    return this.snapshot.implementations[fileName].parse(source);
  }

  save(fileName: string): void {
    this.snapshot.implementations[fileName].save(this.snapshot, fileName);
  }

}

abstract class ESLintFile {

  static createInstance(fileName: string, utils: Utils): ESLintFile {
    if (fileName === 'package.json') 
      return new PackageJSONFile(utils);
    else if (fileName.endsWith('.js')) 
      return new JSFile(utils);
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml')) 
      return new YAMLFile(utils);
    else return new JSONFile(utils);
  }

  abstract changeConfiguration(ctx: DataStateContext<FilesStateModel>, fileName: string, replacement: any): void;

  abstract changeRule(ctx: DataStateContext<FilesStateModel>, fileName: string, ruleName: string, replacement: any): void;

  abstract load(state: FilesStateModel, fileName: string): any;

  abstract parse(source: string): any;

  abstract save(state: FilesStateModel, fileName: string): void;

}

class PackageJSONFile extends ESLintFile {

  constructor(private utils: Utils) { 
    super();
  }

  changeConfiguration(ctx: DataStateContext<FilesStateModel>, fileName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch(replacement) }) }) }));
  }

  changeRule(ctx: DataStateContext<FilesStateModel>, fileName: string, ruleName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch({ rules: patch({ [ruleName]: replacement }) }) }) }) }));
  }

  load(state: FilesStateModel, fileName: string): any {
    return this.utils.deepCopy(state.objects[fileName]['eslintConfig']);
  }

  parse(source: string): any {
    return JSON.parse(source);
  }

  save(state: FilesStateModel, fileName: string): void {
    const command = 'save';
    const indent = CommentJSON.detectIndent(state.files[fileName]);
    const object = state.objects[fileName];
    const source = JSON.stringify(object, null, indent.indent);
    lintelVSCodeAPI.postMessage({ command, fileName, source });
  }

}

class JSONFile extends ESLintFile {

  constructor(private utils: Utils) {
    super();
  }

  changeConfiguration(_: DataStateContext<FilesStateModel>, fileName: string, replacement: any): void {
    // TODO: need to preserve comments
    console.log('%cchangeConfiguration()', 'color: red', { fileName, replacement });
  }

  changeRule(_: DataStateContext<FilesStateModel>, fileName: string, ruleName: string, replacement: any): void {
    // TODO: need to preserve comments
    console.log('%cchangeRule()', 'color: red', { fileName, ruleName, replacement });
  }

  load(state: FilesStateModel, fileName: string): any {
    return this.utils.deepCopy(state.objects[fileName]);
  }

  parse(source: string): any {
    return CommentJSON.parse(source);
  }

  save(state: FilesStateModel, fileName: string): void {
    const command = 'save';
    const indent = CommentJSON.detectIndent(state.files[fileName]);
    const object = state.objects[fileName];
    const source = CommentJSON.stringify(object, null, indent.indent);
    lintelVSCodeAPI.postMessage({ command, fileName, source });
  }

}

class JSFile extends ESLintFile {

  constructor(private utils: Utils) {
    super();
  }

  changeConfiguration(ctx: DataStateContext<FilesStateModel>, fileName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch(replacement) }) }));
    // TODO: need to update AST
  }

  changeRule(ctx: DataStateContext<FilesStateModel>, fileName: string, ruleName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: patch({ [ruleName]: replacement }) }) }) }));
    // TODO: need to update AST
  }

  load(state: FilesStateModel, fileName: string): any {
    return this.utils.deepCopy(state.objects[fileName]);
  }

  parse(source: string): any {
    // TODO: need to create AST
    const module: any = { };
    eval(source);
    return module.exports;
  }

  save(state: FilesStateModel, fileName: string): void {
    // TODO: need to serialize AST
    console.log({ state, fileName });
  }

}

class YAMLFile extends ESLintFile {

  constructor(private utils: Utils) {
    super();
  }

  changeConfiguration(ctx: DataStateContext<FilesStateModel>, fileName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch(replacement) }) }));
  }

  changeRule(ctx: DataStateContext<FilesStateModel>, fileName: string, ruleName: string, replacement: any): void {
    ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: patch({ [ruleName]: replacement }) }) }) }));
  }

  load(state: FilesStateModel, fileName: string): any {
    return this.utils.deepCopy(state.objects[fileName]);
  }

  parse(source: string): any {
    return jsyaml.safeLoad(source);
  }

  save(state: FilesStateModel, fileName: string): void {
    const command = 'save';
    const indent = CommentJSON.detectIndent(state.files[fileName]);
    const object = state.objects[fileName];
    const source = jsyaml.safeDump(object, { indent: indent.amount });
    lintelVSCodeAPI.postMessage({ command, fileName, source });
  }

}
