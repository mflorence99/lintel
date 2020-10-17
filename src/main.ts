import { LintelModule } from './app/module';

import { environment } from './environments/environment';

import { ApplicationRef } from '@angular/core';

import { enableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

declare const lintelIsReady: Promise<void>;
declare const lintelVSCodeAPI;

if (environment.production) enableProdMode();

lintelIsReady.then(() => {
  // sanity check before we launch Lintel proper
  if (window['eslintFiles'])
    platformBrowserDynamic()
      .bootstrapModule(LintelModule)
      .then((moduleRef) => {
        // @see https://blog.ninja-squad.com/2018/09/20/angular-performances-part-3/
        if (!environment.production) {
          const applicationRef = moduleRef.injector.get(ApplicationRef);
          const componentRef = applicationRef.components[0];
          enableDebugTools(componentRef);
        }
      })
      .catch((err) => console.error(err));
  else
    lintelVSCodeAPI.postMessage({
      command: 'bootFail',
      text: 'eslintFiles missing'
    });
});
