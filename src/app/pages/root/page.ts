import { Component } from '@angular/core';
import { SchemasState } from '../../state/schemas';

/**
 * Lintel Root
 */

@Component({
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  /** ctor */
  constructor(public schemas: SchemasState) {
    this.schemas.initialize();
  }

}
