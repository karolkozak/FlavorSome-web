import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MapsAPILoader} from '@agm/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'un-place-searcher',
  templateUrl: './place-searcher.component.html',
  styleUrls: ['./place-searcher.component.scss']
})
export class PlaceSearcherComponent implements OnInit {

  private placesService: google.maps.places.PlacesService;
  places: google.maps.places.PlaceResult[] = [];
  searchForm: FormGroup;

  constructor(private mapsAPILoader: MapsAPILoader, private router: Router) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });
    this.mapsAPILoader.load().then(() => {
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    });
    this.initializeSearch();
  }

  searchPlaces() {
    this.router.navigate(['/places'], {queryParams: {query: this.searchForm.get('searchInput').value}});
  }

  private initializeSearch() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(744),
        distinctUntilChanged()
      )
      .subscribe(searchForm => {
        if (searchForm.searchInput.length < 3) {
          this.places = [];
          return;
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            this.geolocationCallback(searchForm.searchInput),
            this.geolocationError(searchForm.searchInput),
            {timeout: 2000});
        } else {
          const textSearchRequest: google.maps.places.TextSearchRequest = {query: searchForm.searchInput};
          this.textSearch(textSearchRequest);
        }
      });
  }

  private textSearch(request: google.maps.places.TextSearchRequest) {
    this.placesService.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.places = results.slice(0, 4);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.places = [];
      }
    });
  }

  private geolocationCallback(searchForm: string) {
    return (position: Position) => {
      const request: google.maps.places.TextSearchRequest = {
        query: searchForm,
        location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        radius: 10000
      };
      this.textSearch(request);
    };
  }

  private geolocationError(searchForm: string) {
    const request: google.maps.places.TextSearchRequest = {
      query: searchForm
    };
    return (error: PositionError) => {
      this.textSearch(request);
    };
  }
}
