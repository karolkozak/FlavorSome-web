import {Injectable, Injector} from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {environment} from '@env/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {ApiResponseBody} from '@app/security/models/api-response-body';

@Injectable()
export class CustomAuthService extends AuthenticationService {

  private baseUrl: string;

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  login(userData: any): Observable<string> {
    const endpoint = this.baseUrl + environment.loginPath;
    return this.makeRequest(userData, endpoint);
  }

  registerUser(userData: any): Observable<string> {
    const endpoint = this.baseUrl + environment.registration;
    return this.makeRequest(userData, endpoint);
  }

  confirmRegistration(token: string): Observable<ApiResponseBody> {
    const endpoint = `${this.baseUrl}${environment.confirmation}`;
    let params = new HttpParams();
    params = params.append('token', token);
    return this.httpClient.get<ApiResponseBody>(endpoint, {params});
  }

  deleteRegistration(token: string): Observable<ApiResponseBody> {
    const endpoint = `${this.baseUrl}${environment.delete}`;
    const params = (new HttpParams()).append('token', token);
    return this.httpClient.get<ApiResponseBody>(endpoint, {params});
  }

  refreshToken() {
    const endpoint = `${this.baseUrl}${environment.confirmation}${environment.refresh}`;
    return this.httpClient.get<ApiResponseBody>(endpoint);
  }

  private makeRequest(userData: any, endpoint: string): Observable<string> {
    return this.httpClient.post<string>(endpoint, userData, {responseType: 'text'} as any as {}).pipe(
      tap(response => this.setTokenDataInStorage(response))
    );
  }
}
