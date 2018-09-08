import {NgModule} from '@angular/core';
import {CommonModule, LowerCasePipe, UpperCasePipe} from '@angular/common';
import {FlagCultureLangPipe} from '@app/shared/pipes/flag-culture-lang.pipe';
import {FlagLangPipe} from '@app/shared/pipes/flag-lang.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTabsModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {PaginationComponent} from './components/pagination/pagination/pagination.component';
import {DatePipe} from './pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
  ],
  exports: [
    DatePipe,
    FlagCultureLangPipe,
    FlagLangPipe,
    FormsModule,
    LowerCasePipe,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    PaginationComponent,
    ReactiveFormsModule,
    TranslateModule,
    UpperCasePipe,
  ],
  declarations: [FlagCultureLangPipe, FlagLangPipe, PaginationComponent, DatePipe]
})
export class SharedModule {
}
