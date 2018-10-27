import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class PlacesSearchService {
  userPosition: BehaviorSubject<google.maps.LatLngLiteral> = new BehaviorSubject(undefined);
  searchRadius: BehaviorSubject<number> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService) { }

  setSearchRadius(radius: number): void {
    this.searchRadius.next(radius);
  }

  locateUser(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude: lat, longitude: lng} = position.coords;
      // const latlng = new google.maps.LatLng(lat, lng);
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

  resetUserPosition(): void {
    this.userPosition.next(undefined);
  }

  getPlaces() {
    this.http.get<any>(environment.googlePlacesUrl);
    // FIXME: method stub
  }
}
