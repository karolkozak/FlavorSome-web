import {Component, Input} from '@angular/core';

@Component({
  selector: 'un-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {
  @Input() placeDetails: google.maps.places.PlaceResult;
}
