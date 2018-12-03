import {Component, Input} from '@angular/core';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'fs-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent {
  @Input() places: Place[] = [];
}
