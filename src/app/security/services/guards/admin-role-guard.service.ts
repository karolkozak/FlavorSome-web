import {Injectable} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserRole} from '../../../shared/models/user';

@Injectable()
export class AdminRoleGuardService implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getCurrentUser().toPromise().then(user => {
      return user.role === UserRole.ADMIN;
    });
  }
}
