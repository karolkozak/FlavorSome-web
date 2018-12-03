import {Component, Input} from '@angular/core';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'fs-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {
  @Input() placeDetails: Place;
}
