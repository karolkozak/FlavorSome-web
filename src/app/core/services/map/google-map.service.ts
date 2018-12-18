import { Injectable } from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {MapServiceAPI} from '@app/shared/models/MapAPI';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Place} from '@app/places/models/place';
import {LatLng} from '@app/shared/models/LatLng.interface';

@Injectable()
export class GoogleMapService extends MapService {
  map: google.maps.Map;

  get provider(): string {
    return MapServiceAPI.Google;
  }

  setMap(map: google.maps.Map) {
    this.map = map;
  }

  followCenter(): Observable<any> {
    return of(undefined);
  }

  getCenter(): google.maps.LatLngLiteral {
    const center = this.map.getCenter();
    const latlng = {lat: center.lat(), lng: center.lng()};
    return latlng;
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

  redrawCircle(radius: number, circle = this.userCircle) {
    if (!radius) { return; }
    circle.setRadius(radius);
  }

  removeCircle(circle: google.maps.Circle) {
    if (!circle) { return; }
    circle.setMap(null);
  }

  moveCircle(pos: google.maps.LatLngLiteral, circle = this.userCircle): any {
    circle.setCenter(pos);
  }

  moveMarker(marker: google.maps.Marker, pos: google.maps.LatLngLiteral): any {
    if (!marker) { return; }
    marker.setPosition(pos);
  }

  removePlaceMarkers(): void {
  }

  showPlaceMarkers(places: Place[]): void {
  }

  hideUserPosition(): void {
  }

  get isUserPositioned(): boolean {
    return false;
  }

  showUserPosition(pos: LatLng, radius: number): any {
  }

  updateUserPosition(pos: LatLng): void {
  }
}
