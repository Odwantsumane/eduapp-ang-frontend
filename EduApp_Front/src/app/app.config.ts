import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes, routerOptions } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpInterceptorBasicAuthService } from './services/http-interceptor-basic-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideClientHydration(),
     provideHttpClient(withFetch()),
     {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi:true}
    ]
};
