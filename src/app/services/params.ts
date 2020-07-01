import { Injectable } from '@angular/core';
import { Utils } from './utils';

@Injectable({ providedIn: 'root' })
export class Params {

  activeCategory = 'Active Rules';
  allFilesOverride = '*.*';
  basePluginName = 'eslint';
  catchAllCategory = 'Other Rules';
  debounceTimeout = 2500;
  generalSettings = 'ESLint Config';
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
