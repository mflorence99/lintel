import { Injectable } from '@angular/core';
import { Utils } from './utils';

@Injectable({ providedIn: 'root' })
export class Params {

  // NOTE: we need to use this in a decorator, where we can't access this service
  static debounceTimeout = 250;

  activeCategory = 'Active Rules';
  basePluginName = 'eslint';
  generalSettings = 'ESLint Config';

  // TODO: this belongs SOMEWHERE, we just don't know where yet
  inherits = {
    'eslint': {
      'eslint:recommended': {
        'recommended': 'truthy'
      }
    },
    '@typescript-eslint': {
      'plugin:@typescript-eslint/eslint-recommended': {
        'extendsBaseRule': 'truthy'
      },
      'plugin:@typescript-eslint/recommended': {
        'recommended': 'truthy',
        'requiresTypeChecking': 'falsy'
      },
      'plugin:@typescript-eslint/recommended-requiring-type-checking': {
        'recommended': 'truthy',
        'requiresTypeChecking': 'truthy'
      }
    }
  };

  searchParams = {
    freshStart: false
  };

  unknownCategory = 'Unknown Rules';

  get debounceTimeout(): number {
    return Params.debounceTimeout;
  }

  set debounceTimeout(timeout: number) {
    Params.debounceTimeout = timeout;
  }

  /** ctor */
  constructor(utils: Utils) { 
    this.searchParams = utils.parseInitialSearchParams();
  }
  
}
