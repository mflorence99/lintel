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

export type KeyValueType = Record<string, ValueType>;

export type ValueType = string | number | boolean | Record<string, boolean>;

/**
 * <key-value> component
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
      useExisting: forwardRef(() => KeyValueComponent),
      multi: true
    }
  ],
  selector: 'lintel-key-value',
  styleUrls: ['key-value.scss'],
  templateUrl: 'key-value.html'
})

export class KeyValueComponent implements ControlValueAccessor, OnInit, OnDestroy { 

  @Input() columnWidth = '20rem';

  @Input() keyConstraints: string[];

  keyValueForm: FormGroup;
  keyValues: KeyValueType = { };

  @Input() max: number;
  @Input() min: number;

  @Input() step: number;

  @Input() type: 'checkbox' | 'number' | 'text' = 'text';

  @Input() valueConstraints: string[];

  @Input() 
  get value(): KeyValueType {
    return this.keyValues; 
  }
  set value(value: KeyValueType) {
    this.keyValues = value ?? { };
    this.underConstruction = true;
    const keyValues = this.keyValueForm.controls.keyValues as FormArray;
    // NOTE: there's always one more array for a new key-value
    // trim off excess keyValues
    const keys = Object.keys(this.keyValues);
    while (keyValues.length > (keys.length + 1))
      keyValues.removeAt(keyValues.length - 1);
    while (keyValues.length < (keys.length + 1))
      keyValues.push(new FormArray([new FormControl(null), new FormControl(null)]));
    // patch in the new values
    const patch = Object.entries(this.keyValues).concat([[null, null]]);
    keyValues.patchValue(patch, { emitEvent: false });
    this.underConstruction = false;
    this.onChange?.(this.value);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  private notifier = new Subject<void>();
  private onChange: Function;
  private underConstruction: boolean;

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef,
              private formBuilder: FormBuilder) { 
    // initialize the form
    this.keyValueForm = this.formBuilder.group({
      keyValues: new FormArray([])
    });
  }

  /** Add a new key-value pair */
  addKeyValue(): void {
    const keyValues = this.keyValueForm.controls.keyValues as FormArray;
    keyValues.push(new FormArray([new FormControl(null), new FormControl(null)]));
  }

  /** When we're done */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** When we're ready */
  ngOnInit(): void {
    this.keyValueForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.notifier)
      )
      .subscribe(value => {
        this.keyValues = value.keyValues
          .filter(entry => !!entry[0])
          .reduce((acc, cur) => {
            acc[cur[0]] = (this.type === 'number') ? Number(cur[1]) : cur[1];
            return acc;
          }, { });
        this.onChange?.(this.value);
      });
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** Remove a specified key-value pair */
  removeKeyValue(ix: number): void {
    const keyValues = this.keyValueForm.controls.keyValues as FormArray;
    keyValues.removeAt(ix);
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

}
