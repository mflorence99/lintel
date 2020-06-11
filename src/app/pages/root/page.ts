import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { ElementRef } from '@angular/core';
import { FilesState } from '../../state/files';
import { Params } from '../../services/params';
import { RulesState } from '../../state/rules';
import { SchemaState } from '../../state/schema';
import { SelectionState } from '../../state/selection';

declare const lintelVSCodeAPI;

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
              public files: FilesState,
              private host: ElementRef,
              public params: Params,
              public rules: RulesState,
              public schema: SchemaState,
              public selection: SelectionState) {
    // NOTE: must do files first
    this.files.initialize();
    this.configs.initialize();
    this.rules.initialize();
    this.schema.initialize();
  }

  /** Edit a file */
  editFile(fileName: string): void {
    lintelVSCodeAPI.postMessage({ command: 'editFile', fileName });
  }

  /** Scroll to top */
  scrollToTop(): void {
    const theScroller = this.host.nativeElement.querySelector('#theScroller');
    if (theScroller)
      theScroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

}
