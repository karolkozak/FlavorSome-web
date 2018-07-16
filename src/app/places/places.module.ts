import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceDetailsComponent} from './components/place-details/place-details.component';
import {PlaceMenuComponent} from './components/place-menu/place-menu.component';
import {PlacesService} from '@app/places/services/places.service';
import {SharedModule} from '@app/shared/shared.module';
import {PlacesListComponent} from './components/places-list/places-list.component';
import {PlacesListItemComponent} from './components/places-list-item/places-list-item.component';
import {RouterModule} from '@angular/router';

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
  ],
  exports: [
    PlaceDetailsComponent,
    PlaceMenuComponent,
    PlacesListComponent,
  ],
  providers: [PlacesService]
})
export class PlacesModule {
}
