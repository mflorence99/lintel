import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { forwardRef } from '@angular/core';

/**
 * Simple checkbox form control
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
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  selector: 'lintel-checkbox',
  templateUrl: 'checkbox.html',
  styleUrls: ['checkbox.scss']
})

export class CheckboxComponent implements ControlValueAccessor {

  @ViewChild('checkbox', { static: true }) checkbox: ElementRef;

  @Input()
  get value(): boolean {
    return this.checked;
  }
  set value(checked: boolean) {
    this.checked = checked;
    this.onChange?.(checked);
  }

  private checked: boolean;
  private onChange: Function;

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** Toggle checkbox value */
  toggleChecked(): void {
    this.value = !this.value;
    this.checkbox?.nativeElement.focus();
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

}
