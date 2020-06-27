import { Injectable } from '@angular/core';

declare const lintelSearchParams;

export type DeepSearchCallback = (container: any, value: any) => void;

@Injectable({ providedIn: 'root' })
export class Utils {

  /** Slow but surw */
  deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Deep search an object for a key and optional value */
  deepSearch(obj: any, expr: string, cb: DeepSearchCallback): void {
    if (Array.isArray(obj)) 
      obj.forEach(item => this.deepSearch(item, expr, cb));
    else if (obj && typeof obj === 'object') {
      const [k, v] = expr.split('=');
      Object.entries(obj)
        .forEach(([key, value]) => {
          if ((key === k) && (!v || value === v))
            cb(obj, value);
          this.deepSearch(value, expr, cb);
        });
    }
  }

  /** Does this thing exist? */
  exists(obj: any): boolean {
    if (obj == null)
      return false;
    else if (Array.isArray(obj))
      return !!obj.length;
    else if (typeof obj === 'string')
      return !!obj.length;
    else if (typeof obj === 'object')
      return !this.isEmptyObject(obj);
    else return true;
  }

  /** Is supplied object empty? */
  isEmptyObject(obj: any): boolean {
    return (obj == null) 
      || (Object.getOwnPropertyNames(obj).length === 0)
      || Object.getOwnPropertyNames(obj).every(nm => obj[nm] == null);
  }

  /** Find the longest common prefix from a list */
  longestCommonPrefix(strings: string[]): string {
    if (strings.length === 1) {
      const ix = strings[0].lastIndexOf('/');
      return strings[0].substring(0, ix + 1);
    } else {
      const first = strings[0] || '';
      let commonLength = first.length;
      for (let i = 1; i < strings.length; ++i) {
        for (let j = 0; j < commonLength; ++j) {
          if (strings[i].charAt(j) !== first.charAt(j)) {
            commonLength = j;
            break;
          }
        }
      }
      return first.slice(0, commonLength);  
    }  
  }

  /** Run func tion on next tick */
  nextTick(fn: Function): void {
    setTimeout(fn, 0);
  }

  /** Extract search params from launch URL */
  parseInitialSearchParams(): any {
    if (lintelSearchParams && (lintelSearchParams.length > 1)) {
      const raw = lintelSearchParams.substring(1).split('&');
      return raw.reduce((params, pair) => {
        const [k, v] = pair.split('=');
        // NOTE: a bit cheesy
        if (v === 'false')
          params[k] = false;
        else if (v === 'true')
          params[k] = true;
        else if (/^[0-9]*$/.test(v))
          params[k] = Number(v);
        else params[k] = v;
        return params;
      }, { });
    } else return { };
  }

}
