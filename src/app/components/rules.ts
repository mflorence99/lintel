import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ConfigsState } from '../state/configs';
import { ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SelectionState } from '../state/selection';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

/**
 * Rules component
 */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lintel-rules',
  templateUrl: 'rules.html',
  styleUrls: ['rules.scss']
})

export class RulesComponent implements OnInit, OnDestroy {

  private notifier = new Subject();

  /** ctor */
  constructor(public configs: ConfigsState,
              private element: ElementRef,
              public selection: SelectionState) { }

  /** Unsubscribe on close */
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  /** Whenever the selection changes, scroll to the top */
  ngOnInit(): void {
    this.selection.state$
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        const top = { behavior: 'smooth', left: 0, top: 0 };
        this.element.nativeElement.scrollTo(top);
      });
  }

  /** Track ngFor by rule name */
  trackByRule(_, item): string {
    return item.key;
  }

}
