import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { forwardRef } from '@angular/core';

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

  @HostBinding('class.focus') focus = false;

  @ViewChild('input', { static: true }) input: ElementRef;

  @Input() placeholder: string;

  @Input()
  get value(): string {
    return this.input?.nativeElement.value;
  }
  set value(value: string) {
    if (this.input?.nativeElement)
      this.input.nativeElement.value = value;
    this.onChange?.(value);
  }

  private onChange: Function;

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

}
