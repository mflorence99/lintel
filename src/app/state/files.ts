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

import { assign } from '../comment-json';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;

declare const lintelVSCodeAPI;

interface ESLintFile {
  changeConfiguration(fileName: string, replacement: any): void;
  changeRule(fileName: string, ruleName: string, replacement: any): void;
  deleteRule(fileName: string, ruleName: string): void;
  load(fileName: string): any;
  normalize(object: any): any;
  parse(fileName: string, source: string): any;
  save(fileName: string): void;
}

// NOTE: we don't actually store anything in the store itself,
// because it is just a convenient framework to hold write-only data
// for the purpose of regenerating eslintrc files
export interface FilesStateModel {
  dummy?: boolean;
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
  defaults: { }
})

export class FilesState extends NgxsDataRepository<FilesStateModel> {

  /* eslint-disable @typescript-eslint/member-ordering */
  private indents: Record<string, Indent> = { };
  private objects: Record<string, any> = { };

  // @see https://stackoverflow.com/questions/32494174

  private cjsFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(_fileName: string, _replacement: any): void { }

    changeRule(_fileName: string, _ruleName: string, _replacement: any): void { }

    deleteRule(_fileName: string, _ruleName: string): void { }

    load(_fileName: string): any {
      return null;
    }

    normalize(_object: any): any { }

    parse(fileName: string, _source: string): any {
      throw new Error(`${fileName} format not supported`);
    }

    save(_fileName: string): void { }

  }(this);

  private jsFile = new class implements ESLintFile {

    private prefix: Record<string, string> = { };
    private suffix: Record<string, string> = { };

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      const object = this.superThis.objects[fileName];
      assign(object, replacement);
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      const object = this.superThis.objects[fileName].rules;
      assign(object, { [ruleName]: replacement });
    }

    deleteRule(fileName: string, ruleName: string): void {
      const object = this.superThis.objects[fileName].rules;
      delete object[ruleName];
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules'))
        object['rules'] = { };
      return object;
    }

    parse(fileName: string, source: string): any {
      try {
        // regex out the prefix and suffix, and the rest is comment-json!
        this.prefix[fileName] = source.match(/^.*module\.exports[^{]*/gm)[0];
        this.suffix[fileName] = source.substring(source.lastIndexOf('}') + 1);
        const ix = this.prefix[fileName].length;
        const iy = source.length - this.suffix[fileName].length;
        const json = source.substring(ix, iy);
        return CommentJSON.parse(json);
      } catch (exception) {
        // if that didn't work, try a compile but we lose comments
        this.prefix[fileName] = 'module.exports = ';
        this.suffix[fileName] = ';';
        const module: any = { };
        eval(source);
        return  module.exports;
      }
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const json = CommentJSON.stringify(object, null, indent.indent, indent.quotes, false);
      const source = this.prefix[fileName] + json + this.suffix[fileName];
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }

  }(this);

  private jsonFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    changeConfiguration(fileName: string, replacement: any): void {
      const object = this.superThis.objects[fileName];
      assign(object, replacement);
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      const object = this.superThis.objects[fileName].rules;
      assign(object, { [ruleName]: replacement });
    }

    deleteRule(fileName: string, ruleName: string): void {
      const object = this.superThis.objects[fileName].rules;
      delete object[ruleName];
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules'))
        object['rules'] = { };
      return object;
    }

    parse(_: string, source: string): any {
      return CommentJSON.parse(source);
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const source = CommentJSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }

  }(this);

  private packageJSONFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    // NOTE: no worries here about comments

    changeConfiguration(fileName: string, replacement: any): void {
      const object = this.superThis.objects[fileName]['eslintConfig'];
      Object.assign(object, replacement);
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      const object = this.superThis.objects[fileName]['eslintConfig'].rules;
      object[ruleName] = replacement;
    }

    deleteRule(fileName: string, ruleName: string): void {
      const object = this.superThis.objects[fileName]['eslintConfig'].rules;
      delete object[ruleName];
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName]?.['eslintConfig'];
    }

    normalize(object: any): any {
      if (!object['eslintConfig'].hasOwnProperty('rules'))
        object['eslintConfig']['rules'] = { };
      return object;
    }

    parse(_: string, source: string): any {
      return JSON.parse(source);
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const source = JSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }

  }(this);

  private yamlFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    // NOTE: YAML does not currently preserve comments

    changeConfiguration(fileName: string, replacement: any): void {
      const object = this.superThis.objects[fileName];
      Object.assign(object, replacement);
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      const object = this.superThis.objects[fileName].rules;
      object[ruleName] = replacement;
    }

    deleteRule(fileName: string, ruleName: string): void {
      const object = this.superThis.objects[fileName].rules;
      delete object[ruleName];
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules'))
        object['rules'] = { };
      return object;
    }

    parse(_: string, source: string): any {
      return jsyaml.safeLoad(source);
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const source = jsyaml.safeDump(object, { indent: indent.amount });
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }

  }(this);

  /* eslint-enable @typescript-eslint/member-ordering */

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  changeConfiguration(@Payload('replacements') { fileName, replacement }): void {
    const impl = this.impl(fileName);
    impl.changeConfiguration(fileName, replacement);
    impl.save(fileName);
  }

  @DataAction({ insideZone: true })
  changeRule(@Payload('replacements') { fileName, ruleName, replacement }): void {
    const impl = this.impl(fileName);
    impl.changeRule(fileName, ruleName, replacement);
    impl.save(fileName);
  }

  @DataAction({ insideZone: true })
  deleteRule(@Payload('ruleName') { fileName, ruleName }): void {
    const impl = this.impl(fileName);
    impl.deleteRule(fileName, ruleName);
    impl.save(fileName);
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    this.indents = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        acc[fileName] = CommentJSON.detectIndent(eslintFiles[fileName]);
        return acc;
      }, { });
    this.objects = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        const impl = this.impl(fileName);
        try {
          // if the source can't be parsed ...
          acc[fileName] = impl.normalize(impl.parse(fileName, eslintFiles[fileName]));
        } catch (exception) {
          lintelVSCodeAPI.postMessage({ command: 'parseFail', fileName });
          // ... a null object is an upstream signal
          acc[fileName] = null;
        }
        return acc;
      }, { });
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.objects);
  }

  // public methods

  load(fileName: string): any {
    return this.impl(fileName).load(fileName);
  }

  // private methods

  private impl(fileName: string): ESLintFile {
    if (fileName.endsWith('package.json'))
      return this.packageJSONFile;
    else if (fileName.endsWith('.cjs'))
      return this.cjsFile;
    else if (fileName.endsWith('.js'))
      return this.jsFile;
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
      return this.yamlFile;
    else return this.jsonFile;
  }

}
