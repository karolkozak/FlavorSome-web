import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigService {

  private baseUrl: string;
  private placeTypes: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.configPath;
  }

  getAvailablePlaceTypes(): Observable<string[]> {
    if (this.placeTypes.length) {
      return of(this.placeTypes);
    }
    const endpoint = this.baseUrl + environment.placeTypesPath;
    return this.httpClient.get<string[]>(endpoint).pipe(
      tap(placeTypes => this.placeTypes = placeTypes)
    );
  }
}
