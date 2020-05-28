import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';

import { filter } from 'rxjs/operators';
import { forwardRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

// NOTE: key-value types can be one of the following

export type KeyValueArrayOfTuples = KeyValueTuple[];

export type KeyValueArrayOfHashes = KeyValueHash[];

export type KeyValueHash = Record<string, any>;

export type KeyValueTuple = [string, any];

export type KeyValueType = KeyValueArrayOfTuples | KeyValueArrayOfHashes | KeyValueHash | null;

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

  @Input() asArrayOfHashes: [string, string];
  @Input() asArrayOfTuples = false;
  @Input() asHash = true;

  duplicateKey: boolean;

  @Input() duplicateKeyMessage = 'This key already used';
  @Input() keyConstraints: string[];

  keyValueForm: FormGroup;
  keys: string[] = [];

  @Input() maxVisibleValues = 3;

  @ViewChild('newKey', { static: false }) newKey: any;

  @Input() newKeyMessage = 'Enter key and hit +';

  // TODO: this is a hack based on the fact that we "know" checkboxes are 24x24
  // but it works over an extrememe range of realistic font sizes
  rowHeight = 64;

  @Input() 
  get value(): KeyValueType {
    return this.toKeyValueType(); 
  }
  set value(value: KeyValueType) {
    // grab the new value as the canonical hashmap and calculate difference
    const oldKeys = Object.keys(this.keyValues);
    const oldKeySet = new Set(oldKeys);
    this.keyValues = this.fromKeyValueType(value);
    this.keys = Object.keys(this.keyValues);
    const newKeySet = new Set(this.keys);
    const added = new Set(this.keys.filter(key => !oldKeySet.has(key)));
    const removed = new Set(oldKeys.filter(key => !newKeySet.has(key)));
    // remove controls for missing keys
    this.underConstruction = true;
    removed.forEach(key => this.keyValueForm.removeControl(key));
    // add controls for new keys
    added.forEach(key => {
      const control = new FormControl(this.keyValues[key]);
      this.keyValueForm.addControl(key, control);
    });
    this.underConstruction = false;
    // patch in the new values
    this.keyValueForm.patchValue(this.keyValues);
    this.onChange?.(this.value);
    // TODO: Angular can be so weird!
    this.cdf.detectChanges();
  }

  private keyValues = { } as KeyValueHash;
  private notifier = new Subject<void>();
  private onChange: Function;
  private underConstruction: boolean;

  /** ctor  */
  constructor(private cdf: ChangeDetectorRef,
              private formBuilder: FormBuilder) { 
    // initialize the form
    this.keyValueForm = this.formBuilder.group({ });
  }

  /** Add a new key */
  addKey(key: string): void {
    if (key) {
      if (this.keyValues[key] === undefined) {
        this.keyValues[key] = null;
        // we need the keys as an array for *ngFor
        this.keys = Object.keys(this.keyValues);
        // add a new control to the form
        const control = new FormControl(null);
        this.keyValueForm.addControl(key, control);
        // propagate the change
        this.onChange?.(this.value);
        // clean out the newKey adder control
        this.newKey.value = null;
      } else this.duplicateKey = true;
    }
  }

  /** Delete a key */
  deleteKey(key: string): void {
    delete this.keyValues[key]; 
    // we need the keys as an array for *ngFor
    this.keys = Object.keys(this.keyValues);
    // remove the control from the form
    this.keyValueForm.removeControl(key);
    // propagate the changes
    this.onChange?.(this.value);
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
      .subscribe(values => {
        this.duplicateKey = false;
        this.keys.forEach(key => this.keyValues[key] = values[key]);
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

  // lifecycle methods

  // private methods

  private fromKeyValueType(value: KeyValueType): KeyValueType {
    if (!value)
      return { } as KeyValueHash;
    else if (this.asArrayOfTuples) {
      return (value as KeyValueArrayOfTuples).reduce((acc, tuple) => {
        acc[tuple[0]] = tuple[1];
        return acc;
      }, { } as KeyValueHash);
    } else if (this.asArrayOfHashes) {
      const k = this.asArrayOfHashes[0];
      const v = this.asArrayOfHashes[1];
      return (value as KeyValueArrayOfHashes).reduce((acc, hash) => {
        acc[hash[k]] = hash[v];
        return acc;
      }, { } as KeyValueHash);
    } else if (this.asHash)
      return { ...value as KeyValueHash };
    else return { } as KeyValueHash;
  }

  private toKeyValueType(): KeyValueType {
    if (this.asArrayOfTuples) {
      return Object.keys(this.keyValues).map(key => {
        return [key, this.keyValues[key]] as KeyValueTuple;
      });
    } else if (this.asArrayOfHashes) {
      return Object.keys(this.keyValues).map(key => {
        const k = this.asArrayOfHashes[0];
        const v = this.asArrayOfHashes[1];
        return { [k]: key, [v]: this.keyValues[key] } as KeyValueHash;
      });
    } else if (this.asHash)
      return { ...this.keyValues };
    else return { };
  }

}
