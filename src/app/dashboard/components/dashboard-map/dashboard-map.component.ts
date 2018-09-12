import { Component, OnInit } from '@angular/core';
import {environment} from '@env/environment';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';

@Component({
  selector: 'un-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit {
  map: google.maps.Map;
  mapCenter: {lat: number, lng: number};
  zoom: number;
  userPosition: google.maps.LatLng;
  searchRadius: number;

  constructor(private placesService: PlacesSearchService) { }

  ngOnInit() {
    ({coords: this.mapCenter, zoom: this.zoom} = environment.mapDefaults);
    this.placesService.userPosition.subscribe((pos: google.maps.LatLng|undefined) => this.setPosition(pos));
    this.placesService.searchRadius.subscribe((rad: number|undefined) => this.searchRadius = rad);
    this.placesService.locateUser();
  }

  setPosition(pos: google.maps.LatLng|undefined) {
    this.userPosition = pos;

    if (!!pos) {
      this.map.panTo(pos);
    }
  }

  mapReady($map: google.maps.Map): void {
    this.map = $map;
  }
}
