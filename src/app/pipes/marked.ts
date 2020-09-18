import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

import marked from 'marked';

/**
 * @see https://markrabey.com/2019/05/31/angular-markdown-pipe/
 */

const cache: Record<string, string> = {};

@Pipe({ name: 'lintelMarked' })
export class MarkedPipe implements PipeTransform {
  transform(s: string, dflt = ''): string {
    // quick exit if empty string
    if (s == null) return dflt;

    // quick exit if already analyzed
    if (cache[s]) return s;

    let t = marked(s);

    // NOTE: special processing:
    // we need target="_blank" on links

    const p = /<a href=/gim;
    t = t.replace(p, '<a target="_blank" href=');

    cache[s] = t;

    return t;
  }
}
