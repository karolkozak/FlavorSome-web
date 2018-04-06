import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs/Observable';
import {SocialUser} from '../libs/angular5-social-login/entities';
import {AuthService as SocialAuthService, FacebookLoginProvider} from '../libs/angular5-social-login';
import {environment} from '@env/environment';
import {CustomTranslateService} from '@app/core/services/custom-translate.service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class FacebookAuthService extends AuthenticationService {

  private baseUrl: string;
  private titleMessage: string;
  private errorMessage: string;

  constructor(router: Router,
              private httpClient: HttpClient,
              private socialAuthService: SocialAuthService,
              private notificationsService: NotificationsService,
              private customTranslateService: CustomTranslateService) {
    super(router);
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  private loginWithFacebook(facebookToken: string): Observable<string> {
    const endpoint = this.baseUrl + environment.loginPath + environment.facebookPath;
    return this.httpClient.post<string>(endpoint, facebookToken, {responseType: 'text'} as any as {});
  }

  public facebookLogin(): Promise<boolean> {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    return this.socialAuthService.signIn(socialPlatformProvider)
      .then((socialUser: SocialUser) => {
        return this.loginWithFacebook(socialUser.token).toPromise().then(response => {
          this.setTokenDataInStorage(response);
          this.setFBAuthenticated(true);
          return true;
        });
      })
      .catch(error => {
        console.error(error);
        this.customTranslateService.getTranslation('Facebook log in').subscribe(result => this.titleMessage = result);
        this.customTranslateService.getTranslation('Unable to log in via Facebook, try again later')
          .subscribe(result => this.errorMessage = result);
        this.notificationsService.error(this.titleMessage, this.errorMessage);
        return false;
      });
  }

  public facebookLogout() {
    this.socialAuthService.signOut()
      .then(() => {
        this.logout();
        this.setFBAuthenticated(false);
        return true;
      })
      .catch(error => {
        console.error(error);
        this.customTranslateService.getTranslation('Facebook log out').subscribe(result => this.titleMessage = result);
        this.customTranslateService.getTranslation('Unable to log out, try again later')
          .subscribe(result => this.errorMessage = result);
        this.notificationsService.error(this.titleMessage, this.errorMessage);
        return false;
      });
  }
}
