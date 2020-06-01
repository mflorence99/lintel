import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { ElementRef } from '@angular/core';
import { Params } from '../../services/params';
import { RulesState } from '../../state/rules';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';

/**
 * Lintel Root
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  /** ctor */
  constructor(public configs: ConfigsState,
              private host: ElementRef,
              public params: Params,
              public rules: RulesState,
              public schema: SchemaState,
              public selection: SelectionState) {
    this.configs.initialize();
    this.rules.initialize();
    this.schema.initialize();
  }

  /** Scroll to top */
  scrollToTop(): void {
    const scroller = this.host.nativeElement.querySelector('#scroller');
    if (scroller)
      scroller.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

}
