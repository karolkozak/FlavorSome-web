import {Injectable} from '@angular/core';
import {SocialUser} from '../libs/angular5-social-login/entities';
import {AuthService as SocialAuthService, FacebookLoginProvider} from '../libs/angular5-social-login';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {NotificationsService} from 'angular2-notifications';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FacebookAuthService extends AuthenticationService {

  constructor(httpClient: HttpClient,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private notificationsService: NotificationsService) {
    super(httpClient);
  }

  public facebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((socialUser: SocialUser) => {
        this.loginWithFacebook(socialUser.token)
          .subscribe(response => {
            this.setTokenDataInStorage(response['token']);
          });
      })
      .catch(error => {
        this.notificationsService.error('Facebook log in', 'Unable to log in via Facebook, try again later');
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
