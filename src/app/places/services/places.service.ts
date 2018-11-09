import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';
import {Rate} from '@app/places/models/rate';
import {Pageable} from '@app/places/models/pageable';
import {PageableParams} from '@app/places/models/pageable-params';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {Subject} from 'rxjs/Subject';
import {tap} from 'rxjs/operators';
import {Place} from '@app/places/models/place';
import {PlaceSearchRequest} from '@app/places/models/place-search-request';
import {suppressError as suppressErrorHeader} from '@app/core/http-client/headers';

@Injectable()
export class PlacesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.placesPath;
  }

  private userRateAnnounceSource: Subject<Rate> = new Subject<Rate>();
  public readonly userRateAnnounce: Observable<Rate> = this.userRateAnnounceSource.asObservable();

  public getMenu(placeId: string): Observable<StringMap<number>> {
    const endpoint = this.baseUrl + `/${placeId}${environment.menuPath}`;
    return this.httpClient.get<StringMap<number>>(endpoint);
  }

  public getRates(placeId: string, pageable: PageableParams): Observable<Pageable<Rate>> {
    const params = new HttpParams()
      .set('page', pageable.page as any as string)
      .set('size', pageable.size as any as string)
      .set('sort', `${pageable.sortKey},${pageable.direction}`);
    const endpoint = this.baseUrl + `/${placeId}${environment.ratingsPath}`;
    const headers = new HttpHeaders({[suppressErrorHeader.name]: suppressErrorHeader.value});
    return this.httpClient.get<Pageable<Rate>>(endpoint, {headers, params});
  }

  public addRate(placeId: string, rate: Rate): Observable<Rate> {
    const endpoint = this.baseUrl + `/${placeId}${environment.ratingsPath}`;
    return this.httpClient.post<Rate>(endpoint, rate);
  }

  public editRate(rate: Rate): Observable<Rate> {
    const endpoint = this.baseUrl + `/${rate.place.vendorPlaceId}${environment.ratingsPath}/${rate.id}`;
    return this.httpClient.put<Rate>(endpoint, rate).pipe(
      tap(editedRate => this.userRateAnnounceSource.next(editedRate))
    );
  }

  public deleteRate(rate: Rate): Observable<ApiResponseBody> {
    const endpoint = this.baseUrl + `/${rate.place.vendorPlaceId}${environment.ratingsPath}/${rate.id}`;
    return this.httpClient.delete<ApiResponseBody>(endpoint);
  }

  public visitPlace(placeId: string): Observable<ApiResponseBody> {
    const endpoint = this.baseUrl + `/${placeId}${environment.visit}`;
    return this.httpClient.post<ApiResponseBody>(endpoint, {});
  }

  public getPlaces(placeSearchRequest: PlaceSearchRequest): Observable<Place[]> {
    const endpoint = this.baseUrl + `${environment.search}`;
    const params = placeSearchRequest.getHttpParams();
    return this.httpClient.get<Place[]>(endpoint, {params});
  }

  public getPlace(vendorPlaceId: any): Observable<Place> {
    const endpoint = this.baseUrl + `/${vendorPlaceId}`;
    return this.httpClient.get<Place>(endpoint);
  }
}
