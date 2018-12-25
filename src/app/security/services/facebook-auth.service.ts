import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SocialUser} from 'angular5-social-login/entities';
import {AuthService as SocialAuthService, FacebookLoginProvider} from 'angular5-social-login';
import {environment} from '@env/environment';
import {AuthenticationService} from './authentication.service';
import {CustomToastrService} from '@app/core/services/custom-toastr.service';

@Injectable()
export class FacebookAuthService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient,
              private socialAuthService: SocialAuthService,
              private customToastrService: CustomToastrService,
              private authenticationService: AuthenticationService) {
    this.baseUrl = environment.flavorSomeMicroserviceUrl + environment.authPath;
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
          this.authenticationService.setTokenDataInStorage(response);
          this.authenticationService.setFBAuthenticated(true);
          return true;
        });
      })
      .catch(error => {
        console.error(error);
        this.customToastrService.showErrorToastr('Facebook log in', 'Unable to log in via Facebook, try again later');
        return false;
      });
  }

  public facebookLogout() {
    return this.socialAuthService.signOut()
      .then(() => {
        this.authenticationService.logout();
        this.authenticationService.setFBAuthenticated(false);
        return true;
      })
      .catch(error => {
        console.error(error);
        this.customToastrService.showErrorToastr('Facebook log out', 'Unable to log out, try again later');
        return false;
      });
  }
}
