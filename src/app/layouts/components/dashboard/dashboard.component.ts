import {Component, OnInit} from '@angular/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {MapService} from '@app/core/services/map/map.service';
import {HereMapService} from '@app/core/services/map/here-map.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {Place} from '@app/places/models/place';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

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
  placeSearchRequest: PlaceSearchRequest;
  private subscription: Subscription;

  private fetchingPlacesSource: Subject<string> = new Subject<string>();
  fetchingPlacesAnnounce: Observable<string> = this.fetchingPlacesSource.asObservable();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customTitleService: CustomTitleService,
              private placesSearchService: PlacesSearchService,
              private customToastrService: CustomToastrService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.DASHBOARD);
    this.subscription = this.route.queryParams.subscribe(params => {
      let {latitude, longitude} = params;
      const {query, distance} = params;
      if (query) {
        latitude = +latitude;
        longitude = +longitude;
        this.placeSearchRequest = new PlaceSearchRequest({latitude, longitude, distance, query});
        this.fetchPlaces(this.placeSearchRequest);
      } else {
        this.fetchingDone = true;
      }
    });
  }

  private fetchPlaces(placeSearchRequest: PlaceSearchRequest) {
    this.places = [];
    this.placesSearchService.findPlaces(placeSearchRequest)
      .then(places => {
        this.onFetchingSuccess(places);
        this.fetchingPlacesSource.next();
      }).catch(error => {
      this.onFetchingFailure(error);
    });
  }

  private onFetchingSuccess(places: Place[]) {
    this.customToastrService.showSuccessToastr('Places', `${places.length} places were found`);
    this.places = places;
    this.fetchingDone = true;
  }

  private onFetchingFailure(error) {
    console.error(error);
    this.places = [];
    this.fetchingDone = true;
    this.customToastrService.showErrorToastr('Places', 'Unable to search, try again later', error.status);
  }

  get locateUser(): boolean {
    return !(this.placeSearchRequest && this.placeSearchRequest.query);
  }

  searchPlaces() {
    return (placeSearchRequest: PlaceSearchRequest) => {
      const {query, latitude, longitude, distance} = placeSearchRequest;
      this.router.navigate([], {relativeTo: this.route, queryParams: {query, latitude, longitude, distance}});
    };
  }
}
