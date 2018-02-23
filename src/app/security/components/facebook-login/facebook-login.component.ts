import {Component, OnInit} from '@angular/core';
import {AuthService as SocialAuthService, FacebookLoginProvider, SocialUser} from 'angular5-social-login';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'un-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  public facebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((socialUser: SocialUser) => {
        this.loginService.loginWithFacebook(socialUser.token)
          .subscribe(response => {
            console.warn(response);  // warn, 'cause tslint pass (for developer purposes only!)
            this.loginService.setTokenInStorage(response['token']);
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
        this.loginService.removeTokenFromStorage();
      })
      .catch(error => {
        // display notification
      });
  }
}
