import { Utils } from './utils';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Params {
  activeCategory = 'Active Rules';
  allFilesOverride = '*.*';
  basePluginName = 'eslint';
  catchAllCategory = 'Other Rules';
  debounceTimeout = 2500;
  generalSettings = 'ESLint Config';
  intersection = {
    rootMargin: '24px',
    threshold: 0
  };
  maxNumTabs = 7;
  searchParams = {
    freshStart: false
  };
  unknownPluginName = 'unknown';

  /** ctor */
  constructor(utils: Utils) {
    this.searchParams = utils.parseInitialSearchParams();
  }
}
