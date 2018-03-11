import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {httpInterceptorProviders} from './interceptors/http-interceptors';
import {ConfigService} from './services/config.service';
import {TranslateModule} from '@ngx-translate/core';
import {CustomTranslateService} from './services/custom-translate.service';
import {UpperCasePipe} from './pipes/upper-case.pipe';
import {FlagCultureLangPipe} from './pipes/flag-culture-lang.pipe';
import {FlagLangPipe} from './pipes/flag-lang.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    FlagCultureLangPipe,
    FlagLangPipe,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    TranslateModule,
    UpperCasePipe,
  ],
  providers: [
    ConfigService,
    CustomTranslateService,
    httpInterceptorProviders,
  ],
  declarations: [UpperCasePipe, FlagCultureLangPipe, FlagLangPipe]
})
export class SharedModule {
}
