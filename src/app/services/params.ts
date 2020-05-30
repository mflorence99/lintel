import { Injectable } from '@angular/core';
import { Utils } from './utils';

@Injectable({ providedIn: 'root' })
export class Params {

  // NOTE: we need to use this in a decorator, where we can't access this service
  static debounceTimeout = 250;

  activeCategory = 'Active Rules';
  basePluginName = 'eslint';
  generalSettings = 'ESLint Config';
  searchParams: {
    freshStart: boolean;
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
