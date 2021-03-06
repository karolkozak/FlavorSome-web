import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {Place} from '@app/places/models/place';


@Component({
  selector: 'fs-place-searcher',
  templateUrl: './place-searcher.component.html',
  styleUrls: ['./place-searcher.component.scss']
})
export class PlaceSearcherComponent implements OnInit {

  places: Place[] = [];
  searchForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private placesSearchService: PlacesSearchService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });
    this.initializeSearch();
  }

  redirectToResults() {
    // TODO: pass also location #174
    const route = this.authenticationService.isLoggedIn() ? '/dashboard' : 'places';
    this.router.navigate([route], {queryParams: {query: this.searchForm.get('searchInput').value, distance: 3000}});
  }

  private initializeSearch() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(744),
        distinctUntilChanged()
      )
      .subscribe(searchForm => {
        // TODO: change to form validation
        if (searchForm.searchInput.length < 3) {
          this.places = [];
          return;
        }
        // TODO: use placesSearchService
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            this.geolocationCallback(searchForm.searchInput),
            this.geolocationError(searchForm.searchInput),
            {timeout: 2000});
        } else {
          const placeSearchRequest = new PlaceSearchRequest({query: searchForm.searchInput});
          this.searchPlaces(placeSearchRequest);
        }
      });
  }

  private searchPlaces(placeSearchRequest: PlaceSearchRequest) {
    this.placesSearchService.getPlaces(placeSearchRequest).subscribe(places => {
      this.places = places.slice(0, 4);
    });
  }

  private geolocationCallback(searchInput: string) {
    return (position: Position) => {
      const placeSearchRequest = new PlaceSearchRequest(
        {latitude: position.coords.latitude, longitude: position.coords.longitude, query: searchInput}
      );
      this.searchPlaces(placeSearchRequest);
    };
  }

  private geolocationError(searchInput: string) {
    const placeSearchRequest = new PlaceSearchRequest({query: searchInput});
    return (error: PositionError) => {
      this.searchPlaces(placeSearchRequest);
    };
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
