import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {GlobalExceptionInterceptor} from './global-exception-interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: GlobalExceptionInterceptor, multi: true},
];
