import { Injectable } from '@angular/core';
import { Utils } from './utils';

@Injectable({ providedIn: 'root' })
export class Params {

  activeCategory = 'Active Rules';
  basePluginName = 'eslint';
  catchAllCategory = 'Other Rules';
  generalSettings = 'ESLint Config';

  // TODO: this belongs SOMEWHERE, we just don't know where yet
  inherits = {
    '@angular-eslint': {
      'plugin:@angular-eslint/recommended': {
        recommended: 'truthy'
      }
    },
    '@typescript-eslint': {
      'plugin:@typescript-eslint/eslint-recommended': {
        extendsBaseRule: 'truthy'
      },
      'plugin:@typescript-eslint/recommended': {
        recommended: 'truthy',
        requiresTypeChecking: 'falsy'
      },
      'plugin:@typescript-eslint/recommended-requiring-type-checking': {
        recommended: 'truthy',
        requiresTypeChecking: 'truthy'
      }
    },
    compat: {
      'plugin:compat/recommended': {
        recommended: 'truthy'
      }
    },
    eslint: {
      'eslint:recommended': {
        recommended: 'truthy'
      }
    },
    jest: {
      'plugin:jest/recommended': {
        recommended: 'truthy'
      }
    },
    lodash: {
      'plugin:lodash/recommended': {
        url: 'truthy'
      }
    },
    'lodash-fp': {
      'plugin:lodash-fp/recommended': {
        recommended: 'truthy'
      }
    },
    node: {
      'plugin:node/recommended': {
        recommended: 'truthy'
      }
    },
    react: {
      'plugin:react/recommended': {
        recommended: 'truthy'
      }
    },
    'react-hooks': {
      'plugin:react/recommended': {
        recommended: 'truthy'
      }
    },
    'react-redux': {
      'plugin:react/recommended': { }
    },
    sonarjs: {
      'plugin:react/recommended': { }
    },
    unicorn: {
      'plugin:unicorn/recommended': {
        url: 'truthy'
      }
    },
    vue: {
      'plugin:vue/recommended': {
        recommended: 'undefined'
      }
    },
  };

  maxNumTabs = 8;

  searchParams = {
    freshStart: false
  };

  unknownPluginName= 'unknown';

  /** ctor */
  constructor(utils: Utils) { 
    this.searchParams = utils.parseInitialSearchParams();
  }
  
}
