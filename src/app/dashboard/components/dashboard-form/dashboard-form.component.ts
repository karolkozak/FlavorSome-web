import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';
import {Observable} from 'rxjs/Observable';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'un-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  private static RANGE = 300;

  isLocationDisabled = true;
  placeTypes: Observable<string[]>;
  placesSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService,
              private placesService: PlacesSearchService) { }

  ngOnInit() {
    this.placeTypes = this.configService.getAvailablePlaceTypes();

    this.placesSearchForm = this.formBuilder.group({
      phrase: [''],
      range: [DashboardFormComponent.RANGE, Validators.compose([
        Validators.min(10),
        Validators.max(10000),
      ])],
      placeType: [''],
      preferences: [''],
    });
    // TODO: add form errors

    this.placesService.setSearchRadius(DashboardFormComponent.RANGE);

    if (!!navigator.geolocation) {
      this.isLocationDisabled = false;
    }
  }

  useBounds(): void {
    this.placesService.resetUserPosition();
  }

  locateUser($event): void {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.placesService.setUserPosition(latitude, longitude);
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

  updateRange($event): void {
    // TODO: add debounce?
    const rangeControl = this.placesSearchForm.get('range');
    if (rangeControl.valid) {
      this.placesService.setSearchRadius(rangeControl.value);
    }
  }

  findPlaces(): any {
    // TODO: add service api call
    return null;
  }
}
