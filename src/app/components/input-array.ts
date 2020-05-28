import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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

import { filter } from 'rxjs/operators';
import { forwardRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

export type InputArrayType = number[] | string[];

/**
 * Input array form control
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
      useExisting: forwardRef(() => InputArrayComponent),
      multi: true
    }
  ],
  selector: 'lintel-input-array',
  templateUrl: 'input-array.html',
  styleUrls: ['input-array.scss']
})

export class InputArrayComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() columnWidth = '10rem';

  inputArrayForm: FormGroup;

  @Input() type: 'number' | 'text' = 'text';

  values: InputArrayType = [];

  @Input()
  get value(): InputArrayType {
    return this.values;
  }
  set value(value: InputArrayType) {
    this.values = value || [];
    this.underConstruction = true;
    const inputs = this.inputArrayForm.controls.inputs as FormArray;
    // NOTE: there's always one more input for a new value
    // trim off excess inputs
    while (inputs.length > (this.values.length + 1))
      inputs.removeAt(inputs.length - 1);
    while (inputs.length < (this.values.length + 1))
      inputs.push(new FormControl(null));
    inputs.patchValue([...this.values, null], { emitEvent: false });
    this.underConstruction = false;
    this.onChange?.(this.values);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  private notifier = new Subject<void>();
  private onChange: Function;
  private underConstruction: boolean;

  /** ctor */
  constructor(private cdf: ChangeDetectorRef,
              private formBuilder: FormBuilder) { 
    // initialize the form
    this.inputArrayForm = this.formBuilder.group({
      inputs: new FormArray([])
    });
  }

  /** Add another input */
  addInput(): void {
    const inputs = this.inputArrayForm.controls.inputs as FormArray;
    inputs.push(new FormControl(null));
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.inputArrayForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.notifier)
      )
      .subscribe(value => {
        this.values = value.inputs.filter(val => !!val);
        this.onChange?.(this.value);
      });
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** Remove specified input */
  removeInput(ix: number): void {
    const inputs = this.inputArrayForm.controls.inputs as FormArray;
    inputs.removeAt(ix);
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

}
