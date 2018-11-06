import {environment} from '@env/environment';

export class PlaceSearchRequest {
  latitude: number;
  longitude: number;
  distance: number;
  query: string;

  constructor(values: { latitude?: number, longitude?: number, distance?: number, query?: string } = {}) {
    this.latitude = values.latitude ? values.latitude : environment.mapDefaults.coords.lat;
    this.longitude = values.longitude ? values.longitude : environment.mapDefaults.coords.lng;
    this.distance = values.distance ? values.distance : 1000;
    this.query = values.query ? values.query : '';
  }

  public createUrlParams(): string {
    return (this.latitude && this.longitude && this.distance)
      ? `latitude=${this.latitude}&longitude=${this.longitude}&distance=${this.distance}&query=${this.query}`
      : `query=${this.query}`;
  }
}
