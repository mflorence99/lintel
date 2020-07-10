import { DestroyService } from '../services/destroy';
import { SingleselectorOptions } from './singleselector';

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
import { OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { forwardRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

export type SelectArrayType = (number | string)[];

/**
 * Select array form control
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
      useExisting: forwardRef(() => SelectArrayComponent),
      multi: true
    },
    DestroyService
  ],
  selector: 'lintel-select-array',
  templateUrl: 'select-array.html',
  styleUrls: ['select-array.scss']
})

export class SelectArrayComponent implements ControlValueAccessor, OnInit {

  @Input() columnWidth = '10rem';
  @Input() enabled = true;
  @Input() maxItems = Infinity;
  @Input() options: SingleselectorOptions = [];

  selectArrayForm: FormGroup;

  @Input() type: 'number' | 'text' = 'text';
  @Input() uniqueItems: boolean;

  values: SelectArrayType = [];

  @Input()
  get value(): SelectArrayType {
    return this.values;
  }
  set value(value: SelectArrayType) {
    this.values = value ?? [];
    this.underConstruction = true;
    const selects = this.selectArrayForm.controls.selects as FormArray;
    // NOTE: there's always one more input for a new value
    // trim off excess selects
    while (selects.length > (this.values.length + 1))
      selects.removeAt(selects.length - 1);
    while (selects.length < (this.values.length + 1))
      selects.push(new FormControl(null));
    // patch in the new values
    selects.patchValue([...this.values, null], { emitEvent: false });
    this.underConstruction = false;
    this.onChange?.(this.values);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  private onChange: Function;
  private underConstruction: boolean;

  /** ctor */
  constructor(private cdf: ChangeDetectorRef,
              private destroy$: DestroyService,
              private formBuilder: FormBuilder) {
    // initialize the form
    this.selectArrayForm = this.formBuilder.group({
      selects: new FormArray([])
    });
  }

  /** Add another selector */
  addSelector(): void {
    const selects = this.selectArrayForm.controls.selects as FormArray;
    selects.push(new FormControl(null));
  }

  /** When we're ready */
  ngOnInit(): void {
    this.selectArrayForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.values = value.selects
          .filter(val => !!val);
        if (this.uniqueItems)
          this.values = Array.from(new Set(this.values));
        this.onChange?.(this.value);
      });
  }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** Remove specified selector */
  removeSelector(ix: number): void {
    const selects = this.selectArrayForm.controls.selects as FormArray;
    selects.removeAt(ix);
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

}
