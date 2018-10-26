import {ElementRef, Injectable} from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {} from '@types/heremaps';
import {environment} from '@env/environment';
import {MapServiceAPI} from '@app/shared/models/MapAPI';

@Injectable()
export class HereMapService implements MapService {
  private platform: any;
  private readonly defaultLayers: any;

  map: H.Map;
  behavior: H.mapevents.Behavior;
  ui: H.ui.UI;

  constructor() {
    this.platform = new H.service.Platform({
      'app_id': environment.here.app_id,
      'app_code': environment.here.app_code,
    });
    this.defaultLayers = this.platform.createDefaultLayers();
  }

  get provider(): string {
    return MapServiceAPI.Here;
  }

  get config() {
    const self = this;
    return {
      get platform(): any {
        return self.platform;
      },

      get defaultLayers(): any {
        return self.defaultLayers;
      }
    };
  }

  // /**
  //  * Initializes map using element object. Then initializes map UI.
  //  * It is done here instead of component to avoid API provider dependencies.
  //  * @param mapElement - div containing map instance
  //  */
  setMap(mapElement: ElementRef, zoom: number) {
    this.map = new H.Map(
      mapElement.nativeElement,
      this.defaultLayers.normal.map,
      {
        zoom: zoom,
        center: environment.mapDefaults.coords,
      }
    );
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  setCenter(pos: any) {
    if (!this.map) { return; }
    this.map.setCenter(pos);
  }

  addMarker(pos: H.geo.Point) {
    if (!this.map) { return; }
    const marker = new H.map.Marker(pos);
    this.map.addObject(marker);
    return marker;
  }

  removeMarker(marker: H.map.Marker) {
    if (!marker) { return; }
    this.map.removeObject(marker);
  }

  drawCircle(center: H.geo.Point, radius: number) {
    if (!this.map) { return; }
    const circle = new H.map.Circle(center, radius, {
      style: {
        fillColor: 'rgba(0,0,0,0.1)',
        strokeColor: 'rgba(0,0,0,0.1)'
      }
    });
    this.map.addObject(circle);
    return circle;
  }

  redrawCircle(circle: H.map.Circle, radius: number) {
    if (!this.map || !circle || !radius) { return; }
    circle.setRadius(radius);
  }

  removeCircle(circle: H.map.Circle) {
    if (!this.map || !circle) { return; }
    this.map.removeObject(circle);
  }
}
