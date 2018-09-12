import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '@app/security/models/user';
import {Observable} from 'rxjs/Observable';
import {UserService} from '@app/core/services/user.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId).catch(error => {
      this.router.navigate(['/not-found']);
      return Observable.throw(error);
    });
  }
}
