import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SchemasState } from '../../state/schemas';
import { TreeView } from '../../state/configs';

/**
 * Lintel Root
 */

@Component({
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  dataSource = new MatTreeNestedDataSource<TreeView>();
  treeControl = new NestedTreeControl<TreeView>(node => node.children);

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState) {
    this.configs.initialize();
    this.schemas.initialize();
    // TODO: temporary
    this.dataSource.data = this.configs.treeView;
  }

  // TODO: temporary
  hasChild = (_: number, node: TreeView): boolean => !!node.children && node.children.length > 0;

}
