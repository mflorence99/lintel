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
    // and try out <cite>...</cite>

    t = t.replace(/<a href=/gim, '<cite><a target="_blank" href=');
    t = t.replace(/<\/a>/gim, '</a></cite>');

    cache[s] = t;

    return t;
  }
}
