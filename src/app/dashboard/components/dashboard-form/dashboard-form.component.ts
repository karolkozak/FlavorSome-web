import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {environment} from '@env/environment';
import {MapService} from '@app/core/services/map/map.service';
import {LatLng} from '@app/shared/models/LatLng.interface';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'fs-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit, OnDestroy {

  isLocationDisabled = !navigator.geolocation;
  placeTypes: string[];
  placesSearchForm: FormGroup;
  promiseButton: Promise<number>;

  mapCenterSub: Subscription;
  locationSub: Subscription;
  location: LatLng;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private placesSearchService: PlacesSearchService,
              private mapService: MapService,
              private customToastrService: CustomToastrService) {
  }

  ngOnInit() {
    this.placeTypes = this.configService.getAvailablePlaceTypes();
    // TODO: retrieve query param from router, find places and display on map (if any exists). See place-searcher.component.ts

    const range = environment.mapDefaults.range;
    const [minRange, maxRange] = environment.mapDefaults.rangeBounds;

    this.placesSearchForm = this.formBuilder.group({
      query: new FormControl('', Validators.compose([
        Validators.minLength(3)
      ])),
      distance: new FormControl(range, Validators.compose([
        Validators.min(minRange),
        Validators.max(maxRange),
      ])),
      placeType: new FormControl(''),
    });
    // TODO: add form errors

    this.locationSub = this.placesSearchService.userPosition$.subscribe((pos: LatLng) => { this.location = pos; });
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }

  useBounds(): void {
    const center = this.mapService.getCenter();
    this.placesSearchService.setUserPosition(center);
    this.mapCenterSub = this.mapService.followCenter().subscribe( (mapCenter: LatLng) => {
      this.placesSearchService.setUserPosition(mapCenter);
    });
  }

  locateUser(): void {
    this.mapCenterSub.unsubscribe();
    this.placesSearchService.resetUserPosition();
    this.placesSearchService.locateUser();
  }

  updateRange(): void {
    // TODO: add debounce?
    const distanceControl = this.placesSearchForm.get('distance');
    if (distanceControl.valid) {
      this.placesSearchService.setSearchRadius(distanceControl.value);
    }
  }

  findPlaces(): any {
    if (this.placesSearchForm.valid) {
      const {query, distance} = this.placesSearchForm.value;
      const {lat: latitude, lng: longitude} = this.location;
      const placeSearchRequest = new PlaceSearchRequest({latitude, longitude, distance, query});
      this.promiseButton = this.placesSearchService.findPlaces(placeSearchRequest);
      this.promiseButton.then( numberOfPlaces => {
        this.customToastrService.showSuccessToastr('Places', `${numberOfPlaces} places were found`);
      }).catch(error => {
        console.error(error);
        this.customToastrService.showErrorToastr('Places', 'Unable to search, try again later', error.status);
      });
    }
  }
}
