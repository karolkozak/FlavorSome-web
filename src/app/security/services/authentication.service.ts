import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  private token: string;
  private redirectUrl: string;
  private fbAuthenticated = false;

  constructor(private router: Router) {
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
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
