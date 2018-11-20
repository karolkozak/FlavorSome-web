import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '@app/places/services/places.service';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';
import {MapService} from '@app/core/services/map/map.service';
import {Place} from '@app/places/models/place';
import {PlaceLocation} from '@app/places/models/place-location';

@Component({
  selector: 'un-place-details-page',
  templateUrl: './place-details-page.component.html',
  styleUrls: ['./place-details-page.component.scss']
})
export class PlaceDetailsPageComponent implements OnInit, AfterViewInit {
  currentTab: string;
  placeDetails: Place;
  placeMenu: StringMap<number> = {};
  innerWidth: any;

  zoom = 15;
  placeMarker: any;
  @ViewChild('map')
  public mapElement: ElementRef;

  constructor(private route: ActivatedRoute,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService,
              private placesService: PlacesService,
              private mapService: MapService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { place: Place }) => {
      this.placeDetails = data.place;
      this.setPosition(this.placeDetails.location);
      if (this.isLoggedIn) {
        this.placesService.getMenu(this.placeDetails.vendorPlaceId).subscribe(menu => this.placeMenu = menu);
      }
    });
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement);
    }
  }

  visit() {
    this.placesService.visitPlace(this.placeDetails.vendorPlaceId).subscribe(response => {
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
