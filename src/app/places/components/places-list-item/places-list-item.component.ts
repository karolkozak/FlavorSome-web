import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '@app/core/services/config.service';

@Component({
  selector: 'un-places-list-item',
  templateUrl: './places-list-item.component.html',
  styleUrls: ['./places-list-item.component.scss']
})
export class PlacesListItemComponent implements OnInit {
  @Input() place: google.maps.places.PlaceResult;

  private availablePlacesTypes: string[] = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getAvailablePlaceTypes().subscribe(placeTypes => this.availablePlacesTypes = placeTypes);
  }

  filterAvailableTypes(types: string[]): string[] {
    return types.filter(type => this.availablePlacesTypes.find(availableType => availableType.toLowerCase() === type));
  }
}
