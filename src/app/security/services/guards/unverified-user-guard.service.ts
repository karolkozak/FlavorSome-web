import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '@app/core/services/user.service';
import {Observable} from 'rxjs/Observable';
import {UserRole} from '@app/security/models/user';

@Injectable()
export class UnverifiedUserGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const path = route.routeConfig.path;
    return this.userService.getCurrentUser().toPromise().then(user => {
      if (path === 'auth/confirmation') {
        if (user.role !== UserRole.UNVERIFIED) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      } else {
        if (user.role === UserRole.UNVERIFIED) {
          this.router.navigate(['/auth/confirmation']);
          return false;
        }
        return true;
      }
    });
  }
}
