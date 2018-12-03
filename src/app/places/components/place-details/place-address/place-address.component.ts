import {Component, Input} from '@angular/core';
import {PlaceLocation} from '@app/places/models/place-location';

@Component({
  selector: 'fs-place-address',
  templateUrl: './place-address.component.html',
  styleUrls: ['./place-address.component.scss']
})
export class PlaceAddressComponent {
  @Input() location: PlaceLocation;
}
