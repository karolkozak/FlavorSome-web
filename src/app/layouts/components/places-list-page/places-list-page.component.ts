import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MapsAPILoader} from '@agm/core';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'un-places-list-page',
  templateUrl: './places-list-page.component.html',
  styleUrls: ['./places-list-page.component.scss']
})
export class PlacesListPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private googlePlacesService: google.maps.places.PlacesService;

  placeQuery: string;
  fetching = true;
  places: google.maps.places.PlaceResult[] = [];
  nextPage;

  constructor(private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private customTitleService: CustomTitleService) {
  }

  ngOnInit() {
    this.customTitleService.setTitle(CONST_TITLES.PLACES);
    this.mapsAPILoader.load().then(() => {
      this.googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
      this.subscription = this.route.queryParams.subscribe(params => {
        this.placeQuery = params['query'];
        this.fetchPlaces(this.placeQuery);
      });
    });
  }

  private fetchPlaces(query: string) {
    const textSearchRequest: google.maps.places.TextSearchRequest = {query};
    if (query) {
      this.googlePlacesService.textSearch(textSearchRequest, (results, status, pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.places = [...this.places, ...results];
          this.nextPage = pagination.hasNextPage && (() => pagination.nextPage());
        }
        this.fetching = false;
      });
    } else {
      this.fetching = false;
    }
  }

  public getNextPage() {
    if (this.nextPage) {
      this.nextPage();
    }
  }

  get hasNextPage(): boolean {
    return !!this.nextPage;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
