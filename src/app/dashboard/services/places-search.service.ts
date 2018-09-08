import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {environment} from '@env/environment';

@Injectable()
export class PlacesSearchService {
  map: BehaviorSubject<google.maps.Map> = new BehaviorSubject(undefined);
  userPosition: BehaviorSubject<google.maps.LatLng> = new BehaviorSubject(undefined);
  searchRadius: BehaviorSubject<number> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  setSearchRadius(radius: number): void {
    this.searchRadius.next(radius);
  }

  setUserPosition(lat: number, lng: number): void {
    const position = new google.maps.LatLng(lat, lng);
    this.userPosition.next(position);
    this.map.value.panTo(position);
  }

  resetUserPosition(): void {
    this.userPosition.next(undefined);
  }

  getPlaces() {
    // TODO: build API call params
    this.http.get<any>(environment.googlePlacesUrl).pipe(
      filter(this.filterVisible)
      // TODO: add respose handling
    );
  }

  private filterVisible(place1, place2): boolean {
    return true; // FIXME: method stub
  }
}
