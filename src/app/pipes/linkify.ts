import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';


/**
 * Converts substrings that look like URLs into <a href="...">...</a> sequences.
 *
 * NOTE: must pipe into [innerHTML]
 */

@Pipe({ name: 'lintelLinkify' })

export class LinkifyPipe implements PipeTransform {

  transform(s: string, dflt = ''): string {

    // quick exit if empty string
    if (s == null)
      return dflt;

    // URLs starting with http://, https://, or ftp://
    const p1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    s = s.replace(p1, '<a href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above)
    const p2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
    s = s.replace(p2, '$1<a href="http://$2" target="_blank">$2</a>');

    // change email addresses to mailto: links
    const p3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
    s = s.replace(p3, '<a href="mailto:$1">$1</a>');

    return s;

  }

}
