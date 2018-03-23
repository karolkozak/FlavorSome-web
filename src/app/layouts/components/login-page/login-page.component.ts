import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../../security/services/authentication.service';

@Component({
  selector: 'un-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  loginSuccess() {
    return () => {
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
