import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  public loginWithFacebook(facebookToken: string): Observable<Object> {
    const endpoint = this.baseUrl + environment.facebookPath + environment.loginPath;
    return this.httpClient.post(endpoint, facebookToken);
  }

  public setTokenDataInStorage(token: string) {
    localStorage.setItem('access_token', token);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public removeTokenDataFromStorage() {
    localStorage.removeItem('access_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
