import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Optional } from '@angular/core';
import { Self } from '@angular/core';
import { Subject } from 'rxjs';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * Multiselecxt values via checkboxes
 *
 * NOTE: quite complicated to follow Angular Material custom control spec
 *
 * @see https://material.angular.io/guide/creating-a-custom-form-field-control
 */

/* eslint @typescript-eslint/member-ordering: "off" */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lintel-multiselector',
  templateUrl: 'multiselector.html',
  styleUrls: ['multiselector.scss']
})

export class MultiselectorComponent
implements ControlValueAccessor, MatFormFieldControl<string[]>, OnDestroy {

  static nextID = 0;

  @HostBinding('attr.aria-describedby') describedBy = '';
  @HostBinding() id = 'lintel-multiselector-$ DatepickerComponent.nextID++}';

  @Input()
  get disabled(): boolean {
    return this._disabled; 
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  @Input() maxVisibleOptions = 5;

  @Input() nameOfEncoded = 'id';
  @Input() nameOfDecoded = 'value';

  // NOTE: options can be one of the following:
  // -- array of encoded values
  // -- array of [encoded, decoded] values <-- PREFERRED
  // -- array of {[nameOfEncoded]: encoded, [nameOfDecoded]: decoded} values

  @Input()
  get options(): any[] {
    return this._origOptions; 
  }
  set options(options: any[]) {
    this._origOptions = options;
    this._options = this.normalizeOptions(options);
    // NOTE: now options are [encoded, decoded]
    this.controls = this._options.map(option => new FormControl(this.values.has(option[0])));
    // remove all prior controls from form
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    while (checkboxes.controls.length)
      checkboxes.removeAt(0);
    // create controls for each option
    this.controls.forEach(control => checkboxes.push(control));
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string {
    return this._placeholder; 
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required; 
  }
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  @Input()
  get value(): string[] {
    return Array.from(this.values) as string[];
  }
  set value(values: string[]) {
    if (values && !(Array.isArray(values) 
     && values.every(value => typeof value === 'string')))
      throw new Error(`${values} must be an array of strings`);
    this.values = new Set(values);
    // patch the form to reflect the values
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    const patch = this._options.map(option => this.values.has(option[0]));
    checkboxes.patchValue(patch, { emitEvent: false });
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.values.size === 0; 
  }
  get errorState(): boolean {
    return !this.multiSelectorForm.invalid; 
  }

  controls: FormControl[] = [];
  multiSelectorForm: FormGroup;
  values = new Set();

  // @see MatFormFieldControl
  controlType = 'lintel-multiselector';
  focused = false;
  shouldLabelFloat = false;
  stateChanges = new Subject<void>();

  private onChange: Function;
  private _disabled: boolean;
  private _options: string[][] = [];
  private _origOptions: any[] = [];
  private _placeholder: string;
  private _required: boolean;

  /** ctor  */
  constructor(private element: ElementRef,
              private focusMonitor: FocusMonitor,
              private formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl) {
    // create the form initially empty
    this.multiSelectorForm = this.formBuilder.group({ 
      checkboxes: new FormArray([])
    });
    // ngControl magic
    if (!this.ngControl)
      this.ngControl.valueAccessor = this;
    // monitor for focus
    this.focusMonitor.monitor(this.element.nativeElement, true)
      .subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    // monitor for value
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    checkboxes.valueChanges
      .subscribe((settings: boolean[]) => {
        // NOTE: remember options are [encoded, decoded]
        const values = this._options
          .filter((option, ix) => settings[ix])
          .map(option => option[0]);
        this.values = new Set(values);
        // propagate changes
        if (this.onChange)
          this.onChange(this.value);
        this.stateChanges.next();
      });
  }

  /** Get an indexed decoded option value */
  getOptionDecoded(ix: number): string {
    return this._options[ix][1];
  }

  /** Get an indexed encoded option value */
  getOptionEncoded(ix: number): string {
    return this._options[ix][0];
  }

  /** @see MatFormFieldControl */
  onContainerClick(_: MouseEvent): void { }

  /** Develop readout of selected options */
  readout(): string {
    return this._options
      .filter(option => this.values.has(option[0]))
      .map(option => option[1])
      .join(', ');
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** @see MatFormFieldControl */
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

  // lifecycle methods

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.element.nativeElement);
  }

  // private methods

  private normalizeOptions(options: any[]): string[][] {
    let normalized: string[][] = [];
    // NOTE: see above for different options for supplying options
    if (options && (options.length > 0)) {
      if (typeof options[0] === 'string')
        normalized = options.map(option => [option, option]);
      else if (Array.isArray(options[0]))
        normalized = options;
      else if (typeof options[0] === 'object')
        normalized = options.map(option => [option[this.nameOfEncoded], option[this.nameOfDecoded]]);
    }
    return normalized;
  }

}
