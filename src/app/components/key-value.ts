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

export type KeyValueType = Record<string, ValueType>;

export type ValueType = boolean | number | string | Record<string, boolean>;

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
    },
    DestroyService
  ],
  selector: 'lintel-key-value',
  styleUrls: ['key-value.scss'],
  templateUrl: 'key-value.html'
})

export class KeyValueComponent implements ControlValueAccessor, OnInit { 

  @Input() columnWidth = '20rem';

  @Input() defaults: KeyValueType = { };

  @Input() keyConstraints: string[];

  keyValueForm: FormGroup;
  keyValues: KeyValueType = { };

  @Input() max: number;
  @Input() min: number;

  @Input() step: number;

  @Input() type: 'checkbox' | 'multicheckbox' | 'number' | 'text' = 'text';

  @Input() valueConstraints: string[];

  @Input() 
  get value(): KeyValueType {
    return this.toKeyValue(); 
  }
  set value(value: KeyValueType) {
    this.origValue = value ?? { };
    this.keyValues = this.fromKeyValue(value);
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

  private onChange: Function;
  private origValue: KeyValueType;
  private underConstruction: boolean;

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef,
              private destroy$: DestroyService,
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

  /** Is this control a default? */
  isDefault(ix: number): boolean {
    const key = Object.keys(this.keyValues)[ix];
    return (this.defaults?.[key] !== undefined) && (this.origValue?.[key] === undefined);
  }

  /** When we're ready */
  ngOnInit(): void {
    this.keyValueForm.valueChanges
      .pipe(
        filter(_ => !this.underConstruction),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const keyValues = value.keyValues
          // NOTE: keep originals and changed defaults
          .filter((entry, ix) => entry[0] && (!this.isDefault(ix) || this.keyValues[entry[0]] !== entry[1]))
          .reduce((acc, cur) => {
            acc[cur[0]] = this.coerce(cur[1]);
            return acc;
          }, { });
        this.origValue = keyValues;
        this.keyValues = this.fromKeyValue(keyValues);
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

  // private methods

  private coerce(value: any): any {
    if (this.type === 'checkbox')
      return Boolean(value);
    else if (this.type === 'number')
      return Number(value);
    else if ((this.type === 'text') && (typeof value === 'string')) {
      if (/^[0-9]*$/.test(value))
        return Number(value);
      else if (['true', 'false'].includes(value))
        return Boolean(value === 'true');
    }
    return value;
  }

  private fromKeyValue(value: KeyValueType): KeyValueType {
    const keyValues = { };
    // NOTE: we want the keys in alpha order
    Object.keys(this.defaults ?? { })
      .sort()
      .forEach(key => keyValues[key] = this.defaults[key]);
    Object.keys(value ?? {})
      .sort()
      .forEach(key => keyValues[key] = value[key]);
    return keyValues;
  }

  private toKeyValue(): KeyValueType {
    return Object.keys(this.keyValues)
      .filter(key => this.origValue?.[key] !== undefined)
      .reduce((acc, key) => {
        acc[key] = this.keyValues[key];
        return acc;
      }, { });
  }

}
