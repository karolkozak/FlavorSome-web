import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '@env/environment';
import {PlacesSearchService} from '@app/dashboard/services/places-search.service';
import {MapService} from '@app/core/services/map/map.service';
import {MapServiceAPI} from '@app/shared/models/MapAPI';
import {LatLng} from '@app/shared/models/LatLng.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'fs-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent implements OnInit, OnDestroy, AfterViewInit {
  providers = MapServiceAPI;

  provider: string;
  mapCenter: LatLng;
  zoom: number;

  private userPositionSub: Subscription;
  private searchRadiusSub: Subscription;
  searchRadius: number;

  @ViewChild('map')
  public mapElement: ElementRef;

  constructor(private mapService: MapService, private placesSearchService: PlacesSearchService) {
    this.provider = this.mapService.constructor.name;
  }

  ngOnInit() {
    ({coords: this.mapCenter, zoom: this.zoom} = environment.mapDefaults);
    this.userPositionSub = this.placesSearchService.userPosition$.subscribe((pos: LatLng|undefined) => this.setPosition(pos));
    this.searchRadiusSub = this.placesSearchService.searchRadius$.subscribe((rad: number|undefined) => {
      this.searchRadius = rad;
      this.mapService.redrawCircle(rad);
    });
    this.placesSearchService.locateUser();
  }

  ngOnDestroy() {
    this.userPositionSub.unsubscribe();
    this.searchRadiusSub.unsubscribe();
  }

  public ngAfterViewInit() {
    if (this.mapElement) {
      this.mapService.setMap(this.mapElement);
    }
  }

  setPosition(pos: any|undefined) {
    if (!!pos) {
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
    this.mapService.setCenter(pos);
  }

  private moveUserPosition(pos: any) {
    this.mapService.updateUserPosition(pos);
  }

  private removeUserPosition() {
    this.mapService.hideUserPosition();
  }

  mapReady($map: google.maps.Map): void {
    this.mapService.setMap($map);
  }
}
