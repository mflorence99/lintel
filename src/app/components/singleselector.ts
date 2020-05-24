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

export type SingleselectorOptions = string[] | string[][];

// NOTE: values can be one of the following:
// -- enc oded value <-- PREFERRED

export type SingleselectorValue = string;

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

  @Input() nameOfDecoded = 'value';
  @Input() nameOfEncoded = 'id';
  @Input() placeholder = '';

  @ViewChild('select', { static: true }) select: ElementRef;

  @Input()
  get options(): SingleselectorOptions {
    return this._options;
  }
  set options(options: SingleselectorOptions) {
    this._options = this.fromSingleselectorOptions(options);
    this.onChange?.(this.value);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  @Input()
  get value(): string {
    return this.getOptionEncoded(this.select?.nativeElement.selectedIndex ?? -1);
  }
  set value(value: string) {
    if (this.select?.nativeElement)
      this.select.nativeElement.selectedIndex = this.getOptionIndex(value);
    this.onChange?.(value);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  // these shadow visible properties
  private _options: string[][] = [];

  private onChange: Function;

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef) { }

  /** Get an indexed decoded option value */
  getOptionDecoded(ix: number): string {
    if (this.placeholder)
      ix = ix - 1;
    return (ix >= 0) ? this.options[ix][1] : null;
  }

  /** Get an indexed encoded option value */
  getOptionEncoded(ix: number): string {
    if (this.placeholder)
      ix = ix - 1;
    return (ix >= 0) ? this.options[ix][0] : null;
  }

  /** Get an indexed encoded option value */
  getOptionIndex(value: string): number {
    const ix = this.options.findIndex(option => option[0] === value);
    return this.placeholder ? ix + 1 : ix;
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** Select an an option by its index  */
  selectByIndex(ix: number): void {
    this.value = this.getOptionEncoded(ix);
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

  // private methods

  private fromSingleselectorOptions(options: SingleselectorOptions): string[][] {
    let normalized: string[][] = [];
    // NOTE: see above for different options for supplying options
    if (Array.isArray(options) && (options.length > 0)) {
      if (typeof options[0] === 'string')
        normalized = (options as string[]).map(option => [option, option]);
      else if (Array.isArray(options[0]))
        normalized = options as string[][];
    }
    return normalized;
  }

}
