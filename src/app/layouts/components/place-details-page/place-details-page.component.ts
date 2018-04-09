import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'un-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: any;
  private placesService: google.maps.places.PlacesService;

  placeId: string;
  placeDetails: google.maps.places.PlaceResult;

  constructor(private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
      this.subscription =
        this.route.params.subscribe(params => {
          this.placeId = params['id'];
          this.fetchPlaceDetails(this.placeId);
        });
    });
  }

  private fetchPlaceDetails(placeId: string) {
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {placeId};
    this.placesService.getDetails(placeDetailsRequest, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placeDetails = {...result};
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
