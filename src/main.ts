import { LintelModule } from './app/module';

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

declare const lintelIsReady: Promise<void>;
declare const lintelVSCodeAPI;

if (environment.production) 
  enableProdMode();

lintelIsReady.then(() => {

  // sanity check before we launch Lintel proper
  if (window['eslintFiles'])
    platformBrowserDynamic()
      .bootstrapModule(LintelModule)
      .catch(err => console.error(err));
  else lintelVSCodeAPI.postMessage({ command: 'bootFail', text: 'eslintFiles missing' });

});
