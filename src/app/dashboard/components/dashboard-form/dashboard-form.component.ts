import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from '@app/core/services/config.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';

@Component({
  selector: 'un-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  private static RANGE = 300;
  private static RANGE_MIN = 10;
  private static RANGE_MAX = 50000;

  isLocationDisabled = !navigator.geolocation;
  placeTypes: string[];
  placesSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService,
              private placesService: PlacesSearchService) {
  }

  ngOnInit() {
    this.placeTypes = this.configService.getAvailablePlaceTypes();
    // TODO: retrieve places from router and display on map (if any exists). See place-searcher.component.ts
    this.placesSearchForm = this.formBuilder.group({
      phrase: [''],
      range: [DashboardFormComponent.RANGE, Validators.compose([
        Validators.min(DashboardFormComponent.RANGE_MIN),
        Validators.max(DashboardFormComponent.RANGE_MAX),
      ])],
      placeType: [''],
      preferences: [''],
    });
    // TODO: add form errors

    this.placesService.setSearchRadius(DashboardFormComponent.RANGE);
  }

  useBounds(): void {
    this.placesService.resetUserPosition();
  }

  locateUser(): void {
    this.placesService.locateUser();
  }

  updateRange(): void {
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
