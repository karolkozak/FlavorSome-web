import {Injectable} from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';
import {CustomTranslateService} from '../../shared/services/custom-translate.service';
import {Router} from '@angular/router';

@Injectable()
export class CustomAuthService extends AuthenticationService {

  private baseUrl: string;
  private titleMessage: string;
  private errorMessage: string;

  constructor(router: Router,
              private httpClient: HttpClient,
              private notificationsService: NotificationsService,
              private customTranslateService: CustomTranslateService) {
    super(router);
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  login(userData: any): Promise<boolean> {
    const endpoint = this.baseUrl + environment.loginPath;
    return this.httpClient.post<string>(endpoint, userData, {responseType: 'text'} as any as {}).toPromise().then(response => {
      this.setTokenDataInStorage(response);
      return true;
    }).catch(error => {
      console.error(error);
      this.customTranslateService.getTranslation('Log in').subscribe(result => this.titleMessage = result);
      this.customTranslateService.getTranslation('Unable to log in, try again later')
        .subscribe(result => this.errorMessage = result);
      this.notificationsService.error(this.titleMessage, this.errorMessage);
      return false;
    });
  }
}
