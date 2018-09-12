import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '@env/environment';
import {User} from '@app/security/models/user';
import {tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Rate} from '@app/places/models/rate';
import {PageableParams} from '@app/places/models/pageable-params';
import {Pageable} from '@app/places/models/pageable';

@Injectable()
export class UserService {

  private baseUrl: string;
  private currentUser: User;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.usersPath;
  }

  fetchUserOnInitApp(): Promise<User> {
    const endpoint = this.baseUrl + environment.current;
    return new Promise((resolve, reject) => {
      this.httpClient.get<User>(endpoint).subscribe(currentUser => {
        this.currentUser = currentUser;
        resolve(currentUser);
      });
    });
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
    if (userId === this.currentUser.userId) {
      return of(this.currentUser);
    }
    const endpoint = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<User>(endpoint);
  }

  getRatings(userId: string, pageable: PageableParams): Observable<Pageable<Rate>> {
    const params = new HttpParams()
      .set('page', pageable.page as any as string)
      .set('size', pageable.size as any as string)
      .set('sort', `${pageable.sortKey},${pageable.direction}`);
    const endpoint = `${this.baseUrl}/${userId}${environment.ratingsPath}`;
    return this.httpClient.get<Pageable<Rate>>(endpoint, {params});
  }

  getUnrated(): Observable<Rate[]> {
    const endpoint = this.baseUrl + environment.unrated;
    return this.httpClient.get<Rate[]>(endpoint);
  }

  removeCurrentUser() {
    this.currentUser = undefined;
  }
}
