import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceSearcherComponent} from './components/place-searcher/place-searcher.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/shared/shared.module';
import {HeaderComponent} from '@app/navbars/components/header/header.component';
import {FooterComponent} from '@app/navbars/components/footer/footer.component';
import {LanguageChooserComponent} from '@app/navbars/components/language-chooser/language-chooser.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent, LanguageChooserComponent, PlaceSearcherComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class NavbarsModule {
}
