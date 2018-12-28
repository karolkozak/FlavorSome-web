import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {ToastrService} from 'ngx-toastr';
import {PlacesService} from '@app/places/services/places.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {LatLng} from '@app/shared/models/LatLng.interface';
import {Observable} from 'rxjs/Observable';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {Place} from '@app/places/models/place';
import {MapService} from '@app/core/services/map/map.service';

@Injectable()
export class PlacesSearchService extends PlacesService {
  private userPosition: BehaviorSubject<LatLng> = new BehaviorSubject(environment.mapDefaults.coords);
  userPosition$: Observable<LatLng> = this.userPosition.asObservable();
  private searchRadius: BehaviorSubject<number> = new BehaviorSubject(environment.mapDefaults.range);
  searchRadius$: Observable<number> = this.searchRadius.asObservable();

  private places: BehaviorSubject<Place[]> = new BehaviorSubject([]);
  places$: Observable<Place[]> = this.places.asObservable();

  constructor(httpClient: HttpClient,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService,
              private mapService: MapService) {
    super(httpClient);
  }

  locateUser(): void {
    // TODO: refactor to return promise
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude: lat, longitude: lng} = position.coords;
      const latlng = {lat: lat, lng: lng};
      this.userPosition.next(latlng);
    }, error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return;
        case error.POSITION_UNAVAILABLE:
        case error.TIMEOUT:
        default:
          let [errorTitle, errorMessage] = ['', ''];
          this.customTranslateService.getTranslation('An error occurred')
            .subscribe(result => errorTitle = result);
          this.customTranslateService.getTranslation('Could not fetch the location')
            .subscribe(result => errorMessage = result);
          this.toastr.error(errorMessage, errorTitle);
      }
    });
  }

  findPlaces(placeSearchRequest: PlaceSearchRequest): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      // TODO: remove mapService related logic
      this.mapService.removePlaceMarkers();
      this.getPlaces(placeSearchRequest).subscribe((places: Place[]) => {
          this.places.next(places);

          this.mapService.showPlaceMarkers(places);
            resolve(places.length);
          },
          error => {
            reject(error);
          });
    });
  }

  setSearchRadius(radius: number): void {
    this.searchRadius.next(radius);
  }

  setUserPosition(pos: LatLng): void {
    this.userPosition.next(pos);
  }

  resetUserPosition(): void {
    this.userPosition.next(undefined);
  }

  get isLocationDisabled() {
    return !navigator.geolocation;
  }
}
