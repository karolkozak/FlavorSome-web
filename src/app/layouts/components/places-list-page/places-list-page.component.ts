import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {PlacesService} from '@app/places/services/places.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'un-places-list-page',
  templateUrl: './places-list-page.component.html',
  styleUrls: ['./places-list-page.component.scss']
})
export class PlacesListPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  placeQuery: string;
  fetching = true;
  places: Place[] = [];

  constructor(private route: ActivatedRoute, private customTitleService: CustomTitleService, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.customTitleService.setTitle(CONST_TITLES.PLACES);
    this.subscription = this.route.queryParams.subscribe(params => {
      this.placeQuery = params['query'];
      this.fetchPlaces(this.placeQuery);
    });
  }

  private fetchPlaces(query: string) {
    const placeSearchRequest = new PlaceSearchRequest({query});
    if (query) {
      this.placesService.getPlaces(placeSearchRequest).subscribe(places => {
        this.places = places;
        this.fetching = false;
      });
    } else {
      this.fetching = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
