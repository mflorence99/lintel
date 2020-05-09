import { Computed } from '@ngxs-labs/data/decorators';
import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';

// NOTE: config content is provided statically in index.html
declare const eslintrcFiles: ConfigsStateModel;

export interface ConfigFile {
  children?: string[];
  config: Configuration;
  parent?: string;
  root?: boolean;
}

export interface Configuration {
  // TODO: more analysis
}

export type ConfigsStateModel = Record<string, ConfigFile>;

export interface TreeView {
  children?: TreeView[];
  fileName: string;
}

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ConfigsStateModel>({
  name: 'configs',
  defaults: { }
})

export class ConfigsState extends NgxsImmutableDataRepository<ConfigsStateModel> {

  @DataAction() initialize(): void {
    this.ctx.setState(eslintrcFiles);
  }

  @Computed() get treeView(): TreeView {
    const makeNode = (fileName): TreeView => {
      return {
        children: (this.snapshot[fileName].children || []).map(makeNode),
        fileName: fileName
      };
    };
    const rootFile = Object.keys(this.snapshot)
      .find(fileName => this.snapshot[fileName].root);
    return makeNode(rootFile);
  }

}

