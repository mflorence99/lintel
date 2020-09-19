import { ConfigsState } from '../../state/configs';
import { LintelState } from '../../state/lintel';
import { Params } from '../../services/params';
import { RuleDigest } from '../../state/configs';
import { RulesState } from '../../state/rules';
import { SelectionState } from '../../state/selection';
import { Settings } from '../../state/configs';
import { Utils } from '../../services/utils';
import { View } from '../../state/configs';

import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

declare const lintelVSCodeAPI;

/**
 * Rules component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lintel-rules',
  templateUrl: 'rules.html',
  styleUrls: ['rules.scss']
})
export class RulesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(ContextMenuComponent, { static: true })
  contextMenu: ContextMenuComponent;

  @Input()
  get view(): View {
    return this._view;
  }
  set view(view: View) {
    this.unobserveRules();
    this.hydratedRules = new Set<string>();
    this.observedRules = new Set<string>();
    this.utils.nextTick(() => this.observeRules());
    this._view = view;
  }

  private _view: View;
  private hydratedRules = new Set<string>();
  private intersectionObserver: IntersectionObserver;
  private observedRules = new Set<string>();

  /** ctor */
  constructor(
    private cdf: ChangeDetectorRef,
    private host: ElementRef,
    public configs: ConfigsState,
    private contextMenuService: ContextMenuService,
    public lintel: LintelState,
    public params: Params,
    public rules: RulesState,
    public selection: SelectionState,
    public utils: Utils
  ) {}

  /** Can we copy this rule? */
  canCopyRule(ruleDigest: RuleDigest): boolean {
    return ruleDigest.defined && this.lintel.isEnabled;
  }

  /**  Can we export this rule? */
  canExportRule(ruleDigest: RuleDigest): boolean {
    const ruleName = ruleDigest.ruleName;
    return !!(
      this.configs.configuration.rules[ruleName] ||
      this.configs.extensionSettings[ruleName]
    );
  }

  /** Execute context menu command */
  execute(ruleDigest: RuleDigest, command: string): void {
    const ruleName = ruleDigest.ruleName;
    let settings: Settings;
    switch (command) {
      case 'delete':
        this.configs.deleteRule({ ruleName });
        break;

      case 'export':
        settings =
          this.configs.configuration.rules[ruleName] ||
          this.configs.extensionSettings[ruleName];
        lintelVSCodeAPI.postMessage({
          command: 'clipboardCopy',
          text: JSON.stringify({ [ruleName]: settings })
        });
        break;
    }
  }

  /** Is the nominated rul hydrated? */
  isRuleHydrated(ruleDigest: RuleDigest): boolean {
    return this.hydratedRules.has(ruleDigest.ruleName);
  }

  /** When the view is complete */
  ngAfterViewInit(): void {
    this.observeRules();
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.observeIntersection();
  }

  /** Show the context menu manually (on left click) */
  showContextMenu(event: MouseEvent, ruleDigest: RuleDigest): void {
    // @see https://www.npmjs.com/package/ngx-contextmenu
    this.contextMenuService.show.next({ event, item: ruleDigest });
    event.preventDefault();
    event.stopPropagation();
  }

  /** Track ngFor by rule name */
  trackByRule(_, item): string {
    return item.key;
  }

  // private methods

  private observeIntersection(): void {
    const cb = this.observeIntersectionImpl.bind(this);
    this.intersectionObserver = new IntersectionObserver(cb, {
      root: document.querySelector('#theScroller'),
      rootMargin: this.params.intersection.rootMargin,
      threshold: this.params.intersection.threshold
    });
  }

  private observeIntersectionImpl(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const rule = entry.target as HTMLElement;
      const isNow = entry.isIntersecting;
      const was = rule.classList.contains('hydrated');
      if (was !== isNow) {
        const colorize = (color: string): string => {
          return `background-color: ${color}; color: white; font-weight: bold; padding: 4px`;
        };
        // log when hydration state changes
        if (isNow) console.log('%cHydrate', colorize('#1b5e20'), rule.id);
        else console.log('%cDehydrate', colorize('#b71c1c'), rule.id);
      }
      // make sure hydrated rows are  marked
      if (was) {
        rule.classList.remove('hydrated');
        this.hydratedRules.delete(rule.id);
      }
      if (isNow) {
        rule.classList.add('hydrated');
        this.hydratedRules.add(rule.id);
      }
    });
    this.cdf.markForCheck();
  }

  private observeRules(): void {
    const newObservedRules = new Set<string>();
    const rules = Array.from(
      this.host.nativeElement.querySelectorAll('lintel-rule')
    );
    rules.forEach((rule: HTMLElement) => {
      newObservedRules.add(rule.id);
      if (!this.observedRules.has(rule.id))
        this.intersectionObserver.observe(rule);
    });
    this.observedRules = newObservedRules;
  }

  private unobserveRules(): void {
    const rules = Array.from(
      this.host.nativeElement.querySelectorAll('lintel-rule')
    );
    rules.forEach((rule: HTMLElement) =>
      this.intersectionObserver.unobserve(rule)
    );
  }
}
