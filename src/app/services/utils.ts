import { Injectable } from '@angular/core';

export type DeepSearchCallback = (container: any, value: any) => void;

@Injectable({ providedIn: 'root' })
export class Utils {

  /** Deduplicate array contents */
  deduplicateArray(array: string[]): string[] {
    return array
      .slice()
      .sort()
      .filter((item, idx, array) => (idx === 0) || (array[idx - 1] !== item));
  }

  /** Slow but surw */
  deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /** Deep search an object for a key */
  deepSearch(obj: any, search: string, cb: DeepSearchCallback): void {
    if (Array.isArray(obj)) 
      obj.forEach(item => this.deepSearch(item, search, cb));
    else if (obj && typeof obj === 'object') {
      Object.entries(obj)
        .forEach(([key, value]) => {
          if (key === search)
            cb(obj, value);
          this.deepSearch(value, search, cb);
        });
    }
  }

  /** Is supplied object empty? */
  isObjectEmpty(obj: Record<string, any>): boolean {
    return (obj === null) || (obj === undefined) || (Object.getOwnPropertyNames(obj).length === 0);
  }

  /** Run func tion on next tick */
  nextTick(fn: Function): void {
    setTimeout(fn, 0);
  }

}
