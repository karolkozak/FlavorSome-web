import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '@app/security/models/user';
import {Observable} from 'rxjs/Observable';
import {UserService} from '@app/core/services/user.service';
import {tap} from 'rxjs/operators';
import {CustomTitleService} from '@app/core/services/custom-title.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private userService: UserService, private router: Router, private customTitleService: CustomTitleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId).pipe(
      tap(user => {
          this.customTitleService.setTitle(`${user.firstname} ${user.lastname}`);
        }
      )
    ).catch(error => {
      this.router.navigate(['/not-found']);
      return Observable.throw(error);
    });
  }
}
