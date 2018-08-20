import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '@env/environment';
import {User} from '@app/security/models/user';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Rate} from '@app/places/models/rate';

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

  isCurrentUser(userId: string): boolean {
    return this.currentUser.userId === userId;
  }

  getUser(userId: string): Observable<User> {
    const endpoint = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<User>(endpoint);
  }

  getRatings(userId: string): Observable<Rate[]> {
    const endpoint = `${this.baseUrl}/${userId}${environment.ratingsPath}`;
    return this.httpClient.get<Rate[]>(endpoint);
  }

  getUnrated(): Observable<Rate[]> {
    const endpoint = this.baseUrl + environment.unrated;
    return this.httpClient.get<Rate[]>(endpoint);
  }

  removeCurrentUser() {
    this.currentUser = undefined;
  }
}
