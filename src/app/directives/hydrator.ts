import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Hydrateable } from './hydrated';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

/**
 * A directive to add hydration capabilities to a container
 */

@Directive({
  selector: '[lintelHydrator]'
})

export class HydratorDirective implements OnInit {

  @Input() hydratorMargin = '0px';
  @Input() hydratorTrace = false;

  private hydrateables: { [uuid: string]: Hydrateable } = { };
  private observer: IntersectionObserver;

  /** ctor */
  constructor(private element: ElementRef) { }

  /** When we're ready */
  ngOnInit(): void {
    this.observer = new IntersectionObserver(this.callback.bind(this), {
      root: this.element.nativeElement,
      rootMargin: this.hydratorMargin,
      threshold: [0]
    });
  }

  /** Register hydrateable component */
  registerHydrateable(hydrateable: Hydrateable): void {
    this.hydrateables[hydrateable.lintelHydrated] = hydrateable;
    this.observer.observe(hydrateable.element.nativeElement);
  }

  /** Unregister hydrateable component */
  unregisterHydrateable(hydrateable: Hydrateable): void {
    // NOTE: this can fail depending on the order in which things are destroyed
    try {
      this.observer.unobserve(hydrateable.element.nativeElement);
      delete this.hydrateables[hydrateable.lintelHydrated];
    } catch (ignored) { }
  }

  // private methods

  private callback(entries: IntersectionObserverEntry[], _: IntersectionObserver): void {
    entries.forEach(entry => {
      const hydrateable = this.hydrateables[entry.target.getAttribute('lintelHydrated')];
      if (hydrateable) {
        const isNow = entry.isIntersecting;
        const was = hydrateable.isHydrated;
        if (was !== isNow) {
          if (this.hydratorTrace) {
            const uuid = hydrateable.lintelHydrated;
            if (isNow)
              console.log(`%cHydrate %c${uuid}`, 'color: #1b5e20', 'color: grey');
            else console.log(`%cDehydrate %c${uuid}`, 'color: #b71c1c', 'color: grey');
          }
          hydrateable.isHydrated = isNow;
        }
      }
    });
  }

}