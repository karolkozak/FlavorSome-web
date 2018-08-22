import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';
import {Rate} from '@app/places/models/rate';
import {Pageable} from '@app/places/models/pageable';
import {PageableParams} from '@app/places/models/pageable-params';

@Injectable()
export class PlacesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.placesPath;
  }

  public getMenu(placeId: string): Observable<StringMap<number>> {
    const endpoint = this.baseUrl + `/${placeId}${environment.menuPath}`;
    return this.httpClient.get<StringMap<number>>(endpoint);
  }

  public getRates(placeId: string, pageable: PageableParams): Observable<Pageable<Rate>> {
    let params = new HttpParams();
    params = params.append('page', pageable.page as any as string);
    params = params.append('size', pageable.size as any as string);
    params = params.append('sort', `${pageable.sortKey},${pageable.direction}`);
    const endpoint = this.baseUrl + `/${placeId}${environment.ratingsPath}`;
    return this.httpClient.get<Pageable<Rate>>(endpoint, {params});
  }

  public addRate(placeId: string, rate: Rate): Observable<Rate> {
    const endpoint = this.baseUrl + `/${placeId}${environment.ratingsPath}`;
    return this.httpClient.post<Rate>(endpoint, rate);
  }
}
