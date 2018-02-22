import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigService} from './services/config.service';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './interceptors/http-interceptors';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [ConfigService, httpInterceptorProviders],
  declarations: []
})
export class SharedModule {
}
