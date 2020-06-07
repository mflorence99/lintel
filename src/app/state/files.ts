import * as CommentJSON from '../comment-json';
import * as esprima from 'esprima';
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
import { safeAssign } from './operators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;
declare const lintelVSCodeAPI;

interface ESLintFile {
  changeConfiguration(fileName: string, replacement: any): void;
  changeRule(fileName: string, ruleName: string, replacement: any): void;
  load(fileName: string): any;
  parse(source: string): any;
  save(fileName: string): void;
}

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

  // @see https://stackoverflow.com/questions/32494174

  private jsFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      console.log(fileName, esprima.parseScript(JSON.stringify(replacement).replace(/:/g, '=')));
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      console.log(fileName, ruleName, esprima.parseScript(JSON.stringify(replacement)));
    }

    load(fileName: string): any {
      return this.superThis.utils.deepCopy(this.superThis.snapshot.objects[fileName]);
    }

    parse(source: string): any {
      // TODO: need to create AST
      const module: any = { };
      eval(source);
      return module.exports;
    }

    save(fileName: string): void {
      // TODO: need to serialize AST
      console.log({ fileName });
    }

  }(this);

  private jsonFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: safeAssign(replacement) }) }));
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: safeAssign({ [ruleName]: replacement }) }) }) }));
    }

    load(fileName: string): any {
      return this.superThis.utils.deepCopy(this.superThis.snapshot.objects[fileName]);
    }

    parse(source: string): any {
      return CommentJSON.parse(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = CommentJSON.detectIndent(this.superThis.snapshot.files[fileName]);
      const object = this.superThis.snapshot.objects[fileName];
      const source = CommentJSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }
  }(this);

  private packageJSONFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch(replacement) }) }) }));
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: patch({ eslintConfig: patch({ rules: patch({ [ruleName]: replacement }) }) }) }) }));
    }

    load(fileName: string): any {
      return this.superThis.utils.deepCopy(this.superThis.snapshot.objects[fileName]['eslintConfig']);
    }

    parse(source: string): any {
      return JSON.parse(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = CommentJSON.detectIndent(this.superThis.snapshot.files[fileName]);
      const object = this.superThis.snapshot.objects[fileName];
      const source = JSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }

  }(this);

  private yamlFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: patch(replacement) }) }));
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      this.superThis.ctx.setState(patch({ objects: patch({ [fileName]: patch({ rules: patch({ [ruleName]: replacement }) }) }) }));
    }

    load(fileName: string): any {
      return this.superThis.utils.deepCopy(this.superThis.snapshot.objects[fileName]);
    }

    parse(source: string): any {
      return jsyaml.safeLoad(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = CommentJSON.detectIndent(this.superThis.snapshot.files[fileName]);
      const object = this.superThis.snapshot.objects[fileName];
      const source = jsyaml.safeDump(object, { indent: indent.amount });
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }

  }(this);

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeConfiguration(@Payload('replacements') { fileName, replacement }): void {
    const impl = this.impl(fileName);
    impl.changeConfiguration(fileName, replacement);
    impl.save(fileName);
  }

  @DataAction({ insideZone: true })
  // TODO: @Debounce(Params.debounceTimeout)
  changeRule(@Payload('replacements') { fileName, ruleName, replacement }): void {
    const impl = this.impl(fileName);
    impl.changeRule(fileName, ruleName, replacement);
    impl.save(fileName);
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    const objects = Object.keys(eslintFiles)
      .reduce((objs, fileName) => {
        const impl = this.impl(fileName);
        objs[fileName] = impl.parse(eslintFiles[fileName]);
        return objs;
      }, { });
    this.ctx.setState({ files: eslintFiles, objects  });
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.snapshot.objects);
  }

  // public methods

  load(fileName: string): any {
    return this.impl(fileName).load(fileName);
  }

  // private methods

  private impl(fileName: string): ESLintFile {
    if (fileName === 'package.json')
      return this.packageJSONFile;
    else if (fileName.endsWith('.js'))
      return this.jsFile;
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
      return this.yamlFile;
    else return this.jsonFile;
  }

}
