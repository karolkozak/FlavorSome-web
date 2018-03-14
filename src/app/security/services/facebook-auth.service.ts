import {Injectable} from '@angular/core';
import {SocialUser} from '../libs/angular5-social-login/entities';
import {AuthService as SocialAuthService, FacebookLoginProvider} from '../libs/angular5-social-login';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {NotificationsService} from 'angular2-notifications';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FacebookAuthService extends AuthenticationService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private notificationsService: NotificationsService) {
    super();
    this.baseUrl = environment.unnamedMicroserviceUrl + environment.authPath;
  }

  private loginWithFacebook(facebookToken: string): Observable<Object> {
    const endpoint = this.baseUrl + environment.facebookPath + environment.loginPath;
    return this.httpClient.post(endpoint, facebookToken);
  }

  public facebookLogin(): Promise<boolean> {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    return this.socialAuthService.signIn(socialPlatformProvider)
      .then((socialUser: SocialUser) => {
        this.loginWithFacebook(socialUser.token)
          .subscribe(response => {
            this.setTokenDataInStorage(response['token']);
          });
        return true;
      })
      .catch(error => {
        console.error(error);
        this.notificationsService.error('Facebook log in', 'Unable to log in via Facebook, try again later');
        return false;
      });
  }

  public facebookLogout() {
    this.socialAuthService.signOut()
      .then(() => {
        this.removeTokenDataFromStorage();
        this.router.navigate(['']);
        return true;
      })
      .catch(error => {
        console.error(error);
        this.notificationsService.error('Facebook log out', 'Unable to log out, try again later');
        return false;
      });
  }
}
