import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

/**
 * General settings component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-general',
  templateUrl: 'general.html',
  styleUrls: ['general.scss']
})

export class GeneralComponent { 

  opts = ['This', 'That', 'Another'];
  testForm: FormGroup;

  /** ctor */
  constructor(private formBuilder: FormBuilder) {
    // TODO: all crap
    this.testForm = this.formBuilder.group({
      multi: [null, Validators.required]
    });
  }

}
