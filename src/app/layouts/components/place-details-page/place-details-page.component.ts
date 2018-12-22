import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '@app/places/services/places.service';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {MapService} from '@app/core/services/map/map.service';
import {Place} from '@app/places/models/place';
import {PlaceLocation} from '@app/places/models/place-location';
import {User, UserRole} from '@app/security/models/user';
import {UserService} from '@app/core/services/user.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
@DestroySubscribers()
export class PlaceDetailsPageComponent implements OnInit, AfterViewInit {
  currentTab: string;
  placeDetails: Place;
  placeMenu: StringMap<number> = {};
  user: User;
  UserRole: typeof UserRole = UserRole;

  zoom = 15;
  placeMarker: any;
  @ViewChild('map')
  public mapElement: ElementRef;
  public subscribers: any = {};

  constructor(private route: ActivatedRoute,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService,
              private placesService: PlacesService,
              private mapService: MapService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscribers.routeData = this.route.data.subscribe((data: { place: Place }) => {
      this.placeDetails = data.place;
      this.setPosition(this.placeDetails.location);
      if (this.isLoggedIn) {
        this.subscribers.menu = this.placesService.getMenu(this.placeDetails.vendorPlaceId).subscribe(menu => this.placeMenu = menu);
        this.subscribers.currentUser = this.userService.getCurrentUser().subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement);
    }
  }

  visit() {
    this.subscribers.visit = this.placesService.visitPlace(this.placeDetails.vendorPlaceId).subscribe(response => {
      this.customToastrService.showSuccessToastr('Success', 'Place was successfully added to your list');
    });
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get placeMenuExists(): boolean {
    return this.placeMenu && !!Object.keys(this.placeMenu).length;
  }

  setPosition(pos: PlaceLocation) {
    if (pos) {
      const latlng = {
        lat: pos.latitude,
        lng: pos.longitude
      };
      this.placeMarker = this.mapService.addMarker(latlng);
      this.mapService.setCenter(latlng);
    }
  }
}
