import { Marked } from '@ts-stack/markdown';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

/**
 * @see https://markrabey.com/2019/05/31/angular-markdown-pipe/
 */

@Pipe({ name: 'lintelMarked' })

export class MarkedPipe implements PipeTransform {

  transform(s: string, dflt = ''): string {

    // quick exit if empty string
    if (s == null)
      return dflt;

    s = Marked.parse(s);

    // NOTE: special processing:
    // we need target="_blank" on links 

    const p = /<a href=/gim;
    s = s.replace(p, '<a target="_blank" href=');

    return s;

  }

}
