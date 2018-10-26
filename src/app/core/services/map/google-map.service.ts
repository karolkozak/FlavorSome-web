import { Injectable } from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {MapServiceAPI} from '@app/shared/models/MapAPI';

@Injectable()
export class GoogleMapService implements MapService {
  map: google.maps.Map;

  constructor() { }

  get provider(): string {
    return MapServiceAPI.Google;
  }

  get config() {
    return null;
  }

  setMap(map: google.maps.Map, zoom: number) {
    this.map = map;
  }

  setCenter(pos: google.maps.LatLngLiteral) {
    this.map.panTo(pos);
  }

  addMarker(pos: google.maps.LatLngLiteral) {
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    return marker;
  }

  removeMarker(marker: google.maps.Marker) {
    if (!marker) { return; }
    marker.setMap(null);
  }

  drawCircle(center: any, radius: number) {
    const circle = new google.maps.Circle({
      center: center,
      radius: radius,
      map: this.map,

      fillColor: '#000000',
      fillOpacity: 0.1,
      strokeOpacity: 0.1,
      clickable: false,
      draggable: false
    });
    return circle;
  }

  redrawCircle(circle: google.maps.Circle, radius: number) {
    if (!circle || !radius) { return; }
    circle.setRadius(radius);
  }

  removeCircle(circle: google.maps.Circle) {
    if (!circle) { return; }
    circle.setMap(null);
  }

}
