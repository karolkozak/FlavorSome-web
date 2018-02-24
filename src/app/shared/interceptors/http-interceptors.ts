import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {GlobalExceptionInterceptor} from './global-exception-interceptor';
import {HeaderInterceptor} from './header-interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: GlobalExceptionInterceptor, multi: true},
];
