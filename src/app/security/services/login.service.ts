import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  public loginWithFacebook(facebookToken: string): Observable<Object> {
    const endpoint = this.baseUrl + environment.facebookPath + environment.loginPath;
    return this.httpClient.post(endpoint, facebookToken);
  }

  public setTokenInStorage(token: string) {
    // save token to the local storage
  }

  public removeTokenFromStorage() {
    // remove token from the local storage
  }

  public isLoggedIn(): boolean {
    // if token in local storage ? true : false
    return true;
  }
}
