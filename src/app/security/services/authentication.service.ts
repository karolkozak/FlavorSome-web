import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationService {

  private token: string;
  private redirectUrl: string;

  public isLoggedIn(): boolean {
    return !!this.getToken();
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
}
