import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {MapService} from '@app/core/services/map/map.service';
import {HereMapService} from '@app/core/services/map/here-map.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'fs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: MapService, useClass: HereMapService},
    PlacesSearchService
  ]
})
export class DashboardComponent implements OnInit {
  places: Place[] = [];
  fetchingDone = false;

  constructor(private customTitleService: CustomTitleService,
              private placesSearchService: PlacesSearchService,
              private customToastrService: CustomToastrService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.DASHBOARD);
    // TODO: retrieve query params for request and fetch places
    this.fetchingDone = true;
  }

  searchPlaces() {
    return (placeSearchRequest: PlaceSearchRequest) => {
      return this.placesSearchService.findPlaces(placeSearchRequest)
      .then(places => {
        this.customToastrService.showSuccessToastr('Places', `${places.length} places were found`);
        this.places = places;
        this.fetchingDone = true;
      }).catch(error => {
        console.error(error);
        this.places = [];
        this.fetchingDone = true;
        this.customToastrService.showErrorToastr('Places', 'Unable to search, try again later', error.status);
      });
    };
  }
}
