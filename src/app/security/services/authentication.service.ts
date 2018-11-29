import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  private token: string;
  private redirectUrl: string;
  private fbAuthenticated = false;

  constructor(private injector: Injector) {
  }

  private loginAnnounceSource: Subject<string> = new Subject<string>();
  public readonly loginAnnounce: Observable<string> = this.loginAnnounceSource.asObservable();

  /*
   * injecting Router in constructor causes circular dependency injection in app.module.ts
   * @see https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
   */
  get router(): Router {
    return this.injector.get(Router);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  announceLogin() {
    this.loginAnnounceSource.next();
  }

  public setFBAuthenticated(flag: boolean) {
    this.fbAuthenticated = flag;
  }

  public isFbAuthenticated(): boolean {
    return this.fbAuthenticated;
  }

  public setTokenDataInStorage(token: string) {
    try {
      localStorage.setItem('access_token', token);
    } catch (e) {
      this.token = token;
    }
  }

  public getToken(): string {
    try {
      return localStorage.getItem('access_token');
    } catch (e) {
      return this.token;
    }
  }

  logout() {
    this.removeTokenDataFromStorage();
    this.announceLogin();
    this.router.navigate(['']);
  }

  public removeTokenDataFromStorage() {
    try {
      localStorage.removeItem('access_token');
    } catch (e) {
      this.token = undefined;
    }
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }

  public unsetRedirectUrl() {
    this.redirectUrl = undefined;
  }
}
