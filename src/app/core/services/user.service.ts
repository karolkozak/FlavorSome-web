import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '@env/environment';
import {User} from '@app/shared/models/user';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class UserService {

  private baseUrl: string;
  private currentUser: User;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.usersPath;
  }

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    }
    const endpoint = this.baseUrl + environment.current;
    return this.httpClient.get<User>(endpoint).pipe(
      tap(user => this.currentUser = {...user})
    );
  }

  removeCurrentUser() {
    this.currentUser = undefined;
  }
}
