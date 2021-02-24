import * as CommentJSON from '../comment-json';

import { Utils } from '../services/utils';

import { assign } from '../comment-json';

import * as jsyaml from 'js-yaml';

import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

import { patch } from '@ngxs/store/operators';

// NOTE: files content is provided statically in index.html
declare const eslintFiles: Record<string, string>;

declare const lintelVSCodeAPI;

interface ESLintFile {
  changeConfiguration(fileName: string, ix: number, replacement: any): void;
  changeRule(
    fileName: string,
    ix: number,
    ruleName: string,
    replacement: any
  ): void;
  load(fileName: string): any;
  normalize(object: any): any;
  parse(fileName: string, source: string): any;
  save(fileName: string): void;
}

// NOTE: we only keep a write-only copy of the store for logging purposes
// the real data is help in "indents" and "objects" below because
// we don't want to deal with immutability
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
    indents: {},
    objects: {}
  }
})
export class FilesState extends NgxsDataRepository<FilesStateModel> {
  /* eslint-disable @typescript-eslint/member-ordering */
  private indents: Record<string, Indent> = {};
  private objects: Record<string, any> = {};

  // @see https://stackoverflow.com/questions/32494174

  // /////////////////////////////////////////////////////////////////////////

  private jsFile = new (class implements ESLintFile {
    private prefix: Record<string, string> = {};
    private suffix: Record<string, string> = {};

    constructor(private superThis: FilesState) {}

    changeConfiguration(fileName: string, ix: number, replacement: any): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      assign(object, replacement);
    }

    changeRule(
      fileName: string,
      ix: number,
      ruleName: string,
      replacement: any
    ): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      assign(object.rules, { [ruleName]: replacement });
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules')) object['rules'] = {};
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
        const module: any = {};
        eval(source);
        return module.exports;
      }
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const json = CommentJSON.stringify(
        object,
        null,
        indent.indent,
        indent.quotes,
        false
      );
      const source = this.prefix[fileName] + json + this.suffix[fileName];
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }
  })(this);

  // /////////////////////////////////////////////////////////////////////////

  private jsonFile = new (class implements ESLintFile {
    constructor(private superThis: FilesState) {}

    changeConfiguration(fileName: string, ix: number, replacement: any): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      assign(object, replacement);
    }

    changeRule(
      fileName: string,
      ix: number,
      ruleName: string,
      replacement: any
    ): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      assign(object.rules, { [ruleName]: replacement });
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules')) object['rules'] = {};
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
  })(this);

  // /////////////////////////////////////////////////////////////////////////

  private packageJSONFile = new (class implements ESLintFile {
    constructor(private superThis: FilesState) {}

    // NOTE: no worries here about comments

    changeConfiguration(fileName: string, ix: number, replacement: any): void {
      let object = this.superThis.objects[fileName]['eslintConfig'];
      if (ix != null) object = object.overrides[ix];
      Object.assign(object, replacement);
    }

    changeRule(
      fileName: string,
      ix: number,
      ruleName: string,
      replacement: any
    ): void {
      let object = this.superThis.objects[fileName]['eslintConfig'];
      if (ix != null) object = object.overrides[ix];
      object.rules[ruleName] = replacement;
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName]?.['eslintConfig'];
    }

    normalize(object: any): any {
      if (!object['eslintConfig'].hasOwnProperty('rules'))
        object['eslintConfig']['rules'] = {};
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
  })(this);

  // /////////////////////////////////////////////////////////////////////////

  private yamlFile = new (class implements ESLintFile {
    constructor(private superThis: FilesState) {}

    // NOTE: YAML does not currently preserve comments

    changeConfiguration(fileName: string, ix: number, replacement: any): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      Object.assign(object, replacement);
    }

    changeRule(
      fileName: string,
      ix: number,
      ruleName: string,
      replacement: any
    ): void {
      let object = this.superThis.objects[fileName];
      if (ix != null) object = object.overrides[ix];
      object.rules[ruleName] = replacement;
    }

    load(fileName: string): any {
      return this.superThis.objects[fileName];
    }

    normalize(object: any): any {
      if (!object.hasOwnProperty('rules')) object['rules'] = {};
      return object;
    }

    parse(_: string, source: string): any {
      return jsyaml.load(source);
    }

    save(fileName: string): void {
      const indent = this.superThis.indents[fileName];
      const object = this.superThis.objects[fileName];
      const source = jsyaml.dump(object, { indent: indent.amount });
      lintelVSCodeAPI.postMessage({ command: 'saveFile', fileName, source });
    }
  })(this);

  // /////////////////////////////////////////////////////////////////////////

  /* eslint-enable @typescript-eslint/member-ordering */

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  // actions

  @DataAction({ insideZone: true })
  addOverride(@Payload('FilesState.addOverride') { fileName, override }): void {
    const impl = this.impl(fileName);
    const object = impl.load(fileName);
    if (!object.overrides) object.overrides = [];
    object.overrides.push(override);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  changeConfiguration(
    @Payload('FilesState.changeConfiguration') { fileName, ix, replacement }
  ): void {
    const impl = this.impl(fileName);
    impl.changeConfiguration(fileName, ix, replacement);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  changeOverrideFiles(
    @Payload('FilesState.changeOverrideFiles') { fileName, files }
  ): void {
    const impl = this.impl(fileName);
    const overrides = impl.load(fileName).overrides ?? [];
    overrides.forEach((override, ix) => (override.files = files[ix]));
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  changeRule(
    @Payload('FilesState.changeRule') { fileName, ix, ruleName, replacement }
  ): void {
    const impl = this.impl(fileName);
    impl.changeRule(fileName, ix, ruleName, replacement);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  deleteOverride(@Payload('FilesState.deleteOverride') { fileName, ix }): void {
    const impl = this.impl(fileName);
    const overrides = impl.load(fileName).overrides;
    overrides?.splice(ix, 1);
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  deleteRule(
    @Payload('FilesState.deleteRule') { fileName, ix, ruleName }
  ): void {
    const impl = this.impl(fileName);
    const rules =
      ix == null
        ? impl.load(fileName).rules
        : impl.load(fileName).overrides[ix].rules;
    delete rules[ruleName];
    this.save(fileName);
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    this.indents = Object.keys(eslintFiles).reduce((acc, fileName) => {
      acc[fileName] = CommentJSON.detectIndent(eslintFiles[fileName]);
      const indents = this.utils.deepCopy(acc[fileName]);
      this.ctx.setState(patch({ indents: patch({ [fileName]: indents }) }));
      return acc;
    }, {});
    this.objects = Object.keys(eslintFiles).reduce((acc, fileName) => {
      const impl = this.impl(fileName);
      try {
        // if the source can't be parsed ...
        acc[fileName] = impl.normalize(
          impl.parse(fileName, eslintFiles[fileName])
        );
        const object = this.utils.deepCopy(acc[fileName]);
        this.ctx.setState(patch({ objects: patch({ [fileName]: object }) }));
      } catch (exception) {
        lintelVSCodeAPI.postMessage({ command: 'parseFail', fileName });
        // ... a null object is an upstream signal
        acc[fileName] = null;
      }
      return acc;
    }, {});
  }

  // accessors

  @Computed() get fileNames(): any {
    return Object.keys(this.objects);
  }

  // public methods

  load(fileName: string): any {
    return this.impl(fileName).load(fileName);
  }

  save(fileName: string): void {
    const impl = this.impl(fileName);
    impl.save(fileName);
    const object = this.utils.deepCopy(impl.load(fileName));
    this.ctx.setState(patch({ objects: patch({ [fileName]: object }) }));
  }

  // private methods

  private impl(fileName: string): ESLintFile {
    if (fileName.endsWith('package.json')) return this.packageJSONFile;
    else if (fileName.endsWith('.cjs')) return this.jsFile;
    else if (fileName.endsWith('.js')) return this.jsFile;
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
      return this.yamlFile;
    else return this.jsonFile;
  }
}
