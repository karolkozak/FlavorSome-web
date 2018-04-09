import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlaceDetailsComponent],
  exports: [PlaceDetailsComponent]
})
export class PlacesModule { }
