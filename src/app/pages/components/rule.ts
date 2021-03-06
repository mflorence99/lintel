import { ConfigsState } from '../../state/configs';
import { DestroyService } from '../../services/destroy';
import { LintelState } from '../../state/lintel';
import { RuleDigest } from '../../state/configs';
import { RulesState } from '../../state/rules';
import { SchemaDigest } from '../../state/rules';
import { SelectionState } from '../../state/selection';
import { Settings } from '../../state/configs';

import { AbstractControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

declare const lintelVSCodeAPI;

/**
 * Rule component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  selector: 'lintel-rule',
  templateUrl: 'rule.html',
  styleUrls: ['rule.scss']
})
export class RuleComponent implements OnInit {
  controls: AbstractControl[] = [];

  @Input() isHydrated: boolean;

  ruleForm: FormGroup;

  @Input()
  get ruleDigest(): RuleDigest {
    return this._ruleDigest;
  }
  set ruleDigest(ruleDigest: RuleDigest) {
    this._ruleDigest = ruleDigest;
    this.rebuildLevel();
  }

  @Input()
  get schemaDigest(): SchemaDigest {
    return this._schemaDigest;
  }
  set schemaDigest(schemaDigest: SchemaDigest) {
    if (schemaDigest && !this._schemaDigest) {
      this._schemaDigest = schemaDigest;
      this.rebuildControls();
    }
  }

  private _ruleDigest: RuleDigest;
  private _schemaDigest: SchemaDigest;
  private underConstruction: boolean;

  /** ctor */
  constructor(
    public configs: ConfigsState,
    private destroy$: DestroyService,
    private formBuilder: FormBuilder,
    public lintel: LintelState,
    public rules: RulesState,
    public selection: SelectionState
  ) {
    this.ruleForm = this.formBuilder.group({
      level: null,
      root: this.formBuilder.group({
        elements: new FormArray([])
      })
    });
  }

  /** Make a camel case string breakable */
  breakable(camelCase: string): string {
    const matches = camelCase.match(/(^[a-z]|[A-Z0-9])[a-z]*/g);
    return matches ? matches.join('\u200b') : camelCase;
  }

  /** Edit a file */
  editFile(fileName: string, ruleDigest?: RuleDigest): void {
    if (this.lintel.isEnabled)
      lintelVSCodeAPI.postMessage({ command: 'editFile', fileName });
    if (ruleDigest?.rule?.meta?.schema)
      console.log(
        `%c${ruleDigest.ruleName}:`,
        'background-color: #00838f; color: white; font-weight: bold; padding: 4px',
        JSON.stringify(ruleDigest.rule.meta.schema, null, 2)
      );
  }

  /** Get all the controls from a FormGroup */
  formGroupControls(group: FormGroup): AbstractControl[] {
    return Object.values(group.controls);
  }

  /** When we're ready */
  ngOnInit(): void {
    this.handleValueChanges$();
  }

  /** Open URL */
  openURL(url: string): void {
    lintelVSCodeAPI.postMessage({ command: 'openFile', url });
  }

  // private methods

  private handleValueChanges$(): void {
    this.ruleForm.valueChanges
      .pipe(
        filter(() => !this.underConstruction),
        map((changes) => [changes.level, ...changes.root.elements]),
        takeUntil(this.destroy$)
      )
      .subscribe((changes: Settings) => {
        this.configs.changeRule({
          changes,
          ruleName: this.ruleDigest.ruleName
        });
      });
  }

  private rebuildControls(): void {
    if (this.schemaDigest) {
      this.underConstruction = true;
      // recursively make a group from an object element
      const makeGroup = (element, settings): any => {
        return element.elements.reduce((acc, element) => {
          const setting = settings?.[element.name];
          if (element.type === 'object')
            acc[element.name] = this.formBuilder.group(
              makeGroup(element, setting)
            );
          else acc[element.name] = [setting ?? element.default];
          return acc;
        }, {});
      };
      // create controls for each GUI element
      this.controls = this.schemaDigest.elements.map((element, ix) => {
        const settings = this.ruleDigest.settings?.[ix + 1];
        if (element.type === 'object')
          return this.formBuilder.group(
            makeGroup(element, settings ?? element.default)
          );
        return new FormControl(settings);
      });
      const elements = this.ruleForm.controls.root['controls']
        .elements as FormArray;
      elements.clear();
      this.controls.forEach((control) => elements.push(control));
      this.underConstruction = false;
    }
  }

  private rebuildLevel(): void {
    if (this.ruleDigest) {
      this.underConstruction = true;
      this.ruleForm.patchValue(
        { level: this.ruleDigest.level },
        { emitEvent: false }
      );
      this.underConstruction = false;
    }
  }
}
