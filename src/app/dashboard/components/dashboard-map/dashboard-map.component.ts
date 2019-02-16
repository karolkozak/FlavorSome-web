import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {takeUntil} from 'rxjs/operators';

import {MapService} from '@app/core/services/map/map.service';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {LatLng} from '@app/shared/models/LatLng.interface';
import {MapServiceAPI} from '@app/shared/models/MapAPI';
import {environment} from '@env/environment';
import {Router} from '@angular/router';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';

@Component({
  selector: 'fs-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() locate: boolean;
  @Input() placeSearchRequest: PlaceSearchRequest;
  providers = MapServiceAPI;

  provider: string;
  mapCenter: LatLng;
  zoom: number;

  private onDestroy = new Subject();
  private userPositionSub: Subscription;
  private searchRadiusSub: Subscription;
  searchRadius: number;

  @ViewChild('map')
  public mapElement: ElementRef;

  // FIXME: quick workaround - do it properly before the release
  @HostListener('click', ['$event'])
  onMarkerClick(event) {
    if (event.target.parentElement.classList.contains('H_ib_content')) {
      const id = event.target.getAttribute('id');
      this.router.navigate(['/places', id]);
    }
  }

  constructor(private mapService: MapService, private placesSearchService: PlacesSearchService,
              private router: Router) {
    this.provider = this.mapService.constructor.name;
  }

  ngOnInit() {
    if (this.placeSearchRequest && this.placeSearchRequest.latitude && this.placeSearchRequest.longitude) {
      this.mapCenter = {lat: this.placeSearchRequest.latitude, lng: this.placeSearchRequest.longitude};
      this.zoom = environment.mapDefaults.zoom;
    } else {
      ({coords: this.mapCenter, zoom: this.zoom} = environment.mapDefaults);
    }
    this.userPositionSub = this.placesSearchService.userPosition$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((pos: LatLng | undefined) => this.setPosition(pos));
    this.searchRadiusSub = this.placesSearchService.searchRadius$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((rad: number | undefined) => {
        this.searchRadius = rad;
        this.mapService.redrawCircle(rad);
      });
    if (this.locate) {
      this.placesSearchService.locateUser();
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement);
      this.mapService.setCenter(this.mapCenter);
    }
  }

  private setPosition(pos: any | undefined) {
    if (pos) {
      if (this.mapService.isUserPositioned) {
        this.moveUserPosition(pos);
      } else {
        this.addUserPosition(pos);
      }
    } else {
      this.removeUserPosition();
    }
  }

  private addUserPosition(pos: any) {
    this.mapService.showUserPosition(pos, this.searchRadius);
    if (!this.mapCenter) {
      this.mapService.setCenter(pos);
    }
  }

  private moveUserPosition(pos: any) {
    this.mapService.updateUserPosition(pos);
  }

  private removeUserPosition() {
    if (this.mapService.isUserPositioned) {
      this.mapService.hideUserPosition();
    }
  }

  mapReady($map: google.maps.Map): void {
    this.mapService.setMap($map);
  }
}
