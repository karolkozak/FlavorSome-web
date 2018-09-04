import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {UserService} from '@app/core/services/user.service';
import {Observable} from 'rxjs/Observable';
import {UserRole} from '@app/security/models/user';

@Injectable()
export class UnverifiedUserGuardService implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const path = route.routeConfig.path;
    return this.userService.getCurrentUser().toPromise().then(user => {
      if (path === 'confirmation') {
        return user.role === UserRole.UNVERIFIED;
      } else {
        return user.role !== UserRole.UNVERIFIED;
      }
    });
  }
}
