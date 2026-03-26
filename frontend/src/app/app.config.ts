import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, Injectable, inject, CSP_NONCE } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { DOCUMENT } from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: CSP_NONCE,
      useFactory: () => {
        const doc = inject(DOCUMENT);
        const el = doc.querySelector('app-root');
        const attr = el?.getAttribute('ngCspNonce');
        const nonce = attr ?? (window as any).__CSP_NONCE__ ?? null;
        return nonce;
      }
    }
  ]
};