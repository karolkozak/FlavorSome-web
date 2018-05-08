import {NgModule} from '@angular/core';
import {CommonModule, LowerCasePipe, UpperCasePipe} from '@angular/common';
import {FlagCultureLangPipe} from '@app/shared/pipes/flag-culture-lang.pipe';
import {FlagLangPipe} from '@app/shared/pipes/flag-lang.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FlagCultureLangPipe,
    FlagLangPipe,
    FormsModule,
    LowerCasePipe,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslateModule,
    UpperCasePipe,
  ],
  declarations: [FlagCultureLangPipe, FlagLangPipe]
})
export class SharedModule {
}
