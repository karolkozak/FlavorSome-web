import {ElementRef} from '@angular/core';
import {MapService} from '@app/core/services/map/map.service';
import {} from '@types/heremaps';
import {environment} from '@env/environment';
import {MapServiceAPI} from '@app/shared/models/MapAPI';
import {Prop, Tracked} from '@app/shared/decorators/prop.decorator';
import {timer} from 'rxjs/observable/timer';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {debounce} from 'rxjs/operators';
import {Place} from '@app/places/models/place';

export class HereMapService extends MapService {
  private platform: any;
  private readonly defaultLayers: any;

  @Tracked map: H.Map;
  behavior: H.mapevents.Behavior;
  ui: H.ui.UI;

  placeMarkers: H.map.Group[] = [];

  private followHandler: EventListener;

  constructor() {
    super();
    this.platform = new H.service.Platform({
      'app_id': environment.here.app_id,
      'app_code': environment.here.app_code,
    });
    this.defaultLayers = this.platform.createDefaultLayers();
  }

  get provider(): string {
    return MapServiceAPI.Here;
  }

  // /**
  //  * Initializes map using element object. Then initializes map UI.
  //  * It is done here instead of component to avoid API provider dependencies.
  //  * @param mapElement - div containing map instance
  //  */
  setMap(mapElement: ElementRef) {
    this.map = new H.Map(
      mapElement.nativeElement,
      this.defaultLayers.normal.map,
      {
        zoom: environment.mapDefaults.zoom,
        center: environment.mapDefaults.coords,
      }
    );
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  @Prop('map')
  getCenter(): H.geo.Point {
    return this.map.getCenter();
  }

  @Prop('map')
  setCenter(pos: any) {
    this.map.setCenter(pos);
  }

  @Prop('map')
  followCenter(): Observable<H.geo.Point> {
    const center = new BehaviorSubject<H.geo.Point>(this.map.getCenter());
    const center$ = center.asObservable();
    this.followHandler = () => { center.next(this.map.getCenter()); };
    this.map.addEventListener('mapviewchangeend', this.followHandler);

    return center$.pipe(
      debounce(() => timer(200))
    );
  }

  showUserPosition(pos: H.geo.Point, radius: number) {
    this.userMarker = this.addMarker(pos);
    this.userCircle = this.drawCircle(pos, radius);
  }

  updateUserPosition(pos: H.geo.Point) {
    this.moveMarker(this.userMarker, pos);
    this.moveCircle(this.userCircle, pos);
  }

  hideUserPosition() {
    this.map.removeEventListener('mapviewchangeend', this.followHandler);
    this.removeMarker(this.userMarker); // needed?
    this.removeCircle(this.userCircle);
    this.userMarker.dispose();
    this.userCircle.dispose();
    this.userMarker = null;
    this.userCircle = null;
  }

  @Prop('map')
  addMarker(pos: H.geo.Point): H.map.Marker {
    const marker = new H.map.Marker(pos);
    this.map.addObject(marker);
    return marker;
  }

  moveMarker(marker: H.map.Marker, pos: H.geo.Point): void {
    if (!marker) { return; }
    marker.setPosition(pos);
  }

  @Prop('map')
  removeMarker(marker: H.map.Marker): void {
    if (!marker) { return; }
    this.map.removeObject(marker);
  }

  @Prop('map')
  drawCircle(center: H.geo.Point, radius: number) {
    const circle = new H.map.Circle(center, radius, {
      style: {
        fillColor: 'rgba(0,0,0,0.1)',
        strokeColor: 'rgba(0,0,0,0.1)'
      }
    });
    this.map.addObject(circle);
    return circle;
  }

  moveCircle(pos: H.geo.Point, circle = this.userCircle) {
    circle.setCenter(pos);
  }

  @Prop('map')
  redrawCircle(radius: number, circle = this.userCircle) {
    if (!radius) { return; }
    circle.setRadius(radius);
  }

  @Prop('map')
  removeCircle(circle = this.userCircle) {
    this.map.removeObject(circle);
  }

  showPlaceMarkers(places: Place[]) {
    places.forEach((place: Place) => {
      const marker = this.addPlaceMarker(place);
      this.placeMarkers.push(marker);
    });
  }

  removePlaceMarkers() {
    this.ui.getBubbles().forEach(bubble => {
      this.ui.removeBubble(bubble);
      bubble.dispose();
    });
    this.placeMarkers.forEach((marker: H.map.Group) => {
      this.map.removeObjects(marker);
      marker.dispose();
    });
    this.placeMarkers = [];
  }

  @Prop('map')
  addPlaceMarker(place: Place): H.map.Group {
    const group = new H.map.Group();

    const marker = this.prepareMarker(place);
    group.addObject(marker);

    group.addEventListener('tap', (event: H.util.Event) => {
      const bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);

    this.map.addObject(group);
    return group;
  }

  private prepareMarker(place: Place): H.map.Marker {
    const {latitude: lat, longitude: lng } = place.location;
    const marker = new H.map.Marker({lat, lng});
    marker.setData(this.preparePlaceData(place));
    return marker;
  }

}
