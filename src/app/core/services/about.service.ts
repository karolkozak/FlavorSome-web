import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {AboutMessage} from '@app/layouts/models/about-message';

@Injectable()
export class AboutService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.about;
  }

  sendMessage(aboutMessage: AboutMessage): Observable<ApiResponseBody> {
    const endpoint = `${this.baseUrl}${environment.mail}`;
    return this.httpClient.post<ApiResponseBody>(endpoint, aboutMessage);
  }
}
