import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { SchemasState } from '../../state/schemas';
import { SelectionState } from '../../state/selection';
import { TreeView } from '../../state/configs';
import { TreeViewFlattened } from '../../state/configs';

/**
 * Lintel Root
 */

@Component({
  selector: 'lintel-root',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})

export class RootPageComponent {

  dataSource: MatTreeFlatDataSource<TreeView, TreeViewFlattened>;
  treeControl: FlatTreeControl<TreeViewFlattened>;
  treeFlattener: MatTreeFlattener<TreeView, TreeViewFlattened>;

  /** ctor */
  constructor(public configs: ConfigsState,
              public schemas: SchemasState,
              public selection: SelectionState) {
    this.configs.initialize();
    this.schemas.initialize();
    // TODO: temporary
    this.treeControl = new FlatTreeControl<TreeViewFlattened>(node => node.level * 0, node => node.expandable);
    const transformer = (node: TreeView, level: number): TreeViewFlattened => {
      return {
        expandable: !!node.children && node.children.length > 0,
        fileName: node.fileName,
        level: level,
      };
    };
    this.treeFlattener = new MatTreeFlattener(transformer, node => node.level, node => node.expandable, node => node.children);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.configs.treeView;
    // TODO: select first entry
    this.selection.select({ fileName: this.configs.treeView[0].fileName });
  }

  // TODO: temporary
  hasChild = (_: number, node: TreeViewFlattened): boolean => node.expandable;

  select(fileName: string): void {
    this.selection.select({ fileName });
  }

}
