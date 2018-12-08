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
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
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
import {UserPictureComponent} from '@app/shared/components/user-picture/user-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
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
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    PaginationComponent,
    PlaceSearcherComponent,
    ReactiveFormsModule,
    TranslateModule,
    UpperCasePipe,
    UserPictureComponent,
  ],
  declarations: [DatePipe, FlagCultureLangPipe, FlagLangPipe, PaginationComponent, PlaceSearcherComponent, UserPictureComponent]
})
export class SharedModule {
}
