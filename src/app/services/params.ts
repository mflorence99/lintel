import { Injectable } from '@angular/core';

// NOTE: we need to use this in a decorator, where we can't access this service
globalThis.debounceTimeout = 250;

@Injectable({ providedIn: 'root' })
export class Params {

  activeCategory = 'Active Rules';
  basePluginName = 'eslint';
  unknownCategory = 'Unknown Rules';

  get debounceTimeout(): number {
    return globalThis.debounceTimeout;
  }

  set debounceTimeout(timeout) {
    globalThis.debounceTimeout = timeout;
  }
  
}
