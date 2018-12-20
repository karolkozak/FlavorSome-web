import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';

@Component({
  selector: 'fs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private customTitleService: CustomTitleService) {
  }

  ngOnInit(): void {
    this.customTitleService.setTitle(CONST_TITLES.LOGIN);
  }

  loginSuccess() {
    return () => {
      this.userService.getCurrentUser().subscribe(() => {
        const redirectUrl = this.authenticationService.getRedirectUrl() || '';
        this.authenticationService.unsetRedirectUrl();
        this.authenticationService.announceLogin();
        this.router.navigate([redirectUrl]);
      });
    };
  }
}
