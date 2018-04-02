import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'un-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  loginSuccess() {
    return () => {
      this.authenticationService.announceLogin();
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
