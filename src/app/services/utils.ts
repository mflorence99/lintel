import { Injectable } from '@angular/core';

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

  /** Is supplied object empty? */
  isObjectEmpty(obj: Record<string, any>): boolean {
    return (obj === null) || (obj === undefined) || (Object.getOwnPropertyNames(obj).length === 0);
  }

  /** Run func tion on next tick */
  nextTick(fn: Function): void {
    setTimeout(fn, 0);
  }

}
