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
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {PaginationComponent} from './components/pagination/pagination/pagination.component';
import {DatePipe} from './pipes/date.pipe';
import {PlaceSearcherComponent} from '@app/shared/components/place-searcher/place-searcher.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    DatePipe,
    FlagCultureLangPipe,
    FlagLangPipe,
    FormsModule,
    LowerCasePipe,
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
    PlaceSearcherComponent,
    ReactiveFormsModule,
    TranslateModule,
    UpperCasePipe,
  ],
  declarations: [DatePipe, FlagCultureLangPipe, FlagLangPipe, PaginationComponent, PlaceSearcherComponent]
})
export class SharedModule {
}
