import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// @see https://stackoverflow.com/questions/55328832

@NgModule({

  exports: [FontAwesomeModule],
  imports: [FontAwesomeModule]

}) export class IconsModule {

  /** ctor */
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, far, fas);
  }

}
