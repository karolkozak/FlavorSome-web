import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/models/user';

@Injectable()
export class UserService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.usersPath;
  }

  getCurrentUser(): Observable<User> {
    const endpoint = this.baseUrl + environment.current;
    return this.httpClient.get<User>(endpoint);
  }
}
