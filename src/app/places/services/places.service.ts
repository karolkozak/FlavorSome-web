import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlacesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.placesPath;
  }

  public getMenu(id: string): Observable<StringMap<number>> {
    const endpoint = this.baseUrl + `${id}/${environment.menuPath}`;
    return this.httpClient.get<StringMap<number>>(endpoint);
  }
}
