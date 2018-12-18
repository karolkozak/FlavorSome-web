import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Place} from '@app/places/models/place';
import {LatLng} from '@app/shared/models/LatLng.interface';

@Injectable()
export abstract class MapService {
  userMarker: any;
  userCircle: any;

  get isUserPositioned(): boolean {
    return this.userMarker && this.userCircle;
  }

  /**
   * Retrieves an API provider.
   * @returns {string} API provider class name
   * @see MapServiceAPI
   */
  abstract get provider(): string

  abstract setMap(map: any): void;

  abstract getCenter(): any;
  abstract setCenter(pos: LatLng): void;
  abstract followCenter(): Observable<any>;

  abstract showUserPosition(pos: LatLng, radius: number): any;
  abstract updateUserPosition(pos: LatLng): void;
  abstract hideUserPosition(): void;

  abstract addMarker(pos: any): any;
  abstract moveMarker(marker: any, pos: LatLng): any;
  abstract removeMarker(marker: any): void;

  abstract drawCircle(center: any, radius: number): any;
  abstract moveCircle(pos: LatLng, circle?: any): any;
  abstract redrawCircle(radius: number, circle?: any): any;
  abstract removeCircle(circle?: any): void;

  abstract showPlaceMarkers(places: Place[]): void;
  abstract removePlaceMarkers(): void;

  preparePlaceData(place: Place): string {
    return place.name;
  }
}
