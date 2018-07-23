import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceDetailsComponent} from './components/place-details/place-details.component';
import {PlaceMenuComponent} from './components/place-menu/place-menu.component';
import {PlacesService} from '@app/places/services/places.service';
import {SharedModule} from '@app/shared/shared.module';
import {PlacesListComponent} from './components/places-list/places-list.component';
import {PlacesListItemComponent} from './components/places-list-item/places-list-item.component';
import {RouterModule} from '@angular/router';
import {RatesSectionComponent} from './components/place-ratings/rates-section/rates-section.component';
import {RateItemComponent} from './components/place-ratings/rate-item/rate-item.component';
import {RateFormComponent} from './components/place-ratings/rate-form/rate-form.component';
import {RatesListComponent} from './components/place-ratings/rates-list/rates-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    PlaceDetailsComponent,
    PlaceMenuComponent,
    PlacesListComponent,
    PlacesListItemComponent,
    RatesSectionComponent,
    RateItemComponent,
    RateFormComponent,
    RatesListComponent,
  ],
  exports: [
    PlaceDetailsComponent,
    PlaceMenuComponent,
    PlacesListComponent,
    RatesSectionComponent,
  ],
  providers: [PlacesService]
})
export class PlacesModule {
}
