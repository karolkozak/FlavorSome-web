import {NgModule} from '@angular/core';
import {CommonModule, UpperCasePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {httpInterceptorProviders} from './interceptors/http-interceptors';
import {ConfigService} from './services/config.service';
import {TranslateModule} from '@ngx-translate/core';
import {CustomTranslateService} from './services/custom-translate.service';
import {FlagCultureLangPipe} from './pipes/flag-culture-lang.pipe';
import {FlagLangPipe} from './pipes/flag-lang.pipe';
import {UserService} from './services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    FlagCultureLangPipe,
    FlagLangPipe,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule,
    TranslateModule,
    UpperCasePipe,
  ],
  providers: [
    ConfigService,
    CustomTranslateService,
    httpInterceptorProviders,
    UserService,
  ],
  declarations: [FlagCultureLangPipe, FlagLangPipe]
})
export class SharedModule {
}
