import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';
import {Rate} from '@app/places/models/rate';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RatesService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.flavorSomeMicroserviceUrl + environment.ratesPath;
  }

  private userRateAnnounceSource: Subject<Rate> = new Subject<Rate>();
  public readonly userRateAnnounce: Observable<Rate> = this.userRateAnnounceSource.asObservable();

  public editRate(rate: Rate): Observable<Rate> {
    const endpoint = `${this.baseUrl}/${rate.id}`;
    return this.httpClient.put<Rate>(endpoint, rate).pipe(
      tap(editedRate => this.userRateAnnounceSource.next(editedRate))
    );
  }

  public abandonRate(rate: Rate): Observable<Rate> {
    const endpoint = `${this.baseUrl}/${rate.id}`;
    return this.httpClient.patch<Rate>(endpoint, rate);
  }
}
