import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '@env/environment';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {MapService} from '@app/core/services/map/map.service';
import {MapServiceAPI} from '@app/shared/models/MapAPI';

@Component({
  selector: 'un-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit, AfterViewInit {
  providers = MapServiceAPI;
  // map: google.maps.Map;
  mapCenter: {lat: number, lng: number};
  zoom: number;
  userPosition: google.maps.LatLng;
  searchRadius: number;
  provider: string;

  userMarker: any;
  userCircle: any;

  @ViewChild('map')
  public mapElement: ElementRef;

  constructor(private mapService: MapService, private placesService: PlacesSearchService) {
    this.provider = this.mapService.constructor.name;
  }

  ngOnInit() {
    ({coords: this.mapCenter, zoom: this.zoom} = environment.mapDefaults);
    this.placesService.userPosition.subscribe((pos: google.maps.LatLngLiteral|undefined) => this.setPosition(pos));
    this.placesService.searchRadius.subscribe((rad: number|undefined) => this.mapService.redrawCircle(this.userCircle, rad));
    this.placesService.locateUser();
  }

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement);
    }
  }

  setPosition(pos: any|undefined) {
    this.userPosition = pos;

    if (!!pos) {
      this.userMarker = this.mapService.addMarker(pos);
      this.userCircle = this.mapService.drawCircle(pos, 300);
      this.mapService.setCenter(pos);
    } else {
      this.mapService.removeMarker(this.userMarker);
      this.mapService.removeCircle(this.userCircle);
    }
  }

  mapReady($map: google.maps.Map): void {
    this.mapService.setMap($map);
  }
}
