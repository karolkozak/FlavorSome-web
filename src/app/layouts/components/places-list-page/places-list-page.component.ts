import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {PlacesService} from '@app/places/services/places.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {Place} from '@app/places/models/place';

@Component({
  selector: 'fs-places-list-page',
  templateUrl: './places-list-page.component.html',
  styleUrls: ['./places-list-page.component.scss']
})
export class PlacesListPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  placeQuery: string;
  fetchingDone = false;
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
    if (query) {
      const placeSearchRequest = new PlaceSearchRequest({query});
      this.placesService.getPlaces(placeSearchRequest).subscribe(places => {
        this.places = places;
        this.fetchingDone = true;
      });
    } else {
      this.fetchingDone = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
