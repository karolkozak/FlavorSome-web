import {Injectable} from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CustomAuthService extends AuthenticationService {

  private baseUrl: string;

  constructor(router: Router, private httpClient: HttpClient) {
    super(router);
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  login(userData: any): Observable<string> {
    const endpoint = this.baseUrl + environment.loginPath;
    return this.httpClient.post<string>(endpoint, userData, {responseType: 'text'} as any as {}).pipe(
      tap(response => {
        this.setTokenDataInStorage(response);
      })
    );
  }
}
