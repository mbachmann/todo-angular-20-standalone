import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiModule, BASE_PATH } from './openapi-gen';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(ApiModule, BrowserModule, FormsModule),
    {
      provide: BASE_PATH,
      useValue: environment._API_BASE_PATH_,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
