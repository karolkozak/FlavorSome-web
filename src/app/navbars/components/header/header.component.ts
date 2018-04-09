import {Component} from '@angular/core';
import {AuthenticationService} from '@app/security/services/authentication.service';
import {FacebookAuthService} from '@app/security/services/facebook-auth.service';

@Component({
  selector: 'un-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService, private facebookAuthService: FacebookAuthService) {
  }

  public logout() {
    this.facebookAuthService.isFbAuthenticated()
      ? this.facebookAuthService.facebookLogout()
      : this.authenticationService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
