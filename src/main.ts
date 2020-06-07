import { LintelModule } from './app/module';

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

declare const lintelIsReady: Promise<void>;

if (environment.production) 
  enableProdMode();

lintelIsReady.then(() => {
  platformBrowserDynamic()
    .bootstrapModule(LintelModule)
    .catch(err => console.error(err));
});
