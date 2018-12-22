import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {PlacesService} from '@app/places/services/places.service';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {Place} from '@app/places/models/place';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-places-list-page',
  templateUrl: './places-list-page.component.html',
  styleUrls: ['./places-list-page.component.scss']
})
@DestroySubscribers()
export class PlacesListPageComponent implements OnInit {
  public subscribers: any = {};

  placeQuery: string;
  fetchingDone = false;
  places: Place[] = [];

  constructor(private route: ActivatedRoute, private customTitleService: CustomTitleService, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.customTitleService.setTitle(CONST_TITLES.PLACES);
    this.subscribers.params = this.route.queryParams.subscribe(params => {
      this.placeQuery = params['query'];
      this.fetchPlaces(this.placeQuery);
    });
  }

  private fetchPlaces(query: string) {
    if (query) {
      const placeSearchRequest = new PlaceSearchRequest({query});
      this.subscribers.places = this.placesService.getPlaces(placeSearchRequest).subscribe(places => {
        this.places = places;
        this.fetchingDone = true;
      });
    } else {
      this.fetchingDone = true;
    }
  }
}
