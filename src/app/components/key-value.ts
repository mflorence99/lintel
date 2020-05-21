import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Optional } from '@angular/core';
import { Self } from '@angular/core';
import { Subject } from 'rxjs';
import { Utils } from '../services/utils';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';

/**
 * Custom error state matcher
 */

export class KeyValueErrorStateMatcher implements ErrorStateMatcher {

  // @see ErrorStateMatcher
  isErrorState(control: FormControl, _: any): boolean {
    return !!control?.invalid;
  }

}

/**
 * Model <key-value> data types
 */

export type KeyValueArray = KeyValueTuple[];

export type KeyValueArrayOfHashes = KeyValueHash[];

export interface KeyValueHash {
  [key: string]: string;
}

export type KeyValueTuple = [string, string];

export type KeyValueType = KeyValueArray | KeyValueArrayOfHashes | KeyValueHash | null;

/**
 * <key-value> component
 * 
 * NOTE: quite complicated to follow Angular Material custom control spec
 * 
 * @see https://material.angular.io/guide/creating-a-custom-form-field-control
 */

/* eslint @typescript-eslint/member-ordering: "off" */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lintel-key-value',
  styleUrls: ['key-value.scss'],
  templateUrl: 'key-value.html'
})

export class KeyValueComponent implements ControlValueAccessor, MatFormFieldControl<KeyValueType>, OnInit, OnDestroy { 

  static nextID = 0;

  @HostBinding('attr.aria-describedby') describedBy = '';
  @HostBinding() id = `lintel-key-value-${KeyValueComponent.nextID++}`;

  @Input() asArray = false;
  @Input() asArrayOfHashes: KeyValueTuple;
  @Input() asHash = true;

  @Input() 
  get disabled(): boolean {
    return this._disabled; 
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  @Input() duplicateKeyMessage = 'This key already used';
  @Input() keyConstraints: string[];
  @Input() maxVisibleValues = 3;

  @Input() 
  get placeholder(): string {
    return this._placeholder; 
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  @Input() 
  get required(): boolean {
    return this._required; 
  }
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  @Input() 
  get value(): KeyValueType {
    return this.toKeyValueType(); 
  }
  set value(value: KeyValueType) {
    // grab the new value as the canonical hashmap and calculate difference
    const oldKeys = Object.keys(this.keyValues);
    const oldKeySet = new Set(oldKeys);
    this.fromKeyValueType(value);
    this.keys = Object.keys(this.keyValues);
    const newKeySet = new Set(this.keys);
    const added = new Set(this.keys.filter(key => !oldKeySet.has(key)));
    const removed = new Set(oldKeys.filter(key => !newKeySet.has(key)));
    // remove controls for missing keys
    removed.forEach(key => this.keyValueForm.removeControl(key));
    // add controls for new keys
    added.forEach(key => {
      const field = { value: null, disabled: this.disabled };
      const control = new FormControl(field, Validators.required);
      this.keyValueForm.addControl(key, control);
    });
    // patch in the new values
    this.keyValueForm.patchValue(this.keyValues);
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.utils.isObjectEmpty(this.keyValues); 
  }
  get errorState(): boolean {
    return this.keyValueForm.invalid || (this.required && this.utils.isObjectEmpty(this.keyValues)); 
  }

  @ViewChild('newKey', { static: false }) newKey: any;

  duplicateKey: boolean;
  errorStateMatcher = new KeyValueErrorStateMatcher();
  keys: string[] = [];
  keyValueForm: FormGroup;

  // @see MatFormFieldControl
  controlType = 'lintel-key-value';
  focused = false;
  shouldLabelFloat = false;
  stateChanges = new Subject<void>();

  // TODO: this is a hack based on the fact that we "know" checkboxes are 24x24
  // but it works over an extrememe range of realistic font sizes
  rowHeight = 64;

  private keyValues = { } as KeyValueHash;
  private notifier = new Subject<void>();
  private onChange: Function;

  // these shadow visible properties
  private _disabled: boolean;
  private _placeholder: string;
  private _required: boolean;

  /** ctor  */
  constructor(private element: ElementRef,
              private focusMonitor: FocusMonitor,
              private formBuilder: FormBuilder,
              @Optional() @Self() public ngControl: NgControl,
              private utils: Utils) { 
    // initialize the form
    this.keyValueForm = this.formBuilder.group({ });
    // @see https://material.angular.io/guide/creating-a-custom-form-field-control
    if (this.ngControl)
      this.ngControl.valueAccessor = this;
  }

  /** Add a new key */
  addKey(key: string): void {
    if (!this.disabled && key) {
      // NOTE: guarded because we are not using real buttons due to submit issues
      if (this.keyValues[key] === undefined) {
        this.keyValues[key] = null;
        // we need the keys as an array for *ngFor
        this.keys = Object.keys(this.keyValues);
        // add a new control to the form
        const field = { value: null, disabled: this.disabled };
        const control = new FormControl(field, Validators.required);
        this.keyValueForm.addControl(key, control);
        // propagate the change
        this.stateChanges.next();
        // clean out the newKey adder control
        if (this.keyConstraints)
          this.newKey.value = null;
        else this.newKey.nativeElement.value = null;
      } else this.duplicateKey = true;
    }
  }

  /** Delete a key */
  deleteKey(key: string): void {
    if (!this.disabled && key) {
      // NOTE: guarded because we are not using real buttons due to submit issues
      delete this.keyValues[key]; 
      // we need the keys as an array for *ngFor
      this.keys = Object.keys(this.keyValues);
      // remove the control from the form
      this.keyValueForm.removeControl(key);
      // propagate the changes
      this.stateChanges.next();
    }
  }

  /** New value for a key */
  newKeyValue(): string {
    if (!this.newKey)
      return null;
    else if (this.keyConstraints)
      return this.newKey.value;
    else return this.newKey.nativeElement.value;
  }

  /** @see MatFormFieldControl */
  onContainerClick(_: MouseEvent): void { }

  /** @see ControlValueAccessor */
  registerOnChange(fn): void {
    this.onChange = fn;
  }

  /** @see ControlValueAccessor */
  registerOnTouched(_): void { }

  /** @see MatFormFieldControl */
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  /** @see ControlValueAccessor */
  writeValue(value): void {
    this.value = value;
  }

  // lifecycle methods

  ngOnInit(): void {
    // monitor for focus
    this.focusMonitor.monitor(this.element.nativeElement, true)
      .pipe(takeUntil(this.notifier))
      .subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
    // monitor for value
    this.keyValueForm.valueChanges
      .pipe(takeUntil(this.notifier))
      .subscribe(values => {
        this.duplicateKey = false;
        this.keys.forEach(key => this.keyValues[key] = values[key]);
        // @see https://github.com/angular/angular/issues/14057
        // we can't see anythung better to do as the spurious error seems harmless
        try {
          if (this.onChange)
            this.onChange(this.value);
        } catch (ignored) { }
        this.stateChanges.next();
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.element.nativeElement);
  }

  // private methods

  private fromKeyValueType(value: KeyValueType): void {
    if (!value)
      this.keyValues = { } as KeyValueHash;
    else if (this.asArray) {
      this.keyValues = (value as KeyValueArray).reduce((acc, tuple) => {
        acc[tuple[0]] = tuple[1];
        return acc;
      }, { } as KeyValueHash);
    } else if (this.asArrayOfHashes) {
      const k = this.asArrayOfHashes[0];
      const v = this.asArrayOfHashes[1];
      this.keyValues = (value as KeyValueArrayOfHashes).reduce((acc, hash) => {
        acc[hash[k]] = hash[v];
        return acc;
      }, { } as KeyValueHash);
    } else if (this.asHash)
      this.keyValues = { ...value as KeyValueHash };
    else this.keyValues = { } as KeyValueHash;
  }

  private toKeyValueType(): KeyValueType {
    if (this.asArray) {
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
