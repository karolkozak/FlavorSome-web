import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '@app/core/services/config.service';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'fs-places-list-item',
  templateUrl: './places-list-item.component.html',
  styleUrls: ['./places-list-item.component.scss']
})
export class PlacesListItemComponent implements OnInit {
  @Input() place: Place;

  private availablePlacesTypes: string[] = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.availablePlacesTypes = this.configService.getAvailablePlaceTypes();
  }

  filterAvailableTypes(types: string[]): string[] {
    return types.filter(type => this.availablePlacesTypes.find(availableType => availableType.toLowerCase() === type));
  }
}
