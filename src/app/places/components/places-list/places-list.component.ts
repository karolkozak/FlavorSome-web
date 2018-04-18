import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '@app/core/services/config.service';

@Component({
  selector: 'un-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  @Input() places: google.maps.places.PlaceResult[] = [];

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
