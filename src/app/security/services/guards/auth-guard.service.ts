import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthenticationService} from '../authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.authenticationService.setRedirectUrl(url);
    this.router.navigate(['/login']);
    return false;
  }
}
