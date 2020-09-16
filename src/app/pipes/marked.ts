import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

import marked from 'marked';

/**
 * @see https://markrabey.com/2019/05/31/angular-markdown-pipe/
 */

@Pipe({ name: 'lintelMarked' })
export class MarkedPipe implements PipeTransform {
  transform(s: string, dflt = ''): string {
    // quick exit if empty string
    if (s == null) return dflt;

    s = marked(s);

    // NOTE: special processing:
    // we need target="_blank" on links

    const p = /<a href=/gim;
    s = s.replace(p, '<a target="_blank" href=');

    return s;
  }
}
