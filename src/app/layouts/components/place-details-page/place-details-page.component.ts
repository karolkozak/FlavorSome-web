import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {PlacesService} from '@app/places/services/places.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';

@Component({
  selector: 'un-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private googlePlacesService: google.maps.places.PlacesService;

  placeId: string;
  placeDetails: google.maps.places.PlaceResult;
  placeMenu: StringMap<number> = {};

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private customTranslateService: CustomTranslateService,
              private authenticationService: AuthenticationService,
              private mapsAPILoader: MapsAPILoader,
              private placesService: PlacesService) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
      this.subscription =
        this.route.params.subscribe(params => {
          this.placeId = params['id'];
          if (this.isLoggedIn) {
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

  visit() {
    this.placesService.visitPlace(this.placeId).subscribe(response => {
      let titleMessage = '', message = '';
      this.customTranslateService.getTranslation('Success!').subscribe(result => titleMessage = result);
      this.customTranslateService.getTranslation('Place was successfully added to your list')
        .subscribe(result => message = result);
      this.toastr.success(message, titleMessage);
    });
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get placeMenuExists(): boolean {
    return this.placeMenu && !!Object.keys(this.placeMenu).length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
