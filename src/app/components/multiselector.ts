import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DestroyService } from '../services/destroy';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { forwardRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

// NOTE: options can be one of the following:
// -- array of encoded values
// -- array of [encoded, decoded, description] values <-- PREFERRED
// -- array of {
//               [nameOfEncoded]: encoded, 
//               [nameOfDecoded]: decoded, 
//               [nameOfDescription]: description
//             } values

export type MultiselectorOptions = string[] | string[][] | any[];

// NOTE: values can be one of the following:
// -- array of encoded values 
// -- Record<string, boolean> <-- PREFERRED

export type MultiselectorValues = string[] | Record<string, boolean>;

/**
 * Multiselect values via checkboxes
 * 
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
    },
    DestroyService
  ],
  selector: 'lintel-multiselector',
  templateUrl: 'multiselector.html',
  styleUrls: ['multiselector.scss']
})

export class MultiselectorComponent implements ControlValueAccessor, OnInit {

  @Input() columnWidth = '10rem';

  controls: FormControl[] = [];

  multiSelectorForm: FormGroup;

  @Input() nameOfDecoded = 'value';
  @Input() nameOfDescription = 'description';
  @Input() nameOfEncoded = 'id';

  values = new Set<string>();

  @Input()
  get options(): MultiselectorOptions {
    return this._origOptions;
  }
  set options(options: MultiselectorOptions) {
    if (options && !this._origOptions) {
      this._origOptions = options;
      this._options = this.fromMultiselectorOptions(options);
      this.underConstruction = true;
      // create controls for each option
      // NOTE: now options are [encoded, decoded]
      this.controls = this._options
        .map(option => new FormControl(this.values.has(option[0])));
      const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
      this.controls.forEach(control => checkboxes.push(control));
      this.underConstruction = false;
    }
  }

  @Input()
  get value(): MultiselectorValues {
    return this.toMultiselectorValues();
  }
  set value(values: MultiselectorValues) {
    this.values = this.fromMultiselectorValues(values);
    // patch the form to reflect the values
    this.underConstruction = true;
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    const patch = this._options.map(option => this.values.has(option[0]));
    checkboxes.patchValue(patch, { emitEvent: false });
    this.underConstruction = false;
    this.onChange?.(this.value);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  // these shadow visible properties
  private _options: string[][] = [];
  private _origOptions: MultiselectorOptions;

  private onChange: Function;
  private underConstruction: boolean;
  private valuesType: 'array' | 'object';

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef,
              private destroy$: DestroyService,
              private formBuilder: FormBuilder) {
    this.multiSelectorForm = this.formBuilder.group({
      checkboxes: new FormArray([])
    });
  }

  /** Get an indexed decoded option value */
  getOptionDecoded(ix: number): string {
    return this._options[ix][1];
  }

  /** Get an indexed option description */
  getOptionDescription(ix: number): string {
    return this._options[ix][2];
  }

  /** Get an indexed encoded option value */
  getOptionEncoded(ix: number): string {
    return this._options[ix][0];
  }

  /** When we're ready */
  ngOnInit(): void {
    const checkboxes = this.multiSelectorForm.controls.checkboxes as FormArray;
    checkboxes.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.destroy$)
      )
      .subscribe((settings: boolean[]) => {
        // NOTE: remember options are [encoded, decoded]
        const values = this._options
          .filter((option, ix) => settings[ix])
          .map(option => option[0]);
        this.values = new Set(values);
        this.onChange?.(this.value);
      });
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

  private fromMultiselectorOptions(options: MultiselectorOptions): string[][] {
    let normalized: string[][] = [];
    // NOTE: see above for different options for supplying options
    if (Array.isArray(options) && (options.length > 0)) {
      if (typeof options[0] === 'string')
        normalized = (options as string[]).map(option => [option, option, null]);
      else if (Array.isArray(options[0]))
        normalized = options as string[][];
      else if (typeof options[0] === 'object')
        normalized = (options as string[]).map(option => [option[this.nameOfEncoded], option[this.nameOfDecoded], option[this.nameOfDescription]]);
    }
    return normalized;
  }

  private fromMultiselectorValues(values: MultiselectorValues): Set<string> {
    if (Array.isArray(values)) {
      this.valuesType = 'array';
      return new Set(values);
    } else if (values && typeof values === 'object') {
      this.valuesType = 'object';
      return new Set(Object.keys(values).filter(val => values[val]));
    } else {
      this.valuesType = 'object';
      return new Set();
    }
  }

  private toMultiselectorValues(): MultiselectorValues {
    if (this.valuesType === 'object') {
      const obj = this._options.reduce((acc, option) => {
        acc[option[0]] = false;
        return acc;
      }, { });
      this.values.forEach(value => obj[value] = true);
      return obj;
    } else return Array.from(this.values) as MultiselectorValues;
  }

}
