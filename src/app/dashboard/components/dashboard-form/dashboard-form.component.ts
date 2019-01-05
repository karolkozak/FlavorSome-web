import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
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
  @Input() placeSearchRequest: PlaceSearchRequest;
  @Input() locate: boolean;
  isLocationDisabled: boolean;
  placeTypes: string[];
  placesSearchForm: FormGroup;
  promiseButton: Promise<void>;
  mapCenterSub: Subscription;

  locationSub: Subscription;
  location: LatLng;
  @Input() searchPlaces = (placeSearchRequest: PlaceSearchRequest): Promise<void> => Promise.resolve();

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private placesSearchService: PlacesSearchService,
              private mapService: MapService) {
  }

  ngOnInit() {
    this.isLocationDisabled = this.placesSearchService.isLocationDisabled;
    this.placeTypes = this.configService.getAvailablePlaceTypes();
    const query = this.placeSearchRequest ? this.placeSearchRequest.query : undefined;
    const range = this.placeSearchRequest && this.placeSearchRequest.distance
      ? this.placeSearchRequest.distance
      : environment.mapDefaults.range;
    const [minRange, maxRange] = environment.mapDefaults.rangeBounds;

    this.placesSearchForm = this.formBuilder.group({
      query: new FormControl(query, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      distance: new FormControl(range, Validators.compose([
        Validators.min(minRange),
        Validators.max(maxRange),
      ])),
      placeType: new FormControl(''),
    });
    // TODO: add form errors

    this.locationSub = this.placesSearchService.userPosition$.subscribe((pos: LatLng) => {
      this.location = pos;
    });
  }

  ngOnDestroy() {
    this.locationSub.unsubscribe();
  }

  get locationValue(): string {
    return this.locate
      ? this.isLocationDisabled ? 'bounds' : 'locate'
      : '';
  }

  useBounds(): void {
    const center = this.mapService.getCenter();
    this.placesSearchService.setUserPosition(center);
    this.mapCenterSub = this.mapService.followCenter().subscribe((mapCenter: LatLng) => {
      this.placesSearchService.setUserPosition(mapCenter);
    });
  }

  locateUser(): void {
    if (this.mapCenterSub) {
      this.mapCenterSub.unsubscribe();
    }
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
      this.promiseButton = new Promise(undefined);
      this.searchPlaces(placeSearchRequest).then(() => {
        this.promiseButton = Promise.resolve();
      });
    }
  }
}
