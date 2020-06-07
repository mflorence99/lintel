import * as CommentJSON from '../comment-json';
import * as escodegen from 'escodegen';
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

const eprismaOptions: any = {
  comment: true,
  loc: true,
  range: true,
  tokens: true,
  tolerant: true
};

interface ESLintFile {
  ast(source: string): esprima.Program;
  changeConfiguration(fileName: string, replacement: any): void;
  changeRule(fileName: string, ruleName: string, replacement: any): void;
  load(fileName: string): any;
  parse(source: string): any;
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
    objects: { }
  }
})

export class FilesState extends NgxsDataRepository<FilesStateModel> {

  // NOTE: keeping ASTs here rather than in state because we really want
  // a mutable, write-only object
  private asts: Record<string, esprima.Program> = { };

  // @see https://stackoverflow.com/questions/32494174

  private jsFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    ast(source: string): esprima.Program {
      return esprima.parseScript(source, eprismaOptions);
    }

    changeConfiguration(fileName: string, replacement: any): void {
      const ast = this.superThis.asts[fileName];
      const patch = esprima.parseScript(`replacement = ${JSON.stringify(replacement)}`);
      console.log(ast, patch);
    }

    changeRule(fileName: string, ruleName: string, replacement: any): void {
      console.log(fileName, ruleName, replacement);
    }

    load(fileName: string): any {
      return this.superThis.utils.deepCopy(this.superThis.snapshot.objects[fileName]);
    }

    parse(source: string): any {
      const module: any = { };
      eval(source);
      return module.exports;
    }

    save(fileName: string): void {
      const command = 'save';
      const indent = this.superThis.snapshot.indents[fileName];
      let ast = this.superThis.asts[fileName];
      // @see https://gist.github.com/vkz/c87186074d613cddbcf4
      ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
      const source = escodegen.generate(ast, { comment: true, format: {indent: { style: indent.indent }, quotes: indent.quotes } });
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }

  }(this);

  private jsonFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    ast(_: string): esprima.Program {
      return null;
    }

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
      const indent = this.superThis.snapshot.indents[fileName];
      const object = this.superThis.snapshot.objects[fileName];
      const source = CommentJSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }
  }(this);

  private packageJSONFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    ast(_: string): esprima.Program {
      return null;
    }

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
      const indent = this.superThis.snapshot.indents[fileName];
      const object = this.superThis.snapshot.objects[fileName];
      const source = JSON.stringify(object, null, indent.indent);
      lintelVSCodeAPI.postMessage({ command, fileName, source });
    }

  }(this);

  private yamlFile = new class implements ESLintFile {

    constructor(private superThis: FilesState) { }

    ast(_: string): esprima.Program {
      return null;
    }

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
    // NOTE: we keep ASTs out of state, see above
    this.asts = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        const impl = this.impl(fileName);
        acc[fileName] = impl.ast(eslintFiles[fileName]);
        return acc;
      }, { });
    const indents = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        acc[fileName] = CommentJSON.detectIndent(eslintFiles[fileName]);
        return acc;
      }, { });
    this.ctx.patchState({ indents });
    const objects = Object.keys(eslintFiles)
      .reduce((acc, fileName) => {
        const impl = this.impl(fileName);
        acc[fileName] = impl.parse(eslintFiles[fileName]);
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
