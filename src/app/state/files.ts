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
import { safeAssign } from './operators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;

declare const lintelVSCodeAPI;

interface ESLintFile {
  changeConfiguration(fileName: string, replacement: any): void;
  changeRule(fileName: string, ruleName: string, replacement: any): void;
  load(fileName: string): any;
  parse(fileName: string, source: string): any;
  save(fileName: string): void;
}

export interface FilesStateModel {
  indents: Record<string, Indent>;
  objects: Record<string, any>;
}

export interface Indent {
  amount: number;
  indent: string;
  quotes: 'double' | 'single';
  type: 'space' | 'tab';
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<FilesStateModel>({
  name: 'files',
  defaults: { 
    indents: { },
    objects: { },
  }
})

export class FilesState extends NgxsDataRepository<FilesStateModel> {

  // @see https://stackoverflow.com/questions/32494174

  private jsFile = new class implements ESLintFile {

    private prefix: Record<string, string> = { };
    private suffix: Record<string, string> = { };

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

    parse(fileName: string, source: string): any {
      // regex out the prefix and suffix, and the rest is comment-json!
      this.prefix[fileName] = source.match(/^.*module\.exports[^{]*/gm)[0];
      this.suffix[fileName] = source.substring(source.lastIndexOf('}') + 1);
      const ix = this.prefix[fileName].length;
      const iy = source.length - this.suffix[fileName].length;
      const json = source.substring(ix, iy);
      return CommentJSON.parse(json);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = this.superThis.snapshot.indents[fileName];
      const object = this.superThis.snapshot.objects[fileName];
      const json = CommentJSON.stringify(object, null, indent.indent, indent.quotes, false);
      const source = this.prefix[fileName] + json + this.suffix[fileName];
      lintelVSCodeAPI.postMessage({ command, fileName, source });
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

    parse(_: string, source: string): any {
      return CommentJSON.parse(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = this.superThis.snapshot.indents[fileName];
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

    parse(_: string, source: string): any {
      return JSON.parse(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = this.superThis.snapshot.indents[fileName];
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

    parse(_: string, source: string): any {
      return jsyaml.safeLoad(source);
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = this.superThis.snapshot.indents[fileName];
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
    const indents = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        acc[fileName] = CommentJSON.detectIndent(eslintFiles[fileName]);
        return acc;
      }, { });
    this.ctx.patchState({ indents });
    const objects = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        const impl = this.impl(fileName);
        acc[fileName] = impl.parse(fileName, eslintFiles[fileName]);
        return acc;
      }, { });
    this.ctx.patchState({ objects });
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
