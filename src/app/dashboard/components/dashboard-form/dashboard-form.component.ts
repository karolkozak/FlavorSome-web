import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

@Component({
  selector: 'fs-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  private static RANGE = 300;
  private static RANGE_MIN = 100;
  private static RANGE_MAX = 50000;

  isLocationDisabled = !navigator.geolocation;
  placeTypes: string[];
  placesSearchForm: FormGroup;
  promiseButton: any;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private placesSearchService: PlacesSearchService,
              private customToastrService: CustomToastrService) {
  }

  ngOnInit() {
    this.placeTypes = this.configService.getAvailablePlaceTypes();
    // TODO: retrieve query param from router, find places and display on map (if any exists). See place-searcher.component.ts
    this.placesSearchForm = this.formBuilder.group({
      query: new FormControl('', Validators.compose([
        Validators.minLength(3)
      ])),
      distance: new FormControl(DashboardFormComponent.RANGE, Validators.compose([
        Validators.min(DashboardFormComponent.RANGE_MIN),
        Validators.max(DashboardFormComponent.RANGE_MAX),
      ])),
      placeType: new FormControl(''),
    });
    // TODO: add form errors

    this.placesSearchService.setSearchRadius(DashboardFormComponent.RANGE);
  }

  useBounds(): void {
    this.placesSearchService.resetUserPosition();
  }

  locateUser(): void {
    this.placesSearchService.locateUser();
  }

  updateRange(): void {
    // TODO: add debounce?
    const rangeControl = this.placesSearchForm.get('range');
    if (rangeControl.valid) {
      this.placesSearchService.setSearchRadius(rangeControl.value);
    }
  }

  findPlaces(): any {
    if (this.placesSearchForm.valid) {
      const {query, distance} = this.placesSearchForm.value;
      // TODO: fetch user position if 'locate', when 'useBounds' get center point from map
      const placeSearchRequest = new PlaceSearchRequest({distance, query});
      const observable = this.placesSearchService.getPlaces(placeSearchRequest);
      this.promiseButton = observable.toPromise();
      observable.subscribe(
        places => {
          // TODO display somewhere, specially on map; remove toastr from here
          this.customToastrService.showSuccessToastr('Places', `${places.length} places were found`);
        },
        error => {
          console.error(error);
          this.customToastrService.showErrorToastr('Places', 'Unable to search, try again later', error.status);
        }
      );
    }
  }
}
