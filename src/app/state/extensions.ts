import { DataAction } from '@ngxs-labs/data/decorators';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Payload } from '@ngxs-labs/data/decorators';
import { Settings } from './configs';
import { State } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { Utils } from '../services/utils';

import { patch } from '@ngxs/store/operators';

// NOTE: extensions content is provided statically in index.html
declare const eslintExtensions: ExtensionsStateModel;

export interface Extension {
  env?: Record<string, boolean>;
  globals?: Record<string, boolean | number | string>;
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
    Object.entries(extensions)
      .filter(([_, extension]) => !!extension)
      .forEach(([extensionName, extension]) => {
        // NOTE: is is very convenient to normalize configs before use
        extension.rules = extension.rules ?? {};
        Object.entries(extension.rules)
          .forEach(([ruleName, rule]) => {
            let normalized: any = rule;
            if (typeof rule === 'string' || Number.isInteger(rule as any))
              normalized = [rule];
            if (Number.isInteger(normalized[0]))
              normalized[0] = ['off', 'warn', 'error'][normalized[0]];
            model[extensionName].rules[ruleName] = normalized;
          });
        // also very convenient to normalize global values
        if (extension.globals) {
          model[extensionName].globals = Object.keys(extension.globals)
            .reduce((acc, key) => {
              if ((extension.globals[key] === true)
                || (extension.globals[key] === 'writeable'))
                acc[key] = 'writable';
              else if ((extension.globals[key] === false)
                || (extension.globals[key] === 'readable'))
                acc[key] = 'readonly';
              else acc[key] = extension.globals[key];
              return acc;
            }, { });
        }
      });
    return model;
  }

}
