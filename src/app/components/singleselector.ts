import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { forwardRef } from '@angular/core';

// NOTE: options can be one of the following:
// -- array of encoded values
// -- array of [encoded, decoded] values <-- PREFERRED

export type SingleselectorOptions =
  | SingleselectorValue[]
  | SingleselectorValue[][]
  | any[];

// NOTE: values can be one of the following:
// -- encoded value <-- PREFERRED

export type SingleselectorValue = number | string;

/**
 * Singleselect values via select/options
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
      useExisting: forwardRef(() => SingleselectorComponent),
      multi: true
    }
  ],
  selector: 'lintel-singleselector',
  templateUrl: 'singleselector.html',
  styleUrls: ['singleselector.scss']
})
export class SingleselectorComponent implements ControlValueAccessor {
  @Input() enabled = true;
  @Input() nameOfDecoded = 'value';
  @Input() nameOfEncoded = 'id';
  @Input() placeholder = '';

  @ViewChild('select', { static: true }) select: ElementRef;

  @Input()
  get options(): SingleselectorOptions {
    return this._options;
  }
  set options(options: SingleselectorOptions) {
    if (options && !this.origOptions) {
      this.origOptions = options;
      this._options = this.fromSingleselectorOptions(options);
    }
  }

  @Input()
  get value(): SingleselectorValue {
    return this._value;
  }
  set value(value: SingleselectorValue) {
    this._value = value;
    if (this.select?.nativeElement && this.select.nativeElement.options.length)
      this.select.nativeElement.selectedIndex = this.getOptionIndex(value);
    this.onChange?.(value);
    this.cdf.markForCheck();
  }

  // these shadow visible properties
  private _options: SingleselectorValue[][] = [];
  private _value: SingleselectorValue;

  private onChange: Function;
  private origOptions: SingleselectorOptions;

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef) {}

  /** Get an indexed decoded option value */
  getOptionDecoded(ix: number): string {
    if (this.placeholder) ix = ix - 1;
    return ix >= 0 ? this.options[ix][1] : null;
  }

  /** Get an indexed encoded option value */
  getOptionEncoded(ix: number): string {
    if (this.placeholder) ix = ix - 1;
    return ix >= 0 ? this.options[ix][0] : null;
  }

  /** Get an indexed encoded option value */
  getOptionIndex(value: SingleselectorValue): number {
    const ix = this.options.findIndex((option) => option[0] === value);
    return this.placeholder ? ix + 1 : ix;
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(): void {}

  /** Select an an option by its index  */
  selectByIndex(ix: number): void {
    this.value = this.getOptionEncoded(ix);
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

  // private methods

  private fromSingleselectorOptions(
    options: SingleselectorOptions
  ): SingleselectorValue[][] {
    let normalized: SingleselectorValue[][] = [];
    // NOTE: see above for different options for supplying options
    if (Array.isArray(options) && options.length > 0) {
      if (Array.isArray(options[0]))
        normalized = options as SingleselectorValue[][];
      else normalized = (options as string[]).map((option) => [option, option]);
    }
    return normalized;
  }
}
