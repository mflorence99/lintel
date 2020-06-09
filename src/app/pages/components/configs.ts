import { AfterViewChecked } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../../state/configs';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { Utils } from '../../services/utils';

/**
 * Configs component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-configs',
  templateUrl: 'configs.html',
  styleUrls: ['configs.scss']
})

export class ConfigsComponent implements AfterViewChecked {

  @Output() categorySelected = new EventEmitter<void>();

  /** ctor */
  constructor(public configs: ConfigsState,
              public params: Params,
              public selection: SelectionState,
              public utils: Utils) { }

  /** Color code a file */
  colorForFile(fileName: string): string {
    if (fileName.endsWith('package.json'))
      return 'var(--mat-amber-a100)';
    else if (fileName.endsWith('.js'))
      return 'var(--mat-blue-a100)';
    else if (fileName.endsWith('.cjs'))
      return 'var(--mat-red-a100)';
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
      return 'var(--mat-teal-a100)';
    else return 'var(--mat-pink-a100)';
  }

  /** Make an icon for a file */
  iconForFile(fileName: string): string[] {
    if (fileName.endsWith('package.json'))
      return ['fab', 'node-js'];
    else if (fileName.endsWith('.js'))
      return ['fab', 'js'];
    else return ['fas', 'file-code'];
  }

  /** On every change detection */
  ngAfterViewChecked(): void {
    // NOTE: general settings always available
    if (this.selection.category !== this.params.generalSettings) {
      const categories = [];
      if (!this.utils.isEmptyObject(this.configs.activeView))
        categories.push(this.params.activeCategory);
      categories.push(...this.configs.categories);
      if (!this.utils.isEmptyObject(this.configs.unknownView))
        categories.push(this.params.unknownCategory);
      // categories is now all the available categories in order
      // if the selected category is no longer available, pick the first that is
      if ((categories.length > 0) 
        && !categories.includes(this.selection.category)) 
        this.utils.nextTick(() => this.selection.select({ category: categories[0] }));
    }
  }

  /** Select a category */
  selectCategory(event: Event, category: string): void {
    if (category !== this.selection.category) {
      this.selection.select({ category });
      this.categorySelected.emit();
    }
    event.stopPropagation();
  }

  /** Select a file name */
  selectFileName(event: Event, fileName: string): void {
    if (fileName !== this.selection.fileName) {
      this.selection.select({ fileName: null });
      // TODO: this trick forces us to rebuild when fileName changes
      this.utils.nextTick(() => this.selection.select({ fileName }));
    }
    event.stopPropagation();
  }

}
