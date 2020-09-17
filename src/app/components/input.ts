import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { forwardRef } from '@angular/core';

export type InputValueType = number | string;

/**
 * Simple input form control
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
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  selector: 'lintel-input',
  templateUrl: 'input.html',
  styleUrls: ['input.scss']
})
export class InputComponent implements ControlValueAccessor {
  @Input() enabled = true;

  @ViewChild('input', { static: true }) input: ElementRef;

  @Input() max: number;
  @Input() min: number;

  @Input() placeholder = '';

  @Input() step: number;

  @Input() type: 'number' | 'text' = 'text';

  @Input()
  get value(): InputValueType {
    return this._value;
  }
  set value(value: InputValueType) {
    this._value = value;
    if (this.input?.nativeElement) this.input.nativeElement.value = value;
    this.onChange?.(this.type === 'number' ? Number(value) : value);
    this.cdf.markForCheck();
  }

  private _value: InputValueType;
  private onChange: Function;

  /** ctor */
  constructor(private cdf: ChangeDetectorRef) {}

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(): void {}

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }
}
