import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';

@Component({
  selector: 'un-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService) {
  }

  loginSuccess() {
    return () => {
      this.userService.getCurrentUser().subscribe();
      this.authenticationService.announceLogin();
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
