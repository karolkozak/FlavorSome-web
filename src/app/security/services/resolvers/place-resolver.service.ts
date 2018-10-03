import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import PlaceResult = google.maps.places.PlaceResult;

@Injectable()
export class PlaceResolverService implements Resolve<PlaceResult> {
  private googlePlacesService: google.maps.places.PlacesService;

  constructor() {
    this.googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlaceResult> | Promise<PlaceResult> | PlaceResult {
    // const placeId = route.paramMap.get('id');
    // TODO: retrieve place from FlavorSome microserivce. For Google Place API there is no simple way to do that
    return undefined;
  }
}
