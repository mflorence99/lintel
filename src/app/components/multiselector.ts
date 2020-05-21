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
import { OnInit } from '@angular/core';
import { Optional } from '@angular/core';
import { Self } from '@angular/core';
import { Subject } from 'rxjs';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';

// NOTE: options can be one of the following:
// -- array of encoded values
// -- array of [encoded, decoded] values <-- PREFERRED
// -- array of {[nameOfEncoded]: encoded, [nameOfDecoded]: decoded} values

export type MultiselectorOptions = string[] | string[][];

// NOTE: values can be one of the following:
// -- array of encoded values <-- PREFERRED
// -- Record<string, boolean>

export type MultiselectorValues = string[] | Record<string, boolean>;

/**
 * Multiselect values via checkboxes
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

export class MultiselectorComponent implements ControlValueAccessor, MatFormFieldControl<MultiselectorValues>, OnInit, OnDestroy {

  static nextID = 0;

  @HostBinding('attr.aria-describedby') describedBy = '';
  @HostBinding() id = `lintel-multiselector-${MultiselectorComponent.nextID++}`;

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

  @Input()
  get options(): MultiselectorOptions {
    return this._origOptions; 
  }
  set options(options: MultiselectorOptions) {
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
  get value(): MultiselectorValues {
    if (this.valuesType === 'object') {
      const obj = this._options.reduce((acc, option) => {
        acc[option[0]] = false;
        return acc;
      }, { });
      this.values.forEach(value => obj[value] = true);
      return obj;
    } else return Array.from(this.values) as MultiselectorValues;
  }
  set value(values: MultiselectorValues) {
    if (!values || Array.isArray(values)) {
      this.valuesType = 'array';
      this.values = new Set(values as string[]);
    } else if (typeof values === 'object') {
      this.valuesType = 'object';
      this.values = new Set(Object.keys(values).filter(val => values[val]));
    }
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
  values = new Set<string>();

  // @see MatFormFieldControl
  controlType = 'lintel-multiselector';
  focused = false;
  shouldLabelFloat = false;
  stateChanges = new Subject<void>();

  // TODO: this is a hack based on the fact that we "know" checkboxes are 24x24
  // but it works over an extrememe range of realistic font sizes
  rowHeight = 24;

  private notifier = new Subject<void>();
  private onChange: Function;
  private valuesType: 'array' | 'object';

  // these shadow visible properties
  private _disabled: boolean;
  private _options: string[][] = [];
  private _origOptions: MultiselectorOptions;
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
    // @see https://material.angular.io/guide/creating-a-custom-form-field-control
    if (this.ngControl !== null)
      this.ngControl.valueAccessor = this;
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

  ngOnInit(): void {
    // monitor for focus
    this.focusMonitor.monitor(this.element.nativeElement, true)
      .pipe(takeUntil(this.notifier))
      .subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    // monitor for value
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    checkboxes.valueChanges
      .pipe(takeUntil(this.notifier))
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

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.element.nativeElement);
  }

  // private methods

  private normalizeOptions(options: MultiselectorOptions): string[][] {
    let normalized: string[][] = [];
    // NOTE: see above for different options for supplying options
    if (Array.isArray(options) && (options.length > 0)) {
      if (typeof options[0] === 'string')
        normalized = (options as string[]).map(option => [option, option]);
      else if (Array.isArray(options[0]))
        normalized = options as string[][];
      else if (typeof options[0] === 'object')
        normalized = (options as string[]).map(option => [option[this.nameOfEncoded], option[this.nameOfDecoded]]);
    }
    return normalized;
  }

}
