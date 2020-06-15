import { Injectable } from '@angular/core';

declare const lintelSearchParams;

export type DeepSearchCallback = (container: any, value: any) => void;

@Injectable({ providedIn: 'root' })
export class Utils {

  /** Deduplicate array contents */
  deduplicateArray(array: any[]): any[] {
    return array
      .slice()
      .sort()
      .filter((item, idx, array) => (idx === 0) || (array[idx - 1] !== item));
  }

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

  /** Is supplied object empty? */
  isEmptyObject(obj: Record<string, any>): boolean {
    return (obj === null) || (obj === undefined) || (Object.getOwnPropertyNames(obj).length === 0);
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
