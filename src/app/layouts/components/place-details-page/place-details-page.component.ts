import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {PlacesService} from '@app/places/services/places.service';
import {AuthenticationService} from '@app/security/services/authentication.service';

@Component({
  selector: 'un-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: any;
  private googlePlacesService: google.maps.places.PlacesService;

  placeId: string;
  placeDetails: google.maps.places.PlaceResult;
  placeMenu: StringMap<number>;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private mapsAPILoader: MapsAPILoader,
              private placesService: PlacesService
  ) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
      this.subscription =
        this.route.params.subscribe(params => {
          this.placeId = params['id'];
          if (this.authenticationService.isLoggedIn()) {
            this.placesService.getMenu(this.placeId).subscribe(menu => this.placeMenu = menu);
          }
          this.fetchPlaceDetails(this.placeId);
        });
    });
  }

  private fetchPlaceDetails(placeId: string) {
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {placeId};
    this.googlePlacesService.getDetails(placeDetailsRequest, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placeDetails = {...result};
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
