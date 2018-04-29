import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LanguageChooserComponent} from './components/language-chooser/language-chooser.component';
import {FooterComponent} from './components/footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {PlaceSearcherComponent} from './components/place-searcher/place-searcher.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, LanguageChooserComponent, PlaceSearcherComponent],
  exports: [HeaderComponent, FooterComponent, PlaceSearcherComponent]
})
export class NavbarsModule {
}
