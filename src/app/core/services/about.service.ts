import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs/Observable';
import {ApiResponseBody} from '@app/security/models/api-response-body';
import {AboutMessage} from '@app/layouts/models/about-message';

@Injectable()
export class AboutService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.unnamedMicroserviceUrl + environment.about + environment.mail;
  }

  sendMessage(aboutMessage: AboutMessage): Observable<ApiResponseBody> {
    return this.httpClient.post<ApiResponseBody>(this.url, aboutMessage);
  }
}
