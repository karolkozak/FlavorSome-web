import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {PlacesService} from '@app/places/services/places.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {CustomTitleService} from '@app/core/services/custom-title.service';
import {MapService} from '@app/core/services/map/map.service';

@Component({
  selector: 'un-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  private googlePlacesService: google.maps.places.PlacesService;

  currentTab: string;
  placeId: string;
  placeDetails: google.maps.places.PlaceResult;
  placeMenu: StringMap<number> = {};

  zoom = 15;
  placeMarker: any;
  @ViewChild('map')
  public mapElement: ElementRef;

  constructor(private route: ActivatedRoute,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService,
              private mapsAPILoader: MapsAPILoader,
              private placesService: PlacesService,
              private customTitleService: CustomTitleService,
              private mapService: MapService) {
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

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement, this.zoom);
    }
  }

  private fetchPlaceDetails(placeId: string) {
    const placeDetailsRequest: google.maps.places.PlaceDetailsRequest = {placeId};
    this.googlePlacesService.getDetails(placeDetailsRequest, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placeDetails = {...result};
        this.customTitleService.setTitle(this.placeDetails.name);
        this.setPosition(this.placeDetails.geometry.location);
      }
    });
  }

  visit() {
    this.placesService.visitPlace(this.placeId).subscribe(response => {
      this.customToastrService.showSuccessToastr('Success', 'Place was successfully added to your list');
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

  setPosition(pos: any|undefined) {
    if (pos) {
      const latlng = {
        lat: pos.lat(),
        lng: pos.lng()
      };
      this.placeMarker = this.mapService.addMarker(latlng);
      this.mapService.setCenter(latlng);
    }
  }
}
