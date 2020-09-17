import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { FilterState } from '../../state/filter';
import { LintelState } from '../../state/lintel';
import { Params } from '../../services/params';
import { SelectionState } from '../../state/selection';
import { Utils } from '../../services/utils';

import { Actions } from '@ngxs/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

/**
 * Configs component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  selector: 'lintel-configs',
  templateUrl: 'configs.html',
  styleUrls: ['configs.scss']
})
export class ConfigsComponent implements OnInit {
  /** ctor */
  constructor(
    private actions$: Actions,
    private cdf: ChangeDetectorRef,
    public configs: ConfigsState,
    private destroy$: DestroyService,
    public filter: FilterState,
    public lintel: LintelState,
    public params: Params,
    public selection: SelectionState,
    public utils: Utils
  ) {}

  /** Color code a file */
  colorForFile(fileName: string): string {
    if (fileName.endsWith('package.json')) return 'var(--mat-light-green-a700)';
    else if (fileName.endsWith('.js')) return 'var(--mat-light-blue-a700)';
    else if (fileName.endsWith('.cjs')) return 'var(--mat-pink-a700)';
    else if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
      return 'var(--mat-yellow-a700)';
    else return 'var(--mat-teal-a700)';
  }

  /** Make an icon for a file */
  iconForFile(fileName: string): string[] {
    if (fileName.endsWith('package.json')) return ['fab', 'node-js'];
    else if (fileName.endsWith('.js')) return ['fab', 'js'];
    else return ['far', 'file-code'];
  }

  /** When we're ready */
  ngOnInit(): void {
    this.handleActions$();
  }

  /** Select a category */
  selectCategory(event: Event, category: string): boolean {
    event.stopPropagation();
    if (category !== this.selection.category) {
      this.selection.select({ category });
      return true;
    } else return false;
  }

  /** Select a file name */
  selectFileName(event: Event, fileName: string): boolean {
    event.stopPropagation();
    if (fileName !== this.selection.fileName) {
      this.selection.select({ fileName: fileName, override: null });
      return true;
    } else return false;
  }

  /** Select an override */
  selectOverride(event: Event, ix: number): boolean {
    event.stopPropagation();
    if (ix !== this.selection.override) {
      this.selection.select({
        override: ix,
        overrideFiles: ix != null ? this.configs.overrides[ix].files : null
      });
      // disable app when override selected that's not ours
      if (this.configs.isOverrideInherited(ix))
        this.lintel.enable({ enabled: false, message: this.disabledMessage() });
      else this.lintel.enable({ enabled: true, message: null });
      return true;
    } else return false;
  }

  /** Shorten a file name */
  shortenFileName(fileName: string): string {
    return this.configs.shortFileName(fileName).replace(/\//g, '/\u200b');
  }

  // private methods

  private disabledMessage(): string {
    const fileName = this.shortenFileName(this.selection.fileName);
    const files = this.configs.overrides[
      this.selection.override
    ].files.toString();
    return `The settings for <b>${files}</b> files are inherited from configurations in <code>extends</code> and cannot be modified. To override them, add an <code>overrides</code> section to this <a>${fileName}</a> configuration.`;
  }

  private handleActions$(): void {
    this.actions$
      .pipe(
        filter(({ status }) => status === 'SUCCESSFUL'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // NOTE: general settings and active rules are always available
        if (
          this.selection.category !== this.params.generalSettings &&
          this.selection.category !== this.params.activeCategory
        ) {
          // categories will be all the available categories in order
          // NOTE: Active Rules is always available
          const categories = [];
          categories.push(this.params.activeCategory);
          categories.push(...this.configs.categories);
          // if the selected category is no longer available, pick one that is
          if (
            categories.length > 0 &&
            !categories.includes(this.selection.category)
          )
            this.selection.select({ category: this.params.activeCategory });
        }
        this.cdf.markForCheck();
      });
  }
}
