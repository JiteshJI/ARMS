import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './error-interceptor';
import { AngularDateHttpInterceptor } from './angular-date-http-interceptor';
import { SpinnerInterceptor } from './spinner-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AngularDateHttpInterceptor, multi: true },
  // Will have to figure out managing the spinner differently for Navigation Start/End and Web api call. */
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
];
