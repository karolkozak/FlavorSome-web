import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FacebookLoginProvider} from '../../libs/angular5-social-login';
import {SocialUser} from '../../libs/angular5-social-login/entities';
import {AuthService as SocialAuthService} from '../../libs/angular5-social-login';

@Component({
  selector: 'un-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  public facebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((socialUser: SocialUser) => {
        this.authenticationService.loginWithFacebook(socialUser.token)
          .subscribe(response => {
            console.warn(response);  // warn, 'cause tslint pass (for developer purposes only!)
            this.authenticationService.setTokenInStorage(response['token']);
          });
      })
      .catch(error => {
        // display notification
      });
  }

  public facebookLogout() {
    this.socialAuthService.signOut()
      .then(() => {
        console.warn('logged out');
        this.authenticationService.removeTokenFromStorage();
      })
      .catch(error => {
        // display notification
      });
  }
}
