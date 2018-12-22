import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '@app/security/services/authentication.service';
import {UserService} from '@app/core/services/user.service';
import {CONST_TITLES, CustomTitleService} from '@app/core/services/custom-title.service';
import {DestroySubscribers} from '@app/shared/decorators/destroy-subscribers.decorator';

@Component({
  selector: 'fs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
@DestroySubscribers()
export class LoginPageComponent implements OnInit {
  public subscribers: any = {};

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
      this.subscribers.user = this.userService.getCurrentUser().subscribe();
      this.authenticationService.announceLogin();
      const redirectUrl = this.authenticationService.getRedirectUrl() || '';
      this.authenticationService.unsetRedirectUrl();
      this.router.navigate([redirectUrl]);
    };
  }
}
