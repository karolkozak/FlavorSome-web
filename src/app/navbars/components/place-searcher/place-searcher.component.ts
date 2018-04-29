import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MapsAPILoader} from '@agm/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import PlaceResult = google.maps.places.PlaceResult;
import {} from '@types/googlemaps';


@Component({
  selector: 'un-place-searcher',
  templateUrl: './place-searcher.component.html',
  styleUrls: ['./place-searcher.component.scss']
})

export class PlaceSearcherComponent implements OnInit {


  private placesService: google.maps.places.PlacesService;
  options: PlaceResult[] = [];
  searchFormGroup = new FormGroup({
    searchForm: new FormControl()
  });

  constructor(private mapsAPILoader: MapsAPILoader, private router: Router) {
  }


  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.placesService = new google.maps.places.PlacesService(new google.maps.Map(document.getElementById('fakeMap')));
    });

    this.initializeSearch();
  }

  onSubmit() {
    this.router.navigate(['/places'], {queryParams: {query: this.searchFormGroup.get('searchForm').value}});
  }

  private initializeSearch() {
    this.searchFormGroup.valueChanges
      .pipe(
        debounceTime(744),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        if (searchTerm.searchForm.length < 3) {
          this.options = [];
          return;
        }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            this.geolocationCallback(searchTerm.searchForm),
            this.geolocationError(searchTerm.searchForm),
            {timeout: 2000});
        } else {
          this.textSearch({query: searchTerm.searchForm});
        }
      });
  }

  private textSearch(request) {
    this.placesService.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.options = results.slice(0, 5);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.options = [];
      }
    });

  }

  private geolocationCallback(search: string) {
    return (position: Position) => {
      const request = {
        query: search,
        location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        radius: 10000
      };
      this.textSearch(request);
    };

  }

  private geolocationError(searchForm: string) {
    const request = {
      query: searchForm
    };
    return (error: PositionError) => {
      this.textSearch(request);
    };
  }

}
