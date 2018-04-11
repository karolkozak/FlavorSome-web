import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaceDetailsComponent} from './components/place-details/place-details.component';
import {PlaceMenuComponent} from './components/place-menu/place-menu.component';
import {PlacesService} from '@app/places/services/places.service';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PlaceDetailsComponent, PlaceMenuComponent],
  exports: [PlaceDetailsComponent, PlaceMenuComponent],
  providers: [PlacesService]
})
export class PlacesModule {
}
