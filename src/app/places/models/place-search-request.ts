import {HttpParams} from '@angular/common/http';

export class PlaceSearchRequest {
  latitude: number;
  longitude: number;
  distance: number;
  query: string;

  constructor(values: { latitude?: number, longitude?: number, distance?: number, query?: string } = {}) {
    this.latitude = values.latitude;
    this.longitude = values.longitude;
    this.distance = values.distance;
    this.query = values.query ? values.query : '';
  }

  public getHttpParams(): HttpParams {
    const httpParams = new HttpParams();
    return (this.latitude && this.longitude && this.distance)
      ? httpParams
        .set('latitude', `${this.latitude}`)
        .set('longitude', `${this.longitude}`)
        .set('distance', `${this.distance}`)
        .set('query', this.query)
      : httpParams.set('query', this.query);
  }
}
