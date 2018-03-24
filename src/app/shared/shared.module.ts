import {NgModule} from '@angular/core';
import {CommonModule, UpperCasePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
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
  declarations: [FlagCultureLangPipe, FlagLangPipe]
})
export class SharedModule {
}
