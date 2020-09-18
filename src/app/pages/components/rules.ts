import { ConfigsState } from '../../state/configs';
import { LintelState } from '../../state/lintel';
import { RuleDigest } from '../../state/configs';
import { RulesState } from '../../state/rules';
import { SelectionState } from '../../state/selection';
import { Settings } from '../../state/configs';
import { Utils } from '../../services/utils';
import { View } from '../../state/configs';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ContextMenuService } from 'ngx-contextmenu';
import { Input } from '@angular/core';
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
export class RulesComponent {
  @ViewChild(ContextMenuComponent, { static: true })
  contextMenu: ContextMenuComponent;

  @Input() view: View;

  /** ctor */
  constructor(
    public configs: ConfigsState,
    private contextMenuService: ContextMenuService,
    public lintel: LintelState,
    public rules: RulesState,
    public selection: SelectionState,
    public utils: Utils
  ) {}

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

  /** Is this rule defined? */
  isRuleDefined(ruleDigest: RuleDigest): boolean {
    return ruleDigest.defined;
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
}
