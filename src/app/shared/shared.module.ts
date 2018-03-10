import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material';
import {httpInterceptorProviders} from './interceptors/http-interceptors';
import {ConfigService} from './services/config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
  ],
  exports: [MatButtonModule],
  providers: [ConfigService, httpInterceptorProviders],
  declarations: []
})
export class SharedModule {
}
