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
    },
    'eslint': {
      'eslint:recommended': {
        'recommended': 'truthy'
      }
    },
    'jest': {
      'plugin:jest/recommended': {
        'recommended': 'truthy'
      }
    },
    'lodash': {
      'plugin:lodash/recommended': {
        'url': 'truthy'
      }
    },
    'lodash-fp': {
      'plugin:lodash-fp/recommended': {
        'recommended': 'truthy'
      }
    },
    'node': {
      'plugin:node/recommended': {
        'recommended': 'truthy'
      }
    },
    'react': {
      'plugin:react/recommended': {
        'recommended': 'truthy'
      }
    },
    'vue': {
      'plugin:vue/recommended': {
        'url': 'truthy'
      }
    },
  };

  searchParams = {
    freshStart: false
  };

  unknownPluginName= 'unknown';

  /** ctor */
  constructor(utils: Utils) { 
    this.searchParams = utils.parseInitialSearchParams();
  }
  
}
