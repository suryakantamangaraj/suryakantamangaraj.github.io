import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)  .then(() => {
  // Ensure Angular destroys itself on hot reloads.
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
    });
    // navigator.serviceWorker.register('/ngsw-worker.js');
  }
    // Otherwise, log the boot error
  }).catch(err => console.log(err));
});
