import {Component, Input} from '@angular/core';

@Component({
  selector: 'un-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent {
  @Input() places: google.maps.places.PlaceResult[] = [];
}
