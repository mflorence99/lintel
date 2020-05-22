import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { forwardRef } from '@angular/core';
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
 * NOTE: just enough to be able to match VSCode as well as possible
 *
 * @see https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
 *
 * Reference is old, but still helpful
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectorComponent),
      multi: true
    }
  ],
  selector: 'lintel-multiselector',
  templateUrl: 'multiselector.html',
  styleUrls: ['multiselector.scss']
})

export class MultiselectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  controls: FormControl[] = [];

  @Input() label: string;

  @Input() maxVisibleOptions = 5;

  multiSelectorForm: FormGroup;

  @Input() nameOfDecoded = 'value';
  @Input() nameOfEncoded = 'id';

  // TODO: this is a hack based on the fact that we "know" checkboxes are 24x24
  // but it works over an extrememe range of realistic font sizes
  rowHeight = 24;

  values = new Set<string>();

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
    this.onChange?.(this.value);
  }

  @Input()
  get value(): MultiselectorValues {
    if (this.valuesType === 'object') {
      const obj = this._options.reduce((acc, option) => {
        acc[option[0]] = false;
        return acc;
      }, {});
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
    this.onChange?.(this.value);
  }

  // these shadow visible properties
  private _options: string[][] = [];
  private _origOptions: MultiselectorOptions;

  private notifier = new Subject<void>();
  private onChange: Function;
  private valuesType: 'array' | 'object';

  /** ctor  */
  constructor(private formBuilder: FormBuilder) {
    this.multiSelectorForm = this.formBuilder.group({
      checkboxes: new FormArray([])
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

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    checkboxes.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe((settings: boolean[]) => {
        // NOTE: remember options are [encoded, decoded]
        const values = this._options
          .filter((option, ix) => settings[ix])
          .map(option => option[0]);
        this.values = new Set(values);
        // this.onChange?.(this.value);
      });
  }

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

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
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
