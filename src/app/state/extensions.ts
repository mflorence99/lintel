import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { ParserOptions } from './configs';
import { Payload } from '@ngxs-labs/data/decorators';
import { Settings } from './configs';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

import { normalizeConfiguration } from '../common/meld-configurations';
import { patch } from '@ngxs/store/operators';

// NOTE: extensions content is provided statically in index.html
declare const eslintExtensions: ExtensionsStateModel;

export interface Extension {
  ecmaFeatures?: Record<string, boolean>;
  env?: Record<string, boolean>;
  files?: string[];
  globals?: Record<string, boolean | number | string>;
  overrides?: Extension[];
  parser?: string;
  parserOptions?: ParserOptions;
  plugins?: string[];
  rules?: Record<string, Settings>;
}

export type ExtensionsStateModel = Record<string, Extension>;

@Injectable({ providedIn: 'root' })
@StateRepository()
@State<ExtensionsStateModel>({
  name: 'extensions',
  defaults: { }
})

export class ExtensionsState extends NgxsDataRepository<ExtensionsStateModel> {

  /** ctor */
  constructor(private utils: Utils) {
    super();
  }

  @DataAction({ insideZone: true })
  changeExtensions(@Payload('changes') extensions: ExtensionsStateModel): void {
    Object.entries(extensions).forEach(([extensionName, extension]) => {
      this.ctx.setState(patch({ [extensionName]: extension }));
    });
  }

  @DataAction({ insideZone: true })
  initialize(): void {
    this.ctx.setState(this.normalize(eslintExtensions));
    // listen for new extensions as they are generated by the extension
    window.addEventListener('message', event => {
      const message = event.data;
      switch (message.command) {
        case 'extensions':
          this.changeExtensions(this.normalize(message.extensions));
          break;
      }
    });
  }

  // private methods

  private normalize(extensions: ExtensionsStateModel): ExtensionsStateModel {
    const model = this.utils.deepCopy(extensions);
    Object.values(model)
      .filter(extension => !!extension)
      .forEach(extension => normalizeConfiguration(extension));
    return model;
  }

}
